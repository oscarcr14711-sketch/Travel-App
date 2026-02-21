import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Platform,
    SafeAreaView, StatusBar, ActivityIndicator, Dimensions,
} from 'react-native';
import Pdf from 'react-native-pdf';

const { width, height } = Dimensions.get('window');

export default function PdfViewerScreen({ route, navigation }: any) {
    const { uri, title } = route.params || {};
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    if (!uri) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>No PDF file provided</Text>
                <TouchableOpacity style={styles.backBtnFallback} onPress={() => navigation.goBack()}>
                    <Text style={styles.backBtnText}>Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                    <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle} numberOfLines={1}>
                        {title || 'Ticket'}
                    </Text>
                    {totalPages > 0 && (
                        <Text style={styles.pageIndicator}>
                            Page {currentPage} of {totalPages}
                        </Text>
                    )}
                </View>
                <View style={{ width: 40 }} />
            </View>

            {/* PDF Viewer */}
            <View style={styles.pdfContainer}>
                {loading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#1e3c72" />
                        <Text style={styles.loadingText}>Loading PDF...</Text>
                    </View>
                )}
                <Pdf
                    source={{ uri }}
                    style={styles.pdf}
                    onLoadComplete={(numberOfPages) => {
                        setTotalPages(numberOfPages);
                        setLoading(false);
                    }}
                    onPageChanged={(page) => {
                        setCurrentPage(page);
                    }}
                    onError={(error) => {
                        console.error('PDF Error:', error);
                        setLoading(false);
                    }}
                    enablePaging={true}
                    horizontal={false}
                    fitPolicy={0}
                    spacing={0}
                />
            </View>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <Text style={styles.bottomText}>📄 Pinch to zoom • Swipe to navigate</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#1a1a2e',
    },
    closeBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
    headerCenter: { flex: 1, alignItems: 'center' },
    headerTitle: { fontSize: 16, fontWeight: '700', color: '#fff' },
    pageIndicator: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
    pdfContainer: { flex: 1, backgroundColor: '#2a2a3e' },
    pdf: {
        flex: 1,
        width,
        height: height - 140,
        backgroundColor: '#2a2a3e',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        backgroundColor: '#2a2a3e',
    },
    loadingText: { color: '#fff', marginTop: 12, fontSize: 14 },
    bottomBar: {
        backgroundColor: '#1a1a2e',
        paddingVertical: 10,
        alignItems: 'center',
    },
    bottomText: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
    errorText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 100,
    },
    backBtnFallback: {
        backgroundColor: '#1e3c72',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 20,
    },
    backBtnText: { color: '#fff', fontWeight: '600' },
});
