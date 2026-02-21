import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { PhotoEntry, PhotoAlbum } from '../types/photo.types';

const PHOTOS_KEY = '@photo_journal_photos';
const ALBUMS_KEY = '@photo_journal_albums';

// Generate unique ID
const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

// PHOTO MANAGEMENT
export async function getPhotos(): Promise<PhotoEntry[]> {
    try {
        const data = await AsyncStorage.getItem(PHOTOS_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export async function savePhoto(photo: Omit<PhotoEntry, 'id'>): Promise<PhotoEntry> {
    const photos = await getPhotos();
    const newPhoto: PhotoEntry = {
        ...photo,
        id: generateId(),
    };

    // Copy image to app document directory for persistence
    const fileName = `photo_${newPhoto.id}.jpg`;
    const destUri = `${FileSystem.documentDirectory}photos/${fileName}`;

    // Ensure photos directory exists
    const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}photos/`);
    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}photos/`, { intermediates: true });
    }

    await FileSystem.copyAsync({ from: photo.uri, to: destUri });
    newPhoto.uri = destUri;

    photos.unshift(newPhoto);
    await AsyncStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
    return newPhoto;
}

export async function updatePhoto(id: string, updates: Partial<PhotoEntry>): Promise<void> {
    const photos = await getPhotos();
    const index = photos.findIndex(p => p.id === id);
    if (index >= 0) {
        photos[index] = { ...photos[index], ...updates };
        await AsyncStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
    }
}

export async function deletePhoto(id: string): Promise<void> {
    const photos = await getPhotos();
    const photo = photos.find(p => p.id === id);
    if (photo) {
        // Delete file
        try {
            await FileSystem.deleteAsync(photo.uri, { idempotent: true });
        } catch { /* ignore */ }
    }
    const filtered = photos.filter(p => p.id !== id);
    await AsyncStorage.setItem(PHOTOS_KEY, JSON.stringify(filtered));

    // Clean up albums
    const albums = await getAlbums();
    const updatedAlbums = albums.map(a => ({
        ...a,
        photoIds: a.photoIds.filter(pid => pid !== id),
        coverPhotoId: a.coverPhotoId === id ? undefined : a.coverPhotoId,
    }));
    await AsyncStorage.setItem(ALBUMS_KEY, JSON.stringify(updatedAlbums));
}

export async function toggleFavorite(id: string): Promise<void> {
    const photos = await getPhotos();
    const index = photos.findIndex(p => p.id === id);
    if (index >= 0) {
        photos[index].isFavorite = !photos[index].isFavorite;
        await AsyncStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
    }
}

// ALBUM MANAGEMENT
export async function getAlbums(): Promise<PhotoAlbum[]> {
    try {
        const data = await AsyncStorage.getItem(ALBUMS_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export async function createAlbum(name: string, tripId?: string): Promise<PhotoAlbum> {
    const albums = await getAlbums();
    const newAlbum: PhotoAlbum = {
        id: generateId(),
        name,
        photoIds: [],
        tripId,
        createdAt: new Date().toISOString(),
    };
    albums.unshift(newAlbum);
    await AsyncStorage.setItem(ALBUMS_KEY, JSON.stringify(albums));
    return newAlbum;
}

export async function addPhotoToAlbum(albumId: string, photoId: string): Promise<void> {
    const albums = await getAlbums();
    const index = albums.findIndex(a => a.id === albumId);
    if (index >= 0 && !albums[index].photoIds.includes(photoId)) {
        albums[index].photoIds.push(photoId);
        if (!albums[index].coverPhotoId) {
            albums[index].coverPhotoId = photoId;
        }
        await AsyncStorage.setItem(ALBUMS_KEY, JSON.stringify(albums));
    }
}

export async function deleteAlbum(id: string): Promise<void> {
    const albums = await getAlbums();
    const filtered = albums.filter(a => a.id !== id);
    await AsyncStorage.setItem(ALBUMS_KEY, JSON.stringify(filtered));
}

// UTILITY
export function groupPhotosByDate(photos: PhotoEntry[]): { date: string; photos: PhotoEntry[] }[] {
    const groups: Record<string, PhotoEntry[]> = {};
    photos.forEach(photo => {
        const dateKey = new Date(photo.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(photo);
    });
    return Object.entries(groups).map(([date, photos]) => ({ date, photos }));
}
