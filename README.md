# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/eab297fe-aaab-4b15-bad4-572f3ace2665

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/eab297fe-aaab-4b15-bad4-572f3ace2665) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/eab297fe-aaab-4b15-bad4-572f3ace2665) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# SportsHunt (BookMe) Frontend Application

## Error Handling & Toast Notification System

### Overview

This application includes a comprehensive error handling and toast notification system to provide consistent user feedback for both success and error states. The system automatically handles common error scenarios like network issues, server errors, and validation problems.

### Key Components

1. **Toast System (`src/hooks/use-toast.ts`)**
   - Provides a unified API for displaying notifications
   - Supports success (default) and error (destructive) variants
   - Based on the Sonner toast library with shadcn/ui styling

2. **Error Handler (`src/utils/errorHandler.ts`)**
   - Centralizes error handling logic
   - Categorizes errors by type (network, server, auth, etc.)
   - Formats user-friendly error messages
   - Automatically displays toast notifications

3. **API Call Handler (`src/services/apis/api_call.ts`)**
   - Manages all API requests with consistent options
   - Handles timeouts and connection issues
   - Integrates with the error handling system
   - Returns standardized response objects

4. **Toast Tester (`src/components/ToastTester.tsx`)**
   - Development tool for testing notifications
   - Available only in development mode
   - Allows testing both direct toasts and error handling

### Usage Examples

#### Using the Toast System Directly

```typescript
import { useToast } from "@/hooks/use-toast";

function MyComponent() {
  const { toast } = useToast();
  
  const handleSuccess = () => {
    toast({
      title: "Success",
      description: "Operation completed successfully!",
      variant: "default",
    });
  };
  
  const handleError = () => {
    toast({
      title: "Error",
      description: "Something went wrong",
      variant: "destructive",
    });
  };
}
```

#### Using the Error Handler

```typescript
import { handleApiError } from "@/utils/errorHandler";

try {
  // Code that might throw an error
} catch (error) {
  handleApiError(error);
}
```

#### Making API Calls with Automatic Error Handling

```typescript
import { handle_apicall } from "@/services/apis/api_call";
import { API_ROUTES, getApiUrl } from "@/services/utils";

const fetchData = async () => {
  const response = await handle_apicall(getApiUrl(API_ROUTES.VENUE.FEATURED));
  if (response.success) {
    // Handle success case
    setData(response.data);
  }
  // No need to handle errors - already done by the function
};
```

### Running the Application

Use one of these methods to start the development server:

1. From the root directory:
   - Run `start-app.bat` (Windows)
   - Or run `npm run dev`

2. From the FE-BookMe directory:
   - Run `npm run dev`

The application will be available at http://localhost:8080.

### Testing Error Handling

In development mode, the application includes a Toast Tester component on the home page:

1. Click "Basic Toasts" tab to test simple notifications
2. Click "Error Handler" tab to test different error scenarios
3. This helps verify that error messages display correctly

### Troubleshooting Common Issues

- **"Server not available" errors**: Check your internet connection and verify the API server is running
- **Timeout errors**: The API call might be taking too long - check server performance
- **Authentication errors**: Make sure you're logged in or your session hasn't expired
