import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Platform,
    SafeAreaView, StatusBar, ScrollView, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get('window');

export default function BoardingPassScreen({ route, navigation }: any) {
    const { ticket } = route.params || {};
    const [brightness, setBrightness] = useState(false);

    if (!ticket) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>No ticket information provided</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtnFallback}>
                    <Text style={styles.btnText}>Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const qrValue = ticket.confirmationCode || ticket.flightNumber || ticket.id || 'FLYRIDE';
    const isFlightType = ticket.type === 'flight';

    return (
        <View style={[styles.container, brightness && styles.brightContainer]}>
            <StatusBar barStyle={brightness ? 'dark-content' : 'light-content'} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                    <Text style={[styles.closeText, brightness && styles.darkText]}>✕</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, brightness && styles.darkText]}>Boarding Pass</Text>
                <TouchableOpacity
                    style={styles.brightnessBtn}
                    onPress={() => setBrightness(!brightness)}
                >
                    <Text style={styles.brightnessIcon}>{brightness ? '🌙' : '☀️'}</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Boarding Pass Card */}
                <LinearGradient
                    colors={brightness ? ['#ffffff', '#f8f8f8'] : ['#1e3c72', '#2a5298']}
                    style={styles.boardingPass}
                >
                    {/* Airline Header */}
                    <View style={styles.airlineRow}>
                        <Text style={styles.airlineEmoji}>
                            {isFlightType ? '✈️' : '🚌'}
                        </Text>
                        <View>
                            <Text style={[styles.airlineName, brightness && styles.darkText]}>
                                {ticket.airline || ticket.busCompany || 'FlyRide'}
                            </Text>
                            <Text style={[styles.flightNum, brightness && styles.darkSubtext]}>
                                {ticket.flightNumber || ticket.busNumber || 'Boarding Pass'}
                            </Text>
                        </View>
                    </View>

                    {/* Route */}
                    <View style={styles.routeSection}>
                        <View style={styles.routePoint}>
                            <Text style={[styles.routeCode, brightness && styles.darkText]}>
                                {ticket.tripOrigin || '---'}
                            </Text>
                            <Text style={[styles.routeLabel, brightness && styles.darkSubtext]}>FROM</Text>
                        </View>
                        <View style={styles.routeArrow}>
                            <Text style={[styles.arrowText, brightness && styles.darkText]}>
                                ────── {isFlightType ? '✈' : '🚌'} ──────
                            </Text>
                        </View>
                        <View style={styles.routePoint}>
                            <Text style={[styles.routeCode, brightness && styles.darkText]}>
                                {ticket.tripDestination || '---'}
                            </Text>
                            <Text style={[styles.routeLabel, brightness && styles.darkSubtext]}>TO</Text>
                        </View>
                    </View>

                    {/* Details Grid */}
                    <View style={styles.detailsGrid}>
                        {ticket.tripDate && (
                            <View style={styles.detailItem}>
                                <Text style={[styles.detailLabel, brightness && styles.darkSubtext]}>DATE</Text>
                                <Text style={[styles.detailValue, brightness && styles.darkText]}>{ticket.tripDate}</Text>
                            </View>
                        )}
                        {ticket.tripTime && (
                            <View style={styles.detailItem}>
                                <Text style={[styles.detailLabel, brightness && styles.darkSubtext]}>TIME</Text>
                                <Text style={[styles.detailValue, brightness && styles.darkText]}>{ticket.tripTime}</Text>
                            </View>
                        )}
                        {ticket.gate && (
                            <View style={styles.detailItem}>
                                <Text style={[styles.detailLabel, brightness && styles.darkSubtext]}>GATE</Text>
                                <Text style={[styles.detailValue, brightness && styles.darkText]}>{ticket.gate}</Text>
                            </View>
                        )}
                        {ticket.seat && (
                            <View style={styles.detailItem}>
                                <Text style={[styles.detailLabel, brightness && styles.darkSubtext]}>SEAT</Text>
                                <Text style={[styles.detailValue, brightness && styles.darkText]}>{ticket.seat}</Text>
                            </View>
                        )}
                        {ticket.terminal && (
                            <View style={styles.detailItem}>
                                <Text style={[styles.detailLabel, brightness && styles.darkSubtext]}>TERMINAL</Text>
                                <Text style={[styles.detailValue, brightness && styles.darkText]}>{ticket.terminal}</Text>
                            </View>
                        )}
                        {ticket.boardingGroup && (
                            <View style={styles.detailItem}>
                                <Text style={[styles.detailLabel, brightness && styles.darkSubtext]}>GROUP</Text>
                                <Text style={[styles.detailValue, brightness && styles.darkText]}>{ticket.boardingGroup}</Text>
                            </View>
                        )}
                    </View>

                    {/* Tear Line */}
                    <View style={styles.tearLine}>
                        <View style={[styles.tearCircle, styles.tearLeft, brightness && styles.tearBright]} />
                        <View style={[styles.tearDots, brightness && styles.tearDotsBright]} />
                        <View style={[styles.tearCircle, styles.tearRight, brightness && styles.tearBright]} />
                    </View>

                    {/* QR Code Section */}
                    <View style={styles.qrSection}>
                        <View style={styles.qrWrapper}>
                            <QRCode
                                value={qrValue}
                                size={width * 0.45}
                                color={brightness ? '#1a1a2e' : '#ffffff'}
                                backgroundColor={brightness ? '#ffffff' : '#1e3c72'}
                                ecl="M"
                            />
                        </View>
                        {ticket.confirmationCode && (
                            <Text style={[styles.confirmCode, brightness && styles.darkText]}>
                                {ticket.confirmationCode}
                            </Text>
                        )}
                        <Text style={[styles.scanHint, brightness && styles.darkSubtext]}>
                            Scan QR code at gate
                        </Text>
                    </View>
                </LinearGradient>

                {/* Info */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoIcon}>💡</Text>
                    <Text style={styles.infoText}>
                        Tap ☀️ to enable bright mode for easier scanning at the gate.
                        This QR code contains your confirmation code.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f0f1a' },
    brightContainer: { backgroundColor: '#f0f0f5' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 12,
    },
    closeBtn: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center', alignItems: 'center',
    },
    closeText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
    headerTitle: { fontSize: 18, fontWeight: '800', color: '#fff' },
    brightnessBtn: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center', alignItems: 'center',
    },
    brightnessIcon: { fontSize: 20 },
    darkText: { color: '#1a1a2e' },
    darkSubtext: { color: '#666' },
    content: { paddingHorizontal: 20, paddingBottom: 40 },
    boardingPass: {
        borderRadius: 20,
        padding: 24,
        marginTop: 10,
    },
    airlineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
    },
    airlineEmoji: { fontSize: 36 },
    airlineName: { fontSize: 18, fontWeight: '800', color: '#fff' },
    flightNum: { fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: '600' },
    routeSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    routePoint: { alignItems: 'center', flex: 1 },
    routeCode: { fontSize: 28, fontWeight: '900', color: '#fff' },
    routeLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
    routeArrow: { flex: 2, alignItems: 'center' },
    arrowText: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 20,
    },
    detailItem: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 10,
        padding: 10,
        minWidth: '28%',
        alignItems: 'center',
    },
    detailLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '700', letterSpacing: 0.5 },
    detailValue: { fontSize: 16, fontWeight: '800', color: '#fff', marginTop: 2 },
    tearLine: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    tearCircle: {
        width: 20, height: 20, borderRadius: 10,
        backgroundColor: '#0f0f1a',
    },
    tearBright: { backgroundColor: '#f0f0f5' },
    tearLeft: { marginLeft: -32 },
    tearRight: { marginRight: -32 },
    tearDots: {
        flex: 1,
        borderTopWidth: 2,
        borderStyle: 'dashed',
        borderColor: 'rgba(255,255,255,0.3)',
    },
    tearDotsBright: { borderColor: 'rgba(0,0,0,0.15)' },
    qrSection: { alignItems: 'center', paddingVertical: 16 },
    qrWrapper: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 16,
        borderRadius: 16,
    },
    confirmCode: {
        fontSize: 22,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: 3,
        marginTop: 16,
    },
    scanHint: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
        marginTop: 8,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 14,
        marginTop: 20,
        gap: 10,
    },
    infoIcon: { fontSize: 20 },
    infoText: { flex: 1, fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 18 },
    errorText: { color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 100 },
    backBtnFallback: {
        backgroundColor: '#1e3c72',
        paddingVertical: 12, paddingHorizontal: 24,
        borderRadius: 8, alignSelf: 'center', marginTop: 20,
    },
    btnText: { color: '#fff', fontWeight: '600' },
});
