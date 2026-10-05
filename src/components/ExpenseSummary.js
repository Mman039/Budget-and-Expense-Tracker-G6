import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import {
  colors,
  expenseTrackerStyles as styles,
} from "../styles/expenseTrackerStyles";
import { formatAmount } from "../utils/currency";

// Displays a spending total and the number of expenses it represents.
export function ExpenseSummary({ total, caption }) {
  return (
    <View style={styles.heroCard}>
      <View>
        <Text style={styles.heroLabel}>TOTAL THIS MONTH</Text>
        <Text style={styles.heroAmount}>{formatAmount(total)}</Text>
        <Text style={styles.heroCaption}>{caption}</Text>
      </View>
      <View style={styles.heroMark}>
        <Ionicons name="trending-up" size={26} color={colors.mint} />
      </View>
    </View>
  );
}
