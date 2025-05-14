import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building, 
  Map, 
  Upload, 
  Info, 
  MapPin, 
  Link as LinkIcon,
  ChevronLeft,
  Image 
} from "lucide-react";
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
import { X } from "lucide-react"; // Fix the import
import { venueService } from "@/services/venue";
import {ROUTES} from "@/services/utils";

const CreateVenue = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [venueDescription, setVenueDescription] = useState("");
  const [googleMapsLink, setGoogleMapsLink] = useState("");
  const [venueImages, setVenueImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Validation state
  const [errors, setErrors] = useState({
    venueName: "",
    venueAddress: "",
  });

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newFiles = Array.from(files);
    setVenueImages([...venueImages, ...newFiles]);
    
    // Create preview URLs
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
  };

  // Remove an image
  const removeImage = (index: number) => {
    const updatedImages = [...venueImages];
    const updatedPreviewUrls = [...imagePreviewUrls];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedPreviewUrls[index]);
    
    updatedImages.splice(index, 1);
    updatedPreviewUrls.splice(index, 1);
    
    setVenueImages(updatedImages);
    setImagePreviewUrls(updatedPreviewUrls);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {
      venueName: "",
      venueAddress: "",
    };
    
    let isValid = true;
    
    if (!venueName.trim()) {
      newErrors.venueName = "Venue name is required";
      isValid = false;
    }
    
    if (!venueAddress.trim()) {
      newErrors.venueAddress = "Venue address is required";
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
      // Create FormData object
      const formData = new FormData();
      formData.append('name', venueName);
      formData.append('address', venueAddress);
      formData.append('description', venueDescription);
      if (googleMapsLink) {
        formData.append('google_maps_link', googleMapsLink);
      }
      
      // Append each image file
      venueImages.forEach((image, index) => {
        formData.append(`images`, image);
      });

      const response = await venueService.createVenue(formData);
      
      if (response.success) {
        toast({
          title: "Venue Created",
          description: "Your venue has been created successfully!",
        });
        // Redirect to the venue page using the venue ID from the response
        navigate(`${ROUTES.VENUE}/${response.data.id}`);
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to create venue. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(ROUTES.HOST_DASHBOARD)}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      
      <h1 className="text-3xl font-bold mb-6">Create New Venue</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" /> Basic Information
                </CardTitle>
                <CardDescription>
                  Provide the basic details about your venue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="venue-name">
                    Venue Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="venue-name"
                    placeholder="e.g. City Sports Complex"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    className={errors.venueName ? "border-red-500" : ""}
                  />
                  {errors.venueName && (
                    <p className="text-sm text-red-500">{errors.venueName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="venue-address">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="venue-address"
                    placeholder="e.g. 123 Main Street, Cityville"
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    className={errors.venueAddress ? "border-red-500" : ""}
                  />
                  {errors.venueAddress && (
                    <p className="text-sm text-red-500">{errors.venueAddress}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="venue-description">Description</Label>
                  <Textarea
                    id="venue-description"
                    placeholder="Describe your venue, its facilities, and what makes it special..."
                    value={venueDescription}
                    onChange={(e) => setVenueDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="google-maps-link">Google Maps Link</Label>
                  <div className="relative">
                    <Input
                      id="google-maps-link"
                      placeholder="e.g. https://maps.google.com/?q=123+Main+Street+Cityville"
                      value={googleMapsLink}
                      onChange={(e) => setGoogleMapsLink(e.target.value)}
                      className="pl-10"
                    />
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">
                    Optional: Add a Google Maps link to help users find your venue
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Image className="mr-2 h-5 w-5" /> Venue Images
                </CardTitle>
                <CardDescription>
                  Upload images of your venue to attract more users
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
                  <Info className="mr-2 h-5 w-5" /> Venue Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className={`rounded-full h-5 w-5 flex items-center justify-center mt-0.5 mr-3 ${venueName ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                      {venueName ? "✓" : "1"}
                    </div>
                    <div>
                      <p className="font-medium">Provide venue name</p>
                      <p className="text-sm text-gray-500">Choose a clear and descriptive name</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className={`rounded-full h-5 w-5 flex items-center justify-center mt-0.5 mr-3 ${venueAddress ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                      {venueAddress ? "✓" : "2"}
                    </div>
                    <div>
                      <p className="font-medium">Add venue address</p>
                      <p className="text-sm text-gray-500">Enter the complete physical address</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className={`rounded-full h-5 w-5 flex items-center justify-center mt-0.5 mr-3 ${venueDescription ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                      {venueDescription ? "✓" : "3"}
                    </div>
                    <div>
                      <p className="font-medium">Add description</p>
                      <p className="text-sm text-gray-500">Describe your venue's features</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className={`rounded-full h-5 w-5 flex items-center justify-center mt-0.5 mr-3 ${imagePreviewUrls.length > 0 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                      {imagePreviewUrls.length > 0 ? "✓" : "4"}
                    </div>
                    <div>
                      <p className="font-medium">Upload images</p>
                      <p className="text-sm text-gray-500">Add at least one venue image</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" /> Location Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <div className="text-sporty-600 mr-2">•</div>
                    <p>Provide a complete address including landmark if needed</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-sporty-600 mr-2">•</div>
                    <p>Adding a Google Maps link helps users find your venue easily</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-sporty-600 mr-2">•</div>
                    <p>Mention parking availability in the description if applicable</p>
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
                  After creating the venue, you'll be able to add turfs and set their availability.
                </p>
                <Button
                  type="submit"
                  className="w-full bg-sporty-600 hover:bg-sporty-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Creating Venue...
                    </>
                  ) : (
                    "Create Venue"
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

export default CreateVenue;
