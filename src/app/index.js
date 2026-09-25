import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { initialExpenses } from "../data/initialExpenses";
// Keeping categories in one place makes icons and colors consistent across every screen.
const categories = [
    { id: "food", name: "Food", icon: "fast-food-outline", color: "#F59E0B" },
    { id: "transport", name: "Transport", icon: "bus-outline", color: "#0EA5E9" },
    { id: "school", name: "School", icon: "school-outline", color: "#8B5CF6" },
    { id: "shopping", name: "Shopping", icon: "bag-handle-outline", color: "#EC4899" },
    { id: "bills", name: "Bills", icon: "receipt-outline", color: "#10B981" },
    { id: "other", name: "Other", icon: "ellipsis-horizontal-circle-outline", color: "#64748B" },
];
const tabs = [
    { id: "dashboard", label: "Home", icon: "home-outline" },
    { id: "add", label: "Add", icon: "add-circle-outline" },
    { id: "history", label: "History", icon: "list-outline" },
    { id: "budget", label: "Budget", icon: "wallet-outline" },
    { id: "stats", label: "Stats", icon: "bar-chart-outline" },
];
const today = "2026-09-24";
// Formats a number as Philippine pesos for consistent amounts across the app.
const money = (amount) => `₱${amount.toFixed(2)}`;

// These quick-add values are normal state so the user can change the label or amount.
const defaultQuickAdds = [
    { id: "coffee", label: "Coffee", amount: "4" },
    { id: "lunch", label: "Lunch", amount: "12" },
    { id: "bus", label: "Bus fare", amount: "8" },
];

// Finds a category by id and falls back to Other when an unknown id is received.
function getCategory(categoryId) {
    return categories.find((category) => category.id === categoryId) || categories[categories.length - 1];
}
// Turns an ISO date into the shorter date label shown in each transaction row.
function formatDate(date) {
    if (date === today)
        return "Today";
    const parts = date.split("-");
    return `${parts[1]}/${parts[2]}/${parts[0]}`;
}

