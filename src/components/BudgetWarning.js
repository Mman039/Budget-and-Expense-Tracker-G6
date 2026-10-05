import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import {
  colors,
  expenseTrackerExtraStyles as extraStyles,
  getBudgetWarningStyle,
} from "../styles/expenseTrackerStyles";
import { formatAmount as money } from "../utils/currency";

export function BudgetWarning({
  weeklySpent,
  monthlySpent,
  weeklyBudget,
  monthlyBudget,
}) {
  const weeklyOver = weeklyBudget > 0 && weeklySpent >= weeklyBudget;
  const monthlyOver = monthlyBudget > 0 && monthlySpent >= monthlyBudget;
  const weeklyNear = weeklyBudget > 0 && weeklySpent >= weeklyBudget * 0.8;
  const monthlyNear = monthlyBudget > 0 && monthlySpent >= monthlyBudget * 0.8;

  if (!weeklyNear && !monthlyNear) return null;

  const messages = [];

  if (weeklyOver) {
    messages.push(
      `Weekly budget exceeded by ${money(weeklySpent - weeklyBudget)}.`,
    );
  } else if (weeklyNear) {
    messages.push(
      `Only ${money(Math.max(weeklyBudget - weeklySpent, 0))} left in your weekly budget.`,
    );
  }

  if (monthlyOver) {
    messages.push(
      `Monthly budget exceeded by ${money(monthlySpent - monthlyBudget)}.`,
    );
  } else if (monthlyNear) {
    messages.push(
      `Only ${money(Math.max(monthlyBudget - monthlySpent, 0))} left this month.`,
    );
  }

  return (
    <View style={getBudgetWarningStyle(weeklyOver || monthlyOver)}>
      <Ionicons
        name={
          weeklyOver || monthlyOver
            ? "warning-outline"
            : "notifications-outline"
        }
        size={22}
        color={weeklyOver || monthlyOver ? colors.warning : colors.orange}
      />
      <View style={extraStyles.warningText}>
        <Text style={extraStyles.warningTitle}>
          {weeklyOver || monthlyOver ? "Budget alert" : "Budget reminder"}
        </Text>
        {messages.map((message) => (
          <Text key={message} style={extraStyles.warningMessage}>
            {message}
          </Text>
        ))}
      </View>
    </View>
  );
}
