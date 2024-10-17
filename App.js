import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './app/screens/index';
import Compass from './app/screens/compass';
import Height from './app/screens/height';
import LightMeter from './app/screens/lightmeter';
import Speedometer from './app/screens/speedometer';
import Settings from './app/screens/settings';
import { ThemeProvider, ThemeContext, lightTheme, darkTheme } from './ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';

// Haupt-App-Komponente
export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

// Haupt-App-Layout mit SafeAreaView und Navigation
function MainApp() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Navigation />
    </SafeAreaView>
  );
}

// Navigation
const Stack = createStackNavigator();

function Navigation() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerTitle: 'SurvivalApp' }} />
        <Stack.Screen name="Compass" component={Compass} />
        <Stack.Screen name="Height" component={Height} />
        <Stack.Screen name="LightMeter" component={LightMeter} />
        <Stack.Screen name="Speedometer" component={Speedometer} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
