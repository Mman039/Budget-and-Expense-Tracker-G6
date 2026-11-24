import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { colors, expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";

// Wraps each screen in a safe, scrollable page.
// It also shows a small save-error message above the screen content.
export function ScreenFrame({ children, storageError }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.appShell}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {storageError ? (
            <View
              style={{
                backgroundColor: "#FEF3C7",
                borderRadius: 12,
                marginBottom: 16,
                padding: 12,
              }}
            >
              <Text style={{ color: colors.warning, fontWeight: "700" }}>
                {storageError}
              </Text>
            </View>
          ) : null}
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
