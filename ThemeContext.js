import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Erstelle den ThemeContext
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Lade den gespeicherten Dark Mode Zustand bei der Initialisierung
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('darkMode');
        if (savedTheme !== null) {
          setIsDarkMode(JSON.parse(savedTheme));  // true/false Wert zurücksetzen
        }
      } catch (e) {
        console.log("Fehler beim Laden des Themas", e);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    try {
      // Speichere den Zustand des Dark Modes in AsyncStorage
      await AsyncStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    } catch (e) {
      console.log("Fehler beim Speichern des Themas", e);
    }
  };

  const theme = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const lightTheme = {
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

export const darkTheme = {
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
