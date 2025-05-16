/**
 * Authentication API Service
 * 
 * This module handles all authentication-related API requests,
 * including login, logout, registration, and auth status checking.
 */

import { apiClient } from '../core/apiClient';
import { API_ROUTES } from '../core/routes';
import { buildApiUrl, addCSRFHeader, getCSRFToken } from '../core/utils';
import { ApiResponse } from '../core/types';

/**
 * User profile interface
 */
export interface User {
  id: string | number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  is_host: boolean;
  phone?: string;
}

/**
 * Auth check response interface
 */
export interface AuthCheckResponse {
  isAuthenticated: boolean;
  user: User | null;
  serverDown?: boolean;
  error?: string;
}

/**
 * Login credentials interface
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Registration data interface
 */
export interface RegistrationData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  is_host?: boolean;
}

/**
 * Authentication API service object
 */
export const authApi = {
  /**
   * Check if the user is authenticated
   * 
   * @returns Promise with authentication status and user data
   */
  checkAuth: async (): Promise<AuthCheckResponse> => {
    try {
      const response = await apiClient<{
        isAuthenticated: boolean;
        user: User | null;
      }>(buildApiUrl(API_ROUTES.AUTH.CHECK));
      
      if (response.success) {
        return {
          ...response.data,
          serverDown: false
        };
      }
      
      return {
        isAuthenticated: false,
        user: null,
        serverDown: false,
        error: response.error?.message || 'Authentication check failed'
      };
    } catch (error) {
      console.error('Auth check error:', error);
      return {
        isAuthenticated: false,
        user: null,
        serverDown: true,
        error: error instanceof Error ? error.message : 'Server connection failed'
      };
    }
  },

  /**
   * Check if the current user has host privileges
   * 
   * @returns Promise with host status and user data
   */
  checkHost: async (): Promise<{ isHost: boolean; user: User | null }> => {
    try {
      const authCheckResponse = await authApi.checkAuth();
      
      if (authCheckResponse.isAuthenticated && 
          authCheckResponse.user && 
          authCheckResponse.user.is_host) {
        return { 
          isHost: true, 
          user: authCheckResponse.user 
        };
      }
    } catch (error) {
      console.error('Host check error:', error);
    }
    
    return { isHost: false, user: null };
  },

  /**
   * Log in a user
   * 
   * @param credentials - Login credentials (username/password)
   * @returns Promise with login result and user data
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<{
    success: boolean;
    user: User | null;
    message?: string;
  }>> => {
    const csrfToken = getCSRFToken();
    
    return await apiClient(
      buildApiUrl(API_ROUTES.AUTH.LOGIN),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken || '',
        },
        body: JSON.stringify(credentials),
      }
    );
  },

  /**
   * Log out the current user
   * 
   * @returns Promise with logout result
   */
  logout: async (): Promise<ApiResponse<{ success: boolean }>> => {
    const csrfToken = getCSRFToken();
    
    return await apiClient(
      buildApiUrl(API_ROUTES.AUTH.LOGOUT),
      {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken || '',
        },
      }
    );
  },

  /**
   * Register a new user
   * 
   * @param data - Registration data
   * @returns Promise with registration result
   */
  register: async (data: RegistrationData): Promise<ApiResponse<{
    success: boolean;
    user?: User;
    message?: string;
  }>> => {
    const csrfToken = getCSRFToken();
    
    return await apiClient(
      buildApiUrl(API_ROUTES.AUTH.REGISTER),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken || '',
        },
        body: JSON.stringify(data),
      }
    );
  },

  /**
   * Update user profile
   * 
   * @param userId - User ID
   * @param profileData - Updated profile data
   * @returns Promise with updated user data
   */
  updateProfile: async (
    userId: string | number,
    profileData: Partial<User>
  ): Promise<ApiResponse<User>> => {
    const csrfToken = getCSRFToken();
    
    return await apiClient<User>(
      buildApiUrl(API_ROUTES.AUTH.PROFILE),
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken || '',
        },
        body: JSON.stringify(profileData),
      }
    );
  },
}; 