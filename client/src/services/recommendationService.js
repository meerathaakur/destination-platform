// Mock data for development
const mockDestinations = [
    {
        id: 1,
        name: 'Bali, Indonesia',
        description: 'Known for its gorgeous beaches, lush rice terraces, and vibrant culture, Bali offers a perfect blend of relaxation and adventure.',
        imageUrl: '/images/destinations/bali.jpg',
        budget: 'medium',
        climate: 'tropical',
        interests: ['beach', 'culture', 'nature'],
        travelStyle: ['solo', 'couple', 'family'],
        activities: ['surfing', 'temple visits', 'hiking'],
        rating: 4.7,
        reviews: 1245,
        coordinates: [-8.4095, 115.1889]
    },
    {
        id: 2,
        name: 'Kyoto, Japan',
        description: 'Experience traditional Japanese culture with stunning temples, beautiful gardens, and traditional tea houses.',
        imageUrl: '/images/destinations/kyoto.jpg',
        budget: 'high',
        climate: 'temperate',
        interests: ['culture', 'history', 'food'],
        travelStyle: ['solo', 'couple'],
        activities: ['temple visits', 'tea ceremonies', 'geisha districts'],
        rating: 4.8,
        reviews: 987,
        coordinates: [35.0116, 135.7681]
    },
    {
        id: 3,
        name: 'Barcelona, Spain',
        description: 'A vibrant city with stunning architecture, beautiful beaches, and delicious food.',
        imageUrl: '/images/destinations/barcelona.jpg',
        budget: 'medium',
        climate: 'mediterranean',
        interests: ['architecture', 'beach', 'food', 'nightlife'],
        travelStyle: ['solo', 'couple', 'group'],
        activities: ['sightseeing', 'beach relaxation', 'tapas tours'],
        rating: 4.6,
        reviews: 1543,
        coordinates: [41.3851, 2.1734]
    }
];

// Existing functions
export const getRecommendations = async (preferences) => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => {
                let filteredDestinations = [...mockDestinations];

                if (preferences.interests?.length) {
                    filteredDestinations = filteredDestinations.filter(dest =>
                        dest.interests.some(interest => preferences.interests.includes(interest))
                    );
                }

                if (preferences.travelStyle?.length) {
                    filteredDestinations = filteredDestinations.filter(dest =>
                        dest.travelStyle.some(style => preferences.travelStyle.includes(style))
                    );
                }

                if (preferences.budget) {
                    filteredDestinations = filteredDestinations.filter(dest =>
                        dest.budget.toLowerCase() === preferences.budget.toLowerCase()
                    );
                }

                if (preferences.climate) {
                    filteredDestinations = filteredDestinations.filter(dest =>
                        dest.climate.toLowerCase() === preferences.climate.toLowerCase()
                    );
                }

                resolve(filteredDestinations);
            }, 1000);
        });
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
};

// New getDestinationDetails function
export const getDestinationDetails = async (id) => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => {
                const destination = mockDestinations.find(dest => dest.id === parseInt(id, 10));
                resolve(destination || null);
            }, 500);
        });
    } catch (error) {
        console.error('Error fetching destination details:', error);
        throw error;
    }
};

export const submitReview = async (destinationId, review) => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: `Review submitted successfully ${review} `
                });
            }, 500);
        });
    } catch (error) {
        console.error('Error submitting review:', error);
        throw error;
    }
};

export const getDestinationById = async (id) => {
    // Simulate fetching the destination details by ID
    const destination = mockDestinations.find(dest => dest.id === id);
    return destination || null;
};