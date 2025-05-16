import { Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { FootballIcon } from "@/utils/sportIcons";

export default function HostNavbar() {
  const { user } = useUser();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="lg:hidden">
            {/* Mobile menu button would go here */}
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Host Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-500 hover:text-sporty-600">
            Switch to Player
          </Link>
          
          <div className="flex items-center border rounded-full bg-gray-100 px-3 py-1">
            <div className="bg-sporty-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium mr-2">
              {user?.username?.charAt(0) || "U"}
            </div>
            <span className="text-sm font-medium">{user?.username || "Host"}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
