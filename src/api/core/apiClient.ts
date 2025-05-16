/**
 * Core API Client
 * 
 * This module provides the foundational API client used throughout the application.
 * It handles:
 * - Request configuration
 * - Response processing
 * - Error handling with toast notifications
 * - Timeout management
 * - Standard response formatting
 */

import { config } from '@/config/env';
import { handleApiError } from '@/utils/errorHandler';

/**
 * Standard API response interface
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  error: any | null;
}

/**
 * API Error information
 */
interface ApiError {
  status?: number;
  message: string;
  type?: string;
  details?: any;
}

/**
 * Core API request handler
 * 
 * @template T - The expected data type for successful responses
 * @param {string} url - The endpoint URL to call
 * @param {object} options - Additional fetch options to override defaults
 * @returns {Promise<ApiResponse<T>>} - Promise with standardized response
 * 
 * @example
 * // Basic GET request
 * const data = await apiClient<UserData>('/api/user/profile');
 * 
 * @example
 * // POST request with body
 * const response = await apiClient('/api/venues', { 
 *   method: 'POST',
 *   body: JSON.stringify(newVenue) 
 * });
 */
export async function apiClient<T = any>(url: string, options = {}): Promise<ApiResponse<T>> {
    try {
        // Set up timeout management
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.api.timeout);
        
        // Default options for all API requests
        const defaultOptions = {
            credentials: "include" as RequestCredentials,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        // Make the network request
        const response = await fetch(url, { ...defaultOptions, ...options });
        clearTimeout(timeoutId);
          
        // Handle non-success responses
        if (!response.ok) {
            // Create an error object with status code
            const errorObj: ApiError = {
                status: response.status,
                message: `HTTP error! status: ${response.status}`
            };
            
            // Try to extract more detailed error information if available
            try {
                const errorData = await response.json();
                errorObj.message = errorData.message || errorObj.message;
            } catch (e) {
                // If we can't parse the error response, just use the status code
            }
            
            // Display error notification
            handleApiError(errorObj);
            
            return {
                success: false,
                data: null,
                error: errorObj
            };
        }
        
        // Process successful response
        const data = await response.json();
        return {
            success: true,
            data: data,
            error: null
        };
    } catch (error: any) {
        console.error("API call error:", error);
        
        // Handle specific error types appropriately
        
        // Timeout errors
        if (error.name === 'AbortError') {
            const timeoutError: ApiError = {
                type: 'timeout',
                message: 'Request timeout - please try again'
            };
            handleApiError(timeoutError);
            
            return {
                success: false,
                data: null,
                error: timeoutError
            };
        }
        
        // Network errors (server not available)
        if (error.message === 'Failed to fetch') {
            const networkError: ApiError = {
                type: 'network',
                message: 'Unable to connect to the server. Please check your connection.'
            };
            handleApiError(networkError);
            
            return {
                success: false,
                data: null,
                error: networkError
            };
        }
        
        // Generic error fallback
        const genericError: ApiError = {
            type: 'unknown',
            message: error instanceof Error ? error.message : 'An unexpected error occurred'
        };
        handleApiError(genericError);
        
        return {
            success: false,
            data: null,
            error: genericError
        };
    }
}

// Export alias for backward compatibility
export const handle_apicall = apiClient; 