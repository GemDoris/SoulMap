import { Stack } from 'expo-router';

export default function AnalysisLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="mbti" />
      <Stack.Screen name="astrology" />
      <Stack.Screen name="purple-star" />
      <Stack.Screen name="relationships" />
    </Stack>
  );
}