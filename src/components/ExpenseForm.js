import { Text, TextInput, View } from "react-native";
import { expenseTrackerStyles } from "../styles/expenseTrackerStyles";

// Collects the description and amount needed to create a new expense.
export function ExpenseForm({
  description,
  amount,
  setDescription,
  setAmount,
  onSubmit,
  componentStyles = expenseTrackerStyles,
}) {
  const isAppForm = Boolean(componentStyles.amountBox);

  return (
    <View
      style={
        isAppForm ? componentStyles.card : componentStyles.formCard
      }
    >
      <Text
        style={
          isAppForm
            ? componentStyles.inputLabel
            : componentStyles.sectionTitle
        }
      >
        AMOUNT
      </Text>
      <View
        style={
          isAppForm
            ? componentStyles.amountBox
            : componentStyles.amountInputWrap
        }
      >
        <Text style={componentStyles.currency}>₱</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          placeholderTextColor="#8C918B"
          keyboardType="decimal-pad"
          style={componentStyles.amountInput}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
      </View>
      <Text
        style={
          isAppForm
            ? componentStyles.inputLabel
            : componentStyles.sectionTitle
        }
      >
        DESCRIPTION
      </Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="What did you spend on?"
        placeholderTextColor="#8C918B"
        style={
          isAppForm ? componentStyles.textInput : componentStyles.input
        }
      />
    </View>
  );
}
