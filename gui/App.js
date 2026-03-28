import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import MoistureMeterScreen from './src/screens/MoistureMeterScreen';
import CropHealthScreen from './src/screens/CropHealthScreen';
import LocationMapScreen from './src/screens/LocationMapScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AboutScreen from './src/screens/AboutScreen';

const Stack = createNativeStackNavigator();

function StackNav() {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.text,
        headerTitleStyle: { fontSize: theme.fontSize, fontWeight: '600' },
        contentStyle: { backgroundColor: theme.bg },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'app name' }} />
      <Stack.Screen name="Moisture" component={MoistureMeterScreen} options={{ title: 'Moisture Meter' }} />
      <Stack.Screen name="CropHealth" component={CropHealthScreen} options={{ title: 'Crop Health' }} />
      <Stack.Screen name="LocationMap" component={LocationMapScreen} options={{ title: 'Location Map' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <StackNav />
      </NavigationContainer>
    </ThemeProvider>
  );
}
