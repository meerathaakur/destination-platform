/**
 * Constants for the destination recommendation platform
 */

/**
 * Interest categories for destination recommendations
 */
export const INTEREST_CATEGORIES = [
    { id: 'adventure', label: 'Adventure', icon: 'hiking' },
    { id: 'relaxation', label: 'Relaxation', icon: 'beach' },
    { id: 'culture', label: 'Culture & History', icon: 'museum' },
    { id: 'food', label: 'Food & Cuisine', icon: 'restaurant' },
    { id: 'nature', label: 'Nature & Wildlife', icon: 'forest' },
    { id: 'cities', label: 'Urban Exploration', icon: 'city' },
    { id: 'nightlife', label: 'Nightlife', icon: 'cocktail' },
    { id: 'shopping', label: 'Shopping', icon: 'shopping-bag' },
    { id: 'wellness', label: 'Wellness & Spa', icon: 'spa' },
    { id: 'romance', label: 'Romance', icon: 'heart' }
];

/**
 * Travel styles for user preferences
 */
export const TRAVEL_STYLES = [
    { id: 'solo', label: 'Solo Travel', icon: 'user' },
    { id: 'couple', label: 'Couple', icon: 'users' },
    { id: 'family', label: 'Family', icon: 'home' },
    { id: 'friends', label: 'Friend Group', icon: 'users-alt' },
    { id: 'business', label: 'Business', icon: 'briefcase' },
    { id: 'luxury', label: 'Luxury', icon: 'crown' },
    { id: 'budget', label: 'Budget', icon: 'wallet' },
    { id: 'backpacking', label: 'Backpacking', icon: 'backpack' }
];

/**
 * Budget levels for destination filtering
 */
export const BUDGET_LEVELS = [
    { id: 1, label: 'Budget', description: 'Less than $50 per day', icon: 'dollar-sign' },
    { id: 2, label: 'Economy', description: '$50-$100 per day', icon: 'dollar-sign' },
    { id: 3, label: 'Mid-range', description: '$100-$200 per day', icon: 'dollar-sign' },
    { id: 4, label: 'Luxury', description: '$200-$500 per day', icon: 'dollar-sign' },
    { id: 5, label: 'Ultra-luxury', description: '$500+ per day', icon: 'dollar-sign' }
];

/**
 * Seasons for travel preference selection
 */
export const SEASONS = [
    { id: 'spring', label: 'Spring', icon: 'flower' },
    { id: 'summer', label: 'Summer', icon: 'sun' },
    { id: 'fall', label: 'Fall', icon: 'leaf' },
    { id: 'winter', label: 'Winter', icon: 'snowflake' }
];

/**
 * Continents for destination filtering
 */
export const CONTINENTS = [
    { id: 'africa', label: 'Africa' },
    { id: 'asia', label: 'Asia' },
    { id: 'europe', label: 'Europe' },
    { id: 'north_america', label: 'North America' },
    { id: 'south_america', label: 'South America' },
    { id: 'oceania', label: 'Oceania' },
    { id: 'antarctica', label: 'Antarctica' }
];

/**
 * Climate types for destination filtering
 */
export const CLIMATE_TYPES = [
    { id: 'tropical', label: 'Tropical' },
    { id: 'dry', label: 'Dry/Arid' },
    { id: 'temperate', label: 'Temperate' },
    { id: 'continental', label: 'Continental' },
    { id: 'polar', label: 'Polar' }
];

/**
 * Activity types for destination filtering
 */
export const ACTIVITY_TYPES = [
    { id: 'beach', label: 'Beach', icon: 'umbrella-beach' },
    { id: 'hiking', label: 'Hiking', icon: 'hiking' },
    { id: 'skiing', label: 'Skiing', icon: 'skiing' },
    { id: 'snorkeling', label: 'Snorkeling', icon: 'water' },
    { id: 'sightseeing', label: 'Sightseeing', icon: 'camera' },
    { id: 'museums', label: 'Museums', icon: 'landmark' },
    { id: 'culinary', label: 'Culinary Tours', icon: 'utensils' },
    { id: 'shopping', label: 'Shopping', icon: 'shopping-bag' },
    { id: 'wildlife', label: 'Wildlife Viewing', icon: 'paw' },
    { id: 'festivals', label: 'Festivals', icon: 'music' }
];

/**
 * Duration options for trips
 */
export const TRIP_DURATIONS = [
    { id: 'weekend', label: 'Weekend Getaway', days: '1-3' },
    { id: 'short', label: 'Short Trip', days: '4-7' },
    { id: 'medium', label: 'Medium Trip', days: '8-14' },
    { id: 'long', label: 'Long Trip', days: '15-30' },
    { id: 'extended', label: 'Extended Trip', days: '30+' }
];

/**
 * Accommodation types for preference selection
 */
export const ACCOMMODATION_TYPES = [
    { id: 'hotel', label: 'Hotel', icon: 'building' },
    { id: 'hostel', label: 'Hostel', icon: 'bunk-bed' },
    { id: 'rental', label: 'Vacation Rental', icon: 'home' },
    { id: 'resort', label: 'Resort', icon: 'swimming-pool' },
    { id: 'camping', label: 'Camping', icon: 'campground' },
    { id: 'boutique', label: 'Boutique', icon: 'star' }
];

