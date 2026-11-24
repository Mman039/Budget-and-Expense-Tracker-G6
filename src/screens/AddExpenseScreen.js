import { useState } from "react";
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
 * Lets the user enter an expense and manage reusable quick-add shortcuts.
 */
export function AddExpenseScreen({
  quickAdds,
  onEditQuickAdd,
  onAddQuickAdd,
  onRemoveQuickAdd,
  onSubmit,
  onCancel,
}) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("food");

  const submitExpense = () => {
    if (onSubmit({ description, amount, category: selectedCategory })) {
      setDescription("");
      setAmount("");
    }
  };

  const applyQuickAdd = (quickAdd) => {
    setAmount(quickAdd.amount);
    setDescription(quickAdd.label);
  };

  return (
    <>
      <Header
        eyebrow="NEW TRANSACTION"
        title="Add expense"
        action={
          <Pressable
            onPress={onCancel}
            accessibilityRole="button"
            accessibilityLabel="Close add expense"
          >
            <Ionicons name="close" size={24} color={colors.navy} />
          </Pressable>
        }
      />
      <Text style={styles.helperText}>
        Money-tor your money with a tracker.
      </Text>
      <ExpenseForm
        description={description}
        amount={amount}
        setDescription={setDescription}
        setAmount={setAmount}
        onSubmit={submitExpense}
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
                onPress={() => applyQuickAdd(quickAdd)}
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
      <Pressable style={styles.primaryButton} onPress={submitExpense}>
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
