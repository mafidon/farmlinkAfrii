import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Auth Stack Types
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// Main Tab Types
export type MainTabParamList = {
  Home: undefined;
  Market: undefined;
  Invest: undefined;
  Messages: undefined;
  Profile: undefined;
};

// Home Stack Types
export type HomeStackParamList = {
  HomeScreen: undefined;
  ProductDetails: { productId: string };
  FarmerProfile: { farmerId: string };
};

// Market Stack Types
export type MarketStackParamList = {
  MarketScreen: undefined;
  AddProduct: undefined;
  EditProduct: { productId: string };
  MyProducts: undefined;
};

// Invest Stack Types
export type InvestStackParamList = {
  InvestScreen: undefined;
  InvestmentDetails: { investmentId: string };
  CreateInvestment: undefined;
  MyInvestments: undefined;
};

// Messages Stack Types
export type MessagesStackParamList = {
  MessagesScreen: undefined;
  Chat: { userId: string };
};

// Profile Stack Types
export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfile: undefined;
  Settings: undefined;
  Transactions: undefined;
};

// Navigation Props
export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;