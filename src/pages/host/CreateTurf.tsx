import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  Upload, 
  Info, 
  CheckCircle, 
  ChevronLeft,
  Image,
  X,
  Check
} from "lucide-react";
import { FootballIcon } from "@/utils/sportIcons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { venues, amenities, sportAmenities } from "@/data/mockData";
import { Venue, SportType, Amenity } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {ROUTES} from "@/services/utils";

const sportTypes = [
  { value: "football", label: "Football" },
  { value: "cricket", label: "Cricket" },
  { value: "basketball", label: "Basketball" },
  { value: "tennis", label: "Tennis" },
  { value: "badminton", label: "Badminton" },
  { value: "volleyball", label: "Volleyball" },
  { value: "rugby", label: "Rugby" },
  { value: "hockey", label: "Hockey" },
];

const CreateTurf = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [turfName, setTurfName] = useState("");
  const [sportType, setSportType] = useState<SportType | "">("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [description, setDescription] = useState("");
  const [turfImages, setTurfImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [availableAmenities, setAvailableAmenities] = useState<Amenity[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Validation state
  const [errors, setErrors] = useState({
    turfName: "",
    sportType: "",
    pricePerHour: "",
  });

  // Fetch venue data from API
  useEffect(() => {
    const fetchVenue = async () => {
      setLoading(true);
      try {
        const { API_ROUTES, getApiUrl } = await import("@/services/utils");
        const { adaptVenue } = await import("@/types/adapter");
        if (!venueId) throw new Error("Venue ID is required");
        const venueRoute = API_ROUTES.VENUE.VENUE.replace("{id}", venueId);
        const response = await fetch(getApiUrl(venueRoute), { credentials: "include" });
        if (!response.ok) throw new Error("Failed to fetch venue details");
        const data = await response.json();
        setVenue(adaptVenue(data));
      } catch (err) {
        setVenue(null);
      } finally {
        setLoading(false);
      }
    };
    fetchVenue();
    // eslint-disable-next-line
  }, [venueId]);

  // Update available amenities when sport type changes
  useEffect(() => {
    if (!sportType) {
      setAvailableAmenities(amenities);
      setSelectedAmenities([]);
      return;
    }
    
    // Filter amenities based on sport type and set recommended amenities as selected
    const sportSpecificAmenityIds = sportAmenities[sportType as SportType] || [];
    const filteredAmenities = amenities.filter(amenity => 
      sportSpecificAmenityIds.includes(amenity.id)
    );
    
    setAvailableAmenities(filteredAmenities);
    setSelectedAmenities(sportSpecificAmenityIds);
  }, [sportType]);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newFiles = Array.from(files);
    setTurfImages([...turfImages, ...newFiles]);
    
    // Create preview URLs
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
  };

  // Remove an image
  const removeImage = (index: number) => {
    const updatedImages = [...turfImages];
    const updatedPreviewUrls = [...imagePreviewUrls];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedPreviewUrls[index]);
    
    updatedImages.splice(index, 1);
    updatedPreviewUrls.splice(index, 1);
    
    setTurfImages(updatedImages);
    setImagePreviewUrls(updatedPreviewUrls);
  };

  // Toggle amenity selection
  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {
      turfName: "",
      sportType: "",
      pricePerHour: "",
    };
    
    let isValid = true;
    
    if (!turfName.trim()) {
      newErrors.turfName = "Turf name is required";
      isValid = false;
    }
    
    if (!sportType) {
      newErrors.sportType = "Sport type is required";
      isValid = false;
    }
    
    if (!pricePerHour.trim()) {
      newErrors.pricePerHour = "Price per hour is required";
      isValid = false;
    } else if (isNaN(Number(pricePerHour)) || Number(pricePerHour) <= 0) {
      newErrors.pricePerHour = "Price must be a positive number";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", turfName);
      formData.append("sport_type", sportType);
      formData.append("price_per_hr", pricePerHour);
      formData.append("description", description);
      formData.append("venue_id", venueId || "");
      selectedAmenities.forEach((amenityId) => {
        formData.append("amenities", amenityId);
      });
      turfImages.forEach((file) => {
        formData.append("images", file);
      });

      // Use the correct API route for creating a turf
      const { API_ROUTES, getApiUrl } = await import("@/services/utils");
      const { getCSRFToken } = await import("@/services/utils");
      const turfRoute = API_ROUTES.HOST.CREATE_TURF.replace("{venue_id}", venueId || "");

      const response = await fetch(getApiUrl(turfRoute), {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "X-CSRFToken": getCSRFToken() || "",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to create turf");
      }

      toast({
        title: "Turf Created",
        description: "Your turf has been created successfully!",
      });
      navigate(`${ROUTES.HOST_VENUE}/${venueId}`);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to create turf.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-sporty-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Venue Not Found</h2>
        <p className="text-gray-600 mb-6">The venue you're trying to add a turf to doesn't exist or you don't have permission to access it.</p>
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
      
      <h1 className="text-3xl font-bold mb-2">Add New Turf</h1>
      <p className="text-gray-600 mb-6">
        Creating a turf for <span className="font-medium">{venue.name}</span>
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FootballIcon className="mr-2 h-5 w-5" /> Basic Information
                </CardTitle>
                <CardDescription>
                  Provide the basic details about your turf
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="turf-name">
                    Turf Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="turf-name"
                    placeholder="e.g. Premier Football Field"
                    value={turfName}
                    onChange={(e) => setTurfName(e.target.value)}
                    className={errors.turfName ? "border-red-500" : ""}
                  />
                  {errors.turfName && (
                    <p className="text-sm text-red-500">{errors.turfName}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sport-type">
                      Sport Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={sportType}
                      onValueChange={(value) => setSportType(value as SportType)}
                    >
                      <SelectTrigger id="sport-type" className={errors.sportType ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select a sport type" />
                      </SelectTrigger>
                      <SelectContent>
                        {sportTypes.map((sport) => (
                          <SelectItem key={sport.value} value={sport.value}>
                            {sport.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.sportType && (
                      <p className="text-sm text-red-500">{errors.sportType}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price-per-hour">
                      Price Per Hour (₹) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="price-per-hour"
                      type="number"
                      placeholder="e.g. 1200"
                      value={pricePerHour}
                      onChange={(e) => setPricePerHour(e.target.value)}
                      min="0"
                      className={errors.pricePerHour ? "border-red-500" : ""}
                    />
                    {errors.pricePerHour && (
                      <p className="text-sm text-red-500">{errors.pricePerHour}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your turf, its features, condition, etc..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" /> Amenities
                </CardTitle>
                <CardDescription>
                  Select the amenities available for this turf
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    We've automatically selected the recommended amenities for {sportType ? sportTypes.find(s => s.value === sportType)?.label : "this sport"}.
                    You can customize these selections.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableAmenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`amenity-${amenity.id}`}
                        checked={selectedAmenities.includes(amenity.id)}
                        onCheckedChange={() => toggleAmenity(amenity.id)}
                      />
                      <Label
                        htmlFor={`amenity-${amenity.id}`}
                        className="flex items-center cursor-pointer"
                      >
                        {amenity.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Image className="mr-2 h-5 w-5" /> Turf Images
                </CardTitle>
                <CardDescription>
                  Upload images of your turf to showcase it to users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <p className="mb-2 text-sm text-gray-600">
                    Drag and drop images here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Supported formats: JPEG, PNG, WebP. Max size: 5MB.
                  </p>
                  <Button type="button" variant="outline" className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    Browse Images
                  </Button>
                </div>
                
                {imagePreviewUrls.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-3">Selected Images:</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {imagePreviewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="h-24 w-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar & Submit */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="mr-2 h-5 w-5" /> Turf Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className={`rounded-full h-5 w-5 flex items-center justify-center mt-0.5 mr-3 ${turfName ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                      {turfName ? <Check className="h-3 w-3" /> : "1"}
                    </div>
                    <div>
                      <p className="font-medium">Provide turf name</p>
                      <p className="text-sm text-gray-500">Choose a clear and descriptive name</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className={`rounded-full h-5 w-5 flex items-center justify-center mt-0.5 mr-3 ${sportType ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                      {sportType ? <Check className="h-3 w-3" /> : "2"}
                    </div>
                    <div>
                      <p className="font-medium">Select sport type</p>
                      <p className="text-sm text-gray-500">Choose the primary sport for this turf</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className={`rounded-full h-5 w-5 flex items-center justify-center mt-0.5 mr-3 ${pricePerHour ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                      {pricePerHour ? <Check className="h-3 w-3" /> : "3"}
                    </div>
                    <div>
                      <p className="font-medium">Set hourly price</p>
                      <p className="text-sm text-gray-500">Determine the rental price per hour</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className={`rounded-full h-5 w-5 flex items-center justify-center mt-0.5 mr-3 ${selectedAmenities.length > 0 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                      {selectedAmenities.length > 0 ? <Check className="h-3 w-3" /> : "4"}
                    </div>
                    <div>
                      <p className="font-medium">Select amenities</p>
                      <p className="text-sm text-gray-500">Choose the amenities available for users</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className={`rounded-full h-5 w-5 flex items-center justify-center mt-0.5 mr-3 ${imagePreviewUrls.length > 0 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                      {imagePreviewUrls.length > 0 ? <Check className="h-3 w-3" /> : "5"}
                    </div>
                    <div>
                      <p className="font-medium">Upload images</p>
                      <p className="text-sm text-gray-500">Add at least one turf image</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Turf Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <div className="text-sporty-600 mr-2">•</div>
                    <p>Clear, bright photos help users make booking decisions</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-sporty-600 mr-2">•</div>
                    <p>A detailed description helps set the right expectations</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-sporty-600 mr-2">•</div>
                    <p>Realistic pricing based on location and quality attracts more bookings</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-sporty-600 mr-2">•</div>
                    <p>Accurate amenity information helps avoid user disappointment</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Ready to Submit?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  After creating the turf, users will be able to view and book it.
                </p>
                <Button
                  type="submit"
                  className="w-full bg-sporty-600 hover:bg-sporty-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Creating Turf...
                    </>
                  ) : (
                    "Create Turf"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTurf;
