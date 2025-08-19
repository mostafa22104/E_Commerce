import React, { createContext, useState, useContext, useEffect } from "react";
import { Appearance } from "react-native";
import { lightTheme, darkTheme } from "./theme";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {

  const colorScheme = Appearance.getColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === "dark");


  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === "dark");
    });
    return () => subscription.remove();
  }, []);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);
