import { MainTabParamList } from './types';

// Tab Icons and Labels
export const TAB_CONFIG: Record<keyof MainTabParamList, { label: string; icon: string }> = {
  Home: {
    label: 'Home',
    icon: 'home',
  },
  Market: {
    label: 'Market',
    icon: 'shopping-cart',
  },
  Invest: {
    label: 'Invest',
    icon: 'trending-up',
  },
  Messages: {
    label: 'Messages',
    icon: 'message-circle',
  },
  Profile: {
    label: 'Profile',
    icon: 'user',
  },
};

// Navigation Theme Colors
export const NAVIGATION_THEME = {
  dark: false,
  colors: {
    primary: '#1A4314',      // Royal Green from design
    background: '#FFFFFF',    // White
    card: '#FFFFFF',         // White
    text: '#000000',         // Black
    border: '#E5E5E5',       // Light Gray
    notification: '#F2C94C',  // Accent Yellow from design
  },
};

// Stack Screen Options
export const STACK_SCREEN_OPTIONS = {
  headerStyle: {
    backgroundColor: '#1A4314', // Royal Green
  },
  headerTintColor: '#FFFFFF',   // White
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

// Tab Bar Options
export const TAB_BAR_OPTIONS = {
  activeTintColor: '#1A4314',   // Royal Green
  inactiveTintColor: '#757575',  // Gray
  style: {
    backgroundColor: '#FFFFFF',   // White
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',   // Light Gray
    height: 60,
    paddingBottom: 5,
  },
};