import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { FootballIcon } from "@/utils/sportIcons";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FootballIcon className="h-8 w-8 text-sporty-600" />
            <span className="font-bold text-xl">SportsHunt</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-sporty-600">Home</Link>
            <Link to="/venue-filter" className="text-gray-700 hover:text-sporty-600">Venues</Link>
            {user?.is_host && (
              <Link to="/host/dashboard" className="text-gray-700 hover:text-sporty-600">Host Dashboard</Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="outline">My Profile</Button>
                </Link>
                <Link to="/logout">
                  <Button variant="ghost">Logout</Button>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
