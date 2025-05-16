/**
 * API configuration for SportsHunt
 * Centralizes API endpoints and provides type-safe access
 */

import { config } from './env';

// Define API route structure with proper typing
export interface ApiRoutes {
  AUTH: {
    CHECK: string;
    LOGIN: string;
    LOGOUT: string;
  };
  VENUE: {
    FEATURED: string;
    FILTER: string;
    VENUES: string;
    VENUE: string;
  };
  ORDER: string;
  CHECKOUT: string;
  MY_BOOKINGS: string;
  HOST: {
    VENUES: string;
    CREATE_VENUE: string;
    CREATE_TURF: string;
    BOOKINGS: string;
    OFFLINE_BOOKING: string;
    RECENT_BOOKINGS: string;
    VENUE_BOOKINGS: string;
    TURF_BOOKINGS: string;
  };
}

// API routes with proper typing
export const API_ROUTES: ApiRoutes = {
  AUTH: {
    CHECK: "auth/check/",
    LOGIN: "login/",
    LOGOUT: "logout/",
  },
  VENUE: {
    FEATURED: "venues/featured/",
    FILTER: "venues/filter/",
    VENUES: "venues/",
    VENUE: "venue/{id}/",
  },
  ORDER: "orders/create/",
  CHECKOUT: "orders/checkout/",
  MY_BOOKINGS: "my-bookings/",
  HOST: {
    VENUES: "hosts/venues/",
    CREATE_VENUE: "hosts/venues/create/",
    CREATE_TURF: "hosts/venues/{venue_id}/turfs/create/",
    BOOKINGS: "hosts/bookings/",
    OFFLINE_BOOKING: "hosts/offline-booking/",
    RECENT_BOOKINGS: "hosts/recent-bookings/",
    VENUE_BOOKINGS: "hosts/venue/{id}/bookings/",
    TURF_BOOKINGS: "hosts/turf/{id}/bookings/",
  },
};

// Get the full API URL for a route
export const getApiUrl = (route: string): string => `${config.api.baseUrl}/${route}`;

// Replace URL parameters with values
export const replaceUrlParams = (url: string, params: Record<string, string | number>): string => {
  let result = url;
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(`{${key}}`, String(value));
  }
  return result;
};

// Generates a fully qualified API URL with parameters replaced
export const buildApiUrl = (route: string, params?: Record<string, string | number>): string => {
  const baseUrl = getApiUrl(route);
  if (!params) return baseUrl;
  return replaceUrlParams(baseUrl, params);
};

export default {
  routes: API_ROUTES,
  getApiUrl,
  replaceUrlParams,
  buildApiUrl,
}; 