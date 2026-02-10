import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Platform, Modal, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing } from '../theme';
import { Trip } from '../types/trip.types';
import { getWeatherForDestination, WeatherData, getWeatherEmoji } from '../services/weather.service';
import { generateChecklistForTrip, toggleChecklistItem, addCustomChecklistItem, ChecklistItem } from '../services/checklist.service';
import { getBudgetForTrip, addExpense, deleteExpense, setTotalBudget, getTotalSpent } from '../services/budget.service';
import { BudgetData, Expense, EXPENSE_CATEGORIES } from '../types/budget.types';
import { findAirport } from '../data/airports-data';

type TabType = 'overview' | 'checklist' | 'timeline' | 'budget';

export default function TripDetailScreen({ route, navigation }: any) {
    const trip: Trip = route.params?.trip;
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItemText, setNewItemText] = useState('');
    const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
    const [showBudgetModal, setShowBudgetModal] = useState(false);
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [newBudgetAmount, setNewBudgetAmount] = useState('');
    const [newExpenseAmount, setNewExpenseAmount] = useState('');
    const [newExpenseDesc, setNewExpenseDesc] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('food');

    // Update current time every second for real-time countdown
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every second for live countdown
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        loadTripData();
        loadBudgetData();
    }, []);

    const loadTripData = async () => {
        if (!trip) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const weatherData = await getWeatherForDestination(trip.destination);
            setWeather(weatherData);
            const checklist = await generateChecklistForTrip(trip);
            setChecklistItems(checklist);
        } catch (error) {
            console.error('Error loading trip data:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadBudgetData = async () => {
        if (!trip) return;
        try {
            const budget = await getBudgetForTrip(trip.id);
            setBudgetData(budget);
        } catch (error) {
            console.error('Error loading budget:', error);
        }
    };

    const handleToggleChecklistItem = async (itemId: string) => {
        // Toggle the item
        await toggleChecklistItem(itemId);
        // Re-get checklist (which now returns the stored one with toggle state preserved)
        const updatedChecklist = await generateChecklistForTrip(trip);
        setChecklistItems(updatedChecklist);
    };

    const handleAddCustomItem = async () => {
        if (!newItemText.trim()) return;

        const newItem = await addCustomChecklistItem(trip.id, newItemText.trim());
        if (newItem) {
            const updatedChecklist = await generateChecklistForTrip(trip);
            setChecklistItems(updatedChecklist);
        }
        setNewItemText('');
        setShowAddModal(false);
    };

    const renderOverviewTab = () => {
        const isFlightTrip = trip.type === 'flight';

        return (
            <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
                {/* Trip Info Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardIcon}>{isFlightTrip ? '✈️' : '🚌'}</Text>
                        <Text style={styles.cardTitle}>Trip Details</Text>
                    </View>

                    <View style={styles.routeContainer}>
                        <View style={styles.routePoint}>
                            <View style={styles.routeDot} />
                            <Text style={styles.routeCity}>{trip.origin}</Text>
                            <Text style={styles.routeTime}>{trip.departureDate} • {trip.departureTime}</Text>
                        </View>
                        <View style={styles.routeLine} />
                        <View style={styles.routePoint}>
                            <View style={[styles.routeDot, styles.routeDotDestination]} />
                            <Text style={styles.routeCity}>{trip.destination}</Text>
                            <Text style={styles.routeTime}>{trip.arrivalDate} • {trip.arrivalTime}</Text>
                        </View>
                    </View>

                    {isFlightTrip && trip.flightNumber && (
                        <View style={styles.infoChip}>
                            <Text style={styles.infoChipLabel}>Flight</Text>
                            <Text style={styles.infoChipValue}>{trip.flightNumber}</Text>
                        </View>
                    )}

                    {!isFlightTrip && trip.busCompany && (
                        <View style={styles.infoChip}>
                            <Text style={styles.infoChipLabel}>Company</Text>
                            <Text style={styles.infoChipValue}>{trip.busCompany}</Text>
                        </View>
                    )}
                </View>



                {/* Airport Maps */}
                {
                    (findAirport(trip.origin) || findAirport(trip.destination)) && (
                        <View style={styles.mapsContainer}>
                            {findAirport(trip.origin) && (
                                <TouchableOpacity
                                    style={styles.mapButton}
                                    onPress={() => navigation.navigate('AirportMaps', { airport: findAirport(trip.origin) })}
                                >
                                    <Text style={styles.mapButtonIcon}>🗺️</Text>
                                    <Text style={styles.mapButtonText}>{findAirport(trip.origin)?.iataCode} Map</Text>
                                </TouchableOpacity>
                            )}
                            {findAirport(trip.destination) && (
                                <TouchableOpacity
                                    style={styles.mapButton}
                                    onPress={() => navigation.navigate('AirportMaps', { airport: findAirport(trip.destination) })}
                                >
                                    <Text style={styles.mapButtonIcon}>🗺️</Text>
                                    <Text style={styles.mapButtonText}>{findAirport(trip.destination)?.iataCode} Map</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )
                }

                {/* Weather Card */}
                {
                    weather && (
                        <View style={styles.weatherCard}>
                            <LinearGradient
                                colors={['#667eea', '#764ba2']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.weatherGradient}
                            >
                                <View style={styles.weatherHeader}>
                                    <Text style={styles.weatherLocation}>📍 {trip.destination}</Text>
                                    <View style={styles.weatherLiveBadge}>
                                        <View style={styles.liveDot} />
                                        <Text style={styles.weatherLiveText}>
                                            {weather.isRealTime ? 'LIVE' : 'CACHED'}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.weatherMain}>
                                    <Text style={styles.weatherEmoji}>{getWeatherEmoji(weather.condition)}</Text>
                                    <View style={styles.weatherTempContainer}>
                                        <Text style={styles.weatherTemp}>{Math.round(weather.temp)}°</Text>
                                        <Text style={styles.weatherUnit}>F</Text>
                                    </View>
                                </View>

                                <Text style={styles.weatherCondition}>{weather.condition}</Text>

                                <View style={styles.weatherDetails}>
                                    <View style={styles.weatherDetailItem}>
                                        <Text style={styles.weatherDetailLabel}>Feels Like</Text>
                                        <Text style={styles.weatherDetailValue}>{Math.round(weather.feelsLike)}°F</Text>
                                    </View>
                                    <View style={styles.weatherDetailDivider} />
                                    <View style={styles.weatherDetailItem}>
                                        <Text style={styles.weatherDetailLabel}>Humidity</Text>
                                        <Text style={styles.weatherDetailValue}>{weather.humidity}%</Text>
                                    </View>
                                    <View style={styles.weatherDetailDivider} />
                                    <View style={styles.weatherDetailItem}>
                                        <Text style={styles.weatherDetailLabel}>Wind</Text>
                                        <Text style={styles.weatherDetailValue}>{Math.round(weather.windSpeed)} mph</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                    )
                }

                {/* Quick Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>✅</Text>
                        <Text style={styles.statValue}>
                            {checklistItems.filter(item => item.completed).length}/{checklistItems.length}
                        </Text>
                        <Text style={styles.statLabel}>Checklist</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>🕐</Text>
                        <Text style={styles.statValue}>{currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</Text>
                        <Text style={styles.statLabel}>Current Time</Text>
                    </View>
                </View>
            </ScrollView >
        );
    };

    const renderChecklistTab = () => {
        const groupedItems: Record<string, ChecklistItem[]> = {};
        checklistItems.forEach(item => {
            if (!groupedItems[item.category]) {
                groupedItems[item.category] = [];
            }
            groupedItems[item.category].push(item);
        });

        const completedCount = checklistItems.filter(item => item.completed).length;
        const totalCount = checklistItems.length;
        const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

        const categoryStyles: Record<string, { colors: string[], icon: string }> = {
            'Pre-Departure (1 Week)': { colors: ['#9b59b6', '#8e44ad'], icon: '📅' },
            'Pre-Departure (3 Days)': { colors: ['#3498db', '#2980b9'], icon: '⏰' },
            'Pre-Departure (1 Day)': { colors: ['#2ecc71', '#27ae60'], icon: '🔔' },
            'Packing': { colors: ['#f39c12', '#d68910'], icon: '🧳' },
            'Travel Day': { colors: ['#e74c3c', '#c0392b'], icon: '🚀' },
            'At Destination': { colors: ['#1abc9c', '#16a085'], icon: '🎯' },
        };

        return (
            <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
                {/* Progress Card */}
                <View style={styles.progressCard}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressTitle}>Your Progress</Text>
                        <Text style={styles.progressPercent}>{Math.round(progressPercent)}%</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
                    </View>
                    <Text style={styles.progressSubtext}>
                        {completedCount} of {totalCount} items completed
                    </Text>
                </View>

                {Object.entries(groupedItems).map(([category, items]) => {
                    const style = categoryStyles[category] || { colors: ['#95a5a6', '#7f8c8d'], icon: '📋' };
                    return (
                        <View key={category} style={styles.categorySection}>
                            <LinearGradient
                                colors={style.colors as [string, string]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.categoryHeader}
                            >
                                <Text style={styles.categoryIcon}>{style.icon}</Text>
                                <Text style={styles.categoryTitle}>{category}</Text>
                                <Text style={styles.categoryCount}>
                                    {items.filter(i => i.completed).length}/{items.length}
                                </Text>
                            </LinearGradient>

                            {items.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[styles.checklistItem, item.completed && styles.checklistItemCompleted]}
                                    onPress={() => handleToggleChecklistItem(item.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
                                        {item.completed && <Text style={styles.checkmark}>✓</Text>}
                                    </View>
                                    <Text style={[styles.checklistText, item.completed && styles.checklistTextCompleted]}>
                                        {item.label}
                                    </Text>
                                    {item.priority === 'high' && !item.completed && (
                                        <View style={styles.priorityBadge}>
                                            <Text style={styles.priorityText}>!</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    );
                })}

                {/* Add Custom Item Button */}
                <TouchableOpacity
                    style={styles.addCustomItemBtn}
                    onPress={() => setShowAddModal(true)}
                >
                    <Text style={styles.addCustomItemIcon}>+</Text>
                    <Text style={styles.addCustomItemText}>Add Custom Item</Text>
                </TouchableOpacity>

                {/* Add Custom Item Modal */}
                <Modal
                    visible={showAddModal}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowAddModal(false)}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.modalOverlay}
                    >
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Add Custom Item</Text>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="Enter item description..."
                                placeholderTextColor="#999"
                                value={newItemText}
                                onChangeText={setNewItemText}
                                autoFocus={true}
                                returnKeyType="done"
                                onSubmitEditing={handleAddCustomItem}
                            />
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.modalCancelBtn}
                                    onPress={() => {
                                        setNewItemText('');
                                        setShowAddModal(false);
                                    }}
                                >
                                    <Text style={styles.modalCancelText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalAddBtn, !newItemText.trim() && styles.modalAddBtnDisabled]}
                                    onPress={handleAddCustomItem}
                                    disabled={!newItemText.trim()}
                                >
                                    <Text style={styles.modalAddText}>Add Item</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>
            </ScrollView>
        );
    };

    const renderTimelineTab = () => {
        const isFlightTrip = trip.type === 'flight';

        // Parse departure and arrival times
        const parseDateTime = (dateStr: string, timeStr: string): Date => {
            // Check if dateStr is valid
            if (!dateStr || !dateStr.includes('/')) {
                const future = new Date();
                future.setMonth(future.getMonth() + 1);
                return future;
            }

            const dateParts = dateStr.split('/').map(Number);
            if (dateParts.length !== 3 || dateParts.some(isNaN)) {
                const future = new Date();
                future.setMonth(future.getMonth() + 1);
                return future;
            }

            const [month, day, yearPart] = dateParts;

            let hours = 12;
            let minutes = 0;

            if (timeStr) {
                // Try 12-hour format first (e.g., "6:17 AM" or "12:30 PM")
                const time12hr = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
                // Try 24-hour format (e.g., "06:17" or "18:30")
                const time24hr = timeStr.match(/^(\d{1,2}):(\d{2})$/);

                if (time12hr) {
                    hours = parseInt(time12hr[1]);
                    minutes = parseInt(time12hr[2]);
                    const meridiem = time12hr[3].toUpperCase();
                    if (meridiem === 'PM' && hours !== 12) hours += 12;
                    if (meridiem === 'AM' && hours === 12) hours = 0;
                } else if (time24hr) {
                    hours = parseInt(time24hr[1]);
                    minutes = parseInt(time24hr[2]);
                }
            }

            // Handle both 2-digit (26) and 4-digit (2026) years
            const year = yearPart < 100 ? 2000 + yearPart : yearPart;

            return new Date(year, month - 1, day, hours, minutes);
        };

        const departureDateTime = parseDateTime(trip.departureDate, trip.departureTime);
        const arrivalDateTime = parseDateTime(trip.arrivalDate, trip.arrivalTime);

        // Build timeline phases
        const phases = [
            {
                id: 'leave-home',
                icon: '🏠',
                title: 'Leave Home',
                time: new Date(departureDateTime.getTime() - (isFlightTrip ? 180 : 90) * 60000),
                detail: 'Start your journey to the terminal'
            },
            {
                id: 'arrive-terminal',
                icon: isFlightTrip ? '🛫' : '🚏',
                title: isFlightTrip ? 'Arrive at Airport' : 'Arrive at Station',
                time: new Date(departureDateTime.getTime() - (isFlightTrip ? 120 : 45) * 60000),
                detail: isFlightTrip ? 'Check-in and drop bags' : 'Find your platform'
            },
            ...(isFlightTrip ? [{
                id: 'security',
                icon: '🔐',
                title: 'Security Checkpoint',
                time: new Date(departureDateTime.getTime() - 90 * 60000),
                detail: 'Clear TSA security screening'
            }] : []),
            {
                id: 'boarding',
                icon: '🎫',
                title: 'Boarding Begins',
                time: new Date(departureDateTime.getTime() - 30 * 60000),
                detail: isFlightTrip ? 'Head to your gate' : 'Board the bus'
            },
            {
                id: 'departure',
                icon: isFlightTrip ? '✈️' : '🚌',
                title: 'Departure',
                time: departureDateTime,
                detail: `Depart from ${trip.origin}`
            },
            {
                id: 'in-transit',
                icon: '🌍',
                title: 'In Transit',
                time: new Date((departureDateTime.getTime() + arrivalDateTime.getTime()) / 2),
                detail: 'Enjoy your journey!'
            },
            {
                id: 'arrival',
                icon: '🎉',
                title: 'Arrival',
                time: arrivalDateTime,
                detail: `Welcome to ${trip.destination}!`
            }
        ];

        const formatTime = (date: Date) => {
            return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        };

        // Determine current phase
        const getCurrentPhaseIndex = () => {
            for (let i = phases.length - 1; i >= 0; i--) {
                if (currentTime >= phases[i].time) return i;
            }
            return -1;
        };
        const currentPhaseIndex = getCurrentPhaseIndex();

        // Get next upcoming phase
        const nextPhase = currentPhaseIndex < phases.length - 1 ? phases[currentPhaseIndex + 1] : null;

        // Calculate countdown to next phase
        const getCountdown = () => {
            if (!nextPhase) return null;
            const diff = nextPhase.time.getTime() - currentTime.getTime();
            if (diff <= 0) return null;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            return { days, hours, minutes, seconds, total: diff };
        };

        const countdown = getCountdown();

        // Calculate overall trip progress
        const getTripProgress = () => {
            const tripStart = phases[0].time.getTime();
            const tripEnd = phases[phases.length - 1].time.getTime();
            const now = currentTime.getTime();

            if (now < tripStart) return 0;
            if (now > tripEnd) return 100;

            return Math.round(((now - tripStart) / (tripEnd - tripStart)) * 100);
        };

        const tripProgress = getTripProgress();

        // Determine trip status
        const getTripStatus = () => {
            if (currentPhaseIndex === -1) return 'upcoming';
            if (currentPhaseIndex === phases.length - 1) return 'completed';
            return 'in-progress';
        };

        const tripStatus = getTripStatus();

        return (
            <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
                {/* Live Status Card */}
                <View style={styles.liveStatusCard}>
                    {tripStatus === 'upcoming' && countdown && (
                        <>
                            <Text style={styles.liveStatusLabel}>⏱️ COUNTDOWN TO DEPARTURE</Text>
                            <View style={styles.countdownContainer}>
                                <View style={styles.countdownBlock}>
                                    <Text style={styles.countdownNumber}>{countdown.days}</Text>
                                    <Text style={styles.countdownUnit}>DAYS</Text>
                                </View>
                                <Text style={styles.countdownSeparator}>:</Text>
                                <View style={styles.countdownBlock}>
                                    <Text style={styles.countdownNumber}>{countdown.hours.toString().padStart(2, '0')}</Text>
                                    <Text style={styles.countdownUnit}>HRS</Text>
                                </View>
                                <Text style={styles.countdownSeparator}>:</Text>
                                <View style={styles.countdownBlock}>
                                    <Text style={styles.countdownNumber}>{countdown.minutes.toString().padStart(2, '0')}</Text>
                                    <Text style={styles.countdownUnit}>MIN</Text>
                                </View>
                                <Text style={styles.countdownSeparator}>:</Text>
                                <View style={styles.countdownBlock}>
                                    <Text style={styles.countdownNumber}>{countdown.seconds.toString().padStart(2, '0')}</Text>
                                    <Text style={styles.countdownUnit}>SEC</Text>
                                </View>
                            </View>
                            <Text style={styles.nextPhaseText}>
                                Next: {nextPhase!.icon} {nextPhase!.title} at {formatTime(nextPhase!.time)}
                            </Text>
                        </>
                    )}
                    {tripStatus === 'in-progress' && (
                        <>
                            <Text style={styles.liveStatusLabel}>🔴 LIVE - TRIP IN PROGRESS</Text>
                            <View style={styles.progressContainer}>
                                <View style={styles.progressBarBackground}>
                                    <View style={[styles.progressBarForeground, { width: `${tripProgress}%` }]} />
                                </View>
                                <Text style={styles.progressText}>{tripProgress}% Complete</Text>
                            </View>
                            {nextPhase && countdown && (
                                <Text style={styles.nextPhaseText}>
                                    Next: {nextPhase.icon} {nextPhase.title} in {countdown.hours}h {countdown.minutes}m
                                </Text>
                            )}
                        </>
                    )}
                    {tripStatus === 'completed' && (
                        <>
                            <Text style={styles.liveStatusLabel}>✅ TRIP COMPLETED</Text>
                            <Text style={styles.completedText}>
                                You've arrived at {trip.destination}!
                            </Text>
                        </>
                    )}
                </View>

                {/* Current Time Badge */}
                <View style={styles.timelineHeader}>
                    <Text style={styles.timelineTitle}>Journey Timeline</Text>
                    <View style={styles.currentTimeBadge}>
                        <Text style={styles.currentTimeText}>
                            🕐 {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })}
                        </Text>
                    </View>
                </View>

                <View style={styles.timeline}>
                    {phases.map((phase, index) => {
                        const isPast = index < currentPhaseIndex;
                        const isCurrent = index === currentPhaseIndex;
                        const isFuture = index > currentPhaseIndex;
                        const isNext = index === currentPhaseIndex + 1;

                        // Calculate time until this phase
                        const timeUntilPhase = phase.time.getTime() - currentTime.getTime();
                        const showMiniCountdown = isFuture && timeUntilPhase < 24 * 60 * 60 * 1000; // Show for phases within 24h

                        return (
                            <View key={phase.id}>
                                <View style={styles.timelineItem}>
                                    <View style={styles.timelineLeft}>
                                        <View style={[
                                            styles.timelineDot,
                                            isPast && styles.timelineDotPast,
                                            isCurrent && styles.timelineDotCurrent,
                                            isFuture && styles.timelineDotFuture,
                                            isNext && styles.timelineDotNext
                                        ]}>
                                            <Text style={styles.timelineIcon}>{phase.icon}</Text>
                                        </View>
                                        {index < phases.length - 1 && (
                                            <View style={[
                                                styles.timelineConnector,
                                                isPast && styles.timelineConnectorPast
                                            ]} />
                                        )}
                                    </View>
                                    <View style={[
                                        styles.timelineCard,
                                        isCurrent && styles.timelineCardCurrent,
                                        isNext && styles.timelineCardNext
                                    ]}>
                                        {isCurrent && (
                                            <View style={styles.youAreHereBadge}>
                                                <Text style={styles.youAreHereText}>📍 YOU'RE HERE</Text>
                                            </View>
                                        )}
                                        {isNext && showMiniCountdown && countdown && (
                                            <View style={styles.upNextBadge}>
                                                <Text style={styles.upNextText}>
                                                    ⏰ IN {countdown.hours > 0 ? `${countdown.hours}h ` : ''}{countdown.minutes}m {countdown.seconds}s
                                                </Text>
                                            </View>
                                        )}
                                        <Text style={styles.timelineCardTime}>{formatTime(phase.time)}</Text>
                                        <Text style={[
                                            styles.timelineCardTitle,
                                            isPast && styles.timelineTextPast
                                        ]}>{phase.title}</Text>
                                        <Text style={[
                                            styles.timelineCardDetail,
                                            isPast && styles.timelineTextPast
                                        ]}>{phase.detail}</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        );
    };

    const renderBudgetTab = () => {
        if (!budgetData) return null;

        const totalSpent = getTotalSpent(budgetData.expenses);
        const remaining = budgetData.totalBudget - totalSpent;
        const percentSpent = budgetData.totalBudget > 0 ? (totalSpent / budgetData.totalBudget) * 100 : 0;

        const handleSetBudget = async () => {
            const amount = parseFloat(newBudgetAmount);
            if (isNaN(amount) || amount <= 0) {
                Alert.alert('Invalid Amount', 'Please enter a valid budget amount');
                return;
            }
            await setTotalBudget(trip.id, amount);
            await loadBudgetData();
            setShowBudgetModal(false);
            setNewBudgetAmount('');
        };

        const handleAddExpense = async () => {
            const amount = parseFloat(newExpenseAmount);
            if (isNaN(amount) || amount <= 0) {
                Alert.alert('Invalid Amount', 'Please enter a valid expense amount');
                return;
            }
            if (!newExpenseDesc.trim()) {
                Alert.alert('Missing Description', 'Please enter an expense description');
                return;
            }
            await addExpense(trip.id, {
                category: selectedCategory as any,
                amount,
                description: newExpenseDesc,
                date: new Date().toISOString(),
            });
            await loadBudgetData();
            setShowExpenseModal(false);
            setNewExpenseAmount('');
            setNewExpenseDesc('');
            setSelectedCategory('food');
        };

        const handleDeleteExpense = async (expenseId: string) => {
            Alert.alert(
                'Delete Expense',
                'Are you sure you want to delete this expense?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: async () => {
                            await deleteExpense(trip.id, expenseId);
                            await loadBudgetData();
                        },
                    },
                ]
            );
        };

        return (
            <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
                {/* Budget Summary Card */}
                <View style={styles.budgetSummaryCard}>
                    <View style={styles.budgetHeader}>
                        <Text style={styles.budgetTitle}>💰 Trip Budget</Text>
                        <TouchableOpacity
                            style={styles.setBudgetButton}
                            onPress={() => setShowBudgetModal(true)}
                        >
                            <Text style={styles.setBudgetButtonText}>
                                {budgetData.totalBudget > 0 ? 'Edit' : 'Set Budget'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {budgetData.totalBudget > 0 && (
                        <>
                            <View style={styles.budgetAmounts}>
                                <View style={styles.budgetAmountRow}>
                                    <Text style={styles.budgetLabel}>Total Budget:</Text>
                                    <Text style={styles.budgetAmount}>${budgetData.totalBudget.toFixed(2)}</Text>
                                </View>
                                <View style={styles.budgetAmountRow}>
                                    <Text style={styles.budgetLabel}>Spent:</Text>
                                    <Text style={[styles.budgetAmount, styles.spentAmount]}>
                                        ${totalSpent.toFixed(2)}
                                    </Text>
                                </View>
                                <View style={[styles.budgetAmountRow, styles.remainingRow]}>
                                    <Text style={styles.budgetLabelBold}>Remaining:</Text>
                                    <Text style={[
                                        styles.budgetAmountBold,
                                        remaining < 0 ? styles.overBudget : styles.underBudget
                                    ]}>
                                        ${remaining.toFixed(2)}
                                    </Text>
                                </View>
                            </View>

                            {/* Progress Bar */}
                            <View style={styles.budgetProgressContainer}>
                                <View style={styles.budgetProgressBar}>
                                    <View style={[
                                        styles.budgetProgressFill,
                                        { width: `${Math.min(percentSpent, 100)}%` },
                                        percentSpent > 100 && styles.budgetProgressOver
                                    ]} />
                                </View>
                                <Text style={styles.budgetProgressText}>
                                    {percentSpent.toFixed(0)}% used
                                </Text>
                            </View>
                        </>
                    )}
                </View>

                {/* Expenses List */}
                <View style={styles.expensesSection}>
                    <View style={styles.expensesHeader}>
                        <Text style={styles.expensesTitle}>📊 Expenses</Text>
                        <TouchableOpacity
                            style={styles.addExpenseButton}
                            onPress={() => setShowExpenseModal(true)}
                        >
                            <Text style={styles.addExpenseButtonText}>+ Add Expense</Text>
                        </TouchableOpacity>
                    </View>

                    {budgetData.expenses.length === 0 ? (
                        <View style={styles.emptyExpenses}>
                            <Text style={styles.emptyExpensesText}>No expenses yet</Text>
                            <Text style={styles.emptyExpensesSubtext}>Tap "+ Add Expense" to start tracking</Text>
                        </View>
                    ) : (
                        budgetData.expenses.map((expense) => {
                            const category = EXPENSE_CATEGORIES.find(c => c.id === expense.category);
                            return (
                                <View key={expense.id} style={styles.expenseCard}>
                                    <View style={styles.expenseLeft}>
                                        <View style={[styles.expenseIconContainer, { backgroundColor: category?.color + '20' }]}>
                                            <Text style={styles.expenseIcon}>{category?.icon}</Text>
                                        </View>
                                        <View style={styles.expenseDetails}>
                                            <Text style={styles.expenseDescription}>{expense.description}</Text>
                                            <Text style={styles.expenseCategory}>{category?.label}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.expenseRight}>
                                        <Text style={styles.expenseAmount}>${expense.amount.toFixed(2)}</Text>
                                        <TouchableOpacity
                                            onPress={() => handleDeleteExpense(expense.id)}
                                            style={styles.deleteExpenseButton}
                                        >
                                            <Text style={styles.deleteExpenseText}>🗑️</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })
                    )}
                </View>

                {/* Set Budget Modal */}
                <Modal
                    visible={showBudgetModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowBudgetModal(false)}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.modalOverlay}
                    >
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Set Trip Budget</Text>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="Enter amount (e.g., 1000)"
                                keyboardType="decimal-pad"
                                value={newBudgetAmount}
                                onChangeText={setNewBudgetAmount}
                            />
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalButtonCancel]}
                                    onPress={() => {
                                        setShowBudgetModal(false);
                                        setNewBudgetAmount('');
                                    }}
                                >
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalButtonConfirm]}
                                    onPress={handleSetBudget}
                                >
                                    <Text style={[styles.modalButtonText, styles.modalButtonTextConfirm]}>
                                        Set Budget
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>

                {/* Add Expense Modal */}
                <Modal
                    visible={showExpenseModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowExpenseModal(false)}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.modalOverlay}
                    >
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Add Expense</Text>

                            {/* Category Selection */}
                            <Text style={styles.modalLabel}>Category</Text>
                            <View style={styles.categoryGrid}>
                                {EXPENSE_CATEGORIES.map((cat) => (
                                    <TouchableOpacity
                                        key={cat.id}
                                        style={[
                                            styles.categoryButton,
                                            selectedCategory === cat.id && styles.categoryButtonActive,
                                            { borderColor: cat.color }
                                        ]}
                                        onPress={() => setSelectedCategory(cat.id)}
                                    >
                                        <Text style={styles.categoryIcon}>{cat.icon}</Text>
                                        <Text style={styles.categoryLabel}>{cat.label.split(' &')[0]}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.modalLabel}>Amount</Text>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="0.00"
                                keyboardType="decimal-pad"
                                value={newExpenseAmount}
                                onChangeText={setNewExpenseAmount}
                            />

                            <Text style={styles.modalLabel}>Description</Text>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="What did you buy?"
                                value={newExpenseDesc}
                                onChangeText={setNewExpenseDesc}
                            />

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalButtonCancel]}
                                    onPress={() => {
                                        setShowExpenseModal(false);
                                        setNewExpenseAmount('');
                                        setNewExpenseDesc('');
                                        setSelectedCategory('food');
                                    }}
                                >
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalButtonConfirm]}
                                    onPress={handleAddExpense}
                                >
                                    <Text style={[styles.modalButtonText, styles.modalButtonTextConfirm]}>
                                        Add Expense
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>
            </ScrollView>
        );
    };

    if (!trip) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Trip not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={['#1e3c72', '#2a5298']}
                style={styles.header}
            >
                <Text style={styles.headerDestination}>{trip.destination}</Text>
                <Text style={styles.headerDate}>{trip.departureDate}</Text>
            </LinearGradient>

            {/* Tab Bar */}
            <View style={styles.tabBar}>
                {(['overview', 'checklist', 'timeline', 'budget'] as TabType[]).map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.tabActive]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                            {tab === 'overview' ? '📋 Overview' : tab === 'checklist' ? '✅ Checklist' : tab === 'timeline' ? '🕐 Timeline' : '💰 Budget'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Content */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#1e3c72" />
                    <Text style={styles.loadingText}>Loading trip data...</Text>
                </View>
            ) : (
                <>
                    {activeTab === 'overview' && renderOverviewTab()}
                    {activeTab === 'checklist' && renderChecklistTab()}
                    {activeTab === 'timeline' && renderTimelineTab()}
                    {activeTab === 'budget' && renderBudgetTab()}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    headerDestination: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerDate: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 4,
    },
    tabActive: {
        backgroundColor: '#e8f0fe',
    },
    tabText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
    },
    tabTextActive: {
        color: '#1e3c72',
    },
    tabContent: {
        flex: 1,
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        color: '#666',
        fontSize: 14,
    },
    errorText: {
        fontSize: 16,
        color: '#e74c3c',
        textAlign: 'center',
        marginTop: 40,
    },
    // Cards
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
            android: { elevation: 4 },
        }),
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a2e',
    },
    routeContainer: {
        marginTop: 8,
    },
    routePoint: {
        paddingLeft: 20,
    },
    routeDot: {
        position: 'absolute',
        left: 0,
        top: 4,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#3498db',
    },
    routeDotDestination: {
        backgroundColor: '#e74c3c',
    },
    routeCity: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a2e',
    },
    routeTime: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    routeLine: {
        width: 2,
        height: 30,
        backgroundColor: '#ddd',
        marginLeft: 5,
        marginVertical: 8,
    },
    infoChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        marginTop: 16,
        alignSelf: 'flex-start',
    },
    infoChipLabel: {
        fontSize: 12,
        color: '#666',
        marginRight: 8,
    },
    infoChipValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a2e',
    },
    // Weather Card
    weatherCard: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
    },
    weatherGradient: {
        padding: 20,
    },
    weatherHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    weatherLocation: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '500',
    },
    weatherLiveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#2ecc71',
        marginRight: 6,
    },
    weatherLiveText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#fff',
    },
    weatherMain: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    weatherEmoji: {
        fontSize: 64,
        marginRight: 16,
    },
    weatherTempContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    weatherTemp: {
        fontSize: 56,
        fontWeight: '200',
        color: '#fff',
    },
    weatherUnit: {
        fontSize: 24,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 8,
    },
    weatherCondition: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',
        marginBottom: 16,
    },
    weatherDetails: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 12,
        padding: 12,
    },
    weatherDetailItem: {
        flex: 1,
        alignItems: 'center',
    },
    weatherDetailDivider: {
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    weatherDetailLabel: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 4,
    },
    weatherDetailValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    // Stats
    statsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
            android: { elevation: 3 },
        }),
    },
    statIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a2e',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    // Checklist
    progressCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
            android: { elevation: 4 },
        }),
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a2e',
    },
    progressPercent: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2ecc71',
    },
    progressBarBg: {
        height: 8,
        backgroundColor: '#e9ecef',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#2ecc71',
        borderRadius: 4,
    },
    progressSubtext: {
        fontSize: 13,
        color: '#666',
        marginTop: 8,
    },
    categorySection: {
        marginBottom: 16,
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 12,
        marginBottom: 8,
    },
    categoryIcon: {
        fontSize: 20,
        marginRight: 10,
    },
    categoryTitle: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    categoryCount: {
        fontSize: 13,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.8)',
    },
    checklistItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        marginBottom: 6,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
            android: { elevation: 2 },
        }),
    },
    checklistItemCompleted: {
        opacity: 0.7,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ccc',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#2ecc71',
        borderColor: '#2ecc71',
    },
    checkmark: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    checklistText: {
        flex: 1,
        fontSize: 14,
        color: '#1a1a2e',
    },
    checklistTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    priorityBadge: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#e74c3c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    priorityText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    // Timeline
    timelineHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    timelineTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a2e',
    },
    currentTimeBadge: {
        backgroundColor: '#e8f0fe',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    currentTimeText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1e3c72',
    },
    timeline: {
        paddingLeft: 8,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 0,
    },
    timelineLeft: {
        alignItems: 'center',
        width: 50,
    },
    timelineDot: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#e9ecef',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    timelineDotPast: {
        backgroundColor: '#d4edda',
    },
    timelineDotCurrent: {
        backgroundColor: '#fff3cd',
        borderWidth: 3,
        borderColor: '#ffc107',
    },
    timelineDotFuture: {
        backgroundColor: '#e9ecef',
    },
    timelineIcon: {
        fontSize: 20,
    },
    timelineConnector: {
        width: 3,
        height: 60,
        backgroundColor: '#e0e0e0',
        marginTop: -2,
    },
    timelineConnectorPast: {
        backgroundColor: '#2ecc71',
    },
    timelineCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        marginLeft: 12,
        marginBottom: 12,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4 },
            android: { elevation: 2 },
        }),
    },
    timelineCardCurrent: {
        borderWidth: 2,
        borderColor: '#ffc107',
        backgroundColor: '#fffef0',
    },
    youAreHereBadge: {
        backgroundColor: '#ffc107',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    youAreHereText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#1a1a2e',
    },
    timelineCardTime: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    timelineCardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a2e',
        marginBottom: 4,
    },
    timelineCardDetail: {
        fontSize: 13,
        color: '#666',
    },
    timelineTextPast: {
        color: '#999',
    },
    timelineDotNext: {
        backgroundColor: '#e3f2fd',
        borderWidth: 2,
        borderColor: '#2196f3',
    },
    timelineCardNext: {
        borderWidth: 1,
        borderColor: '#2196f3',
        backgroundColor: '#f8fbff',
    },
    upNextBadge: {
        backgroundColor: '#2196f3',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    upNextText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#fff',
    },
    // Live Status Card
    liveStatusCard: {
        backgroundColor: '#1e3c72',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    liveStatusLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#fff',
        opacity: 0.9,
        marginBottom: 12,
        letterSpacing: 1,
    },
    countdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    countdownBlock: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        minWidth: 55,
    },
    countdownNumber: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
    },
    countdownUnit: {
        fontSize: 9,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.7)',
        marginTop: 2,
        letterSpacing: 0.5,
    },
    countdownSeparator: {
        fontSize: 24,
        fontWeight: '300',
        color: 'rgba(255,255,255,0.5)',
        marginHorizontal: 6,
    },
    nextPhaseText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        fontWeight: '500',
    },
    progressContainer: {
        width: '100%',
        marginBottom: 12,
    },
    progressBarBackground: {
        height: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressBarForeground: {
        height: '100%',
        backgroundColor: '#2ecc71',
        borderRadius: 5,
    },
    progressText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
    },
    completedText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.9)',
        marginTop: 8,
    },
    // Custom checklist item styles
    addCustomItemBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e3c72',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
        marginBottom: 24,
    },
    addCustomItemIcon: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 8,
    },
    addCustomItemText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a2e',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        backgroundColor: '#f8f9fb',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalCancelBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
        marginRight: 8,
        alignItems: 'center',
    },
    modalCancelText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    modalAddBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#1e3c72',
        marginLeft: 8,
        alignItems: 'center',
    },
    modalAddBtnDisabled: {
        backgroundColor: '#ccc',
    },
    modalAddText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    // Budget Tab Styles
    budgetSummaryCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        margin: 16,
        marginTop: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    budgetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    budgetTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    setBudgetButton: {
        backgroundColor: '#1e3c72',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    setBudgetButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    budgetAmounts: {
        marginTop: 8,
    },
    budgetAmountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    remainingRow: {
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
        paddingTop: 12,
        marginTop: 4,
    },
    budgetLabel: {
        fontSize: 16,
        color: '#666',
    },
    budgetLabelBold: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    budgetAmount: {
        fontSize: 16,
        color: '#1a1a1a',
    },
    spentAmount: {
        color: '#ff6b6b',
    },
    budgetAmountBold: {
        fontSize: 18,
        fontWeight: '700',
    },
    underBudget: {
        color: '#51cf66',
    },
    overBudget: {
        color: '#ff4444',
    },
    budgetProgressContainer: {
        marginTop: 16,
    },
    budgetProgressBar: {
        height: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
        overflow: 'hidden',
    },
    budgetProgressFill: {
        height: '100%',
        backgroundColor: '#1e3c72',
        borderRadius: 6,
    },
    budgetProgressOver: {
        backgroundColor: '#ff4444',
    },
    budgetProgressText: {
        textAlign: 'center',
        marginTop: 8,
        fontSize: 14,
        color: '#666',
    },
    expensesSection: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    expensesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    expensesTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    addExpenseButton: {
        backgroundColor: '#51cf66',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    addExpenseButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    emptyExpenses: {
        backgroundColor: '#f8f9fa',
        padding: 32,
        borderRadius: 16,
        alignItems: 'center',
    },
    emptyExpensesText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginBottom: 4,
    },
    emptyExpensesSubtext: {
        fontSize: 14,
        color: '#999',
    },
    expenseCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    expenseLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    expenseIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    expenseIcon: {
        fontSize: 24,
    },
    expenseDetails: {
        flex: 1,
    },
    expenseDescription: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    expenseCategory: {
        fontSize: 14,
        color: '#999',
    },
    expenseRight: {
        alignItems: 'flex-end',
    },
    expenseAmount: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e3c72',
        marginBottom: 4,
    },
    deleteExpenseButton: {
        padding: 4,
    },
    deleteExpenseText: {
        fontSize: 18,
    },
    modalLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
        marginTop: 16,
    },
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 8,
    },
    categoryButton: {
        width: '30%',
        aspectRatio: 1,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
    },
    categoryButtonActive: {
        backgroundColor: '#fff',
        borderWidth: 3,
    },
    categoryIcon: {
        fontSize: 28,
        marginBottom: 4,
    },
    categoryLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalButtonCancel: {
        backgroundColor: '#f0f0f0',
        marginRight: 8,
    },
    modalButtonConfirm: {
        backgroundColor: '#1e3c72',
        marginLeft: 8,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    modalButtonTextConfirm: {
        color: '#fff',
    },
    mapsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    mapButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    mapButtonIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    mapButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
    },
});

