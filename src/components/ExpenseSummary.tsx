import { Text, View } from "react-native";
import { expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";
import { formatAmount } from "../utils/currency";

type ExpenseSummaryProps = { total: number; expenseCount: number };

// Displays the running total and the number of expenses recorded this month.
export function ExpenseSummary({ total, expenseCount }: ExpenseSummaryProps) {
  return (
    <View style={styles.totalCard}>
      <Text style={styles.totalLabel}>TOTAL SPENT</Text>
      <Text style={styles.totalAmount}>{formatAmount(total)}</Text>
      <Text style={styles.totalCaption}>{expenseCount} expenses recorded this month</Text>
    </View>
  );
}