// This screen is the entry point for creating a new expense.
// It includes the amount form, category picker, and shortcut buttons for repeated spending.
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, TextInput, View } from "react-native";
import { ExpenseForm } from "../components/ExpenseForm";
import { Header } from "../components/Header";
import { SectionTitle } from "../components/SectionTitle";
import { categories } from "../data/categories";
import {
  colors,
  expenseTrackerExtraStyles as extraStyles,
  getCategoryButtonStyle,
  getCategoryIconStyle,
  expenseTrackerStyles as styles,
} from "../styles/expenseTrackerStyles";

const maxQuickAdds = 6;

/**
 * Lets the user choose a category, type an amount, and save a new expense.
 * The quick-add section stores reusable common purchase entries.
 */
export function AddExpenseScreen({
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
        Money-tor your money with a tracker.
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
