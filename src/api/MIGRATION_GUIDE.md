# Migration Guide: Transitioning to the New API Module

This document provides step-by-step instructions for migrating existing API calls to the new API module structure.

## Why Migrate?

The new API module provides several benefits:
- **Better organization** with domain-specific services
- **Type safety** with comprehensive TypeScript interfaces
- **Automatic error handling** with toast notifications
- **Consistent patterns** across the application
- **Better maintainability** with centralized route management
- **Improved documentation** with JSDoc comments

## Migration Steps

### Step 1: Identify the Current Pattern

Look for code that follows these patterns:

```typescript
// Pattern 1: Direct API calls using handle_apicall
import { handle_apicall } from "@/services/apis/api_call";
import { API_ROUTES, getApiUrl } from "@/services/utils";

const data = await handle_apicall(getApiUrl(API_ROUTES.VENUE.FEATURED));
```

```typescript
// Pattern 2: Direct fetch calls with manual error handling
import { getApiUrl } from "@/services/utils";

try {
  const response = await fetch(getApiUrl('venues/featured/'), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  // Handle success
} catch (error) {
  // Handle errors
}
```

### Step 2: Replace Imports

Replace old imports with the new API module imports:

```typescript
// BEFORE
import { handle_apicall } from "@/services/apis/api_call";
import { API_ROUTES, getApiUrl } from "@/services/utils";

// AFTER
import { venueApi } from "@/api";
```

### Step 3: Replace API Calls

Replace direct API calls with domain-specific methods:

```typescript
// BEFORE
const data = await handle_apicall(getApiUrl(API_ROUTES.VENUE.FEATURED));
if (data.success) {
  setVenues(data.data);
}

// AFTER
const response = await venueApi.getFeatured();
if (response.success) {
  setVenues(response.data);
}
```

### Step 4: Add Proper Typing

Take advantage of TypeScript types provided by the API module:

```typescript
// BEFORE
const [venues, setVenues] = useState([]);

// AFTER
import { Venue } from "@/api";
const [venues, setVenues] = useState<Venue[]>([]);
```

## Migration Examples

### Example 1: Fetching Featured Venues

Before:
```typescript
import { handle_apicall } from "@/services/apis/api_call";
import { API_ROUTES, getApiUrl } from "@/services/utils";

const fetchFeaturedVenues = async () => {
  const data = await handle_apicall(getApiUrl(API_ROUTES.VENUE.FEATURED));
  if (data.success) {
    setFeaturedVenues(data.data);
  }
};
```

After:
```typescript
import { venueApi, Venue } from "@/api";

const [featuredVenues, setFeaturedVenues] = useState<Venue[]>([]);

const fetchFeaturedVenues = async () => {
  const response = await venueApi.getFeatured();
  if (response.success) {
    setFeaturedVenues(response.data);
  }
};
```

### Example 2: Login User

Before:
```typescript
import { handle_apicall } from "@/services/apis/api_call";
import { API_ROUTES, getApiUrl, getCSRFToken } from "@/services/utils";

const login = async (username, password) => {
  const csrfToken = getCSRFToken();
  const data = await handle_apicall(getApiUrl(API_ROUTES.AUTH.LOGIN), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || '',
    },
    body: JSON.stringify({ username, password }),
  });
  
  if (data.success) {
    setUser(data.data.user);
    return true;
  }
  return false;
};
```

After:
```typescript
import { authApi } from "@/api";

const login = async (username, password) => {
  const response = await authApi.login({ username, password });
  
  if (response.success) {
    setUser(response.data.user);
    return true;
  }
  return false;
};
```

### Example 3: Creating a Venue

Before:
```typescript
import { venueService } from "@/services/venue";

const createVenue = async (formData) => {
  const response = await venueService.createVenue(formData);
  if (response.success) {
    navigate(`/host/venue/${response.data.id}`);
  }
};
```

After:
```typescript
import { venueApi } from "@/api";

const createVenue = async (formData) => {
  const response = await venueApi.createVenue(formData);
  if (response.success) {
    navigate(`/host/venue/${response.data.id}`);
  }
};
```

## What If a Method Is Missing?

If you need an API call that isn't yet implemented in the new module:

1. First, check if it fits within an existing service (auth, venue, etc.)
2. Add the route to `api/core/routes.ts` if needed
3. Add the method to the appropriate service file
4. Export it in the `index.ts` file if needed

Example of adding a new method:
```typescript
// In api/services/venueApi.ts
export const venueApi = {
  // ... existing methods
  
  // New method
  updateVenueName: async (
    venueId: string | number, 
    name: string
  ): Promise<ApiResponse<Venue>> => {
    const csrfToken = getCSRFToken();
    
    return await apiClient<Venue>(
      buildApiUrl(API_ROUTES.VENUE.UPDATE, { id: venueId }),
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken || '',
        },
        body: JSON.stringify({ name }),
      }
    );
  },
};
```

## Timeline and Approach

1. Start with new features - use the new API module for all new development
2. Gradually migrate existing components during refactoring
3. Focus on high-traffic pages first
4. Update shared components last

## Questions or Issues?

If you encounter any issues during migration, please contact the team lead or add an issue to the project board. 