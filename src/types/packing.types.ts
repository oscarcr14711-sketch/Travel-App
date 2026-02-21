export interface PackingItem {
    id: string;
    name: string;
    category: PackingCategory;
    typicalWeight: {
        min: number; // lbs
        max: number; // lbs
        average: number; // lbs
    };
}

export type PackingCategory =
    | 'clothing'
    | 'shoes'
    | 'electronics'
    | 'toiletries'
    | 'accessories'
    | 'documents';

export interface PackingListItem {
    item: PackingItem;
    quantity: number;
}

export interface PackingList {
    items: PackingListItem[];
    totalWeight: number; // calculated
}