// Shows a friendly warning when spending is close to or above a budget limit.
function BudgetWarning({ weeklySpent, monthlySpent, weeklyBudget, monthlyBudget }) {
    const weeklyOver = weeklyBudget > 0 && weeklySpent >= weeklyBudget;
    const monthlyOver = monthlyBudget > 0 && monthlySpent >= monthlyBudget;
    const weeklyNear = weeklyBudget > 0 && weeklySpent >= weeklyBudget * 0.8;
    const monthlyNear = monthlyBudget > 0 && monthlySpent >= monthlyBudget * 0.8;
    if (!weeklyNear && !monthlyNear)
        return null;
    const messages = [];
    if (weeklyOver)
        messages.push(`Weekly budget exceeded by ${money(weeklySpent - weeklyBudget)}.`);
    else if (weeklyNear)
        messages.push(`Only ${money(Math.max(weeklyBudget - weeklySpent, 0))} left in your weekly budget.`);
    if (monthlyOver)
        messages.push(`Monthly budget exceeded by ${money(monthlySpent - monthlyBudget)}.`);
    else if (monthlyNear)
        messages.push(`Only ${money(Math.max(monthlyBudget - monthlySpent, 0))} left this month.`);
    return <View style={[extraStyles.warningCard, (weeklyOver || monthlyOver) && extraStyles.warningCardDanger]}><Ionicons name={weeklyOver || monthlyOver ? "warning-outline" : "notifications-outline"} size={22} color={weeklyOver || monthlyOver ? colors.warning : colors.orange}/><View style={extraStyles.warningText}><Text style={extraStyles.warningTitle}>{weeklyOver || monthlyOver ? "Budget alert" : "Budget reminder"}</Text>{messages.map((message) => <Text key={message} style={extraStyles.warningMessage}>{message}</Text>)}</View></View>;
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
    const weekExpenses = expenses.filter((expense) => expense.date >= "2026-09-18");
    const monthExpenses = expenses.filter((expense) => expense.date.substring(0, 7) === "2026-09");
    const todayTotal = expenses.filter((expense) => expense.date === today).reduce((sum, expense) => sum + expense.amount, 0);
    const weekTotal = weekExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const monthTotal = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    // Step 3: Validate input, create a new object, and put it at the top of the list.
    const addExpense = () => {
        const parsedAmount = Number.parseFloat(amount);
        if (!description.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
            Alert.alert("Missing details", "Add a description and an amount greater than zero.");
            return;
        }
        // Warn before saving when this new expense will cross either budget limit.
        const nextWeekTotal = weekTotal + parsedAmount;
        const nextMonthTotal = monthTotal + parsedAmount;
        if ((savedWeeklyBudget > 0 && nextWeekTotal > savedWeeklyBudget) || (savedMonthlyBudget > 0 && nextMonthTotal > savedMonthlyBudget)) {
            Alert.alert("Budget reminder", "This expense will put you over one of your budget limits.");
        }
        setExpenses((currentExpenses) => [
            { id: String(Date.now()), amount: parsedAmount, description: description.trim(), category: selectedCategory, date: today },
            ...currentExpenses,
        ]);
        setDescription("");
        setAmount("");
        setCurrentScreen("dashboard");
    };
    // Step 4: filter creates a new array, so the original state is never mutated directly.
    const deleteExpense = (id) => setExpenses((currentExpenses) => currentExpenses.filter((expense) => expense.id !== id));
    // Copies a saved quick-add value into the main expense form for editing before saving.
    const quickAdd = (quickAmount, quickDescription) => {
        setAmount(String(quickAmount));
        setDescription(quickDescription);
    };
    // Updates one editable quick-add card without changing the other cards.
    const updateQuickAdd = (id, field, value) => {
        setQuickAdds((currentQuickAdds) => currentQuickAdds.map((quickAdd) => quickAdd.id === id ? { ...quickAdd, [field]: value } : quickAdd));
    };
    // Saves both budget fields and reminds the user if the current spending is already too high.
    const saveBudgets = () => {
        const nextWeeklyBudget = Number(weeklyBudget) || 0;
        const nextMonthlyBudget = Number(monthlyBudget) || 0;
        setSavedWeeklyBudget(nextWeeklyBudget);
        setSavedMonthlyBudget(nextMonthlyBudget);
        if ((nextWeeklyBudget > 0 && weekTotal > nextWeeklyBudget) || (nextMonthlyBudget > 0 && monthTotal > nextMonthlyBudget)) {
            Alert.alert("Budget reminder", "Your current spending is already over one of the new limits.");
        }
        else {
            Alert.alert("Budget saved", "Your new limits are active.");
        }
    };
    return (<SafeAreaView style={styles.safeArea}>
      <View style={styles.appShell}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {currentScreen === "dashboard" && <Dashboard expenses={expenses} todayTotal={todayTotal} weekTotal={weekTotal} monthTotal={monthTotal} savedWeeklyBudget={savedWeeklyBudget} savedMonthlyBudget={savedMonthlyBudget} onAdd={() => setCurrentScreen("add")}/>}
          {currentScreen === "add" && <AddExpense description={description} amount={amount} selectedCategory={selectedCategory} setDescription={setDescription} setAmount={setAmount} setSelectedCategory={setSelectedCategory} quickAdds={quickAdds} onQuickAdd={quickAdd} onEditQuickAdd={updateQuickAdd} onSubmit={addExpense}/>}
          {currentScreen === "history" && <History expenses={expenses} searchText={searchText} setSearchText={setSearchText} onDelete={deleteExpense}/>}
          {currentScreen === "budget" && <Budget weeklyBudget={weeklyBudget} monthlyBudget={monthlyBudget} setWeeklyBudget={setWeeklyBudget} setMonthlyBudget={setMonthlyBudget} savedWeeklyBudget={savedWeeklyBudget} savedMonthlyBudget={savedMonthlyBudget} weekTotal={weekTotal} monthTotal={monthTotal} onSave={saveBudgets}/>} 
          {currentScreen === "stats" && <Stats expenses={expenses} monthTotal={monthTotal}/>}
        </ScrollView>
        <View style={styles.tabBar}>
          {tabs.map((tab) => (<Pressable key={tab.id} style={styles.tabButton} onPress={() => setCurrentScreen(tab.id)} accessibilityRole="button">
              <Ionicons name={tab.icon} size={22} color={currentScreen === tab.id ? colors.navy : colors.muted}/>
              <Text style={[styles.tabLabel, currentScreen === tab.id && styles.tabLabelActive]}>{tab.label}</Text>
            </Pressable>))}
        </View>
      </View>
    </SafeAreaView>);
}
// Reuses the same small heading layout at the top of each screen.
function Header({ eyebrow, title, action }) {
    return <View style={styles.header}><View><Text style={styles.eyebrow}>{eyebrow}</Text><Text style={styles.title}>{title}</Text></View>{action}</View>;
}
// Displays a section heading and an optional small action label.
function SectionTitle({ title, action }) {
    return <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{title}</Text>{action && <Text style={styles.sectionAction}>{action}</Text>}</View>;
}
// Shows one compact spending total on the dashboard.
function SummaryCard({ label, value, color }) {
    return <View style={styles.summaryCard}><View style={[styles.dot, { backgroundColor: color }]}/><Text style={styles.summaryLabel}>{label}</Text><Text style={styles.summaryValue}>{money(value)}</Text></View>;
}
// Converts spending into a capped percentage and draws the matching progress bar.
function BudgetProgress({ label, spent, budget }) {
    const progress = budget > 0 ? Math.min(spent / budget, 1) : 0;
    return <View style={styles.progressBlock}><View style={styles.progressHeader}><Text style={styles.progressLabel}>{label}</Text><Text style={styles.progressValue}>{money(spent)} / {money(budget)}</Text></View><View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${progress * 100}%` }]}/></View></View>;
}
// Combines totals, warnings, the chart, and recent transactions into the home screen.
function Dashboard({ expenses, todayTotal, weekTotal, monthTotal, savedWeeklyBudget, savedMonthlyBudget, onAdd }) {
    const chartDays = ["18", "19", "20", "21", "22", "23", "24"];
    const chartTotals = chartDays.map((day) => expenses.filter((expense) => expense.date === `2026-09-${day}`).reduce((sum, expense) => sum + expense.amount, 0));
    const maxChartValue = Math.max(...chartTotals, 1);
    return <>
    <Header eyebrow="THURSDAY, SEPTEMBER 24" title="Good morning" action={<Pressable style={styles.headerIcon} onPress={onAdd}><Ionicons name="add" size={24} color={colors.white}/></Pressable>}/>
    <BudgetWarning weeklySpent={weekTotal} monthlySpent={monthTotal} weeklyBudget={savedWeeklyBudget} monthlyBudget={savedMonthlyBudget}/>
    <View style={styles.heroCard}><View><Text style={styles.heroLabel}>TOTAL THIS MONTH</Text><Text style={styles.heroAmount}>{money(monthTotal)}</Text><Text style={styles.heroCaption}>Across {expenses.length} transactions</Text></View><View style={styles.heroMark}><Ionicons name="trending-up" size={26} color={colors.mint}/></View></View>
    <View style={styles.summaryRow}><SummaryCard label="Today" value={todayTotal} color={colors.orange}/><SummaryCard label="This week" value={weekTotal} color={colors.blue}/><SummaryCard label="This month" value={monthTotal} color={colors.green}/></View>
    <SectionTitle title="Budget progress"/><View style={styles.card}><BudgetProgress label="Weekly limit" spent={weekTotal} budget={savedWeeklyBudget}/><BudgetProgress label="Monthly limit" spent={monthTotal} budget={savedMonthlyBudget}/></View>
    <SectionTitle title="Last 7 days" action="View stats"/><View style={styles.card}><View style={styles.chart}>{chartTotals.map((total, index) => <View key={chartDays[index]} style={styles.barColumn}><View style={[styles.bar, { height: Math.max(6, (total / maxChartValue) * 92) }]}/><Text style={styles.barLabel}>{chartDays[index]}</Text></View>)}</View></View>
    <SectionTitle title="Recent transactions" action="See all"/><View style={styles.card}>{expenses.slice(0, 5).map((expense) => <TransactionRow key={expense.id} expense={expense}/>)}</View>
  </>;
}
// Collects a new expense and lets the user edit or reuse quick-add values.
function AddExpense({ description, amount, selectedCategory, setDescription, setAmount, setSelectedCategory, quickAdds, onQuickAdd, onEditQuickAdd, onSubmit }) {
    return <><Header eyebrow="NEW TRANSACTION" title="Add expense"/><Text style={styles.helperText}>A few taps now makes your budget clearer later.</Text><View style={styles.card}><Text style={styles.inputLabel}>AMOUNT</Text><View style={styles.amountBox}><Text style={styles.currency}>₱</Text><TextInput value={amount} onChangeText={setAmount} placeholder="0.00" placeholderTextColor={colors.muted} keyboardType="decimal-pad" style={styles.amountInput}/></View><Text style={styles.inputLabel}>DESCRIPTION</Text><TextInput value={description} onChangeText={setDescription} placeholder="What did you spend on?" placeholderTextColor={colors.muted} style={styles.textInput}/></View><SectionTitle title="Category"/><View style={styles.categoryGrid}>{categories.map((category) => <Pressable key={category.id} onPress={() => setSelectedCategory(category.id)} style={[styles.categoryButton, selectedCategory === category.id && { borderColor: category.color, backgroundColor: `${category.color}18` }]}><View style={[styles.categoryIcon, { backgroundColor: `${category.color}22` }]}><Ionicons name={category.icon} size={22} color={category.color}/></View><Text style={styles.categoryName}>{category.name}</Text></Pressable>)}</View><SectionTitle title="Quick add"/><View style={styles.quickRow}>{quickAdds.map((quickAdd) => <View key={quickAdd.id} style={styles.quickButton}><TextInput value={quickAdd.label} onChangeText={(value) => onEditQuickAdd(quickAdd.id, "label", value)} style={extraStyles.quickInput} placeholder="Label" placeholderTextColor={colors.muted}/><View style={extraStyles.quickEditRow}><Text style={extraStyles.currencySmall}>₱</Text><TextInput value={quickAdd.amount} onChangeText={(value) => onEditQuickAdd(quickAdd.id, "amount", value)} keyboardType="decimal-pad" style={extraStyles.quickAmountInput}/><Pressable style={extraStyles.quickUseButton} onPress={() => onQuickAdd(Number(quickAdd.amount) || 0, quickAdd.label)}><Text style={extraStyles.quickUseText}>Use</Text></Pressable></View></View>)}</View><Pressable style={styles.primaryButton} onPress={onSubmit}><Ionicons name="checkmark-circle-outline" size={21} color={colors.white}/><Text style={styles.primaryButtonText}>Add expense</Text></Pressable></>;
}
// Filters the in-memory expenses and renders every matching transaction.
function History({ expenses, searchText, setSearchText, onDelete }) {
    const filteredExpenses = expenses.filter((expense) => expense.description.toLowerCase().includes(searchText.toLowerCase()) || getCategory(expense.category).name.toLowerCase().includes(searchText.toLowerCase()));
    return <><Header eyebrow="YOUR ACTIVITY" title="History"/><View style={styles.searchBox}><Ionicons name="search-outline" size={20} color={colors.muted}/><TextInput value={searchText} onChangeText={setSearchText} placeholder="Search transactions" placeholderTextColor={colors.muted} style={styles.searchInput}/></View><SectionTitle title="All transactions" action={`${filteredExpenses.length} found`}/><View style={styles.card}>{filteredExpenses.length === 0 ? <EmptyState /> : filteredExpenses.map((expense) => <TransactionRow key={expense.id} expense={expense} onDelete={onDelete}/>)}</View></>;
}
// Renders one transaction with its category icon, date, amount, and optional delete action.
function TransactionRow({ expense, onDelete }) {
    const category = getCategory(expense.category);
    return <View style={styles.transactionRow}><View style={[styles.transactionIcon, { backgroundColor: `${category.color}20` }]}><Ionicons name={category.icon} size={20} color={category.color}/></View><View style={styles.transactionDetails}><Text style={styles.transactionDescription}>{expense.description}</Text><Text style={styles.transactionDate}>{category.name} · {formatDate(expense.date)}</Text></View><Text style={styles.transactionAmount}>{money(expense.amount)}</Text>{onDelete && <Pressable onPress={() => onDelete(expense.id)} style={styles.deleteButton}><Ionicons name="trash-outline" size={18} color={colors.muted}/></Pressable>}</View>;
}
// Gives the history screen a friendly result when search finds nothing.
function EmptyState() { return <View style={styles.emptyState}><Ionicons name="search-outline" size={30} color={colors.muted}/><Text style={styles.emptyTitle}>No transactions found</Text><Text style={styles.emptyText}>Try a different search.</Text></View>; }
// Edits the weekly and monthly limits and shows how much remains.
function Budget({ weeklyBudget, monthlyBudget, setWeeklyBudget, setMonthlyBudget, savedWeeklyBudget, savedMonthlyBudget, weekTotal, monthTotal, onSave }) {
    return <><Header eyebrow="PLAN AHEAD" title="Budget settings"/><BudgetWarning weeklySpent={weekTotal} monthlySpent={monthTotal} weeklyBudget={savedWeeklyBudget} monthlyBudget={savedMonthlyBudget}/><Text style={styles.helperText}>Set limits that feel realistic for your everyday spending.</Text><View style={styles.card}><Text style={styles.inputLabel}>WEEKLY MAXIMUM</Text><View style={styles.amountBox}><Text style={styles.currency}>₱</Text><TextInput value={weeklyBudget} onChangeText={setWeeklyBudget} keyboardType="decimal-pad" style={styles.budgetInput}/></View><Text style={styles.inputLabel}>MONTHLY MAXIMUM</Text><View style={styles.amountBox}><Text style={styles.currency}>₱</Text><TextInput value={monthlyBudget} onChangeText={setMonthlyBudget} keyboardType="decimal-pad" style={styles.budgetInput}/></View><Pressable style={styles.primaryButton} onPress={onSave}><Ionicons name="save-outline" size={20} color={colors.white}/><Text style={styles.primaryButtonText}>Save budgets</Text></Pressable></View><SectionTitle title="Current limits"/><View style={styles.card}><BudgetProgress label="Weekly remaining" spent={Math.max(savedWeeklyBudget - weekTotal, 0)} budget={savedWeeklyBudget}/><Text style={styles.remainingText}>{money(Math.max(savedWeeklyBudget - weekTotal, 0))} left this week</Text><BudgetProgress label="Monthly remaining" spent={Math.max(savedMonthlyBudget - monthTotal, 0)} budget={savedMonthlyBudget}/><Text style={styles.remainingText}>{money(Math.max(savedMonthlyBudget - monthTotal, 0))} left this month</Text></View></>;
}
// Calculates simple averages, the largest expense, and the top category.
function Stats({ expenses, monthTotal }) {
    const highest = expenses.reduce((max, expense) => Math.max(max, expense.amount), 0);
    const categoryTotals = categories.map((category) => ({ name: category.name, total: expenses.filter((expense) => expense.category === category.id).reduce((sum, expense) => sum + expense.amount, 0) }));
    const topCategory = categoryTotals.reduce((top, category) => category.total > top.total ? category : top, categoryTotals[0]);
    const average = expenses.length > 0 ? monthTotal / 30 : 0;
    return <><Header eyebrow="UNDERSTAND YOUR HABITS" title="Your stats"/><Text style={styles.helperText}>Small patterns add up. Here is what your sample month says.</Text><View style={styles.statGrid}><StatCard label="Daily average" value={money(average)} icon="calendar-outline" color={colors.blue}/><StatCard label="Highest expense" value={money(highest)} icon="arrow-up-outline" color={colors.orange}/><StatCard label="Top category" value={topCategory.name} icon="trophy-outline" color={colors.green}/></View><SectionTitle title="Category breakdown"/><View style={styles.card}>{categoryTotals.filter((category) => category.total > 0).map((category) => <View key={category.name} style={styles.breakdownRow}><Text style={styles.breakdownName}>{category.name}</Text><View style={styles.breakdownTrack}><View style={[styles.breakdownFill, { width: `${(category.total / Math.max(monthTotal, 1)) * 100}%` }]}/></View><Text style={styles.breakdownValue}>{money(category.total)}</Text></View>)}</View></>;
}
// Displays one calculated statistic in a consistent card.
function StatCard({ label, value, icon, color }) { return <View style={styles.statCard}><Ionicons name={icon} size={23} color={color}/><Text style={styles.statLabel}>{label}</Text><Text style={styles.statValue}>{value}</Text></View>; }
const colors = { navy: "#102A43", ink: "#172B4D", muted: "#7B8794", white: "#FFFFFF", canvas: "#F4F7F9", border: "#E3EAF0", blue: "#2F80ED", green: "#10B981", mint: "#A7F3D0", orange: "#F59E0B", warning: "#D97706" };
const extraStyles = StyleSheet.create({
    warningCard: { alignItems: "flex-start", backgroundColor: "#FFF7E6", borderColor: "#F7D58A", borderRadius: 16, borderWidth: 1, flexDirection: "row", marginBottom: 18, padding: 14 },
    warningCardDanger: { backgroundColor: "#FFF0F0", borderColor: "#F3B2B2" },
    warningText: { flex: 1, marginLeft: 10 },
    warningTitle: { color: "#9A6700", fontSize: 14, fontWeight: "800", marginBottom: 3 },
    warningMessage: { color: "#7A5C20", fontSize: 12, lineHeight: 18 },
    quickInput: { color: colors.ink, fontSize: 12, fontWeight: "700", padding: 0 },
    quickEditRow: { alignItems: "center", flexDirection: "row", marginTop: 7 },
    currencySmall: { color: colors.green, fontSize: 12, fontWeight: "800" },
    quickAmountInput: { color: colors.green, flex: 1, fontSize: 12, fontWeight: "800", padding: 0 },
    quickUseButton: { backgroundColor: colors.navy, borderRadius: 7, paddingHorizontal: 8, paddingVertical: 5 },
    quickUseText: { color: colors.white, fontSize: 10, fontWeight: "800" },
});
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.canvas }, appShell: { flex: 1 }, content: { padding: 20, paddingBottom: 32 }, header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }, eyebrow: { color: colors.muted, fontSize: 11, fontWeight: "800", letterSpacing: 1.4, marginBottom: 6 }, title: { color: colors.ink, fontSize: 30, fontWeight: "800" }, headerIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.navy, alignItems: "center", justifyContent: "center" }, heroCard: { backgroundColor: colors.navy, borderRadius: 22, padding: 22, flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }, heroLabel: { color: "#B7C9D8", fontSize: 11, fontWeight: "800", letterSpacing: 1.2 }, heroAmount: { color: colors.white, fontSize: 34, fontWeight: "800", marginTop: 8 }, heroCaption: { color: "#B7C9D8", marginTop: 5, fontSize: 13 }, heroMark: { width: 48, height: 48, borderRadius: 16, backgroundColor: "#214665", alignItems: "center", justifyContent: "center" }, summaryRow: { flexDirection: "row", gap: 9, marginBottom: 26 }, summaryCard: { backgroundColor: colors.white, borderRadius: 16, padding: 12, flex: 1, borderWidth: 1, borderColor: colors.border }, dot: { width: 7, height: 7, borderRadius: 4, marginBottom: 9 }, summaryLabel: { color: colors.muted, fontSize: 11, fontWeight: "700" }, summaryValue: { color: colors.ink, fontSize: 14, fontWeight: "800", marginTop: 5 }, sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, marginTop: 4 }, sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: "800" }, sectionAction: { color: colors.blue, fontSize: 12, fontWeight: "700" }, card: { backgroundColor: colors.white, borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 23 }, progressBlock: { marginBottom: 16 }, progressHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }, progressLabel: { color: colors.ink, fontSize: 13, fontWeight: "700" }, progressValue: { color: colors.muted, fontSize: 12 }, progressTrack: { backgroundColor: "#E9EFF3", borderRadius: 8, height: 8, overflow: "hidden" }, progressFill: { backgroundColor: colors.green, borderRadius: 8, height: 8 }, chart: { flexDirection: "row", height: 126, alignItems: "flex-end", justifyContent: "space-around" }, barColumn: { alignItems: "center", justifyContent: "flex-end", height: 120, width: 28 }, bar: { width: 18, backgroundColor: colors.blue, borderRadius: 6, minHeight: 6 }, barLabel: { color: colors.muted, fontSize: 11, marginTop: 8 }, transactionRow: { alignItems: "center", flexDirection: "row", minHeight: 64, borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: 9 }, transactionIcon: { width: 38, height: 38, borderRadius: 13, alignItems: "center", justifyContent: "center" }, transactionDetails: { flex: 1, marginLeft: 11 }, transactionDescription: { color: colors.ink, fontSize: 14, fontWeight: "700" }, transactionDate: { color: colors.muted, fontSize: 11, marginTop: 4 }, transactionAmount: { color: colors.ink, fontSize: 14, fontWeight: "800" }, deleteButton: { padding: 8, marginLeft: 3 }, emptyState: { alignItems: "center", padding: 24 }, emptyTitle: { color: colors.ink, fontSize: 15, fontWeight: "800", marginTop: 10 }, emptyText: { color: colors.muted, fontSize: 13, marginTop: 5 }, tabBar: { backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border, flexDirection: "row", height: 72, paddingBottom: 7 }, tabButton: { alignItems: "center", flex: 1, justifyContent: "center" }, tabLabel: { color: colors.muted, fontSize: 10, fontWeight: "700", marginTop: 4 }, tabLabelActive: { color: colors.navy }, helperText: { color: colors.muted, fontSize: 14, lineHeight: 21, marginBottom: 22 }, inputLabel: { color: colors.muted, fontSize: 10, fontWeight: "800", letterSpacing: 1.1, marginBottom: 8, marginTop: 4 }, amountBox: { alignItems: "center", backgroundColor: colors.canvas, borderRadius: 13, flexDirection: "row", marginBottom: 18, paddingHorizontal: 14 }, currency: { color: colors.navy, fontSize: 22, fontWeight: "800" }, amountInput: { color: colors.ink, flex: 1, fontSize: 28, fontWeight: "800", padding: 14 }, budgetInput: { color: colors.ink, flex: 1, fontSize: 18, fontWeight: "700", padding: 12 }, textInput: { backgroundColor: colors.canvas, borderRadius: 13, color: colors.ink, fontSize: 15, padding: 16, marginBottom: 3 }, categoryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 20 }, categoryButton: { alignItems: "center", backgroundColor: colors.white, borderColor: colors.border, borderRadius: 15, borderWidth: 1, paddingVertical: 11, width: "31%" }, categoryIcon: { alignItems: "center", borderRadius: 12, height: 38, justifyContent: "center", width: 38 }, categoryName: { color: colors.ink, fontSize: 11, fontWeight: "700", marginTop: 6 }, quickRow: { flexDirection: "row", gap: 9, marginBottom: 23 }, quickButton: { backgroundColor: colors.white, borderColor: colors.border, borderRadius: 14, borderWidth: 1, flex: 1, padding: 12 }, quickName: { color: colors.ink, fontSize: 12, fontWeight: "700" }, quickAmount: { color: colors.green, fontSize: 12, fontWeight: "800", marginTop: 5 }, primaryButton: { alignItems: "center", backgroundColor: colors.navy, borderRadius: 15, flexDirection: "row", gap: 8, justifyContent: "center", minHeight: 54, marginBottom: 18 }, primaryButtonText: { color: colors.white, fontSize: 15, fontWeight: "800" }, searchBox: { alignItems: "center", backgroundColor: colors.white, borderColor: colors.border, borderRadius: 14, borderWidth: 1, flexDirection: "row", marginBottom: 24, paddingHorizontal: 14 }, searchInput: { color: colors.ink, flex: 1, fontSize: 14, padding: 14 }, remainingText: { color: colors.muted, fontSize: 12, marginTop: -8, marginBottom: 20 }, statGrid: { gap: 10, marginBottom: 23 }, statCard: { backgroundColor: colors.white, borderColor: colors.border, borderRadius: 17, borderWidth: 1, padding: 16 }, statLabel: { color: colors.muted, fontSize: 12, fontWeight: "700", marginTop: 11 }, statValue: { color: colors.ink, fontSize: 22, fontWeight: "800", marginTop: 4 }, breakdownRow: { alignItems: "center", flexDirection: "row", marginBottom: 17 }, breakdownName: { color: colors.ink, fontSize: 12, fontWeight: "700", width: 76 }, breakdownTrack: { backgroundColor: "#E9EFF3", borderRadius: 5, flex: 1, height: 7, overflow: "hidden" }, breakdownFill: { backgroundColor: colors.green, borderRadius: 5, height: 7 }, breakdownValue: { color: colors.muted, fontSize: 11, marginLeft: 8, width: 58, textAlign: "right" },
});
