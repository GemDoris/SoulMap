import { Tabs } from 'expo-router';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Chrome as Home, User, BrainCircuit, MessageCircle, LayoutGrid as Layout } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          height: 60 + (Platform.OS === 'ios' ? insets.bottom : 0),
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10,
        },
        tabBarActiveTintColor: '#6C5CE7',
        tabBarInactiveTintColor: '#A0AEC0',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarBackground: () => (
          <BlurView 
            tint="light" 
            intensity={80} 
            style={StyleSheet.absoluteFill} 
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="analysis"
        options={{
          title: 'Analysis',
          tabBarIcon: ({ color, size }) => (
            <BrainCircuit size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="communication"
        options={{
          title: 'Improve',
          tabBarIcon: ({ color, size }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderTopWidth: 0,
    elevation: 0,
    paddingTop: 10,
  },
  tabBarLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});