import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import { ScreenFrame } from "../components/ScreenFrame";
import { ExpenseProvider, useExpenseData } from "../context/ExpenseContext";
import { colors, expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";
import { getLocalDate, getLastSevenDays, getStartOfWeek } from "../utils/dates";
import { AddExpenseScreen } from "./AddExpenseScreen";
import { BudgetScreen } from "./BudgetScreen";
import { HistoryScreen } from "./HistoryScreen";
import { HomeScreen } from "./HomeScreen";
import { StatsScreen } from "./StatsScreen";

// Create the two main navigation types used by the app.
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

// Names connect the bottom tab icon map to each tab's screen name.
const tabIcons = {
  Home: "home-outline",
  History: "list-outline",
  Budget: "wallet-outline",
  Stats: "bar-chart-outline",
};

function LoadingScreen() {
  // This page appears while saved data is being read.
  return (
    <ScreenFrame>
      <View style={styles.card}>
        <ActivityIndicator size="large" color={colors.blue} />
        <Text style={styles.helperText}>Loading your saved expenses…</Text>
      </View>
    </ScreenFrame>
  );
}

function StorageErrorScreen() {
  const { loadError, loadData, resetStoredData } = useExpenseData();

  return (
    <ScreenFrame>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Saved data unavailable</Text>
        <Text style={styles.helperText}>{loadError}</Text>
        <Pressable style={styles.primaryButton} onPress={loadData}>
          <Text style={styles.primaryButtonText}>Try again</Text>
        </Pressable>
        <Pressable
          style={[styles.primaryButton, { backgroundColor: colors.warning }]}
          onPress={resetStoredData}
        >
          <Text style={styles.primaryButtonText}>
            Clear saved data and start fresh
          </Text>
        </Pressable>
      </View>
    </ScreenFrame>
  );
}

function MainTabs({ navigation }) {
  // Read saved expenses and budgets from the shared app context.
  const {
    expenses,
    weeklyBudget,
    monthlyBudget,
    storageError,
    deleteExpense,
    saveBudgets,
  } = useExpenseData();
  // Refresh the date once a minute so totals stay accurate during the day.
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  // Keep one local date string and use it for all current-day calculations.
  const today = getLocalDate(now);
  const currentMonth = today.slice(0, 7);
  const weekStart = getStartOfWeek(now);
  // Filter the full expense list into this month and this week.
  const monthExpenses = expenses.filter((expense) =>
    expense.date.startsWith(currentMonth),
  );
  const weekExpenses = expenses.filter(
    (expense) => expense.date >= weekStart && expense.date <= today,
  );
  // Build the seven dates used by the home chart.
  const chartDays = getLastSevenDays(now);
  // Add the amounts for each time period.
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
  // Change the greeting based on the time of day.
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const dateLabel = now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const openAddExpense = () => navigation.navigate("Add");

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.navy,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "700" },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabIcons[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tabs.Screen name="Home">
        {({ navigation: tabNavigation }) => (
          <ScreenFrame storageError={storageError}>
            <HomeScreen
              expenses={expenses}
              monthExpenseCount={monthExpenses.length}
              today={today}
              dateLabel={dateLabel}
              greeting={greeting}
              chartDays={chartDays}
              todayTotal={todayTotal}
              weekTotal={weekTotal}
              monthTotal={monthTotal}
              savedWeeklyBudget={weeklyBudget}
              savedMonthlyBudget={monthlyBudget}
              onAdd={openAddExpense}
              onHistory={() => tabNavigation.navigate("History")}
              onStats={() => tabNavigation.navigate("Stats")}
            />
          </ScreenFrame>
        )}
      </Tabs.Screen>
      <Tabs.Screen name="History">
        {() => (
          <ScreenFrame storageError={storageError}>
            <HistoryScreen
              expenses={expenses}
              today={today}
              onDelete={deleteExpense}
            />
          </ScreenFrame>
        )}
      </Tabs.Screen>
      <Tabs.Screen name="Budget">
        {() => (
          <ScreenFrame storageError={storageError}>
            <BudgetScreen
              key={`${weeklyBudget}:${monthlyBudget}`}
              weeklyBudget={weeklyBudget}
              monthlyBudget={monthlyBudget}
              weekTotal={weekTotal}
              monthTotal={monthTotal}
              onSave={(weeklyInput, monthlyInput) => {
                const nextWeeklyBudget = Number(weeklyInput);
                const nextMonthlyBudget = Number(monthlyInput);
                if (
                  !Number.isFinite(nextWeeklyBudget) ||
                  nextWeeklyBudget < 0 ||
                  !Number.isFinite(nextMonthlyBudget) ||
                  nextMonthlyBudget < 0
                ) {
                  Alert.alert(
                    "Invalid budget",
                    "Enter zero or a positive amount for each budget.",
                  );
                  return;
                }
                saveBudgets(nextWeeklyBudget, nextMonthlyBudget);
                Alert.alert("Budget saved", "Your spending limits are active.");
              }}
            />
          </ScreenFrame>
        )}
      </Tabs.Screen>
      <Tabs.Screen name="Stats">
        {() => (
          <ScreenFrame storageError={storageError}>
            <StatsScreen expenses={monthExpenses} monthTotal={monthTotal} />
          </ScreenFrame>
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

function AddExpenseRoute({ navigation }) {
  // Read quick-add shortcuts and expense actions from the shared app context.
  const {
    quickAdds,
    addExpense,
    updateQuickAdd,
    addQuickAdd,
    removeQuickAdd,
    weeklyBudget,
    monthlyBudget,
    expenses,
    storageError,
  } = useExpenseData();
  // Expense totals are based on the device's local date.
  const now = new Date();
  const today = getLocalDate(now);
  const weekStart = getStartOfWeek(now);
  const weekTotal = expenses
    .filter((expense) => expense.date >= weekStart && expense.date <= today)
    .reduce((sum, expense) => sum + expense.amount, 0);
  const monthTotal = expenses
    .filter((expense) => expense.date.startsWith(today.slice(0, 7)))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const submitExpense = ({ description, amount, category }) => {
    // Convert and validate the amount before saving.
    const parsedAmount = Number(amount);
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

    // Check whether the new expense will go past either spending limit.
    const overBudget =
      (weeklyBudget > 0 && weekTotal + parsedAmount > weeklyBudget) ||
      (monthlyBudget > 0 && monthTotal + parsedAmount > monthlyBudget);

    addExpense({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      amount: parsedAmount,
      description: description.trim(),
      category,
      date: today,
    });

    if (overBudget) {
      Alert.alert(
        "Budget reminder",
        "This expense puts you over one of your spending limits.",
      );
    }
    navigation.goBack();
    return true;
  };

  return (
    <ScreenFrame storageError={storageError}>
      <AddExpenseScreen
        quickAdds={quickAdds}
        onEditQuickAdd={updateQuickAdd}
        onAddQuickAdd={addQuickAdd}
        onRemoveQuickAdd={removeQuickAdd}
        onSubmit={submitExpense}
        onCancel={() => navigation.goBack()}
      />
    </ScreenFrame>
  );
}

function AppNavigation() {
  const { isLoading, loadError } = useExpenseData();

  if (isLoading) return <LoadingScreen />;
  if (loadError) return <StorageErrorScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Add" component={AddExpenseRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function Index() {
  return (
    <ExpenseProvider>
      <AppNavigation />
    </ExpenseProvider>
  );
}
