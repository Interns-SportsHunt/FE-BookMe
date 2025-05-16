import { useState, useEffect } from "react";
import { config, NODE_ENV } from "@/config/env";
import { API_ROUTES, buildApiUrl } from "@/config/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConfigTester() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="my-4 w-full">
      <Button 
        variant="outline" 
        onClick={() => setIsVisible(!isVisible)}
        className="w-full sm:w-auto"
      >
        {isVisible ? "Hide" : "Show"} Configuration
      </Button>
      
      {isVisible && (
        <Card className="mt-4 w-full overflow-hidden">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl break-words">Configuration Status</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 text-sm sm:text-base overflow-x-auto">
            <h3 className="font-semibold mb-2">Environment</h3>
            <div className="space-y-1 mb-4">
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium min-w-[180px]">Current Environment:</span> 
                <span className="font-mono bg-gray-100 px-1 rounded mt-1 sm:mt-0">{NODE_ENV}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium min-w-[180px]">App Name:</span>
                <span className="font-mono bg-gray-100 px-1 rounded mt-1 sm:mt-0">{config.app.name}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium min-w-[180px]">Version:</span>
                <span className="font-mono bg-gray-100 px-1 rounded mt-1 sm:mt-0">{config.app.version}</span>
              </p>
            </div>
            
            <h3 className="font-semibold mb-2">API Configuration</h3>
            <div className="space-y-1 mb-4">
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium min-w-[180px]">Base URL:</span>
                <span className="font-mono bg-gray-100 px-1 rounded mt-1 sm:mt-0 break-all">{config.api.baseUrl}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium min-w-[180px]">Timeout:</span>
                <span className="font-mono bg-gray-100 px-1 rounded mt-1 sm:mt-0">{config.api.timeout}ms</span>
              </p>
              <p className="flex flex-col">
                <span className="font-medium mb-1">Sample API URL:</span>
                <span className="font-mono bg-gray-100 px-1 py-1 rounded text-xs break-all">
                  {buildApiUrl(API_ROUTES.VENUE.VENUE, { id: '123' })}
                </span>
              </p>
            </div>
            
            <h3 className="font-semibold mb-2">Feature Flags</h3>
            <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2 border rounded-md">
                <p className="flex justify-between items-center">
                  <span className="font-medium">Payments:</span>
                  <span className={`ml-2 px-2 py-0.5 rounded text-white text-xs ${config.features.enablePayments ? 'bg-green-500' : 'bg-red-500'}`}>
                    {config.features.enablePayments ? 'Enabled' : 'Disabled'}
                  </span>
                </p>
              </div>
              <div className="p-2 border rounded-md">
                <p className="flex justify-between items-center">
                  <span className="font-medium">Real-time Notifications:</span>
                  <span className={`ml-2 px-2 py-0.5 rounded text-white text-xs ${config.features.enableRealTimeNotifications ? 'bg-green-500' : 'bg-red-500'}`}>
                    {config.features.enableRealTimeNotifications ? 'Enabled' : 'Disabled'}
                  </span>
                </p>
              </div>
              <div className="p-2 border rounded-md sm:col-span-2">
                <p className="flex justify-between items-center">
                  <span className="font-medium">Google Maps:</span>
                  <span className={`ml-2 px-2 py-0.5 rounded text-white text-xs ${config.features.enableGoogleMaps ? 'bg-green-500' : 'bg-red-500'}`}>
                    {config.features.enableGoogleMaps ? 'Enabled' : 'Disabled'}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 