import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { getCategory } from "../data/categories";
import { expenseTrackerStyles } from "../styles/expenseTrackerStyles";
import { formatAmount } from "../utils/currency";
import { formatExpenseDate } from "../utils/dates";

// Renders expense rows with optional section heading and delete actions.
export function ExpenseList({
  expenses,
  onDelete,
  title = "Recent expenses",
  action,
  today,
  emptyTitle = "Nothing logged yet",
  emptyMessage = "Your next expense will appear here.",
  componentStyles = expenseTrackerStyles,
}) {
  const isAppList = Boolean(componentStyles.transactionRow);

  return (
    <>
      <View style={componentStyles.sectionHeader}>
        <Text style={componentStyles.sectionTitle}>{title}</Text>
        {action && (
          <Text
            style={
              isAppList ? componentStyles.sectionAction : componentStyles.count
            }
          >
            {action}
          </Text>
        )}
      </View>
      <View
        style={
          isAppList ? componentStyles.card : componentStyles.expenseList
        }
      >
        {expenses.length === 0 ? (
          <View style={componentStyles.emptyState}>
            {isAppList && (
              <Ionicons name="search-outline" size={30} color="#7B8794" />
            )}
            <Text style={componentStyles.emptyTitle}>{emptyTitle}</Text>
            <Text style={componentStyles.emptyText}>{emptyMessage}</Text>
          </View>
        ) : (
          expenses.map((expense, index) => {
            const category = getCategory(expense.category);
            const isLastRow = index === expenses.length - 1;
            const rowStyle = isAppList
              ? componentStyles.transactionRow
              : componentStyles.expenseRow;

            return (
              <View
                key={expense.id}
                style={[
                  rowStyle,
                  isLastRow && { borderBottomWidth: 0 },
                ]}
              >
                <View
                  style={[
                    isAppList
                      ? componentStyles.transactionIcon
                      : componentStyles.expenseIcon,
                    {
                      backgroundColor: isAppList
                        ? `${category.color}20`
                        : "#E7EEE6",
                    },
                  ]}
                >
                  {isAppList ? (
                    <Ionicons
                      name={category.icon}
                      size={20}
                      color={category.color}
                    />
                  ) : (
                    <Text style={componentStyles.expenseIconText}>₱</Text>
                  )}
                </View>
                <View
                  style={
                    isAppList
                      ? componentStyles.transactionDetails
                      : componentStyles.expenseDetails
                  }
                >
                  <Text
                    style={
                      isAppList
                        ? componentStyles.transactionDescription
                        : componentStyles.expenseName
                    }
                  >
                    {expense.description}
                  </Text>
                  <Text
                    style={
                      isAppList
                        ? componentStyles.transactionDate
                        : componentStyles.expenseDate
                    }
                  >
                    {isAppList
                      ? `${category.name} · ${formatExpenseDate(
                          expense.date,
                          today,
                        )}`
                      : expense.date}
                  </Text>
                </View>
                <Text
                  style={
                    isAppList
                      ? componentStyles.transactionAmount
                      : componentStyles.expenseAmount
                  }
                >
                  {formatAmount(expense.amount)}
                </Text>
                {onDelete && (
                  <Pressable
                    onPress={() => onDelete(expense.id)}
                    style={componentStyles.deleteButton}
                    accessibilityLabel={`Delete ${expense.description}`}
                    accessibilityRole="button"
                  >
                    {isAppList ? (
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#7B8794"
                      />
                    ) : (
                      <Text style={componentStyles.deleteButtonText}>x</Text>
                    )}
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
