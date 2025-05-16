import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { simulateError } from "@/utils/errorHandler";

/**
 * Toast & Error Notification Tester Component
 * 
 * This component provides a UI to test different types of toast notifications:
 * - Basic success/error toasts using the toast hook directly
 * - Error handling system toasts using the error handler
 * 
 * This is a development tool that helps ensure the notification system
 * is working correctly. It's only shown in development mode.
 * 
 * Use this to:
 * 1. Verify that toasts appear correctly in the UI
 * 2. Test how different error types are displayed
 * 3. Ensure the error handling system formats messages properly
 */
export default function ToastTester() {
  const { toast } = useToast();

  // Direct toast notification examples
  const showSuccessToast = () => {
    toast({
      title: "Success",
      description: "Operation completed successfully!",
      variant: "default",
    });
  };

  const showErrorToast = () => {
    toast({
      title: "Error",
      description: "An error occurred while processing your request.",
      variant: "destructive",
    });
  };

  const showNetworkErrorToast = () => {
    toast({
      title: "Network Error",
      description: "Server is not available. Please try again later.",
      variant: "destructive",
    });
  };

  const showValidationErrorToast = () => {
    toast({
      title: "Validation Error",
      description: "Please check your inputs and try again.",
      variant: "destructive",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Error Message Tester</CardTitle>
        <CardDescription>Test different types of error notifications</CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="basic">
        <TabsList className="mx-6">
          <TabsTrigger value="basic">Basic Toasts</TabsTrigger>
          <TabsTrigger value="errors">Error Handler</TabsTrigger>
        </TabsList>
        
        {/* Basic toast testing - uses toast hook directly */}
        <TabsContent value="basic">
          <CardContent className="flex flex-col gap-3">
            <Button onClick={showSuccessToast} variant="default">
              Show Success Toast
            </Button>
            <Button onClick={showErrorToast} variant="destructive">
              Show Error Toast
            </Button>
            <Button onClick={showNetworkErrorToast} variant="destructive">
              Show Network Error Toast
            </Button>
            <Button onClick={showValidationErrorToast} variant="destructive">
              Show Validation Error Toast
            </Button>
          </CardContent>
        </TabsContent>
        
        {/* Error handler testing - uses the error handling system */}
        <TabsContent value="errors">
          <CardContent className="flex flex-col gap-3">
            <Button 
              onClick={() => simulateError('network')} 
              variant="destructive"
            >
              Simulate Network Error
            </Button>
            <Button 
              onClick={() => simulateError('server', 'Internal server error occurred')} 
              variant="destructive"
            >
              Simulate Server Error
            </Button>
            <Button 
              onClick={() => simulateError('authentication', 'Your session has expired')} 
              variant="destructive"
            >
              Simulate Auth Error
            </Button>
            <Button 
              onClick={() => simulateError('validation', 'Invalid email format')} 
              variant="destructive"
            >
              Simulate Validation Error
            </Button>
            <Button 
              onClick={() => simulateError('not_found', 'Venue not found')} 
              variant="destructive"
            >
              Simulate Not Found Error
            </Button>
          </CardContent>
        </TabsContent>
      </Tabs>
      
      <CardFooter className="text-sm text-gray-500 justify-center pt-0">
        Use these buttons to test error handling in the app
      </CardFooter>
    </Card>
  );
} 