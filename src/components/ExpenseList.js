import { Pressable, Text, View } from "react-native";
import { expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";
import { formatAmount } from "../utils/currency";
// Renders each expense and provides a delete action for every row.
export function ExpenseList({ expenses, onDelete }) {
    return (<>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent expenses</Text>
        <Text style={styles.count}>{expenses.length}</Text>
      </View>
      <View style={styles.expenseList}>
        {expenses.length === 0 ? (<View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Nothing logged yet</Text>
            <Text style={styles.emptyText}>Your next expense will appear here.</Text>
          </View>) : (expenses.map((expense) => (<View style={styles.expenseRow} key={expense.id}>
              <View style={styles.expenseIcon}><Text style={styles.expenseIconText}>₱</Text></View>
              <View style={styles.expenseDetails}>
                <Text style={styles.expenseName}>{expense.name}</Text>
                <Text style={styles.expenseDate}>{expense.date}</Text>
              </View>
              <Text style={styles.expenseAmount}>{formatAmount(expense.amount)}</Text>
              <Pressable onPress={() => onDelete(expense.id)} style={styles.deleteButton} accessibilityLabel={`Delete ₱{expense.name}`} accessibilityRole="button">
                <Text style={styles.deleteButtonText}>x</Text>
              </Pressable>
            </View>)))}
      </View>
    </>);
}
