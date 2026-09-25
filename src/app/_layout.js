import { Stack } from "expo-router";
// Creates the root navigation stack and hides its default header for the custom app header.
export default function RootLayout() {
    return <Stack screenOptions={{ headerShown: false }}/>;
}
