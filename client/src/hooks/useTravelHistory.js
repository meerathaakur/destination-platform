import { useState, useEffect } from 'react';
import { getTravelHistory, addTravelHistory, removeTravelHistory } from '../services/userService';

/**
 * Hook for managing user's travel history
 * @param {string} userId - User ID for logged in users
 * @returns {Object} Travel history state and management functions
 */
const useTravelHistory = (userId = null) => {
    const [travelHistory, setTravelHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load travel history if user is logged in
    useEffect(() => {
        const loadTravelHistory = async () => {
            if (!userId) return;

            setIsLoading(true);
            try {
                const history = await getTravelHistory(userId);
                setTravelHistory(history || []);
            } catch (err) {
                setError(err.message || 'Failed to load travel history');
                console.error('Error loading travel history:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadTravelHistory();
    }, [userId]);

    /**
     * Add a destination to travel history
     * @param {Object} destination - Destination details
     * @param {Date} visitDate - When the destination was visited
     * @param {number} rating - User rating (1-5)
     * @param {string} notes - Optional user notes about the trip
     */
    const addToHistory = async (destination, visitDate, rating, notes = '') => {
        if (!userId) {
            setError('You must be logged in to update travel history');
            return;
        }

        const newEntry = {
            destinationId: destination.id,
            destinationName: destination.name,
            country: destination.country,
            visitDate,
            rating,
            notes,
            timestamp: new Date().toISOString()
        };

        setIsLoading(true);
        try {
            const updatedEntry = await addTravelHistory(userId, newEntry);
            setTravelHistory(prev => [...prev, updatedEntry]);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to add to travel history');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Remove a destination from travel history
     * @param {string} entryId - ID of the history entry to remove
     */
    const removeFromHistory = async (entryId) => {
        if (!userId) {
            setError('You must be logged in to update travel history');
            return;
        }

        setIsLoading(true);
        try {
            await removeTravelHistory(userId, entryId);
            setTravelHistory(prev => prev.filter(entry => entry.id !== entryId));
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to remove from travel history');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Check if a destination is in the user's travel history
     * @param {string} destinationId - Destination ID to check
     * @returns {boolean} True if destination is in history
     */
    const hasVisited = (destinationId) => {
        return travelHistory.some(entry => entry.destinationId === destinationId);
    };

    /**
     * Get user rating for a visited destination
     * @param {string} destinationId - Destination ID to check
     * @returns {number|null} User rating or null if not visited
     */
    const getDestinationRating = (destinationId) => {
        const entry = travelHistory.find(entry => entry.destinationId === destinationId);
        return entry ? entry.rating : null;
    };

    return {
        travelHistory,
        isLoading,
        error,
        addToHistory,
        removeFromHistory,
        hasVisited,
        getDestinationRating
    };
};

export default useTravelHistory;