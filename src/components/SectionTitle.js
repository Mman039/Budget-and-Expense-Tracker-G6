// Small section label component for grouping related content together.
import { Pressable, Text, View } from "react-native";
import { expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";

/**
 * Draws a section heading and optional CTA such as "View stats" or "See all".
 * If an onAction callback is supplied, it becomes clickable; otherwise it behaves like plain text.
 */
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
