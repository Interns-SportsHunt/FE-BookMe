/**
 * API Module for SportsHunt
 * 
 * This is the main entry point for all API-related functionality.
 * It centralizes and exports all API services, utilities, and types.
 * 
 * Usage:
 * import { venueApi, authApi, ... } from '@/api';
 */

import { apiClient, handle_apicall } from "@/api/core/apiClient";
export { apiClient, handle_apicall };

import { API_ROUTES } from "@/api/core/routes";
export { API_ROUTES };

import { venueApi } from "@/api/services/venueApi";
export { venueApi };

import { authApi } from "@/api/services/authApi";
export { authApi };

// Re-export from core/utils
import { getApiUrl, replaceUrlParams, buildApiUrl, getCSRFToken, addCSRFHeader } from './core/utils';
export { getApiUrl, replaceUrlParams, buildApiUrl, getCSRFToken, addCSRFHeader };

// Re-export from core/types
import { 
  ApiError, PaginationParams, SortParams, FilterParams 
} from './core/types';
export { ApiError, PaginationParams, SortParams, FilterParams };

// Re-export from domain-specific services
import { Venue, Turf, VenueFilterParams } from './services/venueApi';
export { Venue, Turf, VenueFilterParams };

import { 
  User, AuthCheckResponse, LoginCredentials, RegistrationData 
} from './services/authApi';
export { User, AuthCheckResponse, LoginCredentials, RegistrationData }; 