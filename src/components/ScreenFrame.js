// This component wraps the app's screens with a shared layout.
// It adds the safe area, scrollable content area, and bottom navigation tabs.
import { Ionicons } from "@expo/vector-icons";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import {
  colors,
  getTabLabelStyle,
  expenseTrackerStyles as styles,
} from "../styles/expenseTrackerStyles";

// These tab definitions control the bottom navigation for the prototype app.
const tabs = [
  { id: "Home", label: "Home", icon: "home-outline" },
  { id: "Add", label: "Add", icon: "add-circle-outline" },
  { id: "History", label: "History", icon: "list-outline" },
  { id: "Budget", label: "Budget", icon: "wallet-outline" },
  { id: "Stats", label: "Stats", icon: "bar-chart-outline" },
];

/**
 * Wraps a screen with the shared layout shell.
 * It keeps each page visually consistent and makes navigation available from the bottom tab bar.
 */
export function ScreenFrame({ children, navigation, activeScreen }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.appShell}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <Pressable
              key={tab.id}
              style={styles.tabButton}
              onPress={() => navigation.navigate(tab.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: activeScreen === tab.id }}
            >
              <Ionicons
                name={tab.icon}
                size={22}
                color={activeScreen === tab.id ? colors.navy : colors.muted}
              />
              <Text style={getTabLabelStyle(activeScreen === tab.id)}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
