import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Alert, TextInput, View } from "react-native";
import { ExpenseList } from "../components/ExpenseList";
import { Header } from "../components/Header";
import { getCategory } from "../data/categories";
import { colors, expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";

/**
 * Filters transactions and asks before deleting an expense.
 */
export function HistoryScreen({ expenses, today, onDelete }) {
  const [searchText, setSearchText] = useState("");
  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(searchText.toLowerCase()) ||
      getCategory(expense.category)
        .name.toLowerCase()
        .includes(searchText.toLowerCase()),
  );

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
