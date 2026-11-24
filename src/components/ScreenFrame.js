import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { colors, expenseTrackerStyles as styles } from "../styles/expenseTrackerStyles";

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
