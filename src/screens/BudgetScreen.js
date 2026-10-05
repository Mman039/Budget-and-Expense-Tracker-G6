// This screen lets the user set and review spending limits.
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, TextInput, View } from "react-native";
import { BudgetProgress } from "../components/BudgetProgress";
import { BudgetWarning } from "../components/BudgetWarning";
import { Header } from "../components/Header";
import { SectionTitle } from "../components/SectionTitle";
import { colors, expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";
import { formatAmount as money } from "../utils/currency";

/**
 * Displays editable weekly and monthly maximum values.
 * The UI does not save to disk yet, but it does update the in-memory warnings.
 */
export function BudgetScreen({
  weeklyBudget,
  monthlyBudget,
  setWeeklyBudget,
  setMonthlyBudget,
  savedWeeklyBudget,
  savedMonthlyBudget,
  weekTotal,
  monthTotal,
  onSave,
}) {
  return (
    <>
      <Header eyebrow="PLAN AHEAD" title="Budget settings" />
      <BudgetWarning
        weeklySpent={weekTotal}
        monthlySpent={monthTotal}
        weeklyBudget={savedWeeklyBudget}
        monthlyBudget={savedMonthlyBudget}
      />
      <Text style={styles.helperText}>
        Set limits that feel realistic for your everyday spending.
      </Text>
      <View style={styles.card}>
        <Text style={styles.inputLabel}>WEEKLY MAXIMUM</Text>
        <View style={styles.amountBox}>
          <Text style={styles.currency}>₱</Text>
          <TextInput
            value={weeklyBudget}
            onChangeText={setWeeklyBudget}
            keyboardType="decimal-pad"
            style={styles.budgetInput}
          />
        </View>
        <Text style={styles.inputLabel}>MONTHLY MAXIMUM</Text>
        <View style={styles.amountBox}>
          <Text style={styles.currency}>₱</Text>
          <TextInput
            value={monthlyBudget}
            onChangeText={setMonthlyBudget}
            keyboardType="decimal-pad"
            style={styles.budgetInput}
          />
        </View>
        <Pressable style={styles.primaryButton} onPress={onSave}>
          <Ionicons name="save-outline" size={20} color={colors.white} />
          <Text style={styles.primaryButtonText}>Save budgets</Text>
        </Pressable>
      </View>
      <SectionTitle title="Current limits" />
      <View style={styles.card}>
        <BudgetProgress
          label="Weekly remaining"
          spent={Math.max(savedWeeklyBudget - weekTotal, 0)}
          budget={savedWeeklyBudget}
        />
        <Text style={styles.remainingText}>
          {money(Math.max(savedWeeklyBudget - weekTotal, 0))} left this week
        </Text>
        <BudgetProgress
          label="Monthly remaining"
          spent={Math.max(savedMonthlyBudget - monthTotal, 0)}
          budget={savedMonthlyBudget}
        />
        <Text style={styles.remainingText}>
          {money(Math.max(savedMonthlyBudget - monthTotal, 0))} left this month
        </Text>
      </View>
    </>
  );
}
