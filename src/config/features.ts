/**
 * Feature flags configuration for SportsHunt
 * This file centralizes feature toggles and provides helper functions
 */

import React from 'react';
import { config } from './env';

// Feature flag keys for type safety
export enum FeatureFlag {
  PAYMENTS = 'enablePayments',
  REAL_TIME_NOTIFICATIONS = 'enableRealTimeNotifications',
  GOOGLE_MAPS = 'enableGoogleMaps',
  // Add new feature flags here
}

/**
 * Check if a feature is enabled
 * @param feature - The feature flag to check
 * @returns boolean indicating if the feature is enabled
 */
export function isFeatureEnabled(feature: FeatureFlag): boolean {
  return config.features[feature] || false;
}

/**
 * Higher-order component that renders content only if a feature is enabled
 * @param feature - The feature flag to check
 * @param Component - The component to render if feature is enabled
 * @param FallbackComponent - Optional component to render if feature is disabled
 */
export function withFeature(feature: FeatureFlag, Component: React.ComponentType, FallbackComponent?: React.ComponentType) {
  return function FeatureWrapper(props: any) {
    if (isFeatureEnabled(feature)) {
      return <Component {...props} />;
    }
    
    if (FallbackComponent) {
      return <FallbackComponent {...props} />;
    }
    
    return null;
  };
}

// Export all available features
export const Features = {
  payments: isFeatureEnabled(FeatureFlag.PAYMENTS),
  realTimeNotifications: isFeatureEnabled(FeatureFlag.REAL_TIME_NOTIFICATIONS),
  googleMaps: isFeatureEnabled(FeatureFlag.GOOGLE_MAPS)
};

export default Features; 