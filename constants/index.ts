export * from './theme';
export * from './config';

// Common status types
export const STATUS_TYPES = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  IDLE: 'idle',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please login to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  DEFAULT: 'Something went wrong. Please try again later.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Successfully logged in.',
  REGISTER: 'Account created successfully.',
  UPDATE: 'Successfully updated.',
  DELETE: 'Successfully deleted.',
  SAVE: 'Successfully saved.',
} as const;

// Asset paths
export const ASSETS = {
  LOGO: require('../assets/logo.png'),
  WELCOME_BG: require('../assets/welcome-bg.jpg'),
  DEFAULT_AVATAR: require('../assets/icon.png'),
} as const;