import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Image, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';
import { BusServiceClass } from '../types/trip.types';
import { getBusModelData, getBusClassAmenities, BusClassAmenities } from '../data/bus-models.data';
import { getCompanyModels } from '../data/company-fleet-mapping';
import { normalizeModelName } from '../data/model-aliases';
import { getBusPhotos } from '../data/bus-photos';

interface RouteParams {
    trip: any;
}

export default function BusAmenitiesScreen({ route, navigation }: any) {
    const { trip } = route.params as RouteParams;

    // State for fullscreen image modal
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    // State for selected bus model tab
    const [selectedModelIndex, setSelectedModelIndex] = useState(0);

    // Get all possible buses for this company
    const companyName = trip.busCompany || '';
    const possibleModels = getCompanyModels(companyName);
    const showMultipleBuses = possibleModels.length > 1;

    // Use selected model from tabs, or trip's model, or first possible model
    const displayModelName = showMultipleBuses && possibleModels[selectedModelIndex]
        ? possibleModels[selectedModelIndex]
        : trip.busModel || possibleModels[0] || 'Mercedes-Benz LO-916';

    // Normalize the model name to match database keys
    const busModel = normalizeModelName(displayModelName);
    const serviceClass: BusServiceClass = trip.busServiceClass || 'economy';

    const bus = getBusModelData(busModel);
    const amenities = getBusClassAmenities(busModel, serviceClass);

    // Determine if this is a Double Decker bus (for feature filtering)
    const isDoubleDecker = bus ? /double decker|\bDD\b/i.test(bus.variant) : false;

    if (!bus || !amenities) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Bus information not available</Text>
            </View>
        );
    }

    // Get photos for this bus model (if available)
    const busPhotoSet = getBusPhotos(busModel);
    const shouldShowPhotos = !!busPhotoSet;
    const photos = busPhotoSet?.photos || [];
    const photoCredits = busPhotoSet?.credits || '';

    const serviceClassNames: Record<BusServiceClass, string> = {
        'economy': 'Economy Class',
        'standard': 'Standard Class',
        'ejecutivo': 'Ejecutivo Class',
        'lujo': 'Lujo/Platino Class'
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={['#1e3c72', '#2a5298']}
                style={styles.header}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>🚌 Bus Amenities</Text>
                <Text style={styles.headerSubtitle}>
                    {displayModelName}
                </Text>
                <Text style={styles.serviceClassBadge}>
                    {serviceClassNames[serviceClass]}
                </Text>
            </LinearGradient>

            {/* Bus Model Tabs - Only show if company has multiple possible buses */}
            {showMultipleBuses && (
                <View style={styles.tabsContainer}>
                    <Text style={styles.tabsLabel}>Possible Buses for {companyName}:</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.tabsContent}
                    >
                        {possibleModels.map((model, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.tabButton,
                                    selectedModelIndex === index && styles.tabButtonActive
                                ]}
                                onPress={() => setSelectedModelIndex(index)}
                                activeOpacity={0.7}
                            >
                                <Text style={[
                                    styles.tabButtonText,
                                    selectedModelIndex === index && styles.tabButtonTextActive
                                ]}>
                                    {model}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Disclaimer */}
                <View style={styles.disclaimerBanner}>
                    <Text style={styles.disclaimerIcon}>ℹ️</Text>
                    <Text style={styles.disclaimerText}>
                        Amenities shown are typical for this bus model and service class.
                        Actual configurations may vary by specific bus, route, or recent upgrades.
                    </Text>
                </View>

                {/* Bus & Service Class Info */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Bus Information</Text>
                    <InfoRow label="Service Class" value={serviceClassNames[serviceClass]} />
                    {bus.commonOperators && bus.commonOperators.length > 0 && (
                        <View style={styles.operatorsSection}>
                            <Text style={styles.operatorsLabel}>Common Operators:</Text>
                            <Text style={styles.operatorsValue}>{bus.commonOperators.join(', ')}</Text>
                        </View>
                    )}
                </View>

                {/* Seating */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>🪑 Seating</Text>
                    <InfoRow label="Seat Type" value={amenities.seatType} />
                    <InfoRow label="Configuration" value={amenities.seatConfiguration} />
                    <InfoRow label="Seat Pitch" value={amenities.seatPitch} />
                    <InfoRow label="Recline" value={amenities.recline} />
                </View>

                {/* Features */}
                {amenities.features.length > 0 && (() => {
                    // Filter out panoramic/upper deck views and leather seats for non-DD buses
                    const filteredFeatures = isDoubleDecker
                        ? amenities.features
                        : amenities.features.filter(f => {
                            const lower = f.toLowerCase();
                            if (lower.includes('panoramic') || lower.includes('upper deck')) return false;
                            if (lower.includes('leather seat')) return false;
                            return true;
                        });
                    return filteredFeatures.length > 0 ? (
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>✨ Features</Text>
                            {filteredFeatures.map((feature, index) => (
                                <BulletItem key={index} text={feature} />
                            ))}
                        </View>
                    ) : null;
                })()}

                {/* Entertainment */}
                {amenities.entertainment.length > 0 && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>📺 Entertainment</Text>
                        {amenities.entertainment.map((item, index) => (
                            <BulletItem key={index} text={item} />
                        ))}
                    </View>
                )}

                {/* Power & Charging */}
                {amenities.power.length > 0 && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>⚡ Power & Charging</Text>
                        {amenities.power.map((item, index) => (
                            <BulletItem key={index} text={item} />
                        ))}
                    </View>
                )}

                {/* Food & Beverages */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>🍽️ Food & Beverages</Text>

                    {amenities.food.length > 0 && (
                        <View style={styles.subSection}>
                            <Text style={styles.subTitle}>Food:</Text>
                            {amenities.food.map((item, index) => (
                                <BulletItem key={index} text={item} />
                            ))}
                        </View>
                    )}

                    {amenities.beverages.length > 0 && (
                        <View style={styles.subSection}>
                            <Text style={styles.subTitle}>Beverages:</Text>
                            {amenities.beverages.map((item, index) => (
                                <BulletItem key={index} text={item} />
                            ))}
                        </View>
                    )}
                </View>

                {/* Extras */}
                {amenities.extras.length > 0 && (() => {
                    // Only ADO Platino shows blanket & pillow
                    const isAdoPlatino = companyName.toLowerCase().includes('ado platino');
                    const filteredExtras = amenities.extras.filter(e => {
                        const lower = e.toLowerCase();
                        if (!isAdoPlatino && (lower.includes('blanket') || lower.includes('pillow'))) return false;
                        return true;
                    });
                    return filteredExtras.length > 0 ? (
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>🎁 Extras & Perks</Text>
                            {filteredExtras.map((item, index) => (
                                <BulletItem key={index} text={item} />
                            ))}
                        </View>
                    ) : null;
                })()}

                {/* Photo Gallery - Dynamic for any bus model */}
                {shouldShowPhotos && (
                    <View style={styles.photoGallerySection}>
                        <Text style={styles.galleryTitle}>📸 Interior Photos</Text>
                        <Text style={styles.gallerySubtitle}>{displayModelName}</Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.photoGallery}
                            contentContainerStyle={styles.photoGalleryContent}
                        >
                            {photos.map((photo, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.photoFrame}
                                    onPress={() => setSelectedImageIndex(index)}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={photo}
                                        style={styles.photo}
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Photo Credits */}
                        {photoCredits && (
                            <Text style={styles.photoCredits}>{photoCredits}</Text>
                        )}
                    </View>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Fullscreen Image Modal with Zoom */}
            <Modal
                visible={selectedImageIndex !== null}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setSelectedImageIndex(null)}
            >
                <View style={styles.modalContainer}>
                    <ScrollView
                        contentContainerStyle={styles.zoomContainer}
                        maximumZoomScale={3}
                        minimumZoomScale={1}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        {selectedImageIndex !== null && photos[selectedImageIndex] && (
                            <Image
                                source={photos[selectedImageIndex]}
                                style={styles.fullscreenImage}
                                resizeMode="contain"
                            />
                        )}
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setSelectedImageIndex(null)}
                    >
                        <Text style={styles.closeButtonText}>✕ Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}:</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const BulletItem = ({ text }: { text: string }) => (
    <View style={styles.bulletItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 24,
        paddingHorizontal: 20,
    },
    backButton: {
        marginBottom: 12,
    },
    backButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 6,
    },
    headerSubtitle: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.95)',
        marginBottom: 8,
    },
    serviceClassBadge: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
    },
    disclaimerBanner: {
        flexDirection: 'row',
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 16,
        paddingVertical: 12,
        margin: 16,
        marginBottom: 8,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#F59E0B',
    },
    disclaimerIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    disclaimerText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 18,
        color: '#92400E',
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        borderRadius: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    infoLabel: {
        fontSize: 15,
        color: '#666',
        width: 120,
        fontWeight: '600',
    },
    infoValue: {
        flex: 1,
        fontSize: 15,
        color: '#333',
    },
    operatorsSection: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    operatorsLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 6,
    },
    operatorsValue: {
        fontSize: 14,
        lineHeight: 20,
        color: '#3B82F6',
    },
    subSection: {
        marginTop: 8,
    },
    subTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#555',
        marginBottom: 6,
    },
    bulletItem: {
        flexDirection: 'row',
        paddingVertical: 4,
        paddingLeft: 8,
    },
    bullet: {
        fontSize: 16,
        color: '#3B82F6',
        marginRight: 8,
        marginTop: 2,
    },
    bulletText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
        color: '#444',
    },
    errorText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 40,
    },
    // Photo Gallery Styles
    photoGallerySection: {
        marginTop: 24,
        marginBottom: 16,
    },
    galleryTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1e3c72',
        marginBottom: 4,
        paddingHorizontal: 20,
    },
    gallerySubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    photoGallery: {
        marginTop: 8,
    },
    photoGalleryContent: {
        paddingHorizontal: 16,
        gap: 12,
    },
    photoFrame: {
        width: 280,
        height: 200,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
        borderWidth: 3,
        borderColor: '#fff',
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    photoCredits: {
        fontSize: 11,
        color: '#888',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 12,
        paddingHorizontal: 20,
    },
    // Fullscreen Modal Styles
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoomContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '100%',
        minHeight: '100%',
    },
    fullscreenImage: {
        width: '100%',
        height: '80%',
    },
    closeButton: {
        position: 'absolute',
        top: 60,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    // Tab Selector Styles
    tabsContainer: {
        backgroundColor: '#f5f7fa',
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    tabsLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
        marginBottom: 10,
        paddingHorizontal: 12,
    },
    tabsContent: {
        paddingHorizontal: 8,
        gap: 10,
    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#d0d0d0',
        minWidth: 120,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tabButtonActive: {
        backgroundColor: '#1e3c72',
        borderColor: '#1e3c72',
    },
    tabButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#555',
        textAlign: 'center',
    },
    tabButtonTextActive: {
        color: '#fff',
    },
});
