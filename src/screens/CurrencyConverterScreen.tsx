import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, TextInput,
    ActivityIndicator, Platform, ScrollView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    convert,
    getExchangeRate,
    POPULAR_CURRENCIES,
    getCurrencySymbol,
    getCurrencyFlag,
} from '../services/currency.service';

export default function CurrencyConverterScreen({ navigation }: any) {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('MXN');
    const [amount, setAmount] = useState('100');
    const [result, setResult] = useState<number | null>(null);
    const [rate, setRate] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);
    const [fromCache, setFromCache] = useState(false);

    useEffect(() => {
        handleConvert();
    }, [fromCurrency, toCurrency]);

    const handleConvert = async () => {
        const num = parseFloat(amount);
        if (isNaN(num) || num <= 0) {
            setResult(null);
            setRate(null);
            return;
        }

        try {
            setLoading(true);
            const conversion = await convert(num, fromCurrency, toCurrency);
            setResult(conversion.converted);
            setRate(conversion.rate);
            setFromCache(conversion.fromCache);

            // Get last updated time
            const rateInfo = await getExchangeRate(fromCurrency, toCurrency);
            setLastUpdated(rateInfo.lastUpdated);
        } catch (error) {
            Alert.alert('Error', 'Failed to get exchange rate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSwapCurrencies = () => {
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
    };

    const formatNumber = (num: number): string => {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const quickAmounts = ['10', '50', '100', '500', '1000'];

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={['#2ecc71', '#27ae60', '#229954']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>💱 Currency Converter</Text>
                    <Text style={styles.headerSubtitle}>Live exchange rates</Text>
                </View>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Amount Input */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Amount</Text>
                    <View style={styles.amountInputContainer}>
                        <Text style={styles.currencySymbol}>{getCurrencySymbol(fromCurrency)}</Text>
                        <TextInput
                            style={styles.amountInput}
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="decimal-pad"
                            placeholder="0.00"
                            placeholderTextColor="#ccc"
                            onBlur={handleConvert}
                        />
                    </View>

                    {/* Quick Amount Chips */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickChips}>
                        {quickAmounts.map(amt => (
                            <TouchableOpacity
                                key={amt}
                                style={[styles.chip, amount === amt && styles.chipActive]}
                                onPress={() => {
                                    setAmount(amt);
                                    setTimeout(() => handleConvert(), 100);
                                }}
                            >
                                <Text style={[styles.chipText, amount === amt && styles.chipTextActive]}>
                                    {getCurrencySymbol(fromCurrency)}{amt}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Currency Selection */}
                <View style={styles.currencyRow}>
                    {/* From Currency */}
                    <View style={styles.currencyCard}>
                        <Text style={styles.currencyLabel}>FROM</Text>
                        <ScrollView style={styles.currencyList} showsVerticalScrollIndicator={false}>
                            {POPULAR_CURRENCIES.map(curr => (
                                <TouchableOpacity
                                    key={curr.code}
                                    style={[
                                        styles.currencyOption,
                                        fromCurrency === curr.code && styles.currencyOptionActive,
                                    ]}
                                    onPress={() => setFromCurrency(curr.code)}
                                >
                                    <Text style={styles.currencyFlag}>{curr.flag}</Text>
                                    <Text
                                        style={[
                                            styles.currencyCode,
                                            fromCurrency === curr.code && styles.currencyCodeActive,
                                        ]}
                                    >
                                        {curr.code}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Swap Button */}
                    <TouchableOpacity style={styles.swapBtn} onPress={handleSwapCurrencies}>
                        <Text style={styles.swapIcon}>⇄</Text>
                    </TouchableOpacity>

                    {/* To Currency */}
                    <View style={styles.currencyCard}>
                        <Text style={styles.currencyLabel}>TO</Text>
                        <ScrollView style={styles.currencyList} showsVerticalScrollIndicator={false}>
                            {POPULAR_CURRENCIES.map(curr => (
                                <TouchableOpacity
                                    key={curr.code}
                                    style={[
                                        styles.currencyOption,
                                        toCurrency === curr.code && styles.currencyOptionActive,
                                    ]}
                                    onPress={() => setToCurrency(curr.code)}
                                >
                                    <Text style={styles.currencyFlag}>{curr.flag}</Text>
                                    <Text
                                        style={[
                                            styles.currencyCode,
                                            toCurrency === curr.code && styles.currencyCodeActive,
                                        ]}
                                    >
                                        {curr.code}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                {/* Result */}
                {loading ? (
                    <View style={styles.resultCard}>
                        <ActivityIndicator size="large" color="#2ecc71" />
                        <Text style={styles.loadingText}>Converting...</Text>
                    </View>
                ) : result !== null && rate !== null ? (
                    <LinearGradient
                        colors={['#2ecc71', '#27ae60']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.resultCard}
                    >
                        <View style={styles.resultHeader}>
                            <Text style={styles.resultLabel}>
                                {getCurrencyFlag(fromCurrency)} {fromCurrency} → {getCurrencyFlag(toCurrency)} {toCurrency}
                            </Text>
                            {fromCache && (
                                <View style={styles.cachedBadge}>
                                    <Text style={styles.cachedText}>CACHED</Text>
                                </View>
                            )}
                        </View>

                        <Text style={styles.resultAmount}>
                            {getCurrencySymbol(toCurrency)}{formatNumber(result)}
                        </Text>

                        <View style={styles.rateInfo}>
                            <Text style={styles.rateText}>
                                1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                            </Text>
                            {lastUpdated && (
                                <Text style={styles.updateText}>
                                    Updated: {new Date(lastUpdated).toLocaleTimeString('en-US', {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                    })}
                                </Text>
                            )}
                        </View>

                        <TouchableOpacity style={styles.refreshBtn} onPress={handleConvert}>
                            <Text style={styles.refreshBtnText}>🔄 Refresh</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                ) : null}

                {/* Info */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoIcon}>💡</Text>
                    <Text style={styles.infoText}>
                        Exchange rates are cached for 6 hours to minimize API usage. Rates are
                        provided by open.er-api.com and are for informational purposes only.
                    </Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f4f4f8' },

    // Header
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: { marginRight: 12 },
    backIcon: { fontSize: 28, color: '#fff', fontWeight: 'bold' },
    headerContent: { flex: 1 },
    headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 4 },
    headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.85)' },

    // Content
    content: { flex: 1, paddingHorizontal: 16 },

    // Section Title
    sectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: '#999',
        letterSpacing: 1,
        marginBottom: 10,
    },

    // Card
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 18,
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },

    // Amount Input
    amountInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8fa',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12,
    },
    currencySymbol: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1a1a2e',
        marginRight: 8,
    },
    amountInput: {
        flex: 1,
        fontSize: 28,
        fontWeight: '600',
        color: '#1a1a2e',
    },

    // Quick Chips
    quickChips: { marginTop: 4 },
    chip: {
        backgroundColor: '#f0f0f5',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 16,
        marginRight: 8,
    },
    chipActive: { backgroundColor: '#2ecc71' },
    chipText: { fontSize: 13, fontWeight: '600', color: '#666' },
    chipTextActive: { color: '#fff' },

    // Currency Row
    currencyRow: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 12,
        alignItems: 'center',
    },
    currencyCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    currencyLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#999',
        letterSpacing: 1,
        marginBottom: 10,
    },
    currencyList: { maxHeight: 220 },
    currencyOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        gap: 10,
        marginBottom: 4,
    },
    currencyOptionActive: { backgroundColor: '#e8f5e9' },
    currencyFlag: { fontSize: 20 },
    currencyCode: { fontSize: 15, fontWeight: '600', color: '#1a1a2e' },
    currencyCodeActive: { color: '#2ecc71', fontWeight: '700' },

    // Swap Button
    swapBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    swapIcon: { fontSize: 22, color: '#2ecc71', fontWeight: 'bold' },

    // Result
    resultCard: {
        borderRadius: 16,
        padding: 20,
        marginTop: 16,
        alignItems: 'center',
        shadowColor: '#2ecc71',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    resultHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    resultLabel: { fontSize: 14, fontWeight: '600', color: 'rgba(255,255,255,0.9)' },
    cachedBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    cachedText: { fontSize: 10, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },
    resultAmount: {
        fontSize: 42,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 12,
    },
    rateInfo: { alignItems: 'center', marginBottom: 14 },
    rateText: { fontSize: 15, fontWeight: '600', color: 'rgba(255,255,255,0.95)', marginBottom: 4 },
    updateText: { fontSize: 12, color: 'rgba(255,255,255,0.75)' },
    refreshBtn: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 10,
    },
    refreshBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
    loadingText: { marginTop: 12, fontSize: 14, color: '#888' },

    // Info
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#e3f2fd',
        borderRadius: 12,
        padding: 14,
        marginTop: 16,
        gap: 10,
    },
    infoIcon: { fontSize: 20 },
    infoText: { flex: 1, fontSize: 12, color: '#0d47a1', lineHeight: 18 },
});
