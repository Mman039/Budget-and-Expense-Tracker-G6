// Progress bar that shows how close the user is to a spending limit.
import { Text, View } from "react-native";
import {
  getProgressFillStyle,
  expenseTrackerStyles as styles,
} from "../styles/expenseTrackerStyles";
import { formatAmount as money } from "../utils/currency";

/**
 * Renders a horizontal bar whose width reflects the percentage of the budget used.
 */
export function BudgetProgress({ label, spent, budget }) {
  const progress = budget > 0 ? Math.min(spent / budget, 1) : 0; // Calculate the progress as a fraction of the budget, ensuring it doesn't exceed 1 (100%).

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
