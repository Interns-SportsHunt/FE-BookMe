import { config, NODE_ENV, isDevelopment, isProduction } from '@/config/env';
import { API_ROUTES, buildApiUrl } from '@/config/api';
import { Features, isFeatureEnabled, FeatureFlag } from '@/config/features';

// Simple function to log configuration details for debugging
export function logConfigStatus() {
  console.group('🔧 Configuration Status');
  
  // Log environment
  console.log(`Current Environment: ${NODE_ENV}`);
  console.log(`Is Development: ${isDevelopment()}`);
  console.log(`Is Production: ${isProduction()}`);
  
  // Log API configuration
  console.group('API Configuration');
  console.log(`Base URL: ${config.api.baseUrl}`);
  console.log(`Timeout: ${config.api.timeout}ms`);
  console.log(`Sample API URL: ${buildApiUrl(API_ROUTES.VENUE.VENUE, { id: '123' })}`);
  console.groupEnd();
  
  // Log feature flags
  console.group('Feature Flags');
  console.log(`Payments Enabled: ${isFeatureEnabled(FeatureFlag.PAYMENTS)}`);
  console.log(`Real-time Notifications Enabled: ${isFeatureEnabled(FeatureFlag.REAL_TIME_NOTIFICATIONS)}`);
  console.log(`Google Maps Enabled: ${isFeatureEnabled(FeatureFlag.GOOGLE_MAPS)}`);
  console.groupEnd();
  
  // Log auth configuration
  console.group('Auth Configuration');
  console.log(`Token Key: ${config.auth.tokenKey}`);
  console.groupEnd();
  
  console.groupEnd();
  
  return {
    environment: NODE_ENV,
    apiBaseUrl: config.api.baseUrl,
    features: Features,
    sampleApiUrl: buildApiUrl(API_ROUTES.VENUE.VENUE, { id: '123' })
  };
}

export default logConfigStatus; 