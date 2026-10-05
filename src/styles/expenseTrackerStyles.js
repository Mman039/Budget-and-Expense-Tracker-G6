import { StyleSheet } from "react-native";

// Shared color tokens keep the app palette consistent across screens/components.
export const colors = {
  navy: "#102A43",
  ink: "#172B4D",
  muted: "#7B8794",
  white: "#FFFFFF",
  canvas: "#F4F7F9",
  border: "#E3EAF0",
  blue: "#2F80ED",
  green: "#10B981",
  mint: "#A7F3D0",
  orange: "#F59E0B",
  warning: "#D97706",
};

// Styles used for warnings and editable quick-add controls.
export const expenseTrackerExtraStyles = StyleSheet.create({
  warningCard: {
    alignItems: "flex-start",
    backgroundColor: "#FFF7E6",
    borderColor: "#F7D58A",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 18,
    padding: 14,
  },
  warningCardDanger: { backgroundColor: "#FFF0F0", borderColor: "#F3B2B2" },
  warningText: { flex: 1, marginLeft: 10 },
  warningTitle: {
    color: "#9A6700",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 3,
  },
  warningMessage: { color: "#7A5C20", fontSize: 12, lineHeight: 18 },
  quickInput: {
    color: colors.ink,
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    padding: 0,
  },
  quickHeader: { alignItems: "center", flexDirection: "row" },
  quickRemoveButton: {
    alignItems: "center",
    height: 24,
    justifyContent: "center",
    marginLeft: 4,
    width: 24,
  },
  quickEditRow: { alignItems: "center", flexDirection: "row", marginTop: 7 },
  currencySmall: { color: colors.green, fontSize: 12, fontWeight: "800" },
  quickAmountInput: {
    color: colors.green,
    flex: 1,
    fontSize: 12,
    fontWeight: "800",
    padding: 0,
  },
  quickUseButton: {
    backgroundColor: colors.navy,
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  quickUseText: { color: colors.white, fontSize: 10, fontWeight: "800" },
  addQuickButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 6,
    marginTop: -12,
    marginBottom: 18,
    paddingVertical: 6,
  },
  addQuickButtonText: { color: colors.blue, fontSize: 13, fontWeight: "700" },
});