/**
 * Transportation types for preference selection
 */
export const TRANSPORTATION_TYPES = [
    { id: 'walk', label: 'Walking', icon: 'walking' },
    { id: 'car', label: 'Rental Car', icon: 'car' },
    { id: 'public', label: 'Public Transport', icon: 'bus' },
    { id: 'taxi', label: 'Taxi/Rideshare', icon: 'taxi' },
    { id: 'tour', label: 'Tour Bus', icon: 'bus-alt' },
    { id: 'bicycle', label: 'Bicycle', icon: 'bicycle' }
];

/**
 * Rating scale for reviews
 */
export const RATING_SCALE = [
    { value: 1, label: 'Poor' },
    { value: 2, label: 'Fair' },
    { value: 3, label: 'Good' },
    { value: 4, label: 'Very Good' },
    { value: 5, label: 'Excellent' }
];

/**
 * Sort options for destination listings
 */
export const SORT_OPTIONS = [
    { id: 'recommended', label: 'Recommended for You' },
    { id: 'popularity', label: 'Most Popular' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'price_low', label: 'Price: Low to High' },
    { id: 'price_high', label: 'Price: High to Low' },
    { id: 'name_asc', label: 'Name: A to Z' },
    { id: 'name_desc', label: 'Name: Z to A' }
];

/**
 * Filter options for destination listings
 */
export const FILTER_TYPES = [
    { id: 'interests', label: 'Interests', type: 'multi-select', options: INTEREST_CATEGORIES },
    { id: 'budget', label: 'Budget', type: 'range', min: 1, max: 5, options: BUDGET_LEVELS },
    { id: 'continent', label: 'Continent', type: 'multi-select', options: CONTINENTS },
    { id: 'climate', label: 'Climate', type: 'multi-select', options: CLIMATE_TYPES },
    { id: 'activities', label: 'Activities', type: 'multi-select', options: ACTIVITY_TYPES },
    { id: 'duration', label: 'Trip Duration', type: 'single-select', options: TRIP_DURATIONS },
    { id: 'season', label: 'Season', type: 'single-select', options: SEASONS }
];

/**
 * Map configuration for interactive maps
 */
export const MAP_CONFIG = {
    defaultCenter: { lat: 20, lng: 0 },
    defaultZoom: 2,
    minZoom: 2,
    maxZoom: 18,
    styles: {
        default: [],
        satellite: [],
        terrain: []
    }
};

/**
 * API endpoints for the application
 */
export const API_ENDPOINTS = {
    destinations: '/api/destinations',
    recommendations: '/api/recommendations',
    reviews: '/api/reviews',
    users: '/api/users',
    auth: '/api/auth',
    preferences: '/api/preferences',
    itineraries: '/api/itineraries'
};

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
    userPreferences: 'travel_preferences',
    userToken: 'user_token',
    recentDestinations: 'recent_destinations',
    savedItineraries: 'saved_itineraries',
    theme: 'app_theme'
};

/**
 * Available themes for the application
 */
export const THEMES = {
    light: 'light',
    dark: 'dark',
    system: 'system'
};

/**
 * Social sharing platforms
 */
export const SOCIAL_PLATFORMS = [
    { id: 'facebook', label: 'Facebook', icon: 'facebook' },
    { id: 'twitter', label: 'Twitter', icon: 'twitter' },
    { id: 'instagram', label: 'Instagram', icon: 'instagram' },
    { id: 'pinterest', label: 'Pinterest', icon: 'pinterest' },
    { id: 'email', label: 'Email', icon: 'envelope' }
];

/**
 * Form validation rules
 */
export const VALIDATION_RULES = {
    email: {
        required: 'Email is required',
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
        }
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
        }
    },
    username: {
        required: 'Username is required',
        minLength: {
            value: 3,
            message: 'Username must be at least 3 characters'
        }
    },
    reviewContent: {
        required: 'Review content is required',
        minLength: {
            value: 20,
            message: 'Review must be at least 20 characters'
        }
    }
};

/**
 * Response messages for user actions
 */
export const RESPONSE_MESSAGES = {
    saved: 'Successfully saved',
    error: 'An error occurred',
    notFound: 'Resource not found',
    unauthorized: 'Unauthorized access',
    loginSuccess: 'Login successful',
    registerSuccess: 'Registration successful',
    logoutSuccess: 'Logout successful',
    reviewAdded: 'Review added successfully',
    preferencesUpdated: 'Preferences updated successfully',
    itinerarySaved: 'Itinerary saved successfully',
    shareSuccess: 'Successfully shared'
};

/**
 * Events for analytics tracking
 */
export const ANALYTICS_EVENTS = {
    pageView: 'PAGE_VIEW',
    search: 'SEARCH',
    filterApplied: 'FILTER_APPLIED',
    destinationViewed: 'DESTINATION_VIEWED',
    recommendationClicked: 'RECOMMENDATION_CLICKED',
    itineraryCreated: 'ITINERARY_CREATED',
    reviewSubmitted: 'REVIEW_SUBMITTED',
    userRegistered: 'USER_REGISTERED',
    userLoggedIn: 'USER_LOGGED_IN',
    preferencesUpdated: 'PREFERENCES_UPDATED',
    comparingDestinations: 'COMPARING_DESTINATIONS',
    socialShare: 'SOCIAL_SHARE'
};