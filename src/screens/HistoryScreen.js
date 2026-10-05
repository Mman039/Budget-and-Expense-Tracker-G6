// This screen handles browsing and filtering the expense log.
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { ExpenseList } from "../components/ExpenseList";
import { Header } from "../components/Header";
import { getCategory } from "../data/categories";
import { colors, expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";

/**
 * Filters the transactions list by description or category name.
 * The comparison is case-insensitive so the search feels natural.
 */
export function HistoryScreen({ expenses, today, searchText, setSearchText, onDelete }) {
  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(searchText.toLowerCase()) ||
      getCategory(expense.category)
        .name.toLowerCase()
        .includes(searchText.toLowerCase()),
  );

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
        onDelete={onDelete}
      />
    </>
  );
}
