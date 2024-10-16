import React, { createContext, useState } from 'react';

// Erstelle den ThemeContext
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
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
