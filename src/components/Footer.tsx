import { Link } from "react-router-dom";
import { FootballIcon } from "@/utils/sportIcons";

const Footer = () => {
  // Social media icons
  const InstagramIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );

  const TwitterIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );

  const FacebookIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );

  const MailIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <FootballIcon className="h-8 w-8 text-sporty-500" />
              <span className="text-xl font-bold">SportsHunt</span>
            </div>
            <p className="text-gray-400 mb-4">
              Find and book the best sports venues for your games and training sessions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                <MailIcon size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/venue-filter" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Find Venues
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <a href="mailto: cto@sportshunt.in?subject=Host%20Request&body=Hi%20Team%2C%0A%0AI%20would%20like%20to%20become%20a%20host%20on%20Sporty%20Turf%20Hub.%20Please%20let%20me%20know%20the%20next%20steps.%0A%0AThanks%2C"
                className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Become a Host
                </a>
              </li>
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sports</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Football
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Cricket
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Basketball
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Tennis
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Badminton
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                  <Link to="/privacy-policy" className="text-gray-400 hover:text-sporty-500 transition-colors">
                    Privacy Policy
                  </Link>
              </li>
              <li>
                 <Link to="/terms-and-conditions" className="text-gray-400 hover:text-sporty-500 transition-colors">
                    Terms Of Service
                  </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SportsHunt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
