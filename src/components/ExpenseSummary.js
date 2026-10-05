// Large summary card shown at the top of the home dashboard.
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import {
  colors,
  expenseTrackerStyles as styles,
} from "../styles/expenseTrackerStyles";
import { formatAmount } from "../utils/currency";

/**
 * Displays the main month total with a supporting caption.
 * This is the first thing the user sees when they open the app.
 */
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
