// Helper functions that build dynamic styles from the base tokens.
// This keeps styling logic separate from the React component code.
import { expenseTrackerStyles } from "./core";
import { expenseTrackerExtraStyles } from "./extras";

// Combines the standard warning card style with a danger variant when an alert requires more urgent emphasis.
export const getBudgetWarningStyle = (isDanger) => [
  expenseTrackerExtraStyles.warningCard,
  isDanger && expenseTrackerExtraStyles.warningCardDanger,
];

// Creates a summary dot using the provided color while preserving the shared dot sizing and shape.
export const getSummaryDotStyle = (color) => [
  expenseTrackerStyles.dot,
  { backgroundColor: color },
];

// Expands a progress bar to the requested percentage while reusing the base fill styling.
export const getProgressFillStyle = (progress) => [
  expenseTrackerStyles.progressFill,
  { width: `${progress * 100}%` },
];

// Applies the active tab label styling when the tab is selected and keeps the default label otherwise.
export const getTabLabelStyle = (isActive) => [
  expenseTrackerStyles.tabLabel,
  isActive && expenseTrackerStyles.tabLabelActive,
];

// Builds the category button styling, highlighting the selected option with the category's accent color.
export const getCategoryButtonStyle = (category, isSelected) => [
  expenseTrackerStyles.categoryButton,
  isSelected && expenseTrackerStyles.categoryButtonSelected,
  isSelected && {
    borderColor: category.color,
    backgroundColor: `${category.color}18`,
  },
];

// Creates the category icon background using the category's color so each icon reads as a distinct group.
export const getCategoryIconStyle = (category) => [
  expenseTrackerStyles.categoryIcon,
  { backgroundColor: `${category.color}22` },
];

// Applies a translucent tint to a transaction icon based on the category's color.
export const getTransactionIconStyle = (category) => [
  expenseTrackerStyles.transactionIcon,
  { backgroundColor: `${category.color}20` },
];

// Sets the height of a chart bar while keeping the shared bar styling and rounded shape.
export const getChartBarStyle = (height) => [
  expenseTrackerStyles.bar,
  { height },
];

// Resizes a breakdown bar to reflect a percentage value while preserving the shared track styling.
export const getBreakdownFillStyle = (progress) => [
  expenseTrackerStyles.breakdownFill,
  { width: `${progress * 100}%` },
];

// Adds the last-row variant when needed so the final transaction in a list can omit the separator border.
export const getTransactionRowStyle = (isLastRow) => [
  expenseTrackerStyles.transactionRow,
  isLastRow && expenseTrackerStyles.transactionRowLast,
];
