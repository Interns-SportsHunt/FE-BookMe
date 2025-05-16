import { toast } from "@/hooks/use-toast";

/**
 * API Error Types
 * Used to categorize and handle different types of errors consistently across the application
 */
export type ApiErrorType = 
  | 'network'    // Connection issues, server not available
  | 'server'     // Server-side errors (500 range)
  | 'authentication' // Auth errors (401)
  | 'validation'  // Input validation errors (422)
  | 'permission'  // Permission errors (403)
  | 'not_found'   // Resource not found (404)
  | 'timeout'     // Request timeout
  | 'unknown';    // Unclassified errors

/**
 * Standard error response structure
 * Used to normalize error handling across different API responses
 */
export interface ErrorResponse {
  code?: string;
  message?: string;
  details?: string;
  type?: ApiErrorType;
}

/**
 * Central error handling utility
 * 
 * This function provides consistent error handling across the application:
 * 1. Takes any error object and normalizes it
 * 2. Displays appropriate toast messages based on error type
 * 3. Provides user-friendly messages for different error scenarios
 * 
 * Usage:
 * try {
 *   // API call or operation that might fail
 * } catch (error) {
 *   handleApiError(error);
 * }
 */
export function handleApiError(error: any): void {
  // Default error message
  let title = "Error";
  let description = "An unexpected error occurred. Please try again.";
  
  // Try to extract structured error information if available
  if (error) {
    // Handle network errors (no connection to server)
    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
      title = "Network Error";
      description = "Server is not available. Please check your internet connection and try again.";
    } 
    // Handle HTTP errors with response
    else if (error.status) {
      switch (error.status) {
        case 401:
          title = "Authentication Error";
          description = "You need to log in to perform this action.";
          break;
        case 403:
          title = "Permission Denied";
          description = "You don't have permission to perform this action.";
          break;
        case 404:
          title = "Not Found";
          description = "The requested resource was not found.";
          break;
        case 422:
          title = "Validation Error";
          description = error.message || "Please check your inputs and try again.";
          break;
        case 500:
          title = "Server Error";
          description = "Something went wrong on our servers. Please try again later.";
          break;
        default:
          // Use the error message if available
          if (error.message) {
            description = error.message;
          }
          break;
      }
    }
    // Handle custom error objects with type
    else if (error.type) {
      switch (error.type) {
        case 'network':
          title = "Network Error";
          description = "Unable to connect to the server. Please check your connection.";
          break;
        case 'authentication':
          title = "Authentication Error";
          description = error.message || "You need to login to continue.";
          break;
        case 'timeout':
          title = "Request Timeout";
          description = "The request took too long to complete. Please try again.";
          break;
        default:
          // Use custom message if available
          if (error.message) {
            description = error.message;
          }
          break;
      }
    }
    // Use message if it exists
    else if (error.message) {
      description = error.message;
    }
  }

  // Display toast notification using our toast system
  toast({
    title,
    description,
    variant: "destructive",
  });
}

/**
 * Simulate an error for testing purposes
 * 
 * This utility function is primarily for development and testing,
 * allowing developers to easily test error handling without triggering actual errors.
 * 
 * Usage:
 * simulateError('network', 'Custom error message');
 */
export function simulateError(type: ApiErrorType, message?: string): void {
  const error: ErrorResponse = {
    type,
    message: message || "This is a simulated error for testing purposes"
  };
  
  handleApiError(error);
} 