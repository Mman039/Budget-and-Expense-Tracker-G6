// Extra styles used for warning components and quick-add editing controls.
import { StyleSheet } from "react-native";

import { colors } from "./tokens";

export const expenseTrackerExtraStyles = StyleSheet.create({
  warningCard: {
    // The default warning panel used for budget or balance alerts that need attention without being critical.
    alignItems: "flex-start",
    backgroundColor: "#FFF7E6",
    borderColor: "#F7D58A",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 18,
    padding: 14,
  },
  warningCardDanger: {
    // A red-tinted warning variant used when the issue is urgent or the budget is at risk.
    backgroundColor: "#FFF0F0",
    borderColor: "#F3B2B2",
  },
  warningText: {
    // The content area inside a warning card that contains both the title and the explanation text.
    flex: 1,
    marginLeft: 10,
  },
  warningTitle: {
    // The headline for warning or reminder messages, making the issue obvious at a glance.
    color: "#9A6700",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 3,
  },
  warningMessage: {
    // Supporting text inside the warning card that explains the risk, recommended action, or context.
    color: "#7A5C20",
    fontSize: 12,
    lineHeight: 18,
  },
  quickInput: {
    // The compact text field used in quick-add or inline editing actions for a short value entry.
    color: colors.ink,
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    padding: 0,
  },
  quickHeader: {
    // The header row for a quick-edit item, aligning the label and the removal action horizontally.
    alignItems: "center",
    flexDirection: "row",
  },
  quickRemoveButton: {
    // The small delete button for removing a quick-add item from the list of shortcuts.
    alignItems: "center",
    height: 24,
    justifyContent: "center",
    marginLeft: 4,
    width: 24,
  },
  quickEditRow: {
    // A compact row that stacks a value input and the action button used to apply a quick edit.
    alignItems: "center",
    flexDirection: "row",
    marginTop: 7,
  },
  currencySmall: {
    // The smaller currency marker shown next to quick-amount values in inline edit fields.
    color: colors.green,
    fontSize: 12,
    fontWeight: "800",
  },
  quickAmountInput: {
    // The compact amount entry field used for quick add or edit controls.
    color: colors.green,
    flex: 1,
    fontSize: 12,
    fontWeight: "800",
    padding: 0,
  },
  quickUseButton: {
    // The small action button that confirms and applies a quick-add entry in the form.
    backgroundColor: colors.navy,
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  quickUseText: {
    // The label text inside the quick-use button, kept compact for dense editing layouts.
    color: colors.white,
    fontSize: 10,
    fontWeight: "800",
  },
  addQuickButton: {
    // The button used to expand the quick-add controls and add another shortcut.
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 6,
    marginTop: -12,
    marginBottom: 18,
    paddingVertical: 6,
  },
  addQuickButtonText: {
    // The label for the quick-add trigger button, styled to look like a secondary call to action.
    color: colors.blue,
    fontSize: 13,
    fontWeight: "700",
  },
});
