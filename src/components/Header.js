// Reusable page heading used across the app's screens.
import { Text, View } from "react-native";
import { expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";

/**
 * Renders the page title and optional right-side action element.
 * Most screens use this to keep their headers visually consistent.
 */
export function Header({ eyebrow, title, action }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      {action}
    </View>
  );
}
