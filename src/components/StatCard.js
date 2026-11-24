// Shows one short spending statistic on the stats screen.
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";

/**
 * Renders a single statistic with an icon, label, and value.
 */
export function StatCard({ label, value, icon, color }) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={23} color={color} />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}
