// Field set for entering a new expense amount and description.
import { Text, TextInput, View } from "react-native";
import { expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";

/**
 * Collects the amount and description required to create a new expense.
 * The parent screen controls the data and handles submission logic.
 */
export function ExpenseForm({
  description,
  amount,
  setDescription,
  setAmount,
  onSubmit,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.inputLabel}>AMOUNT</Text>
      <View style={styles.amountBox}>
        <Text style={styles.currency}>₱</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          placeholderTextColor="#8C918B"
          keyboardType="decimal-pad"
          style={styles.amountInput}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
      </View>
      <Text style={styles.inputLabel}>DESCRIPTION</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="What did you spend on?"
        placeholderTextColor="#8C918B"
        style={styles.textInput}
      />
    </View>
  );
}
