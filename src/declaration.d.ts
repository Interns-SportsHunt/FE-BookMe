// Module declarations for API files
declare module "*/core/apiClient" {
  export const apiClient: any;
  export const handle_apicall: any;
  export interface ApiResponse<T = any> {
    success: boolean;
    data: T | null;
    error: any | null;
  }
}

declare module "*/core/routes" {
  export const API_ROUTES: any;
}

declare module "*/services/venueApi" {
  export const venueApi: any;
}

declare module "*/services/authApi" {
  export const authApi: any;
}

// Other module declarations as needed
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.webp"; 