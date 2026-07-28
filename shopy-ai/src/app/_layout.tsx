import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import { Stack } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="sales" />
        <Stack.Screen name="inventory" />
        <Stack.Screen name="reports" />
        <Stack.Screen name="payments" />
        <Stack.Screen name="scanner" />
        <Stack.Screen name="analytics" />
      </Stack>
    </ThemeProvider>
  );
}