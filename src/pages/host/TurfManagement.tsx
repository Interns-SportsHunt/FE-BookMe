import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  Edit, 
  Trash, 
  Calendar, 
  Clock,
  Image,
  CheckCircle,
  DollarSign,
  Settings
} from "lucide-react";
import { FootballIcon } from "@/utils/sportIcons";
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
import { turfs, bookings } from "@/data/mockData";
import { Turf, Venue, Booking } from "@/types";
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
import { Badge } from "@/components/ui/badge";
import { adaptVenue, adaptBookings } from "@/types/adapter";
import { handle_apicall } from "@/services/apis/api_call";
import { API_ROUTES, getApiUrl, ROUTES } from "@/services/utils";
import AddBookingSlotDialog from "@/components/AddBookingSlotDialog";

const TurfManagement = () => {
  const { venueId, turfId } = useParams<{ venueId: string; turfId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [turf, setTurf] = useState<Turf | null>(null);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [turfBookings, setTurfBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // Fetch venue and turf data from API
    const fetchTurfData = async () => {
      if (!venueId || !turfId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const response = await handle_apicall(getApiUrl(API_ROUTES.VENUE.VENUE.replace("{id}", venueId)));
      if (response.success) {
        const adaptedVenue = adaptVenue(response.data);
        setVenue(adaptedVenue);
        const foundTurf = adaptedVenue.turfs.find((t) => t.id === turfId);
        setTurf(foundTurf || null);
        if (foundTurf) {
          const turfBookingsResponse = await handle_apicall(getApiUrl(API_ROUTES.HOST.TURF_BOOKINGS.replace("{id}", turfId)));
          if (turfBookingsResponse.success) {
            setTurfBookings(adaptBookings(turfBookingsResponse.data));
          } else {
            toast({
              title: "Error",
              description: "Failed to fetch turf bookings.",
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Error",
            description: "Turf not found.",
            variant: "destructive",
          });
        }
        // Bookings remain as sample/mock data for now
      } else {
        setVenue(null);
        setTurf(null);
      }
      setLoading(false);
    };
    fetchTurfData();
    // eslint-disable-next-line
  }, [venueId, turfId]);

  const handleDeleteTurf = () => {
    toast({
      title: "Turf Deleted",
      description: "The turf has been deleted successfully.",
    });
    navigate(`${ROUTES.HOST_VENUE}/${venueId}`);
  };

  const handleAddOfflineBooking = async (data: {
    date: string;
    startTime: string;
    duration: number;
    userName: string;
  }) => {
    const toISODateTime = (date: string, time: string) => `${date}T${time}`;
    const payload = {
      venue_id: venueId,
      turf_id: turfId,
      start_date: toISODateTime(data.date, data.startTime),
      duration: data.duration,
      user_name: data.userName,
    };
    try {
      const res = await fetch(getApiUrl(API_ROUTES.HOST.OFFLINE_BOOKING), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      toast({
        title: res.ok ? "Offline Booking Added" : "Booking Failed",
        description: result.message || result.error || (res.ok ? "Booking created successfully." : "Failed to create booking."),
        variant: res.ok ? "default" : "destructive",
      });
    } catch (err) {
      toast({
        title: "Booking Failed",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    }
  };

  const groupBookingsByDate = (bookings: Booking[]) => {
    const grouped = bookings.reduce((acc, booking) => {
      const date = format(parseISO(booking.startTime), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(booking);
      return acc;
    }, {} as Record<string, Booking[]>);
    
    return Object.keys(grouped)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map(date => ({
        date,
        bookings: grouped[date].sort(
          (a, b) => 
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        ),
      }));
  };

  const bookingsByDate = groupBookingsByDate(turfBookings);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-sporty-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading turf details...</p>
        </div>
      </div>
    );
  }

  if (!turf || !venue) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Turf Not Found</h2>
        <p className="text-gray-600 mb-6">The turf you're looking for doesn't exist or you don't have permission to view it.</p>
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
        onClick={() => navigate(`${ROUTES.HOST_VENUE}/${venueId}`)}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Venue
      </Button>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{turf.name}</h1>
          <div className="flex items-center text-gray-600 mt-1">
            <span className="capitalize mr-3">{turf.sportType}</span>
            <span>at {venue.name}</span>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center">
            <Edit className="mr-2 h-4 w-4" /> Edit Turf
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Turf</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this turf? This action cannot be undone and all associated bookings will also be deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteTurf}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete Turf
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="bookings">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="bookings" className="flex-1">Bookings</TabsTrigger>
              <TabsTrigger value="details" className="flex-1">Turf Details</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bookings">
              <h2 className="text-xl font-semibold mb-6">Bookings</h2>
              
              {turfBookings.length > 0 ? (
                <div className="space-y-8">
                  {bookingsByDate.map(({ date, bookings }) => (
                    <div key={date} className="space-y-4">
                      <h3 className="font-medium text-lg">
                        {format(new Date(date), "EEEE, MMMM d, yyyy")}
                      </h3>
                      
                      {bookings.map(booking => (
                        <Card key={booking.id} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                              <div>
                                <div className="flex items-center mb-2">
                                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                                  <span>
                                    {format(parseISO(booking.startTime), "h:mm a")} - 
                                    {format(parseISO(booking.endTime), "h:mm a")}
                                  </span>
                                </div>
                                
                                <h3 className="font-bold">Booking #{booking.id}</h3>
                                <p className="text-gray-600 text-sm">User ID: {booking.userId}</p>
                              </div>
                              
                              <div className="md:text-right mt-4 md:mt-0">
                                <div className="text-lg font-bold text-sporty-600">₹{booking.totalPrice}</div>
                                <Badge className={`${
                                  booking.status === 'online' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                                  booking.status === 'offline' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                                  'bg-red-100 text-red-800 hover:bg-red-200'}`}
                                >
                                  {booking.status}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Bookings Yet</h3>
                    <p className="text-gray-600">
                      Once users start booking this turf, you'll see their bookings here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="details">
              <h2 className="text-xl font-semibold mb-6">Turf Details</h2>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Description</h3>
                      <p className="text-gray-600">
                        {turf.description || "No description provided."}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Sport Type</h3>
                      <div className="flex items-center">
                        <FootballIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="capitalize">{turf.sportType}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Price</h3>
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-xl font-bold text-sporty-600">₹{turf.pricePerHour}</span>
                        <span className="text-gray-600 ml-2">per hour</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Amenities</h3>
                      <div className="grid grid-cols-2 gap-y-2">
                        {turf.amenities.map(amenity => (
                          <div key={amenity.id} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-sporty-600 mr-2" />
                            <span>{amenity.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Image className="mr-2 h-5 w-5" /> Photos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {turf.images.length > 0 ? (
                    <div>
                      <div className="mb-4">
                        <img
                          src={turf.images[activeImageIndex]}
                          alt={turf.name}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        {turf.images.map((image, index) => (
                          <div
                            key={index}
                            className={`h-16 w-24 rounded-md overflow-hidden cursor-pointer ${
                              activeImageIndex === index ? "ring-2 ring-sporty-600" : ""
                            }`}
                            onClick={() => setActiveImageIndex(index)}
                          >
                            <img
                              src={image}
                              alt={`${turf.name} ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">No photos available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <h2 className="text-xl font-semibold mb-6">Settings</h2>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                  <CardDescription>
                    Set the hours when this turf is available for booking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Currently, this turf is available for booking every day from 6:00 AM to 10:00 PM.
                  </p>
                  <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" /> Customize Availability
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                  <CardDescription>
                    Manage pricing for this turf
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <span className="text-gray-600">Current Price</span>
                      <span className="font-bold text-sporty-600">₹{turf.pricePerHour}/hour</span>
                    </div>
                    <Button variant="outline">
                      <Edit className="mr-2 h-4 w-4" /> Update Pricing
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible actions for this turf
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 w-full">
                        <Trash className="mr-2 h-4 w-4" /> Delete this Turf
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Turf</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this turf? This action cannot be undone and all associated bookings will also be deleted.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteTurf}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Delete Turf
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Turf Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Total Bookings</span>
                  <span className="font-bold">{turfBookings.length}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Upcoming Bookings</span>
                  <span className="font-bold">
                    {turfBookings.filter(booking => 
                      new Date(booking.startTime) > new Date()
                    ).length}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Revenue</span>
                  <span className="font-bold text-sporty-600">
                    ₹{turfBookings.reduce((sum, booking) => sum + booking.totalPrice, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Created On</span>
                  <span className="font-medium">
                    {format(parseISO(turf.createdAt), "MMMM d, yyyy")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Edit className="mr-2 h-4 w-4" /> Edit Turf Details
              </Button>
               <AddBookingSlotDialog onAdd={handleAddOfflineBooking} />
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" /> Availability Settings
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>View on Main Site</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                See how your turf appears to users on the main site.
              </p>
              <Link to={`/venue/${venueId}/turf/${turfId}`}>
                <Button variant="outline" className="w-full">
                  View Turf Page
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TurfManagement;
