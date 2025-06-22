import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import { AuthStackParamList, MainTabParamList } from './types';
import { NAVIGATION_THEME, TAB_CONFIG, STACK_SCREEN_OPTIONS, TAB_BAR_OPTIONS } from './constants';

// Import screens (to be created)
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

import HomeScreen from '../screens/main/HomeScreen';
import MarketScreen from '../screens/main/MarketScreen';
import InvestScreen from '../screens/main/InvestScreen';
import MessagesScreen from '../screens/main/MessagesScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

// Create navigation stacks
const Stack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Auth Navigator
const AuthNavigator = () => (
  <Stack.Navigator screenOptions={STACK_SCREEN_OPTIONS}>
    <Stack.Screen 
      name="Welcome" 
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Login" 
      component={LoginScreen}
      options={{ title: 'Sign In' }}
    />
    <Stack.Screen 
      name="Register" 
      component={RegisterScreen}
      options={{ title: 'Create Account' }}
    />
    <Stack.Screen 
      name="ForgotPassword" 
      component={ForgotPasswordScreen}
      options={{ title: 'Reset Password' }}
    />
  </Stack.Navigator>
);

// Main Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => (
        <Feather name={TAB_CONFIG[route.name].icon as any} size={size} color={color} />
      ),
      ...TAB_BAR_OPTIONS,
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{ title: TAB_CONFIG.Home.label }}
    />
    <Tab.Screen 
      name="Market" 
      component={MarketScreen}
      options={{ title: TAB_CONFIG.Market.label }}
    />
    <Tab.Screen 
      name="Invest" 
      component={InvestScreen}
      options={{ title: TAB_CONFIG.Invest.label }}
    />
    <Tab.Screen 
      name="Messages" 
      component={MessagesScreen}
      options={{ title: TAB_CONFIG.Messages.label }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{ title: TAB_CONFIG.Profile.label }}
    />
  </Tab.Navigator>
);

// Root Navigator
export const RootNavigator = () => {
  // TODO: Add authentication state check
  const isAuthenticated = false;

  return (
    <NavigationContainer theme={NAVIGATION_THEME}>
      {isAuthenticated ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};