// Shared list used for recent expenses and search results.
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { getCategory } from "../data/categories";
import {
  colors,
  expenseTrackerStyles as styles,
  getTransactionIconStyle,
  getTransactionRowStyle,
} from "../styles/expenseTrackerStyles";
import { formatAmount } from "../utils/currency";
import { formatExpenseDate } from "../utils/dates";

/**
 * Lists expense rows in a reusable card layout.
 * It can optionally show a delete button and an action label such as "See all".
 */
export function ExpenseList({
  expenses,
  onDelete,
  title = "Recent expenses",
  action,
  onAction,
  today,
  emptyTitle = "Nothing logged yet",
  emptyMessage = "Your next expense will appear here.",
}) {
  const actionContent =
    action &&
    (onAction ? (
      <Pressable onPress={onAction} accessibilityRole="button">
        <Text style={styles.sectionAction}>{action}</Text>
      </Pressable>
    ) : (
      <Text style={styles.sectionAction}>{action}</Text>
    ));

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {actionContent}
      </View>
      <View style={styles.card}>
        {expenses.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={30} color={colors.muted} />
            <Text style={styles.emptyTitle}>{emptyTitle}</Text>
            <Text style={styles.emptyText}>{emptyMessage}</Text>
          </View>
        ) : (
          expenses.map((expense, index) => {
            const category = getCategory(expense.category);
            const isLastRow = index === expenses.length - 1;

            return (
              <View key={expense.id} style={getTransactionRowStyle(isLastRow)}>
                <View style={getTransactionIconStyle(category)}>
                  <Ionicons
                    name={category.icon}
                    size={20}
                    color={category.color}
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionDescription}>
                    {expense.description}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {category.name} · {formatExpenseDate(expense.date, today)}
                  </Text>
                </View>
                <Text style={styles.transactionAmount}>
                  {formatAmount(expense.amount)}
                </Text>
                {onDelete && (
                  <Pressable
                    onPress={() => onDelete(expense.id)}
                    style={styles.deleteButton}
                    accessibilityLabel={`Delete ${expense.description}`}
                    accessibilityRole="button"
                  >
                    <Ionicons
                      name="trash-outline"
                      size={18}
                      color={colors.muted}
                    />
                  </Pressable>
                )}
              </View>
            );
          })
        )}
      </View>
    </>
  );
}
