// TabNavigator.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/homeScreen';
import CartScreen from '../screens/CartScreen';
import { useTheme } from '../styles/ThemeContext';
import App_Services from '../api/services';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { theme } = useTheme();
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count from DB
  const fetchCartCount = () => {
    App_Services.getCartItemsCount((rows) => {
      if (rows && rows.length > 0) {
        setCartCount(rows[0].count);
      } else {
        setCartCount(0);
      }
    });
  };

  useEffect(() => {
    fetchCartCount();

   
    const interval = setInterval(fetchCartCount, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.tabBarBackground,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          height: 60,
          overflow: 'hidden',
          position: 'absolute',
        },
        tabBarActiveTintColor: theme.background,
        tabBarInactiveTintColor: theme.secondary,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Cart') {
            iconName = 'cart';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          if (route.name === 'Cart') {
            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
                {cartCount > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      right: -6,
                      top: -3,
                      backgroundColor: '#333',
                      borderRadius: 8,
                      paddingHorizontal: 5,
                      minWidth: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                      {cartCount}
                    </Text>
                  </View>
                )}
              </View>
            );
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen name="Favorites" component={HomeScreen} />
      <Tab.Screen name="Profile" component={HomeScreen} />
    </Tab.Navigator>
  );
}
