import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Alert, TextInput, View } from "react-native";
import { ExpenseList } from "../components/ExpenseList";
import { Header } from "../components/Header";
import { getCategory } from "../data/categories";
import { colors, expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";

/**
 * Shows all saved expenses.
 * The search box filters the list by description or category.
 * Deleting an expense requires confirmation first.
 */
export function HistoryScreen({ expenses, today, onDelete }) {
  const [searchText, setSearchText] = useState("");
  // Match text from either the expense description or the category name.
  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(searchText.toLowerCase()) ||
      getCategory(expense.category)
        .name.toLowerCase()
        .includes(searchText.toLowerCase()),
  );

  // Ask the user before an expense is removed.
  const confirmDelete = (expenseId) => {
    Alert.alert("Delete expense?", "This transaction will be removed.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(expenseId),
      },
    ]);
  };

  return (
    <>
      <Header eyebrow="YOUR ACTIVITY" title="History" />
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color={colors.muted} />
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search transactions"
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
        />
      </View>
      <ExpenseList
        expenses={filteredExpenses}
        title="All transactions"
        action={`${filteredExpenses.length} found`}
        today={today}
        emptyTitle="No transactions found"
        emptyMessage="Try a different search."
        onDelete={confirmDelete}
      />
    </>
  );
}
