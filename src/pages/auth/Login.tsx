import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {ROUTES} from "@/services/utils";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome back to SportsHunt!",
      });
      navigate(ROUTES.HOME);
    }, 1500);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password match
    if (signupPassword !== signupConfirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate terms agreement
    if (!agreeTerms) {
      toast({
        title: "Error",
        description: "You must agree to the terms and conditions.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
      });
      navigate(ROUTES.HOME);
    }, 1500);
  };

  const switchToLoginTab = () => {
    const loginTab = document.querySelector('[data-value="login"]');
    if (loginTab && loginTab instanceof HTMLElement) {
      loginTab.click();
    }
  };

  return (
    <Tabs defaultValue="login">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login">
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="pl-10"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-sporty-600 hover:text-sporty-700">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="pl-10"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="ml-2 text-sm">
                Remember me
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-sporty-600 hover:bg-sporty-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                <span>Log In</span>
              )}
            </Button>
          </div>
        </form>
        
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-4">Or continue with</p>
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="flex items-center justify-center py-5">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.059 10.059 0 01-3.126 1.184 4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.922 4.922 0 01-2.228-.617v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"
                  fill="#1DA1F2"
                />
              </svg>
            </Button>
            <Button variant="outline" className="flex items-center justify-center py-5">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  fill="#1877F2"
                />
              </svg>
            </Button>
            <Button variant="outline" className="flex items-center justify-center py-5">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018 0-3.878 3.132-7.018 7-7.018 1.89 0 3.14.697 4.474 1.586l-1.81 1.735C13.727 7.55 13.035 7.01 12.14 7.01c-2.715 0-4.93 2.244-4.93 4.99 0 2.745 2.215 4.99 4.93 4.99 1.848 0 2.991-.696 3.682-1.897.558-.78.935-1.91.935-3.228h-4.618v-2.47h7.744c.07.41.105.912.105 1.472 0 1.71-.428 3.42-1.764 4.7-1.393 1.373-3.17 2.106-5.543 2.106z"
                  fill="#4285F4"
                />
              </svg>
            </Button>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="signup">
        <form onSubmit={handleSignup}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                  className="pl-10"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <div className="relative">
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                  className="pl-10"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <div className="relative">
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  className="pl-10"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  required
                  className="pl-10"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="ml-2 text-sm">
                I agree to the{" "}
                <a href="#" className="text-sporty-600 hover:text-sporty-700">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-sporty-600 hover:text-sporty-700">
                  Privacy Policy
                </a>
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-sporty-600 hover:bg-sporty-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                <span>Sign Up</span>
              )}
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                switchToLoginTab();
              }}
              className="text-sporty-600 hover:text-sporty-700"
            >
              Log in
            </a>
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Login;
