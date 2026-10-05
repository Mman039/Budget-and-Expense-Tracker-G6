import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { expenseTrackerStyles } from "../styles/expenseTrackerStyles";
import { formatAmount } from "../utils/currency";

// Displays a spending total and the number of expenses it represents.
export function ExpenseSummary({
  total,
  expenseCount,
  caption = `${expenseCount} expenses recorded this month`,
  componentStyles = expenseTrackerStyles,
}) {
  const isDashboardSummary = Boolean(componentStyles.heroCard);

  return (
    <View
      style={
        isDashboardSummary
          ? componentStyles.heroCard
          : componentStyles.totalCard
      }
    >
      <View>
        <Text
          style={
            isDashboardSummary
              ? componentStyles.heroLabel
              : componentStyles.totalLabel
          }
        >
          {isDashboardSummary ? "TOTAL THIS MONTH" : "TOTAL SPENT"}
        </Text>
        <Text
          style={
            isDashboardSummary
              ? componentStyles.heroAmount
              : componentStyles.totalAmount
          }
        >
          {formatAmount(total)}
        </Text>
        <Text
          style={
            isDashboardSummary
              ? componentStyles.heroCaption
              : componentStyles.totalCaption
          }
        >
          {caption}
        </Text>
      </View>
      {isDashboardSummary && (
        <View style={componentStyles.heroMark}>
          <Ionicons name="trending-up" size={26} color="#A7F3D0" />
        </View>
      )}
    </View>
  );
}
