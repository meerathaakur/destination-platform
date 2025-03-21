import { useState, useEffect } from 'react';
import { fetchRecommendations } from '../services/recommendationService';

/**
 * Hook for managing destination recommendations
 * @param {Object} userPreferences - The user's selected preferences
 * @param {Object} filters - Optional filters to apply to recommendations
 * @returns {Object} Recommendations state and management functions
 */
const useRecommendations = (userPreferences, filters = {}) => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [comparisonList, setComparisonList] = useState([]);

    // Fetch recommendations when preferences or filters change
    useEffect(() => {
        const getRecommendations = async () => {
            if (!userPreferences || Object.keys(userPreferences).length === 0) {
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const data = await fetchRecommendations(userPreferences, filters);
                setRecommendations(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch recommendations');
                console.error('Error fetching recommendations:', err);
            } finally {
                setIsLoading(false);
            }
        };

        getRecommendations();
    }, [userPreferences, filters]);

    /**
     * Add destination to comparison list
     * @param {Object} destination - Destination to add to comparison
     */
    const addToComparison = (destination) => {
        if (comparisonList.length >= 3) {
            setError('You can compare up to 3 destinations at a time');
            return;
        }

        if (comparisonList.some(item => item.id === destination.id)) {
            setError('This destination is already in your comparison list');
            return;
        }

        setComparisonList([...comparisonList, destination]);
        setError(null);
    };

    /**
     * Remove destination from comparison list
     * @param {string} destinationId - ID of destination to remove
     */
    const removeFromComparison = (destinationId) => {
        setComparisonList(comparisonList.filter(item => item.id !== destinationId));
    };

    /**
     * Clear all destinations from comparison list
     */
    const clearComparison = () => {
        setComparisonList([]);
    };

    /**
     * Filter recommendations by specific criteria
     * @param {Object} filterCriteria - Criteria to filter by
     */
    const filterRecommendations = async (filterCriteria) => {
        setIsLoading(true);
        try {
            const data = await fetchRecommendations(userPreferences, {
                ...filters,
                ...filterCriteria
            });
            setRecommendations(data);
        } catch (err) {
            setError(err.message || 'Failed to filter recommendations');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        recommendations,
        isLoading,
        error,
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        filterRecommendations
    };
};

export default useRecommendations;