// Shared visual styles for app screens and expense components.
export const expenseTrackerStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.canvas },
  appShell: { flex: 1 },
  content: { padding: 20, paddingBottom: 32 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  eyebrow: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.4,
    marginBottom: 6,
  },
  title: { color: colors.ink, fontSize: 30, fontWeight: "800" },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  heroCard: {
    backgroundColor: colors.navy,
    borderRadius: 22,
    padding: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  heroLabel: {
    color: "#B7C9D8",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  heroAmount: {
    color: colors.white,
    fontSize: 34,
    fontWeight: "800",
    marginTop: 8,
  },
  heroCaption: { color: "#B7C9D8", marginTop: 5, fontSize: 13 },
  heroMark: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#214665",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryRow: { flexDirection: "row", gap: 9, marginBottom: 26 },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dot: { width: 7, height: 7, borderRadius: 4, marginBottom: 9 },
  summaryLabel: { color: colors.muted, fontSize: 11, fontWeight: "700" },
  summaryValue: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 4,
  },
  sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: "800" },
  sectionAction: { color: colors.blue, fontSize: 12, fontWeight: "700" },
  count: { color: colors.blue, fontSize: 12, fontWeight: "700" },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 23,
  },
  progressBlock: { marginBottom: 16 },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: { color: colors.ink, fontSize: 13, fontWeight: "700" },
  progressValue: { color: colors.muted, fontSize: 12 },
  progressTrack: {
    backgroundColor: "#E9EFF3",
    borderRadius: 8,
    height: 8,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: colors.green,
    borderRadius: 8,
    height: 8,
  },
  chart: {
    flexDirection: "row",
    height: 126,
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  barColumn: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: 120,
    width: 28,
  },
  bar: {
    width: 18,
    backgroundColor: colors.blue,
    borderRadius: 6,
    minHeight: 6,
  },
  barLabel: { color: colors.muted, fontSize: 11, marginTop: 8 },
  transactionRow: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 64,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 9,
  },
  transactionRowLast: { borderBottomWidth: 0 },
  transactionIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  transactionDetails: { flex: 1, marginLeft: 11 },
  transactionDescription: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "700",
  },
  transactionDate: { color: colors.muted, fontSize: 11, marginTop: 4 },
  transactionAmount: { color: colors.ink, fontSize: 14, fontWeight: "800" },
  deleteButton: { padding: 8, marginLeft: 3 },
  emptyState: { alignItems: "center", padding: 24 },
  emptyTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 10,
  },
  emptyText: { color: colors.muted, fontSize: 13, marginTop: 5 },
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    height: 72,
    paddingBottom: 7,
  },
  tabButton: { alignItems: "center", flex: 1, justifyContent: "center" },
  tabLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 4,
  },
  tabLabelActive: { color: colors.navy },
  helperText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 22,
  },
  inputLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.1,
    marginBottom: 8,
    marginTop: 4,
  },
  amountBox: {
    alignItems: "center",
    backgroundColor: colors.canvas,
    borderRadius: 13,
    flexDirection: "row",
    marginBottom: 18,
    paddingHorizontal: 14,
  },
  currency: { color: colors.navy, fontSize: 22, fontWeight: "800" },
  amountInput: {
    color: colors.ink,
    flex: 1,
    fontSize: 28,
    fontWeight: "800",
    padding: 14,
  },
  budgetInput: {
    color: colors.ink,
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    padding: 12,
  },
  textInput: {
    backgroundColor: colors.canvas,
    borderRadius: 13,
    color: colors.ink,
    fontSize: 15,
    padding: 16,
    marginBottom: 3,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  categoryButton: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: 11,
    width: "31%",
  },
  categoryButtonSelected: { borderWidth: 1 },
  categoryIcon: {
    alignItems: "center",
    borderRadius: 12,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  categoryName: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 6,
  },
  quickRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
    marginBottom: 23,
  },
  quickButton: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    flexBasis: "47%",
    flexGrow: 1,
    padding: 12,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.navy,
    borderRadius: 15,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 54,
    marginBottom: 18,
  },
  primaryButtonText: { color: colors.white, fontSize: 15, fontWeight: "800" },
  searchBox: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 24,
    paddingHorizontal: 14,
  },
  searchInput: { color: colors.ink, flex: 1, fontSize: 14, padding: 14 },
  remainingText: {
    color: colors.muted,
    fontSize: 12,
    marginTop: -8,
    marginBottom: 20,
  },
  statGrid: { gap: 10, marginBottom: 23 },
  statCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 17,
    borderWidth: 1,
    padding: 16,
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 11,
  },
  statValue: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 4,
  },
  breakdownRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 17,
  },
  breakdownName: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "700",
    width: 76,
  },
  breakdownTrack: {
    backgroundColor: "#E9EFF3",
    borderRadius: 5,
    flex: 1,
    height: 7,
    overflow: "hidden",
  },
  breakdownFill: {
    backgroundColor: colors.green,
    borderRadius: 5,
    height: 7,
  },
  breakdownValue: {
    color: colors.muted,
    fontSize: 11,
    marginLeft: 8,
    width: 58,
    textAlign: "right",
  },
});

// Dynamic style values are assembled here so screens/components hold no CSS.
export const getBudgetWarningStyle = (isDanger) => [
  expenseTrackerExtraStyles.warningCard,
  isDanger && expenseTrackerExtraStyles.warningCardDanger,
];

export const getSummaryDotStyle = (color) => [
  expenseTrackerStyles.dot,
  { backgroundColor: color },
];

export const getProgressFillStyle = (progress) => [
  expenseTrackerStyles.progressFill,
  { width: `${progress * 100}%` },
];

export const getTabLabelStyle = (isActive) => [
  expenseTrackerStyles.tabLabel,
  isActive && expenseTrackerStyles.tabLabelActive,
];

export const getCategoryButtonStyle = (category, isSelected) => [
  expenseTrackerStyles.categoryButton,
  isSelected && expenseTrackerStyles.categoryButtonSelected,
  isSelected && {
    borderColor: category.color,
    backgroundColor: `${category.color}18`,
  },
];

export const getCategoryIconStyle = (category) => [
  expenseTrackerStyles.categoryIcon,
  { backgroundColor: `${category.color}22` },
];

export const getTransactionIconStyle = (category) => [
  expenseTrackerStyles.transactionIcon,
  { backgroundColor: `${category.color}20` },
];

export const getChartBarStyle = (height) => [
  expenseTrackerStyles.bar,
  { height },
];

export const getBreakdownFillStyle = (progress) => [
  expenseTrackerStyles.breakdownFill,
  { width: `${progress * 100}%` },
];

export const getTransactionRowStyle = (isLastRow) => [
  expenseTrackerStyles.transactionRow,
  isLastRow && expenseTrackerStyles.transactionRowLast,
];
