/**
 * API Types
 * 
 * This module contains shared type definitions for the API layer.
 * These types provide structure and type safety for API requests and responses.
 */

/**
 * Standard API response interface
 * 
 * This ensures all API calls return data in a consistent format
 * making it easier to handle responses throughout the application.
 * 
 * @template T - The expected data type for successful responses
 */
export interface ApiResponse<T = any> {
  /** Whether the API call completed successfully */
  success: boolean;
  
  /** The response data (null if error) */
  data: T | null;
  
  /** Error information (null if success) */
  error: any | null;
}

/**
 * API Error information
 * 
 * Standardized error object structure for API errors
 */
export interface ApiError {
  /** HTTP status code if available */
  status?: number;
  
  /** Error message */
  message: string;
  
  /** Error type for categorization */
  type?: string;
  
  /** Detailed error information if available */
  details?: any;
}

/**
 * Pagination parameters for API requests
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Sorting parameters for API requests
 */
export interface SortParams {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

/**
 * Standard filter parameters for list endpoints
 */
export interface FilterParams extends PaginationParams, SortParams {
  search?: string;
  [key: string]: any;
} 