// This screen summarises the spending pattern in a more analytical way.
import { Text, View } from "react-native";
import { Header } from "../components/Header";
import { SectionTitle } from "../components/SectionTitle";
import { StatCard } from "../components/StatCard";
import { categories } from "../data/categories";
import {
  colors,
  getBreakdownFillStyle,
  expenseTrackerStyles as styles,
} from "../styles/expenseTrackerStyles";
import { formatAmount as money } from "../utils/currency";

/**
 * Shows high-level insights such as the daily average and the biggest spending category.
 * It uses the current expense list instead of any external database.
 */
export function StatsScreen({ expenses, monthTotal }) {
  const highest = expenses.reduce(
    (max, expense) => Math.max(max, expense.amount),
    0,
  ); // Find the highest single expense amount from the list of expenses.
  const categoryTotals = categories.map((category) => ({
    name: category.name,
    total: expenses
      .filter((expense) => expense.category === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0),
  })); // Calculate the total spending for each category by filtering expenses and summing their amounts.
  const topCategory = categoryTotals.reduce(
    (top, category) => (category.total > top.total ? category : top), // Find the category with the highest total spending.
    categoryTotals[0], // Start with the first category as the initial top category.
  );
  const average = expenses.length > 0 ? monthTotal / 30 : 0; // Calculate the daily average spending by dividing the total monthly spending by 30, ensuring there are expenses to avoid division by zero.

  return (
    <>
      <Header eyebrow="UNDERSTAND YOUR HABITS" title="Your stats" />
      <Text style={styles.helperText}>
        Small patterns add up. Here is what your sample month says.
      </Text>
      <View style={styles.statGrid}>
        <StatCard
          label="Daily average"
          value={money(average)}
          icon="calendar-outline"
          color={colors.blue}
        />
        <StatCard
          label="Highest expense"
          value={money(highest)}
          icon="cash-outline"
          color={colors.orange}
        />
        <StatCard
          label="Top category"
          value={topCategory.name}
          icon="trophy-outline"
          color={colors.green}
        />
      </View>
      <SectionTitle title="Category breakdown" />
      <View style={styles.card}>
        {categoryTotals
          .filter((category) => category.total > 0)
          .map((category) => (
            <View key={category.name} style={styles.breakdownRow}>
              <Text style={styles.breakdownName}>{category.name}</Text>
              <View style={styles.breakdownTrack}>
                <View
                  style={getBreakdownFillStyle(
                    category.total / Math.max(monthTotal, 1),
                  )}
                />
              </View>
              <Text style={styles.breakdownValue}>{money(category.total)}</Text>
            </View>
          ))}
      </View>
    </>
  );
}
