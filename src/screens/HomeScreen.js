import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { BudgetProgress } from "../components/BudgetProgress";
import { BudgetWarning } from "../components/BudgetWarning";
import { ExpenseList } from "../components/ExpenseList";
import { ExpenseSummary } from "../components/ExpenseSummary";
import { Header } from "../components/Header";
import { SectionTitle } from "../components/SectionTitle";
import { SummaryCard } from "../components/SummaryCard";
import {
  colors,
  getChartBarStyle,
  expenseTrackerStyles as styles,
} from "../styles/expenseTrackerStyles";

/**
 * Shows the main dashboard for the app.
 * It includes spending totals, budget progress, a seven-day chart,
 * and a short list of recent expenses.
 */
export function HomeScreen({
  expenses,
  monthExpenseCount,
  today,
  dateLabel,
  greeting,
  chartDays,
  todayTotal,
  weekTotal,
  monthTotal,
  savedWeeklyBudget,
  savedMonthlyBudget,
  onAdd,
  onHistory,
  onStats,
}) {
  // Add up the expenses for each date shown in the chart.
  const chartTotals = chartDays.map((date) =>
    expenses
      .filter((expense) => expense.date === date)
      .reduce((sum, expense) => sum + expense.amount, 0),
  );
  // The biggest chart total sets the height used for the other chart bars.
  const maxChartValue = Math.max(...chartTotals, 1);

  return (
    <>
      <Header
        eyebrow={dateLabel}
        title={greeting}
      />
      <BudgetWarning
        weeklySpent={weekTotal}
        monthlySpent={monthTotal}
        weeklyBudget={savedWeeklyBudget}
        monthlyBudget={savedMonthlyBudget}
      />
      <ExpenseSummary
        total={monthTotal}
        caption={`Across ${monthExpenseCount} transactions`}
      />
      <View style={styles.summaryRow}>
        {/* These cards show totals for today, this week, and this month. */}
        <SummaryCard label="Today" value={todayTotal} color={colors.orange} />
        <SummaryCard label="This week" value={weekTotal} color={colors.blue} />
        <SummaryCard
          label="This month"
          value={monthTotal}
          color={colors.green}
        />
      </View>
      <SectionTitle title="Budget progress" />
      <View style={styles.card}>
        <BudgetProgress
          label="Weekly limit"
          spent={weekTotal}
          budget={savedWeeklyBudget}
        />
        <BudgetProgress
          label="Monthly limit"
          spent={monthTotal}
          budget={savedMonthlyBudget}
        />
      </View>
      <Pressable
        style={styles.primaryButton}
        onPress={onAdd}
        accessibilityRole="button"
      >
        <Ionicons name="add-circle-outline" size={21} color={colors.white} />
        <Text style={styles.primaryButtonText}>Add expense</Text>
      </Pressable>
      <SectionTitle
        title="Last 7 days"
        action="View stats"
        onAction={onStats}
      />
      <View style={styles.card}>
        <View style={styles.chart}>
          {chartTotals.map((total, index) => (
            <View key={chartDays[index]} style={styles.barColumn}>
              <View
                style={getChartBarStyle(
                  Math.max(6, (total / maxChartValue) * 92),
                )}
              />
              <Text style={styles.barLabel}>
                {chartDays[index].slice(8, 10)}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <ExpenseList
        expenses={expenses.slice(0, 5)}
        title="Recent transactions"
        action="See all"
        onAction={onHistory}
        today={today}
      />
    </>
  );
}
