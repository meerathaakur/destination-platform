import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
                    const mockData = generateMockRecommendations(preferences);
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    set({ recommendations: mockData, loading: false });
                    return mockData;
                } catch (error) {
                    set({ error: `Failed to fetch recommendations ${error}`, loading: false });
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
                return { comparisonList: [...state.comparisonList, destinationId] };
            }),

            removeFromComparison: (destinationId) => set((state) => ({
                comparisonList: state.comparisonList.filter(id => id !== destinationId),
            })),

            clearComparison: () => set({ comparisonList: [] }),
        }),
        { name: 'travel-recommendations' }
    )
);

const generateMockRecommendations = (preferences) => {
    const destinations = [
        { id: '1', name: 'Bali, Indonesia', description: 'Tropical paradise...', image: '/images/destinations/bali.jpg', rating: 4.8, reviewCount: 1245, interests: ['beach', 'culture', 'nature', 'adventure'], activities: ['hiking', 'swimming', 'sightseeing', 'localFood'], budget: 'medium', bestSeason: 'summer', travelDuration: '7-14 days', goodFor: ['partner', 'solo', 'friends'], attractions: ['Sacred Monkey Forest', 'Ubud'], matchScore: 95 },
        { id: '2', name: 'Kyoto, Japan', description: 'Ancient Japanese city...', image: '/images/destinations/kyoto.jpg', rating: 4.9, reviewCount: 982, interests: ['culture', 'city', 'food', 'arts'], activities: ['sightseeing', 'museums', 'localFood', 'photography'], budget: 'medium', bestSeason: 'spring', travelDuration: '4-6 days', goodFor: ['partner', 'solo', 'family'], attractions: ['Fushimi Inari Shrine', 'Arashiyama'], matchScore: 90 },
        { id: '3', name: 'Barcelona, Spain', description: 'Vibrant city with...', image: '/images/destinations/barcelona.jpg', rating: 4.7, reviewCount: 1578, interests: ['city', 'culture', 'beach', 'food'], activities: ['sightseeing', 'museums', 'swimming', 'nightlife'], budget: 'medium', bestSeason: 'summer', travelDuration: '4-6 days', goodFor: ['partner', 'friends', 'solo'], attractions: ['Sagrada Familia', 'Park Güell'], matchScore: 87 },
    ];

    return destinations
        .map(destination => {
            let score = 0;
            preferences.interests.forEach(interest => {
                if (destination.interests.includes(interest)) score += 10;
            });
            preferences.activities.forEach(activity => {
                if (destination.activities.includes(activity)) score += 8;
            });
            if (destination.budget === preferences.budget?.overall) score += 15;
            if (destination.bestSeason === preferences.seasonPreference) score += 10;
            if (destination.goodFor.includes(preferences.travelStyle?.travelWith)) score += 10;
            if (destination.travelDuration === preferences.travelStyle?.tripLength) score += 10;
            return { ...destination, matchScore: Math.min(score, 100) };
        })
        .sort((a, b) => b.matchScore - a.matchScore);
};