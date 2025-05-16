/**
 * Environment configuration file for SportsHunt application
 * Contains settings for different environments (development, production)
 */

// Environment types
export type Environment = 'development' | 'production' | 'test';

// Base configuration interface
export interface Config {
  api: {
    baseUrl: string;
    timeout: number;
  };
  auth: {
    tokenKey: string;
    refreshTokenKey: string;
  };
  app: {
    name: string;
    version: string;
    logoUrl: string;
  };
  features: {
    enablePayments: boolean;
    enableRealTimeNotifications: boolean;
    enableGoogleMaps: boolean;
  };
}

// Add ImportMeta interface augmentation to fix TypeScript error
interface ImportMeta {
  env: Record<string, any>;
}

// Current environment detection
export const NODE_ENV: Environment = 
  (import.meta.env.MODE as Environment) || 'development';

// Environment-specific configurations
const configs: Record<Environment, Config> = {
  development: {
    api: {
      baseUrl: 'http://localhost:3000/api/v1',
      timeout: 10000, // 10 seconds
    },
    auth: {
      tokenKey: 'sportshunt_auth_token',
      refreshTokenKey: 'sportshunt_refresh_token',
    },
    app: {
      name: 'SportsHunt (Dev)',
      version: '0.1.0',
      logoUrl: '/logo.png',
    },
    features: {
      enablePayments: false,
      enableRealTimeNotifications: false,
      enableGoogleMaps: true,
    },
  },
  production: {
    api: {
      baseUrl: 'https://api.sportshunt.com/api/v1',
      timeout: 15000, // 15 seconds
    },
    auth: {
      tokenKey: 'sportshunt_auth_token',
      refreshTokenKey: 'sportshunt_refresh_token',
    },
    app: {
      name: 'SportsHunt',
      version: '1.0.0',
      logoUrl: '/logo.png',
    },
    features: {
      enablePayments: true,
      enableRealTimeNotifications: true,
      enableGoogleMaps: true,
    },
  },
  test: {
    api: {
      baseUrl: 'http://localhost:3000/api/v1',
      timeout: 5000, // 5 seconds
    },
    auth: {
      tokenKey: 'sportshunt_auth_token_test',
      refreshTokenKey: 'sportshunt_refresh_token_test',
    },
    app: {
      name: 'SportsHunt (Test)',
      version: '0.1.0',
      logoUrl: '/logo.png',
    },
    features: {
      enablePayments: false,
      enableRealTimeNotifications: false,
      enableGoogleMaps: false,
    },
  },
};

// Export the configuration for the current environment
export const config: Config = configs[NODE_ENV];

// Helper functions
export const isDevelopment = () => NODE_ENV === 'development';
export const isProduction = () => NODE_ENV === 'production';
export const isTest = () => NODE_ENV === 'test';

export default config; 