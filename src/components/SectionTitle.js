import { Pressable, Text, View } from "react-native";
import { expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";

export function SectionTitle({ title, action, onAction }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action &&
        (onAction ? (
          <Pressable onPress={onAction} accessibilityRole="button">
            <Text style={styles.sectionAction}>{action}</Text>
          </Pressable>
        ) : (
          <Text style={styles.sectionAction}>{action}</Text>
        ))}
    </View>
  );
}
