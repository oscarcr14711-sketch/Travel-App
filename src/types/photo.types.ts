export interface PhotoEntry {
    id: string;
    uri: string;
    caption: string;
    location?: string;
    tripId?: string;
    tripName?: string;
    date: string; // ISO string
    tags: string[];
    isFavorite: boolean;
}

export interface PhotoAlbum {
    id: string;
    name: string;
    coverPhotoId?: string;
    photoIds: string[];
    tripId?: string;
    createdAt: string;
}

export interface PhotoJournalState {
    photos: PhotoEntry[];
    albums: PhotoAlbum[];
}
