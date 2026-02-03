import AsyncStorage from '@react-native-async-storage/async-storage';
import { BudgetData, Expense } from '../types/budget.types';

const BUDGET_STORAGE_KEY = 'trip-budgets';

// Load all budgets from storage
const loadBudgets = async (): Promise<Record<string, BudgetData>> => {
    try {
        const data = await AsyncStorage.getItem(BUDGET_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error loading budgets:', error);
        return {};
    }
};

// Save all budgets to storage
const saveBudgets = async (budgets: Record<string, BudgetData>): Promise<void> => {
    try {
        await AsyncStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(budgets));
    } catch (error) {
        console.error('Error saving budgets:', error);
    }
};

// Get budget for a specific trip
export const getBudgetForTrip = async (tripId: string): Promise<BudgetData> => {
    const budgets = await loadBudgets();
    return budgets[tripId] || { tripId, totalBudget: 0, expenses: [] };
};

// Set total budget for a trip
export const setTotalBudget = async (tripId: string, amount: number): Promise<void> => {
    const budgets = await loadBudgets();
    if (!budgets[tripId]) {
        budgets[tripId] = { tripId, totalBudget: amount, expenses: [] };
    } else {
        budgets[tripId].totalBudget = amount;
    }
    await saveBudgets(budgets);
};

// Add expense to a trip
export const addExpense = async (tripId: string, expense: Omit<Expense, 'id'>): Promise<Expense> => {
    const budgets = await loadBudgets();
    if (!budgets[tripId]) {
        budgets[tripId] = { tripId, totalBudget: 0, expenses: [] };
    }

    const newExpense: Expense = {
        ...expense,
        id: `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    budgets[tripId].expenses.push(newExpense);
    await saveBudgets(budgets);
    return newExpense;
};

// Delete expense from a trip
export const deleteExpense = async (tripId: string, expenseId: string): Promise<void> => {
    const budgets = await loadBudgets();
    if (budgets[tripId]) {
        budgets[tripId].expenses = budgets[tripId].expenses.filter(e => e.id !== expenseId);
        await saveBudgets(budgets);
    }
};

// Calculate total spent
export const getTotalSpent = (expenses: Expense[]): number => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
};

// Get expenses by category
export const getExpensesByCategory = (expenses: Expense[]): Record<string, Expense[]> => {
    return expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
            acc[expense.category] = [];
        }
        acc[expense.category].push(expense);
        return acc;
    }, {} as Record<string, Expense[]>);
};
