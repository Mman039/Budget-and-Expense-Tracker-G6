// Small box used in the home dashboard to show a single metric.
import { Text, View } from "react-native";
import {
  expenseTrackerStyles as styles,
  getSummaryDotStyle,
} from "../styles/expenseTrackerStyles";
import { formatAmount as money } from "../utils/currency";

/**
 * Displays a compact card with a colored dot, a label, and a total amount.
 */
export function SummaryCard({ label, value, color }) {
  return (
    <View style={styles.summaryCard}>
      <View style={getSummaryDotStyle(color)} />
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{money(value)}</Text>
    </View>
  );
}
