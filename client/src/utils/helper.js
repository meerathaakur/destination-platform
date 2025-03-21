/**
 * Helper functions for the destination recommendation platform
 */

/**
 * Format currency values with appropriate symbol and decimal places
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
    const currencyFormatters = {
        USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
        EUR: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }),
        GBP: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' }),
        JPY: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'JPY', minimumFractionDigits: 0 }),
        AUD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'AUD' }),
    };

    return currencyFormatters[currency]
        ? currencyFormatters[currency].format(amount)
        : new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
};

/**
 * Calculate the average rating from an array of review objects
 * @param {Array} reviews - Array of review objects with rating property
 * @returns {number} Average rating or 0 if no reviews
 */
export const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
};

/**
 * Format a date object to a readable string format
 * @param {Date} date - Date object to format
 * @param {string} format - Format type ('short', 'long', 'relative')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
    const now = new Date();
    const targetDate = new Date(date);

    if (format === 'relative') {
        const diffInDays = Math.floor((now - targetDate) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return 'Yesterday';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
        if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
        return `${Math.floor(diffInDays / 365)} years ago`;
    }

    const options = format === 'long'
        ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        : { year: 'numeric', month: 'short', day: 'numeric' };

    return targetDate.toLocaleDateString('en-US', options);
};

/**
 * Get distance between two coordinates in kilometers
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

/**
 * Create a URL-friendly slug from a string
 * @param {string} text - Text to convert to slug
 * @returns {string} URL-friendly slug
 */
export const createSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
};

/**
 * Group an array of objects by a specific property
 * @param {Array} array - Array of objects to group
 * @param {string} key - Property to group by
 * @returns {Object} Grouped objects
 */
export const groupBy = (array, key) => {
    return array.reduce((result, item) => {
        (result[item[key]] = result[item[key]] || []).push(item);
        return result;
    }, {});
};

/**
 * Sort destinations by a given property
 * @param {Array} destinations - Array of destination objects
 * @param {string} property - Property to sort by
 * @param {boolean} ascending - Sort order (true for ascending)
 * @returns {Array} Sorted destinations array
 */
export const sortDestinations = (destinations, property, ascending = true) => {
    return [...destinations].sort((a, b) => {
        if (a[property] < b[property]) return ascending ? -1 : 1;
        if (a[property] > b[property]) return ascending ? 1 : -1;
        return 0;
    });
};

/**
 * Filter destinations based on multiple criteria
 * @param {Array} destinations - Array of destination objects
 * @param {Object} filters - Object containing filter criteria
 * @returns {Array} Filtered destinations array
 */
export const filterDestinations = (destinations, filters) => {
    return destinations.filter(destination => {
        // Check if destination matches all filters
        for (const [key, value] of Object.entries(filters)) {
            // Skip empty filters
            if (value === null || value === undefined || value === '') continue;

            // Handle array values (e.g., activities, interests)
            if (Array.isArray(value) && value.length > 0) {
                if (!destination[key] || !value.some(v => destination[key].includes(v))) {
                    return false;
                }
                continue;
            }

            // Handle range values (e.g., budget)
            if (typeof value === 'object' && value.min !== undefined && value.max !== undefined) {
                if (destination[key] < value.min || destination[key] > value.max) {
                    return false;
                }
                continue;
            }

            // Handle simple equality
            if (destination[key] !== value) {
                return false;
            }
        }
        return true;
    });
};

/**
 * Calculate similarity score between user preferences and destination
 * @param {Object} userPreferences - User preference object
 * @param {Object} destination - Destination object
 * @returns {number} Similarity score (0-100)
 */
export const calculateSimilarityScore = (userPreferences, destination) => {
    let score = 0;
    let totalWeight = 0;

    // Compare interests (highest weight)
    const interestWeight = 40;
    if (userPreferences.interests && destination.categories) {
        const matchingInterests = userPreferences.interests.filter(interest =>
            destination.categories.includes(interest)
        );
        score += (matchingInterests.length / userPreferences.interests.length) * interestWeight;
        totalWeight += interestWeight;
    }

    // Compare budget (high weight)
    const budgetWeight = 30;
    if (userPreferences.budget && destination.priceLevel) {
        const budgetMatch = 1 - Math.abs(userPreferences.budget - destination.priceLevel) / 4;
        score += budgetMatch * budgetWeight;
        totalWeight += budgetWeight;
    }

    // Compare travel style (medium weight)
    const styleWeight = 20;
    if (userPreferences.travelStyle && destination.suitableFor) {
        const matchingStyles = userPreferences.travelStyle.filter(style =>
            destination.suitableFor.includes(style)
        );
        score += (matchingStyles.length / userPreferences.travelStyle.length) * styleWeight;
        totalWeight += styleWeight;
    }

    // Compare season (low weight)
    const seasonWeight = 10;
    if (userPreferences.preferredSeason && destination.bestSeasons) {
        const seasonMatch = destination.bestSeasons.includes(userPreferences.preferredSeason) ? 1 : 0;
        score += seasonMatch * seasonWeight;
        totalWeight += seasonWeight;
    }

    // Calculate final percentage score
    return totalWeight > 0 ? Math.round((score / totalWeight) * 100) : 0;
};

/**
 * Truncate text to a specified length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100) => {
    if (!text || text.length <= length) return text;
    return text.slice(0, length) + '...';
};

/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
export const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};


export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
