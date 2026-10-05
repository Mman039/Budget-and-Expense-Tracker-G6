// Extra styles used for warning components and quick-add editing controls.
import { StyleSheet } from "react-native";

import { colors } from "./tokens";

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
