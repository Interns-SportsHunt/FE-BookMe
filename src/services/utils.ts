import { API_ROUTES, getApiUrl as configApiUrl, replaceUrlParams } from '@/config/api';

// Re-export from the config to maintain backward compatibility
export { API_ROUTES };
export const getApiUrl = configApiUrl;

// Function to replace URL parameters like {id} with actual values
export const getFormattedApiUrl = (route: string, params: Record<string, string | number>) => {
  return replaceUrlParams(getApiUrl(route), params);
};

// CSRF Token utilities
export function getCSRFToken() {
  const cookie = document.cookie.split("; ").find(row => row.startsWith("csrftoken="));
  return cookie ? cookie.split("=")[1] : null;
}