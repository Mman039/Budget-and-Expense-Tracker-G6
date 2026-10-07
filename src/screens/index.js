// This file acts as the app's main controller.
// It keeps shared app data in memory, decides which screen is shown,
// and connects the screen components to the same state.
// Because this is a prototype, the data is not saved to storage and resets
// when the app is reloaded.

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert } from "react-native";
import { ScreenFrame } from "../components/ScreenFrame";
import { initialExpenses } from "../data/initialExpenses";
import { AddExpenseScreen } from "./AddExpenseScreen";
import { BudgetScreen } from "./BudgetScreen";
import { HistoryScreen } from "./HistoryScreen";
import { HomeScreen } from "./HomeScreen";
import { StatsScreen } from "./StatsScreen";

// This date is hardcoded because the prototype uses a fixed sample month.
// All calculations are based on this value so the dashboard numbers look consistent.
const today = "2026-10-08";
const maxQuickAdds = 6;
const Stack = createNativeStackNavigator();

// These are the default shortcut entries that appear in the add-expense form.
const defaultQuickAdds = [
  { id: "coffee", label: "Coffee", amount: "7" },
  { id: "lunch", label: "Lunch", amount: "40" },
  { id: "ride2school", label: "Tricycle Fare", amount: "15" },
];

/**
 * Main app container.
 *
 * This component owns the prototype state for expenses, budgets, and quick-add
 * shortcuts. The screen components receive the data through props, which keeps
 * all pages synced without needing a global store.
 */
