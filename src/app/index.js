//index.js contains the app’s Home, Add, History, Budget, and Stats screens and their behavior.

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseList } from "../components/ExpenseList";
import { ExpenseSummary } from "../components/ExpenseSummary";
import { categories, getCategory } from "../data/categories";
import { initialExpenses } from "../data/initialExpenses";
import {
  colors,
  expenseTrackerExtraStyles as extraStyles,
  expenseTrackerStyles as styles,
  getBreakdownFillStyle,
  getBudgetWarningStyle,
  getCategoryButtonStyle,
  getCategoryIconStyle,
  getChartBarStyle,
  getProgressFillStyle,
  getSummaryDotStyle,
  getTabLabelStyle,
} from "../styles/expenseTrackerStyles";
import { formatAmount as money } from "../utils/currency";
const tabs = [
  { id: "dashboard", label: "Home", icon: "home-outline" },
  { id: "add", label: "Add", icon: "add-circle-outline" },
  { id: "history", label: "History", icon: "list-outline" },
  { id: "budget", label: "Budget", icon: "wallet-outline" },
  { id: "stats", label: "Stats", icon: "bar-chart-outline" },
];
const today = "2026-09-24";
const maxQuickAdds = 4;

// These quick-add values are normal state so the user can change the label or amount.
const defaultQuickAdds = [
  { id: "coffee", label: "Coffee", amount: "7" },
  { id: "lunch", label: "Lunch", amount: "40" },
  { id: "ride2school", label: "Tricycle Fare", amount: "15" },
];

// Shows a friendly warning when spending is close to or above a budget limit.
function BudgetWarning({
  weeklySpent,
  monthlySpent,
  weeklyBudget,
  monthlyBudget,
}) {
  const weeklyOver = weeklyBudget > 0 && weeklySpent >= weeklyBudget;
  const monthlyOver = monthlyBudget > 0 && monthlySpent >= monthlyBudget;
  const weeklyNear = weeklyBudget > 0 && weeklySpent >= weeklyBudget * 0.8;
  const monthlyNear = monthlyBudget > 0 && monthlySpent >= monthlyBudget * 0.8;
  if (!weeklyNear && !monthlyNear) return null;
  const messages = [];
  if (weeklyOver)
    messages.push(
      `Weekly budget exceeded by ${money(weeklySpent - weeklyBudget)}.`,
    );
  else if (weeklyNear)
    messages.push(
      `Only ${money(Math.max(weeklyBudget - weeklySpent, 0))} left in your weekly budget.`,
    );
  if (monthlyOver)
    messages.push(
      `Monthly budget exceeded by ${money(monthlySpent - monthlyBudget)}.`,
    );
  else if (monthlyNear)
    messages.push(
      `Only ${money(Math.max(monthlyBudget - monthlySpent, 0))} left this month.`,
    );
  return (
    <View
      style={getBudgetWarningStyle(weeklyOver || monthlyOver)}
    >
      <Ionicons
        name={
          weeklyOver || monthlyOver
            ? "warning-outline"
            : "notifications-outline"
        }
        size={22}
        color={weeklyOver || monthlyOver ? colors.warning : colors.orange}
      />
      <View style={extraStyles.warningText}>
        <Text style={extraStyles.warningTitle}>
          {weeklyOver || monthlyOver ? "Budget alert" : "Budget reminder"}
        </Text>
        {messages.map((message) => (
          <Text key={message} style={extraStyles.warningMessage}>
            {message}
          </Text>
        ))}
      </View>
    </View>
  );
}

