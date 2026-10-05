import { Text, View } from "react-native";
import { expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";

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
