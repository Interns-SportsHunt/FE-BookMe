/**
 * API Utilities
 * 
 * This module provides helper functions for working with API endpoints,
 * including URL building, parameter handling, and CSRF protection.
 */

import { config } from '@/config/env';

/**
 * Get a fully qualified API URL for a given route
 *
 * @param {string} route - The API route (without base URL)
 * @returns {string} Full API URL
 * 
 * @example
 * // Returns 'https://api.example.com/venues/'
 * getApiUrl('venues/');
 */
export const getApiUrl = (route: string): string => {
  // Strip leading slash if present to avoid double slashes
  const normalizedRoute = route.startsWith('/') ? route.substring(1) : route;
  return `${config.api.baseUrl}/${normalizedRoute}`;
};

/**
 * Replace URL parameters with actual values
 * 
 * @param {string} url - URL with parameters in {param} format
 * @param {object} params - Object with parameter values
 * @returns {string} URL with parameters replaced
 * 
 * @example
 * // Returns 'venue/123/turfs'
 * replaceUrlParams('venue/{id}/turfs', { id: 123 });
 */
export const replaceUrlParams = (url: string, params: Record<string, string | number>): string => {
  let result = url;
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(`{${key}}`, String(value));
  }
  return result;
};

/**
 * Build a complete API URL with parameters replaced
 * 
 * @param {string} route - API route with optional parameters
 * @param {object} params - Values to replace in the route
 * @returns {string} Complete API URL with parameters replaced
 * 
 * @example
 * // Returns 'https://api.example.com/venue/123/turfs'
 * buildApiUrl('venue/{id}/turfs', { id: 123 });
 */
export const buildApiUrl = (route: string, params?: Record<string, string | number>): string => {
  const baseUrl = getApiUrl(route);
  if (!params) return baseUrl;
  return replaceUrlParams(baseUrl, params);
};

/**
 * Get the CSRF token from cookies
 * 
 * Used for protection against CSRF attacks on state-changing requests
 * 
 * @returns {string|null} CSRF token or null if not found
 */
export function getCSRFToken(): string | null {
  const cookie = document.cookie.split("; ").find(row => row.startsWith("csrftoken="));
  return cookie ? cookie.split("=")[1] : null;
}

/**
 * Add CSRF token to request headers
 * 
 * @param {object} headers - Existing headers object
 * @returns {object} Headers with CSRF token added
 */
export function addCSRFHeader(headers: Record<string, string> = {}): Record<string, string> {
  const csrfToken = getCSRFToken();
  if (csrfToken) {
    return { ...headers, 'X-CSRFToken': csrfToken };
  }
  return headers;
} 