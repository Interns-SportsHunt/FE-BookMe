// @jsxImportSource react

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import RequireRole from "./components/RequireRole";
import { useState, useEffect } from "react";
import { isDevelopment } from "@/config/env";
import ResponsiveTester from "@/components/ResponsiveTester";

// Layouts
import MainLayout from "./layouts/MainLayout";
import HostLayout from "./layouts/HostLayout";
import AuthLayout from "./layouts/AuthLayout";

// Core Pages
import Home from "./pages/Home";
import VenueDetails from "./pages/VenueDetails";
import TurfDetails from "./pages/TurfDetails";
import VenueFilter from "./pages/VenueFilter";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";

// Host Pages
import HostDashboard from "./pages/host/HostDashboard";
import CreateVenue from "./pages/host/CreateVenue";
import VenueManagement from "./pages/host/VenueManagement";
import CreateTurf from "./pages/host/CreateTurf";
import TurfManagement from "./pages/host/TurfManagement";

// Error Page
import ErrorPage from "./pages/ErrorPage";

const queryClient = new QueryClient();

const App = () => {
  // State to control the visibility of the responsive tester
  const [showResponsiveTester, setShowResponsiveTester] = useState(false);

  // Add keyboard shortcut to toggle responsive tester: Ctrl+Shift+R
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        setShowResponsiveTester(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <UserProvider>
            <Routes>
            {/* Core User Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="venue-filter" element={<VenueFilter />} />
              <Route path="venue/:venueId" element={<VenueDetails />} />
              <Route path="venue/:venueId/turf/:turfId" element={<TurfDetails />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
            </Route>

            {/* Host Routes */}
            <Route path="/host" element={<HostLayout />}>
            
              <Route path="dashboard" element={<HostDashboard />} />
              <Route path="create-venue" element={<CreateVenue />} />
              <Route path="venue/:venueId" element={<VenueManagement />} />
              <Route path="venue/:venueId/create-turf" element={<CreateTurf />} />
              <Route path="venue/:venueId/turf/:turfId" element={<TurfManagement />} />
            </Route>

            {/* 404 Route */}
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
          </UserProvider>
          
          {/* Show ResponsiveTester only in development mode and when enabled */}
          {isDevelopment() && showResponsiveTester && <ResponsiveTester />}
          
          {/* Small button to toggle responsive tester in dev mode */}
          {isDevelopment() && (
            <button 
              onClick={() => setShowResponsiveTester(prev => !prev)}
              className="fixed bottom-2 right-2 bg-gray-800 text-white p-1 rounded-full z-50 text-xs opacity-50 hover:opacity-100 transition-opacity"
              title="Toggle Responsive Tester (Ctrl+Shift+R)"
              style={{ width: "24px", height: "24px" }}
            >
              R
            </button>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
