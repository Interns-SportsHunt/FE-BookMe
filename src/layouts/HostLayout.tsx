import { Outlet, useNavigate } from "react-router-dom";
import HostSidebar from "@/components/HostSidebar";
import HostNavbar from "@/components/HostNavbar";
import { authService } from "@/services/auth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast"; // Import the custom hook
import {ROUTES} from "@/services/utils";

const HostLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast(); // Access the toast function

  useEffect(() => {
    const checkHostStatus = async () => {
      const { isHost } = await authService.checkHost();

      if (!isHost) {
        toast({
          title: "Access Denied",
          description: "You don't have host privileges.",
          variant: "destructive",
        });
        navigate(ROUTES.HOME); // Redirect to homepage
      }
    };

    checkHostStatus();
  }, [navigate, toast]);

  return (
    <div className="flex min-h-screen">
      <HostSidebar />
      <div className="flex flex-col flex-1">
        <HostNavbar />
        <main className="flex-grow p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HostLayout;
