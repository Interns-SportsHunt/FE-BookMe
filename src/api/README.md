# API Module Structure for SportsHunt

## Overview

This module provides a well-structured, consistent approach to API interactions throughout the SportsHunt application. It separates concerns into logical domains and provides a clean, typed interface for making API requests.

## Directory Structure

```
api/
├── core/             # Core API functionality
│   ├── apiClient.ts  # Base API client with error handling
│   ├── routes.ts     # API route definitions
│   ├── types.ts      # Shared types and interfaces
│   └── utils.ts      # Utility functions (URL building, CSRF)
├── services/         # Domain-specific API services
│   ├── authApi.ts    # Authentication-related API calls
│   ├── venueApi.ts   # Venue and turf-related API calls
│   └── ...           # Other domain services
└── index.ts          # Main entry point that exports everything
```

## Key Features

- **Centralized API Routes**: All API endpoints are defined in `routes.ts`, making it easy to update endpoints when the backend changes
- **Type Safety**: Comprehensive TypeScript interfaces for request/response data
- **Error Handling**: Consistent error handling with automatic toast notifications
- **Domain Organization**: API calls are grouped by domain (auth, venues, etc.)
- **Documentation**: Well-documented code with JSDoc comments explaining usage

## Usage Examples

### Authentication

```typescript
import { authApi } from '@/api';

// Check if user is authenticated
const checkAuth = async () => {
  const authStatus = await authApi.checkAuth();
  if (authStatus.isAuthenticated) {
    // User is logged in
    console.log(authStatus.user);
  }
};

// Login
const login = async (username, password) => {
  const response = await authApi.login({ username, password });
  if (response.success) {
    // Login successful
    return response.data.user;
  }
};
```

### Venues

```typescript
import { venueApi } from '@/api';

// Get featured venues
const getFeaturedVenues = async () => {
  const response = await venueApi.getFeatured();
  if (response.success) {
    return response.data;
  }
  return [];
};

// Get venue details
const getVenueDetails = async (venueId) => {
  const response = await venueApi.getVenueDetails(venueId);
  if (response.success) {
    return response.data;
  }
  return null;
};

// Create a new venue
const createVenue = async (formData) => {
  const response = await venueApi.createVenue(formData);
  if (response.success) {
    return response.data;
  }
  // Error handling is automatic via toast notifications
};
```

## Error Handling

The API module automatically handles errors and displays appropriate toast notifications. You don't need to explicitly handle errors in most cases:

```typescript
// Error handling is built-in
const response = await venueApi.getFeatured();
if (response.success) {
  // Handle success case
  setVenues(response.data);
}
// No need to handle errors - already done by the API module!
```

## Adding a New API Service

1. Create a new file in the `services` directory (e.g., `bookingApi.ts`)
2. Define interfaces for request/response data
3. Create and export a service object with methods
4. Import and use the core utilities (`apiClient`, `buildApiUrl`, etc.)
5. Add the new routes in `routes.ts` 
6. Export the new service in `index.ts`

## Best Practices

1. Always use the typed API methods instead of direct fetch calls
2. Add new endpoints to the API_ROUTES constant in routes.ts
3. Keep the domain logic separated in appropriate service files
4. Use TypeScript interfaces for all data structures
5. Document complex functions with JSDoc comments 