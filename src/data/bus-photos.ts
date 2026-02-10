// Dynamic photo mapping for bus models
// Add photos by creating folders: Amenities/[Model-Name]/1.jpg, 2.jpg, etc.

export interface BusPhotoSet {
    modelKey: string;
    photos: any[]; // RequireSource array
    credits?: string;
}

// Map bus model keys to their photo arrays
export const BUS_PHOTOS: { [key: string]: BusPhotoSet } = {
    'Marcopolo G8 DD': {
        modelKey: 'Marcopolo G8 DD',
        photos: [
            require('../assets/images/Amenities/Marcopolo 1.jpeg'),
            require('../assets/images/Amenities/Marcopolo 2.jpeg'),
            require('../assets/images/Amenities/Marcopolo 3.jpeg'),
            require('../assets/images/Amenities/Marcopolo 4.jpeg'),
            require('../assets/images/Amenities/Marcopolo 5.jpeg'),
            require('../assets/images/Amenities/Marcopolo 6.jpeg'),
            require('../assets/images/Amenities/Marcopolo 7.jpeg'),
        ]
    },
    'Volvo 9800 Euro 6': {
        modelKey: 'Volvo 9800 Euro 6',
        photos: [
            require('../assets/images/Amenities/Volvo-9800/2.jpg'), // Exterior ETN bus
            require('../assets/images/Amenities/Volvo-9800/3.png'), // Interior seating
            require('../assets/images/Amenities/Volvo-9800/4.png'), // Luxury seats close-up
            require('../assets/images/Amenities/Volvo-9800/5.png'), // Driver area
            require('../assets/images/Amenities/Volvo-9800/1.png'), // Bathroom
        ]
    },
    'Volvo 9800 DD': {
        modelKey: 'Volvo 9800 DD',
        photos: [
            require('../assets/images/Amenities/Volvo-9800-DD/1.jpg'), // Exterior ETN double decker
            require('../assets/images/Amenities/Volvo-9800-DD/2.png'), // Upper deck sleeping area
            require('../assets/images/Amenities/Volvo-9800-DD/3.png'), // Bathroom doors
            require('../assets/images/Amenities/Volvo-9800-DD/4.png'), // Lower deck seats close-up
            require('../assets/images/Amenities/Volvo-9800-DD/5.png'), // Lower deck with entertainment
            require('../assets/images/Amenities/Volvo-9800-DD/6.png'), // Lower deck full view
        ]
    },
    // Add more bus models here as photos become available
};

// Helper function to get photos for a bus model
export function getBusPhotos(modelKey: string): BusPhotoSet | null {
    return BUS_PHOTOS[modelKey] || null;
}

// Helper to check if a model has photos
export function hasPhotos(modelKey: string): boolean {
    return !!BUS_PHOTOS[modelKey];
}
