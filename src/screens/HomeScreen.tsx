import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image,
    Modal, FlatList, SafeAreaView, LayoutAnimation, Platform, UIManager,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarryBackground from '../components/StarryBackground';
import { spacing } from '../theme';
import { COUNTRIES, CountryData } from '../data/countries';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen({ navigation }: any) {
    const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleContinue = () => {
        if (!selectedCountry) return;
        navigation.navigate('TransportationSelection', { country: selectedCountry.name });
    };

    return (
        <StarryBackground>
            <View style={styles.container}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/images/FlyRide Logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('../assets/images/FlyRide title.png')}
                        style={styles.title}
                        resizeMode="contain"
                    />
                </View>

                {/* Selector */}
                <View style={styles.selectorSection}>
                    <Text style={styles.label}>Where are you traveling from?</Text>

                    {/* Dropdown trigger */}
                    <TouchableOpacity
                        style={styles.dropdownBtn}
                        onPress={() => setDropdownOpen(true)}
                        activeOpacity={0.85}
                    >
                        <LinearGradient
                            colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0.08)']}
                            style={styles.dropdownBtnInner}
                        >
                            {selectedCountry ? (
                                <View style={styles.dropdownSelected}>
                                    <Text style={styles.dropdownFlag}>{selectedCountry.flag}</Text>
                                    <Text style={styles.dropdownSelectedText}>{selectedCountry.name}</Text>
                                </View>
                            ) : (
                                <Text style={styles.dropdownPlaceholder}>Select your country...</Text>
                            )}
                            <Text style={styles.dropdownChevron}>
                                {dropdownOpen ? '▲' : '▼'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Country Dashboard */}
                    {selectedCountry && (
                        <View style={styles.dashboardContainer}>
                            <View style={styles.dashboardRow}>
                                {/* Currency & Language Widget */}
                                <LinearGradient
                                    colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.05)']}
                                    style={styles.widgetCard}
                                >
                                    <View style={styles.widgetHeader}>
                                        <Ionicons name="wallet-outline" size={20} color="#a855f7" />
                                        <Text style={styles.widgetTitle}>Currency</Text>
                                    </View>
                                    <Text style={styles.widgetValue}>
                                        {selectedCountry.currency.code} ({selectedCountry.currency.symbol})
                                    </Text>

                                    <View style={[styles.widgetHeader, { marginTop: 12 }]}>
                                        <Ionicons name="chatbubble-ellipses-outline" size={20} color="#6366f1" />
                                        <Text style={styles.widgetTitle}>Language</Text>
                                    </View>
                                    <Text style={styles.widgetValue}>{selectedCountry.language}</Text>
                                </LinearGradient>

                                {/* Emergency Info Widget */}
                                <LinearGradient
                                    colors={['rgba(239,68,68,0.15)', 'rgba(239,68,68,0.05)']}
                                    style={styles.widgetCard}
                                >
                                    <View style={styles.widgetHeader}>
                                        <Ionicons name="warning-outline" size={20} color="#ef4444" />
                                        <Text style={styles.widgetTitle}>Emergency</Text>
                                    </View>
                                    <View style={styles.emergencyRow}>
                                        <Text style={styles.emergencyLabel}>Police:</Text>
                                        <Text style={styles.emergencyValue}>{selectedCountry.emergency.police}</Text>
                                    </View>
                                    <View style={styles.emergencyRow}>
                                        <Text style={styles.emergencyLabel}>Medical:</Text>
                                        <Text style={styles.emergencyValue}>{selectedCountry.emergency.medical}</Text>
                                    </View>
                                    <View style={styles.emergencyRow}>
                                        <Text style={styles.emergencyLabel}>Fire:</Text>
                                        <Text style={styles.emergencyValue}>{selectedCountry.emergency.fire}</Text>
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>
                    )}

                    {/* Continue button */}
                    <TouchableOpacity
                        style={[styles.continueBtn, !selectedCountry && styles.continueBtnDisabled]}
                        onPress={handleContinue}
                        activeOpacity={selectedCountry ? 0.85 : 1}
                    >
                        <LinearGradient
                            colors={selectedCountry ? ['#6366f1', '#a855f7'] : ['#374151', '#374151']}
                            style={styles.continueBtnGrad}
                        >
                            <Text style={styles.continueBtnText}>
                                {selectedCountry ? `Continue →` : 'Select a country first'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Country Dropdown Modal */}
            <Modal
                visible={dropdownOpen}
                transparent
                animationType="slide"
                onRequestClose={() => setDropdownOpen(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setDropdownOpen(false)}
                >
                    <SafeAreaView style={styles.modalSheet}>
                        <View style={styles.modalHandle} />
                        <Text style={styles.modalTitle}>Select Country</Text>
                        <FlatList
                            data={COUNTRIES}
                            keyExtractor={item => item.name}
                            style={styles.list}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                const isSelected = selectedCountry?.name === item.name;
                                return (
                                    <TouchableOpacity
                                        style={[styles.listItem, isSelected && styles.listItemSelected]}
                                        onPress={() => {
                                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                            setSelectedCountry(item);
                                            setDropdownOpen(false);
                                        }}
                                        activeOpacity={0.75}
                                    >
                                        <Text style={styles.listFlag}>{item.flag}</Text>
                                        <Text style={[styles.listName, isSelected && styles.listNameSelected]}>
                                            {item.name}
                                        </Text>
                                        {isSelected && <Text style={styles.listCheck}>✓</Text>}
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </SafeAreaView>
                </TouchableOpacity>
            </Modal>
        </StarryBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.lg,
        paddingBottom: 80,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 48,
        gap: spacing.lg,
    },
    logo: {
        width: 200,
        height: 200,
    },
    title: {
        width: 600,
        height: 180,
    },
    selectorSection: {
        width: '100%',
        alignItems: 'center',
        gap: 16,
    },
    label: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 4,
    },
    // Dropdown button
    dropdownBtn: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    dropdownBtnInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        paddingHorizontal: 20,
    },
    dropdownSelected: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    dropdownFlag: {
        fontSize: 28,
    },
    dropdownSelectedText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    dropdownPlaceholder: {
        color: 'rgba(255,255,255,0.45)',
        fontSize: 16,
        fontStyle: 'italic',
    },
    dropdownChevron: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 13,
        fontWeight: '700',
    },
    // Dashboard
    dashboardContainer: {
        width: '100%',
        marginTop: 4,
    },
    dashboardRow: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    widgetCard: {
        flex: 1,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        minHeight: 120,
    },
    widgetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 6,
    },
    widgetTitle: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
        fontWeight: '600',
    },
    widgetValue: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    emergencyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6,
    },
    emergencyLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
        fontWeight: '500',
    },
    emergencyValue: {
        color: '#ef4444',
        fontSize: 15,
        fontWeight: '800',
    },
    // Continue button
    continueBtn: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.45,
        shadowRadius: 12,
        elevation: 10,
        marginTop: 8,
    },
    continueBtnDisabled: {
        shadowOpacity: 0,
        elevation: 0,
    },
    continueBtnGrad: {
        paddingVertical: 18,
        alignItems: 'center',
        borderRadius: 16,
    },
    continueBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: 0.3,
    },
    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        justifyContent: 'flex-end',
    },
    modalSheet: {
        backgroundColor: '#13131a',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        maxHeight: '75%',
        paddingBottom: 20,
        borderTopWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    modalHandle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.08)',
        marginBottom: 4,
    },
    list: {
        paddingHorizontal: 16,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 12,
        gap: 14,
        marginVertical: 2,
    },
    listItemSelected: {
        backgroundColor: 'rgba(99,102,241,0.2)',
    },
    listFlag: {
        fontSize: 28,
    },
    listName: {
        flex: 1,
        color: 'rgba(255,255,255,0.85)',
        fontSize: 16,
        fontWeight: '600',
    },
    listNameSelected: {
        color: '#a5b4fc',
        fontWeight: '800',
    },
    listCheck: {
        color: '#a5b4fc',
        fontSize: 16,
        fontWeight: '900',
    },
});
