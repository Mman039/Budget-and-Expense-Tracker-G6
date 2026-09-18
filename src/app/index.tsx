import { useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseList } from "../components/ExpenseList";
import { ExpenseSummary } from "../components/ExpenseSummary";
import { initialExpenses } from "../data/initialExpenses";
import { expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";
import { Expense } from "../types/expense";

// Owns the screen state and connects the form, summary, and list components.
export default function Index() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Validates the form, then adds a new expense at the top of the list.
  const addExpense = () => {
    const parsedAmount = Number.parseFloat(amount);

    if (!name.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      Alert.alert("Add an expense", "Enter a name and an amount greater than zero.");
      return;
    }

    setExpenses((currentExpenses) => [
      {
        id: `₱{Date.now()}`,
        name: name.trim(),
        amount: parsedAmount,
        date: "Today",
      },
      ...currentExpenses,
    ]);
    setName("");
    setAmount("");
  };

  // Removes an expense by its stable identifier.
  const deleteExpense = (id: string) => {
    setExpenses((currentExpenses) => currentExpenses.filter((expense) => expense.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>PERSONAL FINANCE</Text>
            <Text style={styles.title}>Expense tracker</Text>
          </View>
          <View style={styles.monthBadge}>
            <Text style={styles.monthBadgeText}>SEP 2026</Text>
          </View>
        </View>

        <ExpenseSummary total={total} expenseCount={expenses.length} />
        <ExpenseForm name={name} amount={amount} setName={setName} setAmount={setAmount} onSubmit={addExpense} />
        <ExpenseList expenses={expenses} onDelete={deleteExpense} />
      </ScrollView>
    </SafeAreaView>
  );
}
