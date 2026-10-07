// Core visual styles for the app's screens and reusable components.
// This file holds the main design system: cards, lists, buttons, inputs, and layout blocks.
import { StyleSheet } from "react-native";

import { colors } from "./tokens";

export const expenseTrackerStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.canvas }, // The safe area is the outermost container that ensures content doesn't overlap with device notches or status bars.
  appShell: {
    // The main app shell container that fills the available screen area while letting inner screens lay out content.
    flex: 1,
  },
  content: {
    // Shared screen padding that creates the standard horizontal spacing and extra bottom spacing for scrollable content.
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    // The top row of a screen, used to align the page title and any header action or icon on the same line.
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
    // The circular header action background used for settings, filters, or other quick screen-level controls.
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
    // The small accent circle used beside the hero total to visually anchor the summary card.
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
  dot: {
    // Small color indicator used inside summary cards to quickly show the metric or trend being represented.
    width: 7,
    height: 7,
    borderRadius: 4,
    marginBottom: 9,
  },
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
  transactionDetails: {
    // The text column in a transaction row, holding the description and metadata while the icon sits to the left.
    flex: 1,
    marginLeft: 11,
  },
  transactionDescription: {
    // The label for the transaction name or category, usually presented prominently in each list item.
    color: colors.ink,
    fontSize: 14,
    fontWeight: "700",
  },
  transactionDate: {
    // Smaller metadata text beneath the transaction description, usually showing the transaction date or time.
    color: colors.muted,
    fontSize: 11,
    marginTop: 4,
  },
  transactionAmount: {
    // The money value for a transaction, shown prominently to the right of the row.
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800",
  },
  deleteButton: {
    // A compact delete action attached to a transaction row or list item.
    padding: 8,
    marginLeft: 3,
  },
  emptyState: {
    // Centered empty-state layout used when no data is available yet.
    alignItems: "center",
    padding: 24,
  },
  emptyTitle: {
    // The headline inside an empty-state card, telling the user there is no content to display.
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 10,
  },
  emptyText: {
    // Supporting copy for an empty-state view that explains what the user can do next.
    color: colors.muted,
    fontSize: 13,
    marginTop: 5,
  },
  tabBar: {
    // The bottom navigation container that keeps the app tabs fixed and easy to access.
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    height: 72,
    paddingBottom: 7,
  },
  tabButton: {
    // Individual tab item in the bottom navigation, centered to keep the icon and label aligned.
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  tabLabel: {
    // The default label style for an inactive tab, keeping the text subtle and easy to scan.
    color: colors.muted,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 4,
  },
  tabLabelActive: { color: colors.navy },
  helperText: {
    // Supporting explanatory text that sits between form sections or above inputs.
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 22,
  },
  inputLabel: {
    // Small uppercase-style label used above fields to identify what the user is entering.
    color: colors.muted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.1,
    marginBottom: 8,
    marginTop: 4,
  },
  amountBox: {
    // Rounded amount input container that visually groups the currency symbol and numeric input together.
    alignItems: "center",
    backgroundColor: colors.canvas,
    borderRadius: 13,
    flexDirection: "row",
    marginBottom: 18,
    paddingHorizontal: 14,
  },
  currency: {
    // The currency symbol displayed beside the amount field, usually styled as the leading value marker.
    color: colors.navy,
    fontSize: 22,
    fontWeight: "800",
  },
  amountInput: {
    // The main numeric field for entering a monetary value, using a large, easy-to-read amount style.
    color: colors.ink,
    flex: 1,
    fontSize: 28,
    fontWeight: "800",
    padding: 14,
  },
  budgetInput: {
    // Form field used for entering a budget amount with a slightly smaller, compact style than the main amount input.
    color: colors.ink,
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    padding: 12,
  },
  textInput: {
    // Standard text field style used for descriptive entries such as notes, names, or labels.
    backgroundColor: colors.canvas,
    borderRadius: 13,
    color: colors.ink,
    fontSize: 15,
    padding: 16,
    marginBottom: 3,
  },
  categoryGrid: {
    // Grid layout for category selections, allowing options to wrap across multiple rows and stay compact.
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  categoryButton: {
    // Individual category option in a selector grid, styled as a rounded card with optional accent coloring.
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
    // A circular icon container inside a category option, sized to sit next to the category label.
    alignItems: "center",
    borderRadius: 12,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  categoryName: {
    // The label under each category icon, kept small so multiple options can fit in a grid.
    color: colors.ink,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 6,
  },
  quickRow: {
    // A wrap row for quick action buttons that lets several shortcuts sit in a compact layout.
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
    marginBottom: 23,
  },
  quickButton: {
    // A short action chip used for quick entry presets or common transaction values.
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    flexBasis: "47%",
    flexGrow: 1,
    padding: 12,
  },
  primaryButton: {
    // The main action button for submitting a form or saving new data.
    alignItems: "center",
    backgroundColor: colors.navy,
    borderRadius: 15,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 54,
    marginBottom: 18,
  },
  primaryButtonText: {
    // The text inside the primary button, strongly styled to contrast with the dark navy background.
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
  searchBox: {
    // Rounded search field styling for filtering lists or content within a screen.
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 24,
    paddingHorizontal: 14,
  },
  searchInput: {
    // The text entry portion of a search field, expanded to fill the available width while keeping spacing consistent.
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    padding: 14,
  },
  remainingText: {
    // Secondary text that shows how much budget or room is left after a transaction or allocation.
    color: colors.muted,
    fontSize: 12,
    marginTop: -8,
    marginBottom: 20,
  },
  statGrid: {
    // A compact grid of summary stats, useful for higher-level indicators like income, spending, or savings.
    gap: 10,
    marginBottom: 23,
  },
  statCard: {
    // Individual stat card that displays a key number and its associated label.
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 17,
    borderWidth: 1,
    padding: 16,
  },
  statLabel: {
    // Small label above a statistic value, clarifying what the number represents.
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 11,
  },
  statValue: {
    // Main numeric value inside a stat card, usually the most prominent content on the card.
    color: colors.ink,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 4,
  },
  breakdownRow: {
    // Horizontal row used to represent a single category breakdown item with a label, bar, and value.
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 17,
  },
  breakdownName: {
    // The category name on a breakdown row, kept narrow to allow the progress bar to sit beside it.
    color: colors.ink,
    fontSize: 12,
    fontWeight: "700",
    width: 76,
  },
  breakdownTrack: {
    // The full-width track behind a category progress bar, providing the total capacity for the visual fill.
    backgroundColor: "#E9EFF3",
    borderRadius: 5,
    flex: 1,
    height: 7,
    overflow: "hidden",
  },
  breakdownFill: {
    // The colored portion of a category breakdown row, reflecting the current percentage filled.
    backgroundColor: colors.green,
    borderRadius: 5,
    height: 7,
  },
  breakdownValue: {
    // Numeric percentage shown at the end of a breakdown row to reinforce the bar result.
    color: colors.muted,
    fontSize: 11,
    marginLeft: 8,
    width: 58,
    textAlign: "right",
  },
});
