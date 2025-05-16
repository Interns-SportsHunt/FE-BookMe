/**
 * Venue API Service
 * 
 * This module handles all venue-related API requests.
 * It provides typed methods for working with venues and their related entities.
 */

import { apiClient } from '../core/apiClient';
import { API_ROUTES } from '../core/routes';
import { buildApiUrl, addCSRFHeader, getCSRFToken } from '../core/utils';
import { ApiResponse, FilterParams } from '../core/types';

/**
 * Venue interface representing venue data
 */
export interface Venue {
  id: string | number;
  name: string;
  description: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  images: string[];
  amenities: string[];
  sportTypes: string[];
  host: {
    id: string | number;
    name: string;
    profilePicture?: string;
  };
  turfs: Turf[];
  rating?: number;
  reviewCount?: number;
}

/**
 * Turf interface representing turf data
 */
export interface Turf {
  id: string | number;
  name: string;
  sportType: string;
  description: string;
  pricePerHour: number;
  capacity: number;
  images: string[];
}

/**
 * Filter parameters for venue searches
 */
export interface VenueFilterParams extends FilterParams {
  sportType?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  amenities?: string[];
  availability?: string; // ISO date string
}

/**
 * Venue API service object with venue-related methods
 */
export const venueApi = {
  /**
   * Get featured venues for homepage display
   * 
   * @returns Promise with featured venues data
   */
  getFeatured: async (): Promise<ApiResponse<Venue[]>> => {
    return await apiClient<Venue[]>(
      buildApiUrl(API_ROUTES.VENUE.FEATURED)
    );
  },

  /**
   * Filter venues with various parameters
   * 
   * @param params - Filter parameters for venues
   * @returns Promise with filtered venues
   */
  filter: async (params: VenueFilterParams): Promise<ApiResponse<{
    venues: Venue[],
    total: number,
    page: number,
    limit: number
  }>> => {
    // Convert params to URLSearchParams for query string
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v.toString()));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    return await apiClient(
      `${buildApiUrl(API_ROUTES.VENUE.FILTER)}?${queryParams.toString()}`
    );
  },

  /**
   * Get details for a specific venue
   * 
   * @param id - Venue ID
   * @returns Promise with venue details
   */
  getVenueDetails: async (id: string | number): Promise<ApiResponse<Venue>> => {
    return await apiClient<Venue>(
      buildApiUrl(API_ROUTES.VENUE.DETAIL, { id })
    );
  },

  /**
   * Create a new venue (for hosts)
   * 
   * @param venueData - Form data with venue information
   * @returns Promise with created venue
   */
  createVenue: async (venueData: FormData): Promise<ApiResponse<Venue>> => {
    const csrfToken = getCSRFToken();
    
    return await apiClient<Venue>(
      buildApiUrl(API_ROUTES.HOST.VENUES), 
      {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken || '',
          // Don't set Content-Type with FormData
        },
        body: venueData, // FormData will be properly serialized
      }
    );
  },

  /**
   * Get turf details for a specific turf
   * 
   * @param id - Turf ID
   * @returns Promise with turf details
   */
  getTurfDetails: async (id: string | number): Promise<ApiResponse<Turf>> => {
    return await apiClient<Turf>(
      buildApiUrl(API_ROUTES.TURF.DETAIL, { id })
    );
  },

  /**
   * Create a new turf for a venue (for hosts)
   * 
   * @param venueId - Venue ID
   * @param turfData - Form data with turf information
   * @returns Promise with created turf
   */
  createTurf: async (venueId: string | number, turfData: FormData): Promise<ApiResponse<Turf>> => {
    const csrfToken = getCSRFToken();
    
    return await apiClient<Turf>(
      buildApiUrl(API_ROUTES.TURF.CREATE, { venueId }), 
      {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken || '',
        },
        body: turfData,
      }
    );
  },
}; 