export const COLORS = {
  // Primary Colors
  primary: '#1A4314',      // Royal Green
  secondary: '#F2C94C',    // Accent Yellow
  
  // Background Colors
  background: '#FFFFFF',    // White
  surface: '#F5F5F5',      // Light Gray Background
  
  // Text Colors
  text: {
    primary: '#000000',     // Black
    secondary: '#757575',    // Gray
    inverse: '#FFFFFF',      // White
  },
  
  // Status Colors
  success: '#4CAF50',      // Green
  error: '#F44336',        // Red
  warning: '#FFC107',      // Yellow
  info: '#2196F3',         // Blue
  
  // Border Colors
  border: '#E5E5E5',       // Light Gray
  
  // Overlay Colors
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
};

export const FONT_WEIGHTS = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 6,
  },
};

export const LAYOUT = {
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
  },
};