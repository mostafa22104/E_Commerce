import React, { useEffect }  from 'react';
import { ThemeProvider, useTheme } from './src/styles/ThemeContext';
import TabNavigator from './src/navigation/TabNavigator';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import App_Services from './src/api/services'
export default function App() {

  useEffect(() => {
    initDatabase()
  }, []);

 const initDatabase= async() => {
    await  App_Services.initDatabase();
    }
  return (

      <NavigationContainer >
        <TabNavigator />
      </NavigationContainer>
  
  );
}
