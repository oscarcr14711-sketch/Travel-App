import { PackingItem } from '../types/packing.types';

export const PACKING_ITEMS: PackingItem[] = [
    // CLOTHING
    {
        id: 'tshirt',
        name: 'T-Shirt',
        category: 'clothing',
        typicalWeight: { min: 0.3, max: 0.5, average: 0.4 }
    },
    {
        id: 'shirt-button',
        name: 'Button-Down Shirt',
        category: 'clothing',
        typicalWeight: { min: 0.4, max: 0.7, average: 0.5 }
    },
    {
        id: 'pants-jeans',
        name: 'Jeans',
        category: 'clothing',
        typicalWeight: { min: 1.0, max: 1.5, average: 1.2 }
    },
    {
        id: 'pants-dress',
        name: 'Dress Pants',
        category: 'clothing',
        typicalWeight: { min: 0.5, max: 0.9, average: 0.7 }
    },
    {
        id: 'shorts',
        name: 'Shorts',
        category: 'clothing',
        typicalWeight: { min: 0.3, max: 0.6, average: 0.4 }
    },
    {
        id: 'dress',
        name: 'Dress',
        category: 'clothing',
        typicalWeight: { min: 0.5, max: 1.2, average: 0.8 }
    },
    {
        id: 'skirt',
        name: 'Skirt',
        category: 'clothing',
        typicalWeight: { min: 0.3, max: 0.7, average: 0.5 }
    },
    {
        id: 'sweater',
        name: 'Sweater',
        category: 'clothing',
        typicalWeight: { min: 0.7, max: 1.5, average: 1.0 }
    },
    {
        id: 'hoodie',
        name: 'Hoodie',
        category: 'clothing',
        typicalWeight: { min: 1.0, max: 1.8, average: 1.3 }
    },
    {
        id: 'jacket-light',
        name: 'Light Jacket',
        category: 'clothing',
        typicalWeight: { min: 0.8, max: 1.5, average: 1.1 }
    },
    {
        id: 'jacket-heavy',
        name: 'Heavy Jacket/Coat',
        category: 'clothing',
        typicalWeight: { min: 2.0, max: 4.0, average: 3.0 }
    },
    {
        id: 'underwear',
        name: 'Underwear',
        category: 'clothing',
        typicalWeight: { min: 0.1, max: 0.2, average: 0.15 }
    },
    {
        id: 'socks',
        name: 'Pair of Socks',
        category: 'clothing',
        typicalWeight: { min: 0.1, max: 0.2, average: 0.15 }
    },
    {
        id: 'bra',
        name: 'Bra',
        category: 'clothing',
        typicalWeight: { min: 0.1, max: 0.3, average: 0.2 }
    },
    {
        id: 'pajamas',
        name: 'Pajamas',
        category: 'clothing',
        typicalWeight: { min: 0.4, max: 0.8, average: 0.6 }
    },
    {
        id: 'swimsuit',
        name: 'Swimsuit',
        category: 'clothing',
        typicalWeight: { min: 0.2, max: 0.5, average: 0.3 }
    },

    // SHOES
    {
        id: 'sneakers',
        name: 'Sneakers',
        category: 'shoes',
        typicalWeight: { min: 1.5, max: 2.5, average: 2.0 }
    },
    {
        id: 'dress-shoes',
        name: 'Dress Shoes',
        category: 'shoes',
        typicalWeight: { min: 1.5, max: 2.2, average: 1.8 }
    },
    {
        id: 'sandals',
        name: 'Sandals/Flip-Flops',
        category: 'shoes',
        typicalWeight: { min: 0.5, max: 1.0, average: 0.7 }
    },
    {
        id: 'boots',
        name: 'Boots',
        category: 'shoes',
        typicalWeight: { min: 2.0, max: 3.5, average: 2.7 }
    },
    {
        id: 'heels',
        name: 'Heels',
        category: 'shoes',
        typicalWeight: { min: 1.0, max: 1.8, average: 1.4 }
    },

    // ELECTRONICS
    {
        id: 'laptop',
        name: 'Laptop',
        category: 'electronics',
        typicalWeight: { min: 2.5, max: 5.0, average: 3.5 }
    },
    {
        id: 'tablet',
        name: 'Tablet',
        category: 'electronics',
        typicalWeight: { min: 0.7, max: 1.5, average: 1.0 }
    },
    {
        id: 'phone',
        name: 'Phone',
        category: 'electronics',
        typicalWeight: { min: 0.3, max: 0.5, average: 0.4 }
    },
    {
        id: 'charger-laptop',
        name: 'Laptop Charger',
        category: 'electronics',
        typicalWeight: { min: 0.5, max: 1.2, average: 0.8 }
    },
    {
        id: 'charger-phone',
        name: 'Phone Charger',
        category: 'electronics',
        typicalWeight: { min: 0.1, max: 0.3, average: 0.2 }
    },
    {
        id: 'power-bank',
        name: 'Power Bank',
        category: 'electronics',
        typicalWeight: { min: 0.3, max: 0.7, average: 0.5 }
    },
    {
        id: 'camera',
        name: 'Camera',
        category: 'electronics',
        typicalWeight: { min: 1.0, max: 3.0, average: 1.8 }
    },
    {
        id: 'headphones',
        name: 'Headphones',
        category: 'electronics',
        typicalWeight: { min: 0.4, max: 0.8, average: 0.6 }
    },
    {
        id: 'e-reader',
        name: 'E-Reader',
        category: 'electronics',
        typicalWeight: { min: 0.3, max: 0.5, average: 0.4 }
    },

    // TOILETRIES
    {
        id: 'shampoo-full',
        name: 'Shampoo (Full Size)',
        category: 'toiletries',
        typicalWeight: { min: 0.8, max: 1.2, average: 1.0 }
    },
    {
        id: 'shampoo-travel',
        name: 'Shampoo (Travel Size)',
        category: 'toiletries',
        typicalWeight: { min: 0.1, max: 0.3, average: 0.2 }
    },
    {
        id: 'conditioner-full',
        name: 'Conditioner (Full Size)',
        category: 'toiletries',
        typicalWeight: { min: 0.8, max: 1.2, average: 1.0 }
    },
    {
        id: 'conditioner-travel',
        name: 'Conditioner (Travel Size)',
        category: 'toiletries',
        typicalWeight: { min: 0.1, max: 0.3, average: 0.2 }
    },
    {
        id: 'toothbrush',
        name: 'Toothbrush',
        category: 'toiletries',
        typicalWeight: { min: 0.05, max: 0.1, average: 0.07 }
    },
    {
        id: 'toothpaste',
        name: 'Toothpaste',
        category: 'toiletries',
        typicalWeight: { min: 0.2, max: 0.5, average: 0.3 }
    },
    {
        id: 'deodorant',
        name: 'Deodorant',
        category: 'toiletries',
        typicalWeight: { min: 0.2, max: 0.5, average: 0.3 }
    },
    {
        id: 'perfume',
        name: 'Perfume/Cologne',
        category: 'toiletries',
        typicalWeight: { min: 0.3, max: 0.7, average: 0.5 }
    },
    {
        id: 'sunscreen',
        name: 'Sunscreen',
        category: 'toiletries',
        typicalWeight: { min: 0.3, max: 0.8, average: 0.5 }
    },
    {
        id: 'makeup-bag',
        name: 'Makeup Bag',
        category: 'toiletries',
        typicalWeight: { min: 0.5, max: 2.0, average: 1.0 }
    },
    {
        id: 'hair-dryer',
        name: 'Hair Dryer',
        category: 'toiletries',
        typicalWeight: { min: 1.0, max: 2.0, average: 1.5 }
    },
    {
        id: 'razor',
        name: 'Razor',
        category: 'toiletries',
        typicalWeight: { min: 0.1, max: 0.3, average: 0.2 }
    },
    {
        id: 'toiletry-bag',
        name: 'Toiletry Bag (Empty)',
        category: 'toiletries',
        typicalWeight: { min: 0.3, max: 0.8, average: 0.5 }
    },

    // ACCESSORIES
    {
        id: 'belt',
        name: 'Belt',
        category: 'accessories',
        typicalWeight: { min: 0.2, max: 0.5, average: 0.3 }
    },
    {
        id: 'watch',
        name: 'Watch',
        category: 'accessories',
        typicalWeight: { min: 0.1, max: 0.5, average: 0.2 }
    },
    {
        id: 'jewelry',
        name: 'Jewelry',
        category: 'accessories',
        typicalWeight: { min: 0.1, max: 0.5, average: 0.2 }
    },
    {
        id: 'sunglasses',
        name: 'Sunglasses',
        category: 'accessories',
        typicalWeight: { min: 0.1, max: 0.3, average: 0.2 }
    },
    {
        id: 'hat',
        name: 'Hat/Cap',
        category: 'accessories',
        typicalWeight: { min: 0.2, max: 0.5, average: 0.3 }
    },
    {
        id: 'scarf',
        name: 'Scarf',
        category: 'accessories',
        typicalWeight: { min: 0.2, max: 0.6, average: 0.4 }
    },
    {
        id: 'umbrella',
        name: 'Umbrella',
        category: 'accessories',
        typicalWeight: { min: 0.5, max: 1.0, average: 0.7 }
    },
    {
        id: 'bag-small',
        name: 'Small Bag/Purse',
        category: 'accessories',
        typicalWeight: { min: 0.5, max: 1.5, average: 1.0 }
    },

    // DOCUMENTS
    {
        id: 'passport',
        name: 'Passport',
        category: 'documents',
        typicalWeight: { min: 0.05, max: 0.1, average: 0.07 }
    },
    {
        id: 'wallet',
        name: 'Wallet',
        category: 'documents',
        typicalWeight: { min: 0.2, max: 0.5, average: 0.3 }
    },
    {
        id: 'documents',
        name: 'Documents/Papers',
        category: 'documents',
        typicalWeight: { min: 0.1, max: 0.5, average: 0.2 }
    },
    {
        id: 'book',
        name: 'Book',
        category: 'documents',
        typicalWeight: { min: 0.5, max: 1.5, average: 1.0 }
    },
];

export function getItemsByCategory(category: string): PackingItem[] {
    return PACKING_ITEMS.filter(item => item.category === category);
}

export function calculatePackingWeight(items: { item: PackingItem; quantity: number }[]): number {
    return items.reduce((total, { item, quantity }) => {
        return total + (item.typicalWeight.average * quantity);
    }, 0);
}
