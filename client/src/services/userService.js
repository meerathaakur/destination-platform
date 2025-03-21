// import api from './api';

export const addToFavorites = async (destinationId) => {
    if (!destinationId) {
        return Promise.reject(new Error('Invalid destination ID'));
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'Destination added to favorites'
            });
        }, 500);
    });
};

export const checkIfFavorite = async (destinationId) => {
    if (!destinationId) {
        return Promise.reject(new Error('Invalid destination ID'));
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                isFavorite: destinationId % 2 === 0
            });
        }, 500);
    });
};

export const getUserItinerary = async (userId) => {
    // Simulating an API call or fetching data
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                itinerary: [] // Replace with actual data logic
            });
        }, 1000);
    });
};

export const saveUserItinerary = async (itinerary) => {
    try {
        if (!itinerary || !Array.isArray(itinerary)) {
            throw new Error('Invalid itinerary data');
        }
        // Simulate saving the itinerary (e.g., saving to a database or local storage)
        console.log('Saving itinerary:', itinerary);
        return {
            success: true,
            message: 'Itinerary saved successfully!'
        };
    } catch (error) {
        console.error('Error saving itinerary:', error);
        throw error;
    }
};