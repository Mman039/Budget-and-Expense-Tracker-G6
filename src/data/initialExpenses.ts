import { Expense } from "../types/expense";

// Provides sample records so the tracker has useful content on first launch.
export const initialExpenses: Expense[] = [
  { id: "1", name: "Morning coffee", amount: 4.5, date: "Today" },
  { id: "2", name: "Lunch", amount: 12.75, date: "Today" },
];