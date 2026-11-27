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
 * Shows this month's spending information.
 */
export function StatsScreen({ expenses, monthTotal }) {
  // Find the amount of the largest expense in the current month.
  const highest = expenses.reduce(
    (max, expense) => Math.max(max, expense.amount),
    0,
  );
  // Add all expenses for each category.
  const categoryTotals = categories.map((category) => ({
    name: category.name,
    total: expenses
      .filter((expense) => expense.category === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0),
  }));
  // The category with the largest total is shown in the top-category card.
  const topCategory = categoryTotals.reduce(
    (top, category) => (category.total > top.total ? category : top),
    categoryTotals[0],
  );
  // Divide this month's total by the number of days reached so far.
  const average = monthTotal / new Date().getDate();

  return (
    <>
      <Header eyebrow="UNDERSTAND YOUR HABITS" title="Your stats" />
      <Text style={styles.helperText}>
        Insights from your spending this month.
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
          value={highest > 0 ? money(highest) : money(0)}
          icon="cash-outline"
          color={colors.orange}
        />
        <StatCard
          label="Top category"
          value={monthTotal > 0 ? topCategory.name : "No spending yet"}
          icon="trophy-outline"
          color={colors.green}
        />
      </View>
      <SectionTitle title="Category breakdown" />
      <View style={styles.card}>
        {monthTotal === 0 ? (
          <Text style={styles.helperText}>
            Add an expense to see your category breakdown.
          </Text>
        ) : (
          categoryTotals
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
                <Text style={styles.breakdownValue}>
                  {money(category.total)}
                </Text>
              </View>
            ))
        )}
      </View>
    </>
  );
}
