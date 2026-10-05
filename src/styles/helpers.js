// Helper functions that build dynamic styles from the base tokens.
// This keeps styling logic separate from the React component code.
import { expenseTrackerStyles } from "./core";
import { expenseTrackerExtraStyles } from "./extras";

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
