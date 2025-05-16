/**
 * API Routes Configuration
 * 
 * This module centralizes all API endpoints in a single location.
 * This makes it easier to:
 * - Maintain consistent endpoint naming
 * - Update endpoints when the API changes
 * - Keep track of available endpoints
 * - Provide type safety for endpoint paths
 */

// Type definitions for API routes
export interface ApiRoutes {
  AUTH: {
    CHECK: string;
    LOGIN: string;
    LOGOUT: string;
    REGISTER: string;
    PROFILE: string;
  };
  VENUE: {
    FEATURED: string;
    FILTER: string;
    LIST: string;
    DETAIL: string;
    CREATE: string;
    UPDATE: string;
    DELETE: string;
    TURFS: string;
  };
  TURF: {
    DETAIL: string;
    CREATE: string;
    UPDATE: string;
    DELETE: string;
    SLOTS: string;
  };
  BOOKING: {
    CREATE: string;
    LIST: string;
    DETAIL: string;
    CANCEL: string;
    USER_BOOKINGS: string;
  };
  HOST: {
    VENUES: string;
    BOOKINGS: string;
    DASHBOARD: string;
    OFFLINE_BOOKING: string;
    RECENT_BOOKINGS: string;
    VENUE_BOOKINGS: string;
    TURF_BOOKINGS: string;
  };
  PAYMENT: {
    CHECKOUT: string;
    ORDERS: string;
    VERIFY: string;
  };
}

/**
 * API Routes
 * 
 * Defines all API endpoints used in the application.
 * Always use these constants instead of hardcoding URLs.
 * 
 * Example usage:
 * ```
 * import { API_ROUTES } from '@/api/core/routes';
 * const url = buildApiUrl(API_ROUTES.VENUE.FEATURED);
 * ```
 */
export const API_ROUTES: ApiRoutes = {
  AUTH: {
    CHECK: "auth/check/",
    LOGIN: "login/",
    LOGOUT: "logout/",
    REGISTER: "register/",
    PROFILE: "profile/",
  },
  VENUE: {
    FEATURED: "venues/featured/",
    FILTER: "venues/filter/",
    LIST: "venues/",
    DETAIL: "venue/{id}/",
    CREATE: "venues/create/",
    UPDATE: "venue/{id}/update/",
    DELETE: "venue/{id}/delete/",
    TURFS: "venue/{id}/turfs/",
  },
  TURF: {
    DETAIL: "turf/{id}/",
    CREATE: "venue/{venueId}/turfs/create/",
    UPDATE: "turf/{id}/update/",
    DELETE: "turf/{id}/delete/",
    SLOTS: "turf/{id}/slots/",
  },
  BOOKING: {
    CREATE: "bookings/create/",
    LIST: "bookings/",
    DETAIL: "booking/{id}/",
    CANCEL: "booking/{id}/cancel/",
    USER_BOOKINGS: "my-bookings/",
  },
  HOST: {
    VENUES: "hosts/venues/",
    BOOKINGS: "hosts/bookings/",
    DASHBOARD: "hosts/dashboard/",
    OFFLINE_BOOKING: "hosts/offline-booking/",
    RECENT_BOOKINGS: "hosts/recent-bookings/",
    VENUE_BOOKINGS: "hosts/venue/{id}/bookings/",
    TURF_BOOKINGS: "hosts/turf/{id}/bookings/",
  },
  PAYMENT: {
    CHECKOUT: "payment/checkout/",
    ORDERS: "payment/orders/",
    VERIFY: "payment/verify/",
  },
}; 