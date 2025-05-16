import { Link, useLocation } from "react-router-dom";
import { FootballIcon } from "@/utils/sportIcons";

export default function HostSidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  const menuItems = [
    { path: "/host/dashboard", label: "Dashboard" },
    { path: "/host/create-venue", label: "Create Venue" },
    { path: "/host/venues", label: "My Venues" },
    { path: "/host/bookings", label: "Bookings" }
  ];

  return (
    <div className="bg-gray-900 text-white w-64 flex-shrink-0 hidden md:block">
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-2">
          <FootballIcon className="h-8 w-8 text-sporty-500" />
          <span className="text-xl font-bold">SportsHunt</span>
        </Link>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive(item.path)
                    ? "bg-sporty-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
