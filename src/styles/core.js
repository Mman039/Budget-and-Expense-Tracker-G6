// Core visual styles for the app's screens and reusable components.
// This file holds the main design system: cards, lists, buttons, inputs, and layout blocks.
import { StyleSheet } from "react-native";

import { colors } from "./tokens";

export const expenseTrackerStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.canvas }, // The safe area is the outermost container that ensures content doesn't overlap with device notches or status bars.
  appShell: { flex: 1 },
  content: { padding: 20, paddingBottom: 32 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  eyebrow: {
    // Small label above the main title, often used for context or categorization.
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.4,
    marginBottom: 6,
  },
  title: { color: colors.ink, fontSize: 30, fontWeight: "800" }, // The main title of a screen, typically the largest text element, used to convey the primary purpose or content of the page.
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  heroCard: {
    // Large summary card shown at the top of the home dashboard.
    backgroundColor: colors.navy,
    borderRadius: 22,
    padding: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  heroLabel: {
    // Small label above the main amount in the hero card, providing context for the displayed total.
    color: "#B7C9D8",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  heroAmount: {
    // The main total amount displayed in the hero card, typically representing the user's total expenses for the month.
    color: colors.white,
    fontSize: 34,
    fontWeight: "800",
    marginTop: 8,
  },
  heroCaption: { color: "#B7C9D8", marginTop: 5, fontSize: 13 }, // Supporting text below the main amount in the hero card, often used to provide additional context or information about the total displayed.
  heroMark: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#214665",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryRow: { flexDirection: "row", gap: 9, marginBottom: 26 }, // A horizontal row layout used to display multiple summary cards side by side, with spacing between them.
  summaryCard: {
    // A compact card used in the home dashboard to show a single metric, consisting of a colored dot, a label, and a total amount.
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dot: { width: 7, height: 7, borderRadius: 4, marginBottom: 9 },
  summaryLabel: { color: colors.muted, fontSize: 11, fontWeight: "700" }, // The label text in a summary card, providing a brief description of the metric being displayed.
  summaryValue: {
    // The total amount or value displayed in a summary card, representing the metric's numerical data.
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 5,
  },
  sectionHeader: {
    // A header for sections within a screen, typically used to introduce a new category or group of related content.
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 4,
  },
  sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: "800" }, // The main title for a section, providing a clear and prominent label for the content that follows.
  sectionAction: { color: colors.blue, fontSize: 12, fontWeight: "700" }, // An optional action text in a section header, often used for links or buttons that allow users to perform an action related to the section's content.
  count: { color: colors.blue, fontSize: 12, fontWeight: "700" }, // A small text element used to display counts or numerical indicators, often found in section headers or next to labels to provide additional context about the quantity of items or data points.
  card: {
    // A generic card component used throughout the app to group related content, providing a visually distinct container with padding and rounded corners.
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 23,
  },
  progressBlock: { marginBottom: 16 }, // A block element used to display progress indicators, such as progress bars or completion percentages, often accompanied by labels and values to provide context for the user's progress within a specific task or goal.
  progressHeader: {
    // The header for a progress block, containing the label and value for the progress indicator, arranged in a horizontal row with space between them.
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: { color: colors.ink, fontSize: 13, fontWeight: "700" }, // The label text for a progress indicator, providing a brief description of the task or goal being tracked, typically displayed above or next to the progress bar.
  progressValue: { color: colors.muted, fontSize: 12 }, // The value text for a progress indicator, displaying the current progress or completion percentage, often shown alongside the label to provide context for the user's progress within a specific task or goal.
  progressTrack: {
    // The track or background of a progress bar, representing the total length or capacity of the task or goal being tracked, typically displayed as a horizontal bar with a distinct color and rounded corners.
    backgroundColor: "#E9EFF3",
    borderRadius: 8,
    height: 8,
    overflow: "hidden",
  },
  progressFill: {
    // The fill or foreground of a progress bar, representing the current progress or completion percentage of the task or goal being tracked, typically displayed as a colored bar that fills the track proportionally to the user's progress.
    backgroundColor: colors.green,
    borderRadius: 8,
    height: 8,
  },
  chart: {
    // A container for displaying charts or graphical representations of data, often used to visualize trends, patterns, or comparisons within the app's content.
    flexDirection: "row",
    height: 126,
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  barColumn: {
    // A column container for displaying individual bars within a chart, arranged in a horizontal row with space between them.
    alignItems: "center",
    justifyContent: "flex-end",
    height: 120,
    width: 28,
  },
  bar: {
    // The visual representation of a single bar within a chart, indicating a specific value or metric, typically displayed as a vertical rectangle with a distinct color and height proportional to the data being represented.
    width: 18,
    backgroundColor: colors.blue,
    borderRadius: 6,
    minHeight: 6,
  },
  barLabel: { color: colors.muted, fontSize: 11, marginTop: 8 }, // The label text for a bar within a chart, providing context or description for the data represented by the bar, typically displayed below the bar to indicate the corresponding category or time period.
  transactionRow: {
    // A row container for displaying individual transactions within a list, arranged in a vertical column with spacing between them.
    alignItems: "center",
    flexDirection: "row",
    minHeight: 64,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 9,
  },
  transactionRowLast: { borderBottomWidth: 0 }, // The last row in a list of transactions, typically displayed without a bottom border.
  transactionIcon: {
    // The icon or visual representation of a transaction, often displayed as a colored circle or square with an icon or initial inside, providing a quick visual cue for the type or category of the transaction.
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
