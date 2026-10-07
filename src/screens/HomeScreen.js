// This screen is the main dashboard for the prototype app.
// It summarizes today's, week's, and month's spending and shows a chart plus recent entries.
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
 * Displays the dashboard summary and the main spending chart.
 * The 7-day chart is calculated from sample expense dates in the current prototype month.
 */
export function HomeScreen({
  expenses,
  today,
  todayTotal,
  weekTotal,
  monthTotal,
  savedWeeklyBudget,
  savedMonthlyBudget,
  onAdd,
  onHistory,
  onStats,
}) {
  const chartDays = ["18", "19", "20", "21", "22", "23", "24"];
  const chartTotals = chartDays.map((day) =>
    expenses
      .filter((expense) => expense.date === `2026-09-${day}`)
      .reduce((sum, expense) => sum + expense.amount, 0),
  ); // Calculate the total spending for each of the last 7 days by filtering expenses by date and summing their amounts.
  const maxChartValue = Math.max(...chartTotals, 1); // Find the maximum spending value from the last 7 days to scale the chart bars, ensuring a minimum of 1 to avoid division by zero.

  return (
    <>
      <Header
        eyebrow="THURSDAY, SEPTEMBER 24"
        title="Good morning"
        action={
          <Pressable style={styles.headerIcon} onPress={onAdd}>
            <Ionicons name="add" size={24} color={colors.white} />
          </Pressable>
        }
      />
      <BudgetWarning
        weeklySpent={weekTotal}
        monthlySpent={monthTotal}
        weeklyBudget={savedWeeklyBudget}
        monthlyBudget={savedMonthlyBudget}
      />
      <ExpenseSummary
        total={monthTotal}
        caption={`Across ${expenses.length} transactions`}
      />
      <View style={styles.summaryRow}>
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
              <Text style={styles.barLabel}>{chartDays[index]}</Text>
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
