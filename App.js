import 'react-native-gesture-handler';
import React, { useState, createContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './app/screens/index';
import Compass from './app/screens/compass';
import Height from './app/screens/height';
import LightMeter from './app/screens/lightmeter';
import Speedometer from './app/screens/speedometer';
import Settings from './app/screens/settings'; // Settings hinzufügen

const Stack = createStackNavigator();
export const ThemeContext = createContext(); // ThemeContext erstellen

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ headerTitle: 'SurvivalApp' }} />
          <Stack.Screen name="Compass" component={Compass} options={defaultScreenOptions} />
          <Stack.Screen name="Height" component={Height} options={defaultScreenOptions} />
          <Stack.Screen name="LightMeter" component={LightMeter} options={defaultScreenOptions} />
          <Stack.Screen name="Speedometer" component={Speedometer} options={defaultScreenOptions} />
          <Stack.Screen name="Settings" component={Settings} options={{ headerTitle: 'Settings' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const defaultScreenOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
      <Text style={styles.buttonText}>Home</Text>
    </TouchableOpacity>
  ),
});

const lightTheme = {
  dark: false,
  colors: {
    primary: 'black',
    background: 'white',
    card: 'white',
    text: 'black',
    border: 'gray',
    notification: 'black',
  },
};

const darkTheme = {
  dark: true,
  colors: {
    primary: 'white',
    background: 'black',
    card: 'black',
    text: 'white',
    border: 'gray',
    notification: 'white',
  },
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
  },
});
