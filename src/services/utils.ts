const DEV_API_BASE_URL = "http://127.0.0.1:8000";
const PROD_API_BASE_URL = "https://bookme.azurewebsites.net";
 
// eslint-disable-next-line no-constant-condition
export const API_BASE_URL = true ? PROD_API_BASE_URL : DEV_API_BASE_URL;


export const API_ROUTES = {
    AUTH : {
        CHECK: "auth/check/",
        LOGIN : "login/", 
        LOGOUT : "logout/",
    },
    VENUE : {
        FEATURED: "venues/featured/",
        FILTER: "venues/filter/",
        VENUES: "venues/",
        VENUE: "venue/{id}/"
    },
    ORDER: "orders/create/",
    CHECKOUT: "orders/checkout/",
    MY_BOOKINGS: "my-bookings/",
    HOST: {
        VENUES: "hosts/venues/",
        CREATE_VENUE : "hosts/venues/create/",
        CREATE_TURF : "hosts/venues/{venue_id}/turfs/create/",
        BOOKINGS: "hosts/bookings/",
        OFFLINE_BOOKING: "hosts/offline-booking/",
        RECENT_BOOKINGS: "hosts/recent-bookings/",
        VENUE_BOOKINGS: "hosts/venue/{id}/bookings/",
        TURF_BOOKINGS: "hosts/turf/{id}/bookings/",

    }
}

export const ROUTES ={
    HOME:"/",
    VENUE_FILTER:"/venues/filter/",
    VENUE:"/venues",
    HOST_VENUE: "/host/venue",
    HOST_DASHBOARD:"/host/dashboard",
    ERROR: '/error',
    UNAUTHORIZED: '/unauthorized',
};
 
export const getApiUrl = (route: string) => `${API_BASE_URL}/${route}`;

export function getCSRFToken() {
  const cookie = document.cookie.split("; ").find(row => row.startsWith("csrftoken="));
  return cookie ? cookie.split("=")[1] : null;
}