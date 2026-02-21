import React, { useState, useEffect, useCallback } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform,
    Image, Modal, TextInput, Dimensions, Alert, FlatList, Animated,
    StatusBar, ActivityIndicator, Linking, Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import { PhotoEntry } from '../types/photo.types';
import { Trip } from '../types/trip.types';
import { getUserTrips } from '../services/firebase.service';
import {
    getPhotos, savePhoto, deletePhoto, toggleFavorite, updatePhoto,
    groupPhotosByDate,
} from '../services/photo.service';

const PRESET_TAGS = [
    { emoji: '🍽️', label: 'Food' },
    { emoji: '🏨', label: 'Hotel' },
    { emoji: '🎒', label: 'Adventure' },
    { emoji: '🏛️', label: 'Landmark' },
    { emoji: '🌅', label: 'Scenery' },
    { emoji: '👫', label: 'People' },
    { emoji: '🚌', label: 'Transport' },
    { emoji: '🛍️', label: 'Shopping' },
    { emoji: '🌊', label: 'Beach' },
    { emoji: '🏔️', label: 'Nature' },
    { emoji: '🎶', label: 'Nightlife' },
    { emoji: '🏟️', label: 'Event' },
];

const SOCIAL_APPS = [
    { id: 'instagram', label: 'Instagram', emoji: '📸', color: '#E1306C', scheme: 'instagram://library' },
    { id: 'tiktok', label: 'TikTok', emoji: '🎵', color: '#010101', scheme: 'tiktok://camera' },
    { id: 'facebook', label: 'Facebook', emoji: '👍', color: '#1877F2', scheme: 'fb://composer' },
    { id: 'x', label: 'X (Twitter)', emoji: '🐦', color: '#000', scheme: 'twitter://post' },
    { id: 'contacts', label: 'Messages', emoji: '💬', color: '#34C759', scheme: 'sms:' },
];

const { width: SCREEN_W } = Dimensions.get('window');
const GRID_GAP = 3;
const GRID_COLS = 3;
const THUMB_SIZE = (SCREEN_W - GRID_GAP * (GRID_COLS + 1)) / GRID_COLS;

type ViewMode = 'trips' | 'grid' | 'timeline' | 'favorites';