export default function Index() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [searchText, setSearchText] = useState("");
  const [weeklyBudget, setWeeklyBudget] = useState("250");
  const [monthlyBudget, setMonthlyBudget] = useState("900");
  const [savedWeeklyBudget, setSavedWeeklyBudget] = useState(250);
  const [savedMonthlyBudget, setSavedMonthlyBudget] = useState(900);
  const [quickAdds, setQuickAdds] = useState(defaultQuickAdds);

  // These filtered totals are used by the dashboard cards and reminder logic.
  // They calculate spending for "recent" and "monthly" windows without needing a backend.
  const weekExpenses = expenses.filter(
    (expense) => expense.date >= "2026-09-18",
  );
  const monthExpenses = expenses.filter(
    (expense) => expense.date.substring(0, 7) === "2026-09",
  );
  const todayTotal = expenses
    .filter((expense) => expense.date === today)
    .reduce((sum, expense) => sum + expense.amount, 0);
  const weekTotal = weekExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const monthTotal = monthExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  /**
   * Validates the entered expense and adds it to the in-memory list.
   * Returns true when the save succeeds so the caller can navigate away.
   */
  const addExpense = () => {
    const parsedAmount = Number.parseFloat(amount);
    if (
      !description.trim() ||
      !Number.isFinite(parsedAmount) ||
      parsedAmount <= 0
    ) {
      Alert.alert(
        "Missing details",
        "Add a description and an amount greater than zero.",
      );
      return false;
    }

    const nextWeekTotal = weekTotal + parsedAmount;
    const nextMonthTotal = monthTotal + parsedAmount;
    if (
      (savedWeeklyBudget > 0 && nextWeekTotal > savedWeeklyBudget) ||
      (savedMonthlyBudget > 0 && nextMonthTotal > savedMonthlyBudget)
    ) {
      Alert.alert(
        "Budget reminder",
        "This expense will put you over one of your budget limits.",
      );
    }

    setExpenses((currentExpenses) => [
      {
        id: String(Date.now()),
        amount: parsedAmount,
        description: description.trim(),
        category: selectedCategory,
        date: today,
      },
      ...currentExpenses,
    ]);
    setDescription("");
    setAmount("");
    return true;
  };

  // Removes a single expense from the current list by matching its unique id.
  const deleteExpense = (id) =>
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    );

  // Prefills the expense form from a fast shortcut. This keeps repeated entries quick.
  const quickAdd = (quickAmount, quickDescription) => {
    setAmount(String(quickAmount));
    setDescription(quickDescription);
  };

  // Updates a single field inside one quick-add item without mutating the rest.
  const updateQuickAdd = (id, field, value) => {
    setQuickAdds((currentQuickAdds) =>
      currentQuickAdds.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  // Adds another reusable shortcut row, but never past the prototype limit.
  const addQuickAdd = () => {
    setQuickAdds((currentQuickAdds) => {
      if (currentQuickAdds.length >= maxQuickAdds) return currentQuickAdds;
      return [
        ...currentQuickAdds,
        {
          id: `quick-add-${Date.now()}`,
          label: "",
          amount: "",
        },
      ];
    });
  };

  // Deletes one shortcut from the quick-add list by id.
  const removeQuickAdd = (id) => {
    setQuickAdds((currentQuickAdds) =>
      currentQuickAdds.filter((item) => item.id !== id),
    );
  };

  // Saves the edited budget limits into the values used by the warning and progress UI.
  const saveBudgets = () => {
    const nextWeeklyBudget = Number(weeklyBudget) || 0;
    const nextMonthlyBudget = Number(monthlyBudget) || 0;
    setSavedWeeklyBudget(nextWeeklyBudget);
    setSavedMonthlyBudget(nextMonthlyBudget);

    if (
      (nextWeeklyBudget > 0 && weekTotal > nextWeeklyBudget) ||
      (nextMonthlyBudget > 0 && monthTotal > nextMonthlyBudget)
    ) {
      Alert.alert(
        "Budget reminder",
        "Your current spending is already over one of the new limits.",
      );
    } else {
      Alert.alert("Budget saved", "Your new limits are active.");
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home">
          {({ navigation }) => (
            <ScreenFrame navigation={navigation} activeScreen="Home">
              <HomeScreen
                expenses={expenses}
                today={today}
                todayTotal={todayTotal}
                weekTotal={weekTotal}
                monthTotal={monthTotal}
                savedWeeklyBudget={savedWeeklyBudget}
                savedMonthlyBudget={savedMonthlyBudget}
                onAdd={() => navigation.navigate("Add")}
                onHistory={() => navigation.navigate("History")}
                onStats={() => navigation.navigate("Stats")}
              />
            </ScreenFrame>
          )}
        </Stack.Screen>

        <Stack.Screen name="Add">
          {({ navigation }) => (
            <ScreenFrame navigation={navigation} activeScreen="Add">
              <AddExpenseScreen
                description={description}
                amount={amount}
                selectedCategory={selectedCategory}
                setDescription={setDescription}
                setAmount={setAmount}
                setSelectedCategory={setSelectedCategory}
                quickAdds={quickAdds}
                onQuickAdd={quickAdd}
                onEditQuickAdd={updateQuickAdd}
                onAddQuickAdd={addQuickAdd}
                onRemoveQuickAdd={removeQuickAdd}
                onSubmit={() => {
                  if (addExpense()) navigation.navigate("Home");
                }}
              />
            </ScreenFrame>
          )}
        </Stack.Screen>

        <Stack.Screen name="History">
          {({ navigation }) => (
            <ScreenFrame navigation={navigation} activeScreen="History">
              <HistoryScreen
                expenses={expenses}
                today={today}
                searchText={searchText}
                setSearchText={setSearchText}
                onDelete={deleteExpense}
              />
            </ScreenFrame>
          )}
        </Stack.Screen>

        <Stack.Screen name="Budget">
          {({ navigation }) => (
            <ScreenFrame navigation={navigation} activeScreen="Budget">
              <BudgetScreen
                weeklyBudget={weeklyBudget}
                monthlyBudget={monthlyBudget}
                setWeeklyBudget={setWeeklyBudget}
                setMonthlyBudget={setMonthlyBudget}
                savedWeeklyBudget={savedWeeklyBudget}
                savedMonthlyBudget={savedMonthlyBudget}
                weekTotal={weekTotal}
                monthTotal={monthTotal}
                onSave={saveBudgets}
              />
            </ScreenFrame>
          )}
        </Stack.Screen>

        <Stack.Screen name="Stats">
          {({ navigation }) => (
            <ScreenFrame navigation={navigation} activeScreen="Stats">
              <StatsScreen expenses={expenses} monthTotal={monthTotal} />
            </ScreenFrame>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
