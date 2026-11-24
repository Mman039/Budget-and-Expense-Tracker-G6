import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, TextInput, View } from "react-native";
import { BudgetProgress } from "../components/BudgetProgress";
import { BudgetWarning } from "../components/BudgetWarning";
import { Header } from "../components/Header";
import { SectionTitle } from "../components/SectionTitle";
import {
  colors,
  expenseTrackerStyles as styles,
} from "../styles/expenseTrackerStyles";
import { formatAmount as money } from "../utils/currency";

/**
 * Shows the weekly and monthly budget fields.
 * It also shows the amount spent and the amount left for each limit.
 */
export function BudgetScreen({
  weeklyBudget,
  monthlyBudget,
  weekTotal,
  monthTotal,
  onSave,
}) {
  // Text inputs keep separate values until the user presses Save budgets.
  const [weeklyInput, setWeeklyInput] = useState(String(weeklyBudget));
  const [monthlyInput, setMonthlyInput] = useState(String(monthlyBudget));

  return (
    <>
      <Header eyebrow="PLAN AHEAD" title="Budget settings" />
      <BudgetWarning
        weeklySpent={weekTotal}
        monthlySpent={monthTotal}
        weeklyBudget={weeklyBudget}
        monthlyBudget={monthlyBudget}
      />
      <Text style={styles.helperText}>
        Set limits that feel realistic for your everyday spending.
      </Text>
      <View style={styles.card}>
        <Text style={styles.inputLabel}>WEEKLY MAXIMUM</Text>
        <View style={styles.amountBox}>
          <Text style={styles.currency}>₱</Text>
          <TextInput
            value={weeklyInput}
            onChangeText={setWeeklyInput}
            keyboardType="decimal-pad"
            style={styles.budgetInput}
          />
        </View>
        <Text style={styles.inputLabel}>MONTHLY MAXIMUM</Text>
        <View style={styles.amountBox}>
          <Text style={styles.currency}>₱</Text>
          <TextInput
            value={monthlyInput}
            onChangeText={setMonthlyInput}
            keyboardType="decimal-pad"
            style={styles.budgetInput}
          />
        </View>
        <Pressable
          style={styles.primaryButton}
          onPress={() => onSave(weeklyInput, monthlyInput)}
        >
          <Ionicons name="save-outline" size={20} color={colors.white} />
          <Text style={styles.primaryButtonText}>Save budgets</Text>
        </Pressable>
      </View>
      <SectionTitle title="Current limits" />
      <View style={styles.card}>
        <BudgetProgress
          label="Weekly spending"
          spent={weekTotal}
          budget={weeklyBudget}
        />
        <Text style={styles.remainingText}>
          {weeklyBudget > 0
            ? `${money(Math.max(weeklyBudget - weekTotal, 0))} left this week`
            : "No weekly limit set"}
        </Text>
        <BudgetProgress
          label="Monthly spending"
          spent={monthTotal}
          budget={monthlyBudget}
        />
        <Text style={styles.remainingText}>
          {monthlyBudget > 0
            ? `${money(Math.max(monthlyBudget - monthTotal, 0))} left this month`
            : "No monthly limit set"}
        </Text>
      </View>
    </>
  );
}
