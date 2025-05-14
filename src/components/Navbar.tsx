import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FootballIcon } from "@/utils/sportIcons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { API_ROUTES, getApiUrl, ROUTES } from "@/services/utils";
import { useUser } from "../contexts/UserContext";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, loading } = useUser();

  const handleLogout = () => {
    window.location.href = API_ROUTES.AUTH.LOGOUT;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${ROUTES.VENUE_FILTER}?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const MenuIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );

  const XIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  const UserIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FootballIcon className="h-8 w-8 text-sporty-600" />
            <span className="text-xl font-bold text-sporty-700">SportsHunt</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-sporty-600 transition-colors">Home</Link>
            {user ? (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                  variant="ghost"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-200 shadow-sm bg-green-600 hover:bg-green-700 transition"
                  >
                  <Avatar className="h-7 w-7">
                    <AvatarFallback>{user.username?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-white">{user.username}</span>
                  <svg className="ml-2 h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="mt-2 min-w-[180px] rounded-md shadow-lg border border-gray-200 bg-white">
                  {user.is_host && (
                  <DropdownMenuItem asChild>
                    <Link to="/host/dashboard" className="w-full text-left">Host Dashboard</Link>
                  </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full text-left">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer w-full text-left">Logout</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
                ) : (
              <Link to={getApiUrl(API_ROUTES.AUTH.LOGIN)}>
                <Button className="bg-sporty-600 hover:bg-sporty-700 text-white">
                  <UserIcon className="mr-2 h-4 w-4" /> Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-600 hover:text-sporty-600 transition-colors py-2">Home</Link>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 w-full justify-start">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-700">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {user.is_host && (
                      <DropdownMenuItem asChild>
                        <Link to="/host/dashboard">Host Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to={getApiUrl(API_ROUTES.AUTH.LOGIN)}>
                  <Button className="w-full bg-sporty-600 hover:bg-sporty-700 text-white">
                    <UserIcon className="mr-2 h-4 w-4" /> Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