// Owns the app state and chooses which simple screen to render from the bottom tabs.
export default function Index() {
  // Step 1: Keep all prototype data in useState. Nothing is saved to a database or device storage.
  const [expenses, setExpenses] = useState(initialExpenses);
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [searchText, setSearchText] = useState("");
  const [weeklyBudget, setWeeklyBudget] = useState("250");
  const [monthlyBudget, setMonthlyBudget] = useState("900");
  const [savedWeeklyBudget, setSavedWeeklyBudget] = useState(250);
  const [savedMonthlyBudget, setSavedMonthlyBudget] = useState(900);
  const [quickAdds, setQuickAdds] = useState(defaultQuickAdds);
  // Step 2: Calculate summary values with simple filter and reduce operations.
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
  // Step 3: Validate input, create a new object, and put it at the top of the list.
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
      return;
    }
    // Warn before saving when this new expense will cross either budget limit.
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
    setCurrentScreen("dashboard");
  };
  // Step 4: filter creates a new array, so the original state is never mutated directly.
  const deleteExpense = (id) =>
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    );
  // Copies a saved quick-add value into the main expense form for editing before saving.
  const quickAdd = (quickAmount, quickDescription) => {
    setAmount(String(quickAmount));
    setDescription(quickDescription);
  };
  // Updates one editable quick-add card without changing the other cards.
  const updateQuickAdd = (id, field, value) => {
    setQuickAdds((currentQuickAdds) =>
      currentQuickAdds.map((quickAdd) =>
        quickAdd.id === id ? { ...quickAdd, [field]: value } : quickAdd,
      ),
    );
  };
  // Adds a blank editable shortcut only while the four-item limit has room.
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
  // Removes a shortcut so users can replace their choices.
  const removeQuickAdd = (id) => {
    setQuickAdds((currentQuickAdds) =>
      currentQuickAdds.filter((quickAdd) => quickAdd.id !== id),
    );
  };
  // Saves both budget fields and reminds the user if the current spending is already too high.
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.appShell}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {currentScreen === "dashboard" && (
            <Dashboard
              expenses={expenses}
              todayTotal={todayTotal}
              weekTotal={weekTotal}
              monthTotal={monthTotal}
              savedWeeklyBudget={savedWeeklyBudget}
              savedMonthlyBudget={savedMonthlyBudget}
              onAdd={() => setCurrentScreen("add")}
            />
          )}
          {currentScreen === "add" && (
            <AddExpense
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
              onSubmit={addExpense}
            />
          )}
          {currentScreen === "history" && (
            <History
              expenses={expenses}
              searchText={searchText}
              setSearchText={setSearchText}
              onDelete={deleteExpense}
            />
          )}
          {currentScreen === "budget" && (
            <Budget
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
          )}
          {currentScreen === "stats" && (
            <Stats expenses={expenses} monthTotal={monthTotal} />
          )}
        </ScrollView>
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <Pressable
              key={tab.id}
              style={styles.tabButton}
              onPress={() => setCurrentScreen(tab.id)}
              accessibilityRole="button"
            >
              <Ionicons
                name={tab.icon}
                size={22}
                color={currentScreen === tab.id ? colors.navy : colors.muted}
              />
              <Text
                style={getTabLabelStyle(currentScreen === tab.id)}
              >
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
// Reuses the same small heading layout at the top of each screen.
function Header({ eyebrow, title, action }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      {action}
    </View>
  );
}
// Displays a section heading and an optional small action label.
function SectionTitle({ title, action }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && <Text style={styles.sectionAction}>{action}</Text>}
    </View>
  );
}
// Shows one compact spending total on the dashboard.
function SummaryCard({ label, value, color }) {
  return (
    <View style={styles.summaryCard}>
      <View style={getSummaryDotStyle(color)} />
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{money(value)}</Text>
    </View>
  );
}
// Converts spending into a capped percentage and draws the matching progress bar.
function BudgetProgress({ label, spent, budget }) {
  const progress = budget > 0 ? Math.min(spent / budget, 1) : 0;
  return (
    <View style={styles.progressBlock}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>{label}</Text>
        <Text style={styles.progressValue}>
          {money(spent)} / {money(budget)}
        </Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={getProgressFillStyle(progress)} />
      </View>
    </View>
  );
}
// Combines totals, warnings, the chart, and recent transactions into the home screen.
function Dashboard({
  expenses,
  todayTotal,
  weekTotal,
  monthTotal,
  savedWeeklyBudget,
  savedMonthlyBudget,
  onAdd,
}) {
  const chartDays = ["18", "19", "20", "21", "22", "23", "24"];
  const chartTotals = chartDays.map((day) =>
    expenses
      .filter((expense) => expense.date === `2026-09-${day}`)
      .reduce((sum, expense) => sum + expense.amount, 0),
  );
  const maxChartValue = Math.max(...chartTotals, 1);
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
      <SectionTitle title="Last 7 days" action="View stats" />
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
        today={today}
      />
    </>
  );
}
// Collects a new expense and lets the user edit or reuse quick-add values.
function AddExpense({
  description,
  amount,
  selectedCategory,
  setDescription,
  setAmount,
  setSelectedCategory,
  quickAdds,
  onQuickAdd,
  onEditQuickAdd,
  onAddQuickAdd,
  onRemoveQuickAdd,
  onSubmit,
}) {
  return (
    <>
      <Header eyebrow="NEW TRANSACTION" title="Add expense" />
      <Text style={styles.helperText}>
        A few taps now makes your budget clearer later.
      </Text>
      <ExpenseForm
        description={description}
        amount={amount}
        setDescription={setDescription}
        setAmount={setAmount}
        onSubmit={onSubmit}
      />
      <SectionTitle title="Category" />
      <View style={styles.categoryGrid}>
        {categories.map((category) => (
          <Pressable
            key={category.id}
            onPress={() => setSelectedCategory(category.id)}
            style={getCategoryButtonStyle(
              category,
              selectedCategory === category.id,
            )}
          >
            <View style={getCategoryIconStyle(category)}>
              <Ionicons name={category.icon} size={22} color={category.color} />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </Pressable>
        ))}
      </View>
      <SectionTitle
        title="Quick add"
        action={`${quickAdds.length}/${maxQuickAdds}`}
      />
      <View style={styles.quickRow}>
        {quickAdds.map((quickAdd) => (
          <View key={quickAdd.id} style={styles.quickButton}>
            <View style={extraStyles.quickHeader}>
              <TextInput
                value={quickAdd.label}
                onChangeText={(value) =>
                  onEditQuickAdd(quickAdd.id, "label", value)
                }
                style={extraStyles.quickInput}
                placeholder="Label"
                placeholderTextColor={colors.muted}
                accessibilityLabel="Quick add label"
              />
              <Pressable
                onPress={() => onRemoveQuickAdd(quickAdd.id)}
                style={extraStyles.quickRemoveButton}
                accessibilityLabel={`Remove ${quickAdd.label || "quick add"}`}
                accessibilityRole="button"
              >
                <Ionicons name="close" size={16} color={colors.muted} />
              </Pressable>
            </View>
            <View style={extraStyles.quickEditRow}>
              <Text style={extraStyles.currencySmall}>₱</Text>
              <TextInput
                value={quickAdd.amount}
                onChangeText={(value) =>
                  onEditQuickAdd(quickAdd.id, "amount", value)
                }
                keyboardType="decimal-pad"
                style={extraStyles.quickAmountInput}
                placeholder="0.00"
                placeholderTextColor={colors.muted}
                accessibilityLabel="Quick add amount"
              />
              <Pressable
                style={extraStyles.quickUseButton}
                onPress={() =>
                  onQuickAdd(Number(quickAdd.amount) || 0, quickAdd.label)
                }
              >
                <Text style={extraStyles.quickUseText}>Use</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
      {quickAdds.length < maxQuickAdds && (
        <Pressable
          style={extraStyles.addQuickButton}
          onPress={onAddQuickAdd}
          accessibilityRole="button"
        >
          <Ionicons name="add-circle-outline" size={18} color={colors.blue} />
          <Text style={extraStyles.addQuickButtonText}>Add quick add</Text>
        </Pressable>
      )}
      <Pressable style={styles.primaryButton} onPress={onSubmit}>
        <Ionicons
          name="checkmark-circle-outline"
          size={21}
          color={colors.white}
        />
        <Text style={styles.primaryButtonText}>Add expense</Text>
      </Pressable>
    </>
  );
}
// Filters the in-memory expenses and renders every matching transaction.
function History({ expenses, searchText, setSearchText, onDelete }) {
  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(searchText.toLowerCase()) ||
      getCategory(expense.category)
        .name.toLowerCase()
        .includes(searchText.toLowerCase()),
  );
  return (
    <>
      <Header eyebrow="YOUR ACTIVITY" title="History" />
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color={colors.muted} />
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search transactions"
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
        />
      </View>
      <ExpenseList
        expenses={filteredExpenses}
        title="All transactions"
        action={`${filteredExpenses.length} found`}
        today={today}
        emptyTitle="No transactions found"
        emptyMessage="Try a different search."
        onDelete={onDelete}
      />
    </>
  );
}
// Edits the weekly and monthly limits and shows how much remains.
function Budget({
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
// Calculates simple averages, the largest expense, and the top category.
function Stats({ expenses, monthTotal }) {
  const highest = expenses.reduce(
    (max, expense) => Math.max(max, expense.amount),
    0,
  );
  const categoryTotals = categories.map((category) => ({
    name: category.name,
    total: expenses
      .filter((expense) => expense.category === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0),
  }));
  const topCategory = categoryTotals.reduce(
    (top, category) => (category.total > top.total ? category : top),
    categoryTotals[0],
  );
  const average = expenses.length > 0 ? monthTotal / 30 : 0;
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
          icon="arrow-up-outline"
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
// Displays one calculated statistic in a consistent card.
function StatCard({ label, value, icon, color }) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={23} color={color} />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}
