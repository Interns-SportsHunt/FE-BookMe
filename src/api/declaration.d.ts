// Allow importing .ts files directly
declare module "*.ts" {
  const content: any;
  export default content;
}

// Add specific module declarations for the core files
declare module "./core/apiClient.ts" {
  export const apiClient: any;
  export const handle_apicall: any;
  export interface ApiResponse<T = any> {
    success: boolean;
    data: T | null;
    error: any | null;
  }
}

declare module "./core/routes.ts" {
  export const API_ROUTES: any;
}

declare module "./services/venueApi.ts" {
  export const venueApi: any;
}

declare module "./services/authApi.ts" {
  export const authApi: any;
} 