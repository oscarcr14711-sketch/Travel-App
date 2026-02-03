export interface Expense {
    id: string;
    category: 'food' | 'lodging' | 'transport' | 'activities' | 'shopping' | 'other';
    amount: number;
    description: string;
    date: string; // ISO date string
}

export interface BudgetData {
    tripId: string;
    totalBudget: number;
    expenses: Expense[];
}

export const EXPENSE_CATEGORIES = [
    { id: 'food', label: 'Food & Drinks', icon: '🍔', color: '#FF6B6B' },
    { id: 'lodging', label: 'Lodging', icon: '🏨', color: '#4ECDC4' },
    { id: 'transport', label: 'Transport', icon: '🚕', color: '#FFE66D' },
    { id: 'activities', label: 'Activities', icon: '🎭', color: '#A8E6CF' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️', color: '#FFD93D' },
    { id: 'other', label: 'Other', icon: '💵', color: '#95E1D3' },
] as const;
