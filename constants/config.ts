// App Information
export const APP_CONFIG = {
  name: 'FarmLink Africa',
  version: '1.0.0',
  description: 'Connecting farmers, buyers, and investors across Africa',
};

// API Endpoints
export const API_CONFIG = {
  baseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  imageStorageBucket: 'product-images',
  profileImagesBucket: 'profile-images',
};

// Storage Keys
export const STORAGE_KEYS = {
  authToken: 'auth_token',
  userProfile: 'user_profile',
  theme: 'app_theme',
  language: 'app_language',
};

// Validation Rules
export const VALIDATION = {
  password: {
    minLength: 8,
    requireNumber: true,
    requireSpecialChar: true,
  },
  phone: {
    minLength: 10,
    maxLength: 15,
  },
  product: {
    minPrice: 0,
    maxDescriptionLength: 500,
  },
  investment: {
    minAmount: 1000,
    maxDurationMonths: 24,
  },
};

// Image Upload
export const IMAGE_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png'],
  dimensions: {
    product: {
      width: 800,
      height: 600,
    },
    profile: {
      width: 400,
      height: 400,
    },
  },
};

// Pagination
export const PAGINATION = {
  defaultLimit: 10,
  maxLimit: 50,
};

// Date Formats
export const DATE_FORMATS = {
  display: 'MMM DD, YYYY',
  api: 'YYYY-MM-DD',
  time: 'hh:mm A',
};

// Currency
export const CURRENCY = {
  code: 'NGN',
  symbol: '₦',
  format: {
    locale: 'en-NG',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
};