export default function PhotoJournalScreen({ navigation }: any) {
    const [photos, setPhotos] = useState<PhotoEntry[]>([]);
    const [trips, setTrips] = useState<Trip[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('trips');
    const [loading, setLoading] = useState(true);
    const [selectedPhoto, setSelectedPhoto] = useState<PhotoEntry | null>(null);
    const [showDetail, setShowDetail] = useState(false);
    const [editingCaption, setEditingCaption] = useState(false);
    const [captionText, setCaptionText] = useState('');
    const [showAddOptions, setShowAddOptions] = useState(false);
    const [showTripPicker, setShowTripPicker] = useState(false);
    const [pendingPhotos, setPendingPhotos] = useState<string[]>([]);
    const [selectedTripFilter, setSelectedTripFilter] = useState<string | null>(null);
    const fadeAnim = useState(new Animated.Value(0))[0];
    // Multi-select
    const [selectMode, setSelectMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    // Share
    const [showShareModal, setShowShareModal] = useState(false);
    // Location
    const [editingLocation, setEditingLocation] = useState(false);
    const [locationText, setLocationText] = useState('');
    // Tags
    const [showTagPicker, setShowTagPicker] = useState(false);
    // Reassign trip (batch)
    const [showReassignPicker, setShowReassignPicker] = useState(false);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const [photoData, tripData] = await Promise.all([getPhotos(), getUserTrips()]);
        setPhotos(photoData);
        setTrips(tripData);
        setLoading(false);
    };

    const getTripLabel = (trip: Trip): string => {
        const icon = trip.type === 'flight' ? '✈️' : '🚌';
        return `${icon} ${trip.origin} → ${trip.destination}`;
    };

    const getTripDateLabel = (trip: Trip): string => {
        const d = new Date(trip.departureDate);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const pickFromGallery = async () => {
        setShowAddOptions(false);
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            quality: 0.8,
            selectionLimit: 20,
        });
        if (!result.canceled && result.assets.length > 0) {
            // Ask which trip to assign
            const uris = result.assets.map(a => a.uri);
            setPendingPhotos(uris);
            setShowTripPicker(true);
        }
    };

    const takePhoto = async () => {
        setShowAddOptions(false);
        const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
        if (!result.canceled && result.assets.length > 0) {
            setPendingPhotos([result.assets[0].uri]);
            setShowTripPicker(true);
        }
    };

    const savePendingPhotos = async (tripId?: string, tripName?: string) => {
        setShowTripPicker(false);
        setLoading(true);
        for (const uri of pendingPhotos) {
            await savePhoto({
                uri,
                caption: '',
                date: new Date().toISOString(),
                tags: [],
                isFavorite: false,
                tripId,
                tripName,
            });
        }
        setPendingPhotos([]);
        await loadData();
    };

    const handleDelete = (photo: PhotoEntry) => {
        Alert.alert('Delete Photo', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete', style: 'destructive',
                onPress: async () => {
                    await deletePhoto(photo.id);
                    setShowDetail(false);
                    setSelectedPhoto(null);
                    await loadData();
                },
            },
        ]);
    };

    const handleToggleFavorite = async (photo: PhotoEntry) => {
        await toggleFavorite(photo.id);
        setSelectedPhoto({ ...photo, isFavorite: !photo.isFavorite });
        await loadData();
    };

    const handleSaveCaption = async () => {
        if (selectedPhoto) {
            await updatePhoto(selectedPhoto.id, { caption: captionText });
            setSelectedPhoto({ ...selectedPhoto, caption: captionText });
            setEditingCaption(false);
            await loadData();
        }
    };

    const handleSaveLocation = async () => {
        if (selectedPhoto) {
            await updatePhoto(selectedPhoto.id, { location: locationText });
            setSelectedPhoto({ ...selectedPhoto, location: locationText });
            setEditingLocation(false);
            await loadData();
        }
    };

    const handleToggleTag = async (tag: string) => {
        if (!selectedPhoto) return;
        const tags = selectedPhoto.tags || [];
        const newTags = tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag];
        await updatePhoto(selectedPhoto.id, { tags: newTags });
        setSelectedPhoto({ ...selectedPhoto, tags: newTags });
        await loadData();
    };

    // Multi-select
    const toggleSelect = (id: string) => {
        const next = new Set(selectedIds);
        next.has(id) ? next.delete(id) : next.add(id);
        setSelectedIds(next);
    };
    const exitSelectMode = () => { setSelectMode(false); setSelectedIds(new Set()); };
    const handleBatchDelete = () => {
        Alert.alert('Delete Photos', `Delete ${selectedIds.size} photo(s)?`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete', style: 'destructive', onPress: async () => {
                    for (const id of selectedIds) await deletePhoto(id);
                    exitSelectMode();
                    await loadData();
                }
            },
        ]);
    };
    const handleBatchFavorite = async () => {
        for (const id of selectedIds) await toggleFavorite(id);
        exitSelectMode();
        await loadData();
    };
    const handleBatchReassign = async (tripId: string, tripName: string) => {
        for (const id of selectedIds) await updatePhoto(id, { tripId, tripName });
        setShowReassignPicker(false);
        exitSelectMode();
        await loadData();
    };

    // Social sharing
    const handleShareToApp = async (app: typeof SOCIAL_APPS[0]) => {
        if (!selectedPhoto) return;
        setShowShareModal(false);
        if (app.id === 'contacts') {
            try {
                await Share.share({ url: selectedPhoto.uri, message: selectedPhoto.caption || 'Check out this photo from my trip! 🌍' });
            } catch { /* ignore */ }
            return;
        }
        const canOpen = await Linking.canOpenURL(app.scheme);
        if (canOpen) {
            await Linking.openURL(app.scheme);
        } else {
            // App not installed – fall back to system share
            try {
                await Share.share({ url: selectedPhoto.uri, message: selectedPhoto.caption || 'Check out this photo! 🌍' });
            } catch { /* ignore */ }
        }
    };

    // Filter photos based on view
    const getDisplayPhotos = (): PhotoEntry[] => {
        if (viewMode === 'favorites') return photos.filter(p => p.isFavorite);
        if (selectedTripFilter) return photos.filter(p => p.tripId === selectedTripFilter);
        return photos;
    };

    const displayPhotos = getDisplayPhotos();
    const grouped = groupPhotosByDate(displayPhotos);

    // Get photos grouped by trip
    const getPhotosByTrip = (): { trip: Trip | null; photos: PhotoEntry[] }[] => {
        const tripGroups: Record<string, PhotoEntry[]> = {};
        const noTrip: PhotoEntry[] = [];
        photos.forEach(p => {
            if (p.tripId) {
                if (!tripGroups[p.tripId]) tripGroups[p.tripId] = [];
                tripGroups[p.tripId].push(p);
            } else {
                noTrip.push(p);
            }
        });
        const result: { trip: Trip | null; photos: PhotoEntry[] }[] = [];
        trips.forEach(t => {
            const tripPhotos = tripGroups[t.id] || [];
            if (tripPhotos.length > 0) {
                result.push({ trip: t, photos: tripPhotos });
            }
        });
        // Show trips without photos
        trips.forEach(t => {
            if (!tripGroups[t.id] || tripGroups[t.id].length === 0) {
                result.push({ trip: t, photos: [] });
            }
        });
        if (noTrip.length > 0) result.push({ trip: null, photos: noTrip });
        return result;
    };

    // EMPTY STATE
    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <LinearGradient
                colors={['rgba(99,102,241,0.1)', 'rgba(236,72,153,0.1)']}
                style={styles.emptyGradient}
            >
                <Text style={styles.emptyIcon}>📷</Text>
                <Text style={styles.emptyTitle}>Your Journal Awaits</Text>
                <Text style={styles.emptySubtitle}>
                    Capture your travel memories and build a beautiful visual diary of your adventures.
                </Text>
                <TouchableOpacity style={styles.emptyButton} onPress={() => setShowAddOptions(true)}>
                    <LinearGradient
                        colors={['#6366f1', '#8b5cf6', '#a855f7']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.emptyButtonGradient}
                    >
                        <Text style={styles.emptyButtonText}>Add Your First Photo</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );

    // TRIPS VIEW (default)
    const renderTripsView = () => {
        const tripData = getPhotosByTrip();
        const tripCount = tripData.filter(g => g.trip && g.photos.length > 0).length;
        const favCount = photos.filter(p => p.isFavorite).length;

        return (
            <ScrollView contentContainerStyle={styles.tripsContainer}>
                {/* Stats Dashboard */}
                {photos.length > 0 && (
                    <View style={styles.statsRow}>
                        <LinearGradient colors={['#6366f1', '#8b5cf6']} style={styles.statCard}>
                            <Text style={styles.statValue}>{photos.length}</Text>
                            <Text style={styles.statLabel}>Photos</Text>
                        </LinearGradient>
                        <LinearGradient colors={['#0ea5e9', '#6366f1']} style={styles.statCard}>
                            <Text style={styles.statValue}>{tripCount}</Text>
                            <Text style={styles.statLabel}>Trips</Text>
                        </LinearGradient>
                        <LinearGradient colors={['#ec4899', '#a855f7']} style={styles.statCard}>
                            <Text style={styles.statValue}>{favCount}</Text>
                            <Text style={styles.statLabel}>Favorites</Text>
                        </LinearGradient>
                    </View>
                )}
                {tripData.length === 0 && photos.length === 0 ? renderEmptyState() : null}
                {tripData.map((group, gi) => (
                    <View key={gi} style={styles.tripSection}>
                        <TouchableOpacity
                            style={styles.tripHeader}
                            onPress={() => {
                                if (group.trip) {
                                    setSelectedTripFilter(group.trip.id);
                                    setViewMode('grid');
                                }
                            }}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={group.trip?.type === 'flight'
                                    ? ['#312e81', '#4338ca', '#6366f1']
                                    : group.trip
                                        ? ['#065f46', '#047857', '#059669']
                                        : ['#374151', '#4b5563', '#6b7280']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.tripHeaderGradient}
                            >
                                {group.photos.length > 0 && (
                                    <Image
                                        source={{ uri: group.photos[0].uri }}
                                        style={styles.tripHeaderBg}
                                    />
                                )}
                                <View style={styles.tripHeaderOverlay}>
                                    <Text style={styles.tripHeaderIcon}>
                                        {group.trip ? (group.trip.type === 'flight' ? '✈️' : '🚌') : '📷'}
                                    </Text>
                                    <Text style={styles.tripHeaderTitle} numberOfLines={1}>
                                        {group.trip
                                            ? `${group.trip.origin} → ${group.trip.destination}`
                                            : 'Unassigned Photos'}
                                    </Text>
                                    {group.trip && (
                                        <Text style={styles.tripHeaderSub}>
                                            {group.trip.airline || group.trip.busCompany || ''} • {getTripDateLabel(group.trip)}
                                        </Text>
                                    )}
                                    <View style={styles.tripHeaderStats}>
                                        <View style={styles.tripStat}>
                                            <Text style={styles.tripStatValue}>{group.photos.length}</Text>
                                            <Text style={styles.tripStatLabel}>photos</Text>
                                        </View>
                                        {group.photos.filter(p => p.isFavorite).length > 0 && (
                                            <View style={styles.tripStat}>
                                                <Text style={styles.tripStatValue}>
                                                    {group.photos.filter(p => p.isFavorite).length} ♥
                                                </Text>
                                                <Text style={styles.tripStatLabel}>favorites</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Photo preview row */}
                        {group.photos.length > 0 && (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tripPhotoRow}>
                                {group.photos.slice(0, 10).map(photo => (
                                    <TouchableOpacity
                                        key={photo.id}
                                        style={styles.tripPhotoThumb}
                                        onPress={() => { setSelectedPhoto(photo); setShowDetail(true); }}
                                        activeOpacity={0.85}
                                    >
                                        <Image source={{ uri: photo.uri }} style={styles.tripPhotoImage} />
                                        {photo.isFavorite && (
                                            <View style={styles.miniHeart}>
                                                <Text style={styles.miniHeartText}>♥</Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                ))}
                                {group.photos.length > 10 && (
                                    <View style={styles.tripPhotoMore}>
                                        <Text style={styles.tripPhotoMoreText}>+{group.photos.length - 10}</Text>
                                    </View>
                                )}
                            </ScrollView>
                        )}
                    </View>
                ))}
            </ScrollView>
        );
    };

    // GRID VIEW
    const renderGrid = () => (
        <View style={{ flex: 1 }}>
            {selectMode ? (
                <View style={styles.selectBar}>
                    <Text style={styles.selectBarText}>{selectedIds.size} selected</Text>
                    <View style={styles.selectBarActions}>
                        <TouchableOpacity style={styles.selectAction} onPress={handleBatchFavorite}>
                            <Text style={styles.selectActionText}>♥ Favorite</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.selectAction} onPress={() => setShowReassignPicker(true)}>
                            <Text style={styles.selectActionText}>🔀 Reassign</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.selectAction, styles.selectActionDelete]} onPress={handleBatchDelete}>
                            <Text style={[styles.selectActionText, { color: '#ff4444' }]}>🗑 Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={exitSelectMode}>
                            <Text style={styles.selectCancelText}>✕ Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : selectedTripFilter ? (
                <TouchableOpacity
                    style={styles.filterBar}
                    onPress={() => { setSelectedTripFilter(null); setViewMode('trips'); }}
                >
                    <Text style={styles.filterBarText}>
                        ← {trips.find(t => t.id === selectedTripFilter)?.origin} → {trips.find(t => t.id === selectedTripFilter)?.destination}
                    </Text>
                    <Text style={styles.filterBarClear}>Show All</Text>
                </TouchableOpacity>
            ) : null}
            <FlatList
                data={displayPhotos}
                keyExtractor={item => item.id}
                numColumns={GRID_COLS}
                contentContainerStyle={styles.gridContainer}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[styles.gridItem, { marginLeft: index % GRID_COLS === 0 ? GRID_GAP : 0 }]}
                        onPress={() => {
                            if (selectMode) { toggleSelect(item.id); }
                            else { setSelectedPhoto(item); setShowDetail(true); }
                        }}
                        onLongPress={() => { setSelectMode(true); toggleSelect(item.id); }}
                        activeOpacity={0.85}
                    >
                        <Image source={{ uri: item.uri }} style={styles.gridImage} />
                        {selectMode && (
                            <View style={[styles.gridSelectCircle, selectedIds.has(item.id) && styles.gridSelectCircleActive]}>
                                {selectedIds.has(item.id) && <Text style={styles.gridSelectCheck}>✓</Text>}
                            </View>
                        )}
                        {!selectMode && item.isFavorite && (
                            <View style={styles.gridFavBadge}>
                                <Text style={styles.gridFavIcon}>♥</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                )}
            />
        </View>
    );

    // TIMELINE VIEW
    const renderTimeline = () => (
        <ScrollView contentContainerStyle={styles.timelineContainer}>
            {grouped.map((group, gi) => (
                <View key={gi} style={styles.timelineGroup}>
                    <View style={styles.timelineDateRow}>
                        <View style={styles.timelineDot} />
                        <Text style={styles.timelineDateText}>{group.date}</Text>
                        <Text style={styles.timelineCount}>{group.photos.length}</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timelinePhotos}>
                        {group.photos.map(photo => (
                            <TouchableOpacity
                                key={photo.id}
                                style={styles.timelinePhotoCard}
                                onPress={() => { setSelectedPhoto(photo); setShowDetail(true); }}
                                activeOpacity={0.85}
                            >
                                <Image source={{ uri: photo.uri }} style={styles.timelineImage} />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.75)']}
                                    style={styles.timelineOverlay}
                                >
                                    {photo.tripName && (
                                        <View style={styles.timelineTripBadge}>
                                            <Text style={styles.timelineTripBadgeText}>{photo.tripName}</Text>
                                        </View>
                                    )}
                                    {photo.caption ? (
                                        <Text style={styles.timelineCaption} numberOfLines={2}>{photo.caption}</Text>
                                    ) : (
                                        <Text style={styles.timelineCaptionPlaceholder}>Tap to caption...</Text>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            ))}
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* HEADER */}
            <LinearGradient
                colors={['#1e1b4b', '#312e81', '#4338ca']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={styles.backBtnText}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>Photo Journal</Text>
                        <Text style={styles.headerSub}>{photos.length} memories captured</Text>
                    </View>
                    <TouchableOpacity onPress={() => setShowAddOptions(true)} style={styles.addBtn}>
                        <LinearGradient colors={['#a855f7', '#ec4899']} style={styles.addBtnGradient}>
                            <Text style={styles.addBtnText}>+</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* View Mode Tabs */}
                <View style={styles.viewTabs}>
                    {(['trips', 'grid', 'timeline', 'favorites'] as ViewMode[]).map(m => (
                        <TouchableOpacity
                            key={m}
                            style={[styles.viewTab, viewMode === m && styles.viewTabActive]}
                            onPress={() => {
                                setViewMode(m);
                                if (m !== 'grid') setSelectedTripFilter(null);
                            }}
                        >
                            <Text style={styles.viewTabIcon}>
                                {m === 'trips' ? '🗂' : m === 'grid' ? '⊞' : m === 'timeline' ? '☰' : '♥'}
                            </Text>
                            <Text style={[styles.viewTabText, viewMode === m && styles.viewTabTextActive]}>
                                {m.charAt(0).toUpperCase() + m.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </LinearGradient>

            {/* CONTENT */}
            <Animated.View style={[styles.contentArea, { opacity: fadeAnim }]}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#6366f1" />
                    </View>
                ) : photos.length === 0 ? (
                    renderEmptyState()
                ) : viewMode === 'trips' ? (
                    renderTripsView()
                ) : viewMode === 'grid' ? (
                    renderGrid()
                ) : viewMode === 'timeline' ? (
                    renderTimeline()
                ) : viewMode === 'favorites' ? (
                    displayPhotos.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyIcon}>♥</Text>
                            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
                            <Text style={styles.emptySubtitle}>Tap the heart on any photo to save it here.</Text>
                        </View>
                    ) : renderGrid()
                ) : null}
            </Animated.View>

            {/* ADD OPTIONS MODAL */}
            <Modal visible={showAddOptions} transparent animationType="fade">
                <TouchableOpacity style={styles.addModalOverlay} activeOpacity={1} onPress={() => setShowAddOptions(false)}>
                    <View style={styles.addModalContent}>
                        <Text style={styles.addModalTitle}>Add Photos</Text>
                        <TouchableOpacity style={styles.addOption} onPress={takePhoto}>
                            <View style={[styles.addOptionIcon, { backgroundColor: '#eef2ff' }]}>
                                <Text style={styles.addOptionEmoji}>📸</Text>
                            </View>
                            <View>
                                <Text style={styles.addOptionTitle}>Take Photo</Text>
                                <Text style={styles.addOptionSub}>Capture a new memory</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addOption} onPress={pickFromGallery}>
                            <View style={[styles.addOptionIcon, { backgroundColor: '#fef3c7' }]}>
                                <Text style={styles.addOptionEmoji}>🖼</Text>
                            </View>
                            <View>
                                <Text style={styles.addOptionTitle}>Choose from Library</Text>
                                <Text style={styles.addOptionSub}>Import existing photos</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addModalCancel} onPress={() => setShowAddOptions(false)}>
                            <Text style={styles.addModalCancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* TRIP PICKER MODAL */}
            <Modal visible={showTripPicker} transparent animationType="slide">
                <View style={styles.tripPickerOverlay}>
                    <View style={styles.tripPickerContent}>
                        <Text style={styles.tripPickerTitle}>Assign to Trip</Text>
                        <Text style={styles.tripPickerSub}>
                            {pendingPhotos.length} photo{pendingPhotos.length > 1 ? 's' : ''} selected
                        </Text>
                        <ScrollView style={styles.tripPickerList}>
                            {trips.map(trip => (
                                <TouchableOpacity
                                    key={trip.id}
                                    style={styles.tripPickerOption}
                                    onPress={() => savePendingPhotos(trip.id, `${trip.origin} → ${trip.destination}`)}
                                >
                                    <LinearGradient
                                        colors={trip.type === 'flight'
                                            ? ['#312e81', '#4338ca']
                                            : ['#065f46', '#047857']}
                                        style={styles.tripPickerIcon}
                                    >
                                        <Text style={styles.tripPickerEmoji}>
                                            {trip.type === 'flight' ? '✈️' : '🚌'}
                                        </Text>
                                    </LinearGradient>
                                    <View style={styles.tripPickerInfo}>
                                        <Text style={styles.tripPickerName}>
                                            {trip.origin} → {trip.destination}
                                        </Text>
                                        <Text style={styles.tripPickerDate}>
                                            {trip.airline || trip.busCompany || ''} • {getTripDateLabel(trip)}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.tripPickerSkip}
                            onPress={() => savePendingPhotos()}
                        >
                            <Text style={styles.tripPickerSkipText}>Skip – Don't Assign to Trip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tripPickerCancel}
                            onPress={() => { setShowTripPicker(false); setPendingPhotos([]); }}
                        >
                            <Text style={styles.tripPickerCancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* PHOTO DETAIL MODAL */}
            <Modal visible={showDetail} animationType="slide" presentationStyle="fullScreen">
                {selectedPhoto && (
                    <View style={styles.detailContainer}>
                        <Image source={{ uri: selectedPhoto.uri }} style={styles.detailImage} resizeMode="contain" />

                        <View style={styles.detailTopBar}>
                            <TouchableOpacity
                                style={styles.detailCloseBtn}
                                onPress={() => { setShowDetail(false); setEditingCaption(false); }}
                            >
                                <Text style={styles.detailCloseBtnText}>✕</Text>
                            </TouchableOpacity>
                            <View style={styles.detailActions}>
                                <TouchableOpacity style={styles.detailActionBtn} onPress={() => handleToggleFavorite(selectedPhoto)}>
                                    <Text style={[styles.detailActionIcon, selectedPhoto.isFavorite && styles.favActive]}>
                                        {selectedPhoto.isFavorite ? '♥' : '♡'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.detailActionBtn} onPress={() => setShowShareModal(true)}>
                                    <Text style={styles.detailActionIcon}>📤</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.detailActionBtn} onPress={() => handleDelete(selectedPhoto)}>
                                    <Text style={styles.detailActionIcon}>🗑</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.92)']} style={styles.detailBottom}>
                            {selectedPhoto.tripName && (
                                <View style={styles.detailTripBadge}>
                                    <Text style={styles.detailTripBadgeText}>{selectedPhoto.tripName}</Text>
                                </View>
                            )}
                            {/* Location */}
                            <TouchableOpacity onPress={() => { setLocationText(selectedPhoto.location || ''); setEditingLocation(true); }} style={styles.detailLocationRow}>
                                <Text style={styles.detailLocationIcon}>📍</Text>
                                {editingLocation ? (
                                    <View style={{ flex: 1, flexDirection: 'row', gap: 6 }}>
                                        <TextInput
                                            style={styles.locationInput}
                                            value={locationText}
                                            onChangeText={setLocationText}
                                            placeholder="Add location..."
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                            autoFocus
                                        />
                                        <TouchableOpacity onPress={handleSaveLocation} style={styles.locationSaveBtn}>
                                            <Text style={{ color: '#a855f7', fontWeight: '700' }}>Save</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setEditingLocation(false)}>
                                            <Text style={{ color: 'rgba(255,255,255,0.5)' }}>✕</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <Text style={selectedPhoto.location ? styles.detailLocationText : styles.detailLocationPlaceholder}>
                                        {selectedPhoto.location || 'Tap to add location'}
                                    </Text>
                                )}
                            </TouchableOpacity>
                            {/* Tags */}
                            <View style={styles.detailTagsRow}>
                                {(selectedPhoto.tags || []).map(tag => (
                                    <View key={tag} style={styles.tagChip}>
                                        <Text style={styles.tagChipText}>{tag}</Text>
                                    </View>
                                ))}
                                <TouchableOpacity style={styles.tagAddBtn} onPress={() => setShowTagPicker(true)}>
                                    <Text style={styles.tagAddBtnText}>+ Tag</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.detailDate}>
                                {new Date(selectedPhoto.date).toLocaleDateString('en-US', {
                                    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
                                })}
                            </Text>
                            {editingCaption ? (
                                <View style={styles.captionEditContainer}>
                                    <TextInput
                                        style={styles.captionInput}
                                        value={captionText}
                                        onChangeText={setCaptionText}
                                        placeholder="Write a caption for this memory..."
                                        placeholderTextColor="rgba(255,255,255,0.5)"
                                        multiline
                                        autoFocus
                                    />
                                    <View style={styles.captionEditButtons}>
                                        <TouchableOpacity onPress={() => setEditingCaption(false)} style={styles.captionCancelBtn}>
                                            <Text style={styles.captionCancelText}>Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleSaveCaption} style={styles.captionSaveBtn}>
                                            <LinearGradient colors={['#6366f1', '#a855f7']} style={styles.captionSaveBtnGrad}>
                                                <Text style={styles.captionSaveText}>Save</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={() => { setCaptionText(selectedPhoto.caption); setEditingCaption(true); }}>
                                    {selectedPhoto.caption ? (
                                        <Text style={styles.detailCaption}>{selectedPhoto.caption}</Text>
                                    ) : (
                                        <Text style={styles.detailCaptionPlaceholder}>Tap to add a caption...</Text>
                                    )}
                                </TouchableOpacity>
                            )}
                        </LinearGradient>
                    </View>
                )}
            </Modal>

            {/* SHARE MODAL */}
            <Modal visible={showShareModal} transparent animationType="slide">
                <TouchableOpacity style={styles.tripPickerOverlay} activeOpacity={1} onPress={() => setShowShareModal(false)}>
                    <View style={styles.tripPickerContent}>
                        <Text style={styles.tripPickerTitle}>📤 Share Photo</Text>
                        <Text style={styles.tripPickerSub}>Choose where to share</Text>
                        <View style={styles.socialGrid}>
                            {SOCIAL_APPS.map(app => (
                                <TouchableOpacity
                                    key={app.id}
                                    style={[styles.socialBtn, { backgroundColor: app.color }]}
                                    onPress={() => handleShareToApp(app)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.socialBtnEmoji}>{app.emoji}</Text>
                                    <Text style={styles.socialBtnLabel}>{app.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity style={styles.tripPickerCancel} onPress={() => setShowShareModal(false)}>
                            <Text style={styles.tripPickerCancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* TAG PICKER MODAL */}
            <Modal visible={showTagPicker} transparent animationType="slide">
                <TouchableOpacity style={styles.tripPickerOverlay} activeOpacity={1} onPress={() => setShowTagPicker(false)}>
                    <View style={styles.tripPickerContent}>
                        <Text style={styles.tripPickerTitle}>🏷️ Add Tags</Text>
                        <View style={styles.tagGrid}>
                            {PRESET_TAGS.map(t => {
                                const label = `${t.emoji} ${t.label}`;
                                const active = (selectedPhoto?.tags || []).includes(label);
                                return (
                                    <TouchableOpacity
                                        key={t.label}
                                        style={[styles.tagGridBtn, active && styles.tagGridBtnActive]}
                                        onPress={() => handleToggleTag(label)}
                                    >
                                        <Text style={styles.tagGridEmoji}>{t.emoji}</Text>
                                        <Text style={[styles.tagGridLabel, active && styles.tagGridLabelActive]}>{t.label}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <TouchableOpacity style={styles.tripPickerSkip} onPress={() => setShowTagPicker(false)}>
                            <Text style={styles.tripPickerSkipText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* REASSIGN TRIP PICKER MODAL */}
            <Modal visible={showReassignPicker} transparent animationType="slide">
                <View style={styles.tripPickerOverlay}>
                    <View style={styles.tripPickerContent}>
                        <Text style={styles.tripPickerTitle}>🔀 Reassign to Trip</Text>
                        <Text style={styles.tripPickerSub}>{selectedIds.size} photo(s) selected</Text>
                        <ScrollView style={styles.tripPickerList}>
                            {trips.map(trip => (
                                <TouchableOpacity
                                    key={trip.id}
                                    style={styles.tripPickerOption}
                                    onPress={() => handleBatchReassign(trip.id, `${trip.origin} → ${trip.destination}`)}
                                >
                                    <LinearGradient
                                        colors={trip.type === 'flight' ? ['#312e81', '#4338ca'] : ['#065f46', '#047857']}
                                        style={styles.tripPickerIcon}
                                    >
                                        <Text style={styles.tripPickerEmoji}>{trip.type === 'flight' ? '✈️' : '🚌'}</Text>
                                    </LinearGradient>
                                    <View style={styles.tripPickerInfo}>
                                        <Text style={styles.tripPickerName}>{trip.origin} → {trip.destination}</Text>
                                        <Text style={styles.tripPickerDate}>{trip.airline || trip.busCompany || ''} • {getTripDateLabel(trip)}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.tripPickerCancel} onPress={() => setShowReassignPicker(false)}>
                            <Text style={styles.tripPickerCancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#09090b' },
    header: { paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingHorizontal: 20 },
    headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
    backBtnText: { color: '#fff', fontSize: 22, fontWeight: '600' },
    headerCenter: { alignItems: 'center' },
    headerTitle: { fontSize: 22, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
    headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
    addBtn: { borderRadius: 20, overflow: 'hidden' },
    addBtnGradient: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    addBtnText: { color: '#fff', fontSize: 26, fontWeight: '300', marginTop: -2 },
    viewTabs: { flexDirection: 'row', marginTop: 4 },
    viewTab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderBottomWidth: 3, borderBottomColor: 'transparent', gap: 4 },
    viewTabActive: { borderBottomColor: '#a855f7' },
    viewTabIcon: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
    viewTabText: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
    viewTabTextActive: { color: '#fff' },
    contentArea: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    // Empty
    emptyContainer: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
    emptyGradient: { borderRadius: 28, padding: 40, alignItems: 'center' },
    emptyIcon: { fontSize: 72, marginBottom: 20 },
    emptyTitle: { fontSize: 24, fontWeight: '800', color: '#e0e7ff', marginBottom: 12 },
    emptySubtitle: { fontSize: 15, color: 'rgba(224,231,255,0.7)', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
    emptyButton: { borderRadius: 16, overflow: 'hidden' },
    emptyButtonGradient: { paddingHorizontal: 32, paddingVertical: 16, borderRadius: 16 },
    emptyButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
    // Trips view
    tripsContainer: { padding: 16, paddingBottom: 40 },
    tripSection: { marginBottom: 24 },
    tripHeader: { borderRadius: 20, overflow: 'hidden' },
    tripHeaderGradient: { padding: 20, minHeight: 130, justifyContent: 'flex-end', position: 'relative' },
    tripHeaderBg: { ...StyleSheet.absoluteFillObject, opacity: 0.25, borderRadius: 20 },
    tripHeaderOverlay: {},
    tripHeaderIcon: { fontSize: 28, marginBottom: 8 },
    tripHeaderTitle: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 4 },
    tripHeaderSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 10 },
    tripHeaderStats: { flexDirection: 'row', gap: 16 },
    tripStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    tripStatValue: { fontSize: 14, fontWeight: '700', color: '#fff' },
    tripStatLabel: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
    tripPhotoRow: { marginTop: 12, marginLeft: 4 },
    tripPhotoThumb: { width: 80, height: 80, borderRadius: 12, overflow: 'hidden', marginRight: 8 },
    tripPhotoImage: { width: '100%', height: '100%' },
    miniHeart: { position: 'absolute', top: 4, right: 4, width: 18, height: 18, borderRadius: 9, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
    miniHeartText: { color: '#ec4899', fontSize: 10 },
    tripPhotoMore: { width: 80, height: 80, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
    tripPhotoMoreText: { color: 'rgba(255,255,255,0.5)', fontSize: 16, fontWeight: '700' },
    // Filter bar
    filterBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, backgroundColor: 'rgba(99,102,241,0.15)', borderBottomWidth: 1, borderBottomColor: 'rgba(99,102,241,0.2)' },
    filterBarText: { color: '#a5b4fc', fontSize: 14, fontWeight: '600' },
    filterBarClear: { color: '#a855f7', fontSize: 13, fontWeight: '600' },
    // Grid
    gridContainer: { paddingTop: GRID_GAP },
    gridItem: { width: THUMB_SIZE, height: THUMB_SIZE, marginBottom: GRID_GAP, marginRight: GRID_GAP },
    gridImage: { width: '100%', height: '100%' },
    gridFavBadge: { position: 'absolute', top: 4, right: 4, width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
    gridFavIcon: { color: '#ec4899', fontSize: 12 },
    // Timeline
    timelineContainer: { padding: 16, paddingBottom: 40 },
    timelineGroup: { marginBottom: 28 },
    timelineDateRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
    timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#a855f7', marginRight: 10 },
    timelineDateText: { flex: 1, fontSize: 15, fontWeight: '700', color: '#e0e7ff' },
    timelineCount: { fontSize: 13, color: 'rgba(224,231,255,0.5)' },
    timelinePhotos: { marginLeft: 20 },
    timelinePhotoCard: { width: 200, height: 260, borderRadius: 16, overflow: 'hidden', marginRight: 12 },
    timelineImage: { width: '100%', height: '100%' },
    timelineOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, paddingTop: 40 },
    timelineTripBadge: { backgroundColor: 'rgba(99,102,241,0.6)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 6 },
    timelineTripBadgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
    timelineCaption: { color: '#fff', fontSize: 13, fontWeight: '600', lineHeight: 18 },
    timelineCaptionPlaceholder: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontStyle: 'italic' },
    // Add Modal
    addModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
    addModalContent: { backgroundColor: '#1c1c1e', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24 },
    addModalTitle: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 20, textAlign: 'center' },
    addOption: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 16, marginBottom: 12, gap: 14 },
    addOptionIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
    addOptionEmoji: { fontSize: 24 },
    addOptionTitle: { fontSize: 16, fontWeight: '700', color: '#fff' },
    addOptionSub: { fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
    addModalCancel: { padding: 16, alignItems: 'center', marginTop: 4 },
    addModalCancelText: { fontSize: 16, fontWeight: '600', color: 'rgba(255,255,255,0.5)' },
    // Trip Picker
    tripPickerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
    tripPickerContent: { backgroundColor: '#1c1c1e', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24, maxHeight: '75%' },
    tripPickerTitle: { fontSize: 20, fontWeight: '800', color: '#fff', textAlign: 'center' },
    tripPickerSub: { fontSize: 14, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 4, marginBottom: 20 },
    tripPickerList: { marginBottom: 12 },
    tripPickerOption: { flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 14, marginBottom: 10, gap: 12 },
    tripPickerIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    tripPickerEmoji: { fontSize: 20 },
    tripPickerInfo: { flex: 1 },
    tripPickerName: { fontSize: 15, fontWeight: '700', color: '#fff' },
    tripPickerDate: { fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
    tripPickerSkip: { padding: 16, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, alignItems: 'center', marginBottom: 8 },
    tripPickerSkipText: { fontSize: 15, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
    tripPickerCancel: { padding: 14, alignItems: 'center' },
    tripPickerCancelText: { fontSize: 16, fontWeight: '600', color: 'rgba(255,255,255,0.4)' },
    // Detail
    detailContainer: { flex: 1, backgroundColor: '#000' },
    detailImage: { flex: 1, width: '100%' },
    detailTopBar: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Platform.OS === 'ios' ? 56 : 36, paddingHorizontal: 16 },
    detailCloseBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
    detailCloseBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    detailActions: { flexDirection: 'row', gap: 10 },
    detailActionBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
    detailActionIcon: { fontSize: 20 },
    favActive: { color: '#ec4899' },
    detailBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, paddingTop: 80, paddingBottom: Platform.OS === 'ios' ? 44 : 24 },
    detailTripBadge: { backgroundColor: 'rgba(99,102,241,0.7)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 8 },
    detailTripBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
    detailDate: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '600', marginBottom: 8 },
    detailCaption: { color: '#fff', fontSize: 18, fontWeight: '600', lineHeight: 26 },
    detailCaptionPlaceholder: { color: 'rgba(255,255,255,0.4)', fontSize: 16, fontStyle: 'italic' },
    captionEditContainer: { marginTop: 8 },
    captionInput: { color: '#fff', fontSize: 16, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: 14, minHeight: 60, textAlignVertical: 'top' },
    captionEditButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 10 },
    captionCancelBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
    captionCancelText: { color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
    captionSaveBtn: { borderRadius: 10, overflow: 'hidden' },
    captionSaveBtnGrad: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: 10 },
    captionSaveText: { color: '#fff', fontWeight: '700' },
    // Stats
    statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    statCard: { flex: 1, borderRadius: 16, padding: 14, alignItems: 'center' },
    statValue: { fontSize: 28, fontWeight: '900', color: '#fff' },
    statLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: '600', marginTop: 2 },
    // Select mode
    selectBar: { backgroundColor: 'rgba(99,102,241,0.15)', borderBottomWidth: 1, borderBottomColor: 'rgba(99,102,241,0.3)', padding: 12 },
    selectBarText: { color: '#a5b4fc', fontSize: 13, fontWeight: '700', marginBottom: 8 },
    selectBarActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    selectAction: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    selectActionDelete: { backgroundColor: 'rgba(255,68,68,0.12)' },
    selectActionText: { color: '#fff', fontSize: 13, fontWeight: '600' },
    selectCancelText: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: '600', paddingVertical: 6 },
    // Grid select
    gridSelectCircle: { position: 'absolute', top: 5, right: 5, width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#fff', backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
    gridSelectCircleActive: { backgroundColor: '#6366f1', borderColor: '#6366f1' },
    gridSelectCheck: { color: '#fff', fontSize: 12, fontWeight: '900' },
    // Location
    detailLocationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 6 },
    detailLocationIcon: { fontSize: 14 },
    detailLocationText: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '600' },
    detailLocationPlaceholder: { color: 'rgba(255,255,255,0.35)', fontSize: 13, fontStyle: 'italic' },
    locationInput: { flex: 1, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, color: '#fff', fontSize: 13 },
    locationSaveBtn: { paddingHorizontal: 8, paddingVertical: 4 },
    // Tags
    detailTagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
    tagChip: { backgroundColor: 'rgba(168,85,247,0.3)', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
    tagChipText: { color: '#e9d5ff', fontSize: 12, fontWeight: '600' },
    tagAddBtn: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
    tagAddBtnText: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
    // Social share
    socialGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginVertical: 12 },
    socialBtn: { width: 90, borderRadius: 16, alignItems: 'center', paddingVertical: 14 },
    socialBtnEmoji: { fontSize: 26, marginBottom: 6 },
    socialBtnLabel: { color: '#fff', fontSize: 12, fontWeight: '700' },
    // Tag picker
    tagGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginVertical: 12 },
    tagGridBtn: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 14, paddingVertical: 10, paddingHorizontal: 12, alignItems: 'center', minWidth: 70 },
    tagGridBtnActive: { backgroundColor: 'rgba(168,85,247,0.35)' },
    tagGridEmoji: { fontSize: 22, marginBottom: 4 },
    tagGridLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '600' },
    tagGridLabelActive: { color: '#e9d5ff' },
});
