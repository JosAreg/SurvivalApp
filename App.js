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
import { ThemeProvider, ThemeContext, lightTheme, darkTheme } from './ThemeContext'; // Import ThemeContext und ThemeProvider

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}

function Navigation() {
  const { isDarkMode } = useContext(ThemeContext); // Greife auf den ThemeContext hier zu

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
