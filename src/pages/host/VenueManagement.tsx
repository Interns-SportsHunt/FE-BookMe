import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Building, 
  MapPin, 
  Edit, 
  Trash, 
  Plus, 
  ChevronLeft, 
  ExternalLink,
  Calendar,
  Pencil,
  Image,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bookings } from "@/data/mockData";
import { Venue, Turf } from "@/types";
import { adaptVenue, adaptBookings } from "@/types/adapter";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";
import { handle_apicall } from "@/services/apis/api_call";
import { API_ROUTES, getApiUrl, ROUTES } from "@/services/utils";

const VenueManagement = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [venue, setVenue] = useState<Venue | null>(null);
  const [venueTurfs, setVenueTurfs] = useState<Turf[]>([]);
  const [venueBookings, setVenueBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // Fetch venue data from API
    const fetchVenue = async () => {
      if (!venueId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const response = await handle_apicall(getApiUrl(API_ROUTES.VENUE.VENUE.replace("{id}", venueId)));
      if (response.success) {
        const adaptedVenue = adaptVenue(response.data);
        setVenue(adaptedVenue);
        setVenueTurfs(adaptedVenue.turfs);
        // make and API call to get bookings for the venue
        const bookingsResponse = await handle_apicall(getApiUrl(API_ROUTES.HOST.VENUE_BOOKINGS.replace("{id}", venueId)));
        
        if (bookingsResponse.success) {
          setVenueBookings(adaptBookings(bookingsResponse.data));
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch venue bookings.",
            variant: "destructive",
          });
        }

        // setVenueBookings([])
      } else {
        setVenue(null);
      }
      setLoading(false);
    };
    fetchVenue();
    // eslint-disable-next-line
  }, [venueId]);

  const handleDeleteVenue = () => {
    // In a real app, this would make an API call to delete the venue
    toast({
      title: "Venue Deleted",
      description: "The venue has been deleted successfully.",
    });
    navigate(ROUTES.HOST_DASHBOARD);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-sporty-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading venue details...</p>
        </div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Venue Not Found</h2>
        <p className="text-gray-600 mb-6">The venue you're looking for doesn't exist or you don't have permission to view it.</p>
        <Link to="/host/dashboard">
          <Button className="bg-sporty-600 hover:bg-sporty-700 text-white">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(ROUTES.HOST_DASHBOARD)}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{venue.name}</h1>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{venue.address}</span>
            {venue.googleMapsLink && (
              <a
                href={venue.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sporty-600 hover:text-sporty-700 inline-flex items-center"
              >
                View on map <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            )}
          </div>
        </div>
        
        {/* DONT REMOVE THIS */}
        {/* <div className="flex space-x-3 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center">
            <Edit className="mr-2 h-4 w-4" /> Edit Venue
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Venue</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this venue? This action cannot be undone and all associated turfs and bookings will also be deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteVenue}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete Venue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="turfs">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="turfs" className="flex-1">Turfs</TabsTrigger>
              <TabsTrigger value="bookings" className="flex-1">Bookings</TabsTrigger>
              <TabsTrigger value="details" className="flex-1">Venue Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="turfs">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Turfs</h2>
                <Link to={`/host/venue/${venueId}/create-turf`}>
                  <Button className="bg-sporty-600 hover:bg-sporty-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add New Turf
                  </Button>
                </Link>
              </div>
              
              {venueTurfs.length > 0 ? (
                <div className="space-y-6">
                  {venueTurfs.map((turf) => (
                    <Card key={turf.id} className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="h-48 md:h-auto">
                          <img
                            src={turf.images[0]}
                            alt={turf.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <CardContent className="p-6 md:col-span-2">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold">{turf.name}</h3>
                              <div className="flex items-center text-gray-600 mt-1">
                                <span className="capitalize">{turf.sportType}</span>
                              </div>
                            </div>
                            <div className="text-lg font-bold text-sporty-600">₹{turf.pricePerHour}/hr</div>
                          </div>
                          
                          <p className="text-gray-600 mb-4">
                            {turf.description || "No description provided."}
                          </p>
                          
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Amenities:</h4>
                            <div className="flex flex-wrap gap-2">
                              {turf.amenities.map((amenity) => (
                                <span
                                  key={amenity.id}
                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                >
                                  {amenity.name}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-4">
                            <Link to={`/host/venue/${venueId}/turf/${turf.id}`}>
                              <Button variant="outline" className="flex items-center text-sporty-600 border-sporty-200 hover:bg-sporty-50">
                                <Settings className="mr-2 h-4 w-4" /> Manage
                              </Button>
                            </Link>
                            {/* add these later */}
                            {/* <Button variant="outline" className="flex items-center">
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </Button>
                            <Button variant="outline" className="flex items-center text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                              <Trash className="mr-2 h-4 w-4" /> Delete
                            </Button> */}
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Turfs Added Yet</h3>
                    <p className="text-gray-600 mb-6">
                      Start by adding a turf to your venue to make it available for booking.
                    </p>
                    <Link to={`/host/venue/${venueId}/create-turf`}>
                      <Button className="bg-sporty-600 hover:bg-sporty-700 text-white">
                        <Plus className="mr-2 h-4 w-4" /> Add Your First Turf
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="bookings">
              <h2 className="text-xl font-semibold mb-6">Bookings</h2>
              
              {venueBookings.length > 0 ? (
                <div className="space-y-4">
                  {venueBookings.map((booking) => {
                    const turf = venueTurfs.find(t => t.id === booking.turfId);
                    if (!turf) return null;
                    
                    return (
                      <Card key={booking.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                              <div className="flex items-center mb-2">
                                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                                <span className="font-medium">
                                  {format(parseISO(booking.startTime), "MMMM d, yyyy")}
                                </span>
                                <span className="mx-2 text-gray-500">•</span>
                                <span>
                                  {format(parseISO(booking.startTime), "h:mm a")} - 
                                  {format(parseISO(booking.endTime), "h:mm a")}
                                </span>
                              </div>
                              
                              <h3 className="font-bold">{turf.name}</h3>
                              <p className="text-gray-600 text-sm">Booking ID: {booking.id}</p>
                            </div>
                            
                            <div className="md:text-right mt-4 md:mt-0">
                              <div className="text-lg font-bold text-sporty-600">₹{booking.totalPrice}</div>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize mt-1
                                ${booking.status === 'online' ? 'bg-green-100 text-green-800' : 
                                  booking.status === 'offline' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'}`}
                              >
                                {booking.status}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Bookings Yet</h3>
                    <p className="text-gray-600">
                      Once users start booking your turfs, you'll see their bookings here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="details">
              <h2 className="text-xl font-semibold mb-6">Venue Details</h2>
              
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Description</h3>
                      <p className="text-gray-600">
                        {venue.description || "No description provided."}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Location</h3>
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-gray-600">{venue.address}</p>
                          {venue.googleMapsLink && (
                            <a
                              href={venue.googleMapsLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sporty-600 hover:text-sporty-700 inline-flex items-center mt-1"
                            >
                              View on Google Maps <ExternalLink className="h-4 w-4 ml-1" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Photos</h3>
                      {venue.images.length > 0 ? (
                        <div>
                          <div className="mb-4">
                            <img
                              src={venue.images[activeImageIndex]}
                              alt={venue.name}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          </div>
                          
                          <div className="flex space-x-2 overflow-x-auto pb-2">
                            {venue.images.map((image, index) => (
                              <div
                                key={index}
                                className={`h-16 w-24 rounded-md overflow-hidden cursor-pointer ${
                                  activeImageIndex === index ? "ring-2 ring-sporty-600" : ""
                                }`}
                                onClick={() => setActiveImageIndex(index)}
                              >
                                <img
                                  src={image}
                                  alt={`${venue.name} ${index + 1}`}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-600">No photos available.</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Venue Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Total Turfs</span>
                  <span className="font-bold">{venueTurfs.length}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Total Bookings</span>
                  <span className="font-bold">{venueBookings.length}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Revenue</span>
                  <span className="font-bold text-sporty-600">
                    ₹{venueBookings.reduce((sum, booking) => sum + booking.totalPrice, 0).toLocaleString()}
                  </span>
                </div>
                {/* <div className="flex justify-between items-center">
                  <span className="text-gray-600">Created On</span>
                  <span className="font-medium">
                    {format(parseISO(venue.createdAt), "MMMM d, yyyy")}
                  </span>
                </div> */}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to={`/host/venue/${venueId}/create-turf`} className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" /> Add New Turf
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Pencil className="mr-2 h-4 w-4" /> Edit Venue Details
              </Button>
              {/* <Button variant="outline" className="w-full justify-start">
                <Image className="mr-2 h-4 w-4" /> Manage Photos
              </Button> */}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>View on Main Site</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                See how your venue appears to users on the main site.
              </p>
              <Link to={`/venue/${venueId}`}>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" /> View Venue Page
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VenueManagement;
