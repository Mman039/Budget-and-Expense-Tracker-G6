import { Text, View } from "react-native";
import {
  expenseTrackerStyles as styles,
  getProgressFillStyle,
} from "../styles/expenseTrackerStyles";
import { formatAmount as money } from "../utils/currency";

export function BudgetProgress({ label, spent, budget }) {
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
