import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarryBackground from '../components/StarryBackground';
import { AIRPORTS, Airport } from '../data/airports-data';
import { Modal, FlatList, TextInput } from 'react-native';
import { useState } from 'react';

export default function CompanionScreen({ navigation }: any) {
    const [showAirportModal, setShowAirportModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleARLuggage = () => {
        navigation.navigate('ARLuggage');
    };

    const handlePhotoJournal = () => {
        navigation.navigate('PhotoJournal');
    };

    const handleAirportMaps = () => {
        setShowAirportModal(true);
    };

    const filteredAirports = AIRPORTS.filter(airport =>
        airport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airport.iataCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airport.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDocumentVault = () => {
        navigation.navigate('DocumentVault');
    };

    const handleTSASearch = () => {
        navigation.navigate('TSASearch');
    };

    const renderFeatureCard = (
        icon: string,
        title: string,
        description: string,
        buttonText: string,
        onPress: () => void,
        comingSoon: boolean = false
    ) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardIcon}>{icon}</Text>
                <Text style={styles.cardTitle}>{title}</Text>
                {!comingSoon && <Text style={styles.sparkle}>✨</Text>}
            </View>
            <Text style={styles.cardDescription}>{description}</Text>

            {/* Button */}
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={onPress}
                disabled={comingSoon}
                activeOpacity={0.8}
            >
                {comingSoon ? (
                    <View style={styles.disabledButton}>
                        <Text style={styles.disabledButtonText}>{buttonText}</Text>
                    </View>
                ) : (
                    <LinearGradient
                        colors={['#6b5fcc', '#7c6fdd', '#6b5fcc']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.buttonText}>{buttonText}</Text>
                    </LinearGradient>
                )}
            </TouchableOpacity>
        </View>
    );

    return (
        <StarryBackground>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>🎒 Travel Companion</Text>
                    <Text style={styles.headerSubtitle}>Smart tools for better travel</Text>
                </View>

                <ScrollView
                    style={styles.content}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {renderFeatureCard(
                        '📦',
                        'AR Luggage Scanner',
                        'Measure bag dimensions and estimate weight using your camera. Never worry about size limits again!',
                        'Try AR Scanner',
                        handleARLuggage
                    )}

                    {renderFeatureCard(
                        '📷',
                        'Photo Journal',
                        'AI-powered captions, organized timeline, and shareable highlight reels of your adventures.',
                        'Try Photo Journal',
                        handlePhotoJournal
                    )}

                    {renderFeatureCard(
                        '🗺️',
                        'Airport Maps & Guide',
                        'Find restaurants, lounges, WiFi hotspots, power outlets, and more with interactive airport maps.',
                        'Explore Maps',
                        handleAirportMaps,
                        false
                    )}

                    {renderFeatureCard(
                        '🔍',
                        'Can I Bring This?',
                        'Search TSA guidelines to quickly find out if items are allowed in carry-on or checked baggage.',
                        'Search Items →',
                        handleTSASearch
                    )}

                    {renderFeatureCard(
                        '🛂',
                        'Document Vault',
                        'Securely store your passport photos, visa PDFs, insurance documents, hotel confirmations, and more.',
                        'Open Vault',
                        handleDocumentVault
                    )}

                    {/* Bottom spacing */}
                    <View style={{ height: 40 }} />
                </ScrollView>

                {/* Airport Selection Modal */}
                <Modal
                    visible={showAirportModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setShowAirportModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Select Airport</Text>
                                <TouchableOpacity
                                    onPress={() => setShowAirportModal(false)}
                                    style={styles.closeButton}
                                >
                                    <Text style={styles.closeButtonText}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search by city or code (e.g. MEX)"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoCorrect={false}
                            />

                            <FlatList
                                data={filteredAirports}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.airportItem}
                                        onPress={() => {
                                            setShowAirportModal(false);
                                            navigation.navigate('AirportMaps', { airport: item });
                                        }}
                                    >
                                        <View style={styles.airportInfo}>
                                            <Text style={styles.airportCode}>{item.iataCode}</Text>
                                            <View>
                                                <Text style={styles.airportCity}>{item.city}</Text>
                                                <Text style={styles.airportName}>{item.name}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.arrow}>→</Text>
                                    </TouchableOpacity>
                                )}
                                ItemSeparatorComponent={() => <View style={styles.separator} />}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </StarryBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.7)',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#e8e8f0',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 8,
    },
    cardIcon: {
        fontSize: 28,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a2e',
        flex: 1,
    },
    sparkle: {
        fontSize: 18,
    },
    cardDescription: {
        fontSize: 14,
        lineHeight: 20,
        color: '#4a4a5e',
        marginBottom: 16,
    },
    buttonContainer: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    gradientButton: {
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#6b5fcc',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
    },
    disabledButton: {
        backgroundColor: 'rgba(150, 150, 170, 0.4)',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    disabledButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.6)',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '80%',
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a2e',
    },
    closeButton: {
        padding: 5,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#666',
    },
    searchInput: {
        backgroundColor: '#f0f0f5',
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
    },
    airportItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    airportInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        flex: 1,
    },
    airportCode: {
        fontSize: 20,
        fontWeight: '700',
        color: '#6b5fcc',
        width: 50,
    },
    airportCity: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a2e',
        marginBottom: 2,
    },
    airportName: {
        fontSize: 13,
        color: '#666',
    },
    arrow: {
        fontSize: 20,
        color: '#ccc',
    },
    separator: {
        height: 1,
        backgroundColor: '#f0f0f0',
    },
});
