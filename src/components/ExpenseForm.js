import { Pressable, Text, TextInput, View } from "react-native";
import { expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";
// Collects the name and amount needed to create a new expense.
export function ExpenseForm({ name, amount, setName, setAmount, onSubmit }) {
    return (<>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Add expense</Text>
        <Text style={styles.sectionHint}>Keep it simple</Text>
      </View>
      <View style={styles.formCard}>
        <TextInput value={name} onChangeText={setName} placeholder="What did you spend on?" placeholderTextColor="#8C918B" style={styles.input} returnKeyType="next"/>
        <View style={styles.formRow}>
          <View style={styles.amountInputWrap}>
            <Text style={styles.currency}>₱</Text>
            <TextInput value={amount} onChangeText={setAmount} placeholder="0.00" placeholderTextColor="#8C918B" keyboardType="decimal-pad" style={styles.amountInput} returnKeyType="done" onSubmitEditing={onSubmit}/>
          </View>
          <Pressable style={styles.addButton} onPress={onSubmit} accessibilityRole="button">
            <Text style={styles.addButtonText}>Add expense</Text>
          </Pressable>
        </View>
      </View>
    </>);
}
