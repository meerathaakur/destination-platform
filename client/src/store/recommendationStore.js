import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Helper function moved above store definition
const generateMockRecommendations = (preferences = {}) => {
    if (!preferences || typeof preferences !== 'object') {
        return [];
    }

    const destinations = [
        {
            id: '1',
            name: 'Bali, Indonesia',
            description: 'Tropical paradise with beaches, culture, and adventure.',
            image: '/images/destinations/bali.jpg',
            rating: 4.8,
            reviewCount: 1245,
            interests: ['beach', 'culture', 'nature', 'adventure'],
            activities: ['hiking', 'swimming', 'sightseeing', 'localFood'],
            budget: 'medium',
            bestSeason: 'summer',
            travelDuration: '7-14 days',
            goodFor: ['partner', 'solo', 'friends'],
            attractions: ['Sacred Monkey Forest', 'Ubud', 'Uluwatu Temple', 'Kuta Beach'],
            matchScore: 95
        },
        {
            id: '2',
            name: 'Kyoto, Japan',
            description: 'Ancient Japanese city with temples, gardens, and traditions.',
            image: '/images/destinations/kyoto.jpg',
            rating: 4.9,
            reviewCount: 982,
            interests: ['culture', 'city', 'food', 'arts'],
            activities: ['sightseeing', 'museums', 'localFood', 'photography'],
            budget: 'medium',
            bestSeason: 'spring',
            travelDuration: '4-6 days',
            goodFor: ['partner', 'solo', 'family'],
            attractions: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Kiyomizu-dera Temple', 'Gion District'],
            matchScore: 90
        }
    ];

    // Ensure preferences have default values
    const {
        interests = [],
        activities = [],
        budget = {},
        seasonPreference = '',
        travelStyle = {}
    } = preferences;

    return destinations
        .map(destination => {
            let score = 0;

            // Match interests
            if (Array.isArray(interests)) {
                interests.forEach(interest => {
                    if (destination.interests.includes(interest)) {
                        score += 10;
                    }
                });
            }

            // Match activities
            if (Array.isArray(activities)) {
                activities.forEach(activity => {
                    if (destination.activities.includes(activity)) {
                        score += 8;
                    }
                });
            }

            // Match budget
            if (budget.overall && destination.budget === budget.overall) {
                score += 15;
            }

            // Match season
            if (destination.bestSeason === seasonPreference) {
                score += 10;
            }

            // Match travel style
            if (travelStyle.travelWith && destination.goodFor.includes(travelStyle.travelWith)) {
                score += 10;
            }

            // Travel duration match
            if (travelStyle.tripLength && destination.travelDuration === travelStyle.tripLength) {
                score += 10;
            }

            // Calculate percentage match (simplified)
            const matchPercentage = Math.min(Math.floor(score), 100);

            return {
                ...destination,
                matchScore: matchPercentage
            };
        })
        .sort((a, b) => b.matchScore - a.matchScore);
};

export const useRecommendationStore = create(
    persist(
        (set, get) => ({
            recommendations: [],
            loading: false,
            error: null,
            favorites: [],
            comparisonList: [],

            setRecommendations: (recommendations) => set({
                recommendations,
                loading: false,
                error: null,
            }),

            fetchRecommendations: async (preferences) => {
                set({ loading: true, error: null });

                try {
                    // Simulate API delay
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    const mockData = generateMockRecommendations(preferences);

                    set({
                        recommendations: mockData,
                        loading: false,
                    });

                    return mockData;
                } catch (error) {
                    set({
                        error: `Failed to fetch recommendations: ${error.message}`,
                        loading: false,
                    });
                    return [];
                }
            },

            toggleFavorite: (destinationId) => set((state) => ({
                favorites: state.favorites.includes(destinationId)
                    ? state.favorites.filter(id => id !== destinationId)
                    : [...state.favorites, destinationId],
            })),

            addToComparison: (destinationId) => set((state) => {
                if (state.comparisonList.includes(destinationId) || state.comparisonList.length >= 3) {
                    return state;
                }

                return {
                    comparisonList: [...state.comparisonList, destinationId],
                };
            }),

            removeFromComparison: (destinationId) => set((state) => ({
                comparisonList: state.comparisonList.filter(id => id !== destinationId),
            })),

            clearComparison: () => set({ comparisonList: [] }),
        }),
        {
            name: 'travel-recommendations',
        }
    )
);
