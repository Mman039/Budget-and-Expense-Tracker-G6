// Shows one budget as a filled progress bar.
import { Text, View } from "react-native";
import {
  getProgressFillStyle,
  expenseTrackerStyles as styles,
} from "../styles/expenseTrackerStyles";
import { formatAmount as money } from "../utils/currency";

/**
 * Draws a progress bar and displays the amount spent next to the budget limit.
 */
export function BudgetProgress({ label, spent, budget }) {
  // Use a value from 0 to 1. The bar stops at full even if spending goes higher.
  const progress = budget > 0 ? Math.min(spent / budget, 1) : 0;

  return (
    <View style={styles.progressBlock}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>{label}</Text>
        <Text style={styles.progressValue}>
          {money(spent)} / {money(budget)}
        </Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={getProgressFillStyle(progress)} />
      </View>
    </View>
  );
}
