import { Text, View } from "react-native";
import {
  expenseTrackerStyles as styles,
  getSummaryDotStyle,
} from "../styles/expenseTrackerStyles";
import { formatAmount as money } from "../utils/currency";

export function SummaryCard({ label, value, color }) {
  return (
    <View style={styles.summaryCard}>
      <View style={getSummaryDotStyle(color)} />
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{money(value)}</Text>
    </View>
  );
}
