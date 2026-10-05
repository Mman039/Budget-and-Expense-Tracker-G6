//`_layout.js` sets up the root navigation; it uses the `Stack` component from `expo-router` to create a navigation stack and hides the default header, allowing for a custom app header to be implemented.
import { Stack } from "expo-router";
export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
