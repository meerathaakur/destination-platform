import { useState, useEffect } from 'react';
import { saveItinerary, getItineraries, deleteItinerary } from '../services/userService';

/**
 * Hook for managing travel itineraries
 * @param {string} userId - User ID for logged in users
 * @returns {Object} Itinerary state and management functions
 */
const useItinerary = (userId = null) => {
    const [itineraries, setItineraries] = useState([]);
    const [currentItinerary, setCurrentItinerary] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load saved itineraries if user is logged in
    useEffect(() => {
        const loadItineraries = async () => {
            if (!userId) return;

            setIsLoading(true);
            try {
                const savedItineraries = await getItineraries(userId);
                setItineraries(savedItineraries || []);
            } catch (err) {
                setError(err.message || 'Failed to load itineraries');
                console.error('Error loading itineraries:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadItineraries();
    }, [userId]);

    /**
     * Create a new blank itinerary
     * @param {string} name - Name of the itinerary
     * @param {Date} startDate - Start date of the trip
     * @param {Date} endDate - End date of the trip
     */
    const createItinerary = (name, startDate, endDate) => {
        const newItinerary = {
            id: `temp-${Date.now()}`,
            name,
            startDate,
            endDate,
            destinations: [],
            activities: [],
            notes: '',
            isTemp: true
        };

        setCurrentItinerary(newItinerary);
    };

    /**
     * Add a destination to the current itinerary
     * @param {Object} destination - Destination to add
     * @param {number} duration - Stay duration in days
     */
    const addDestination = (destination, duration = 1) => {
        if (!currentItinerary) {
            setError('No active itinerary. Create one first.');
            return;
        }

        // Check if destination is already in itinerary
        if (currentItinerary.destinations.some(d => d.id === destination.id)) {
            setError('This destination is already in your itinerary');
            return;
        }

        setCurrentItinerary(prev => ({
            ...prev,
            destinations: [
                ...prev.destinations,
                {
                    ...destination,
                    duration,
                    order: prev.destinations.length + 1
                }
            ]
        }));
    };

    /**
     * Add an activity to the current itinerary
     * @param {string} destinationId - ID of destination for this activity
     * @param {Object} activity - Activity details
     */
    const addActivity = (destinationId, activity) => {
        if (!currentItinerary) {
            setError('No active itinerary. Create one first.');
            return;
        }

        setCurrentItinerary(prev => ({
            ...prev,
            activities: [
                ...prev.activities,
                {
                    ...activity,
                    destinationId,
                    id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                }
            ]
        }));
    };

    /**
     * Remove a destination from the current itinerary
     * @param {string} destinationId - ID of destination to remove
     */
    const removeDestination = (destinationId) => {
        if (!currentItinerary) {
            setError('No active itinerary');
            return;
        }

        setCurrentItinerary(prev => ({
            ...prev,
            destinations: prev.destinations.filter(d => d.id !== destinationId),
            // Also remove activities associated with this destination
            activities: prev.activities.filter(a => a.destinationId !== destinationId)
        }));
    };

    /**
     * Remove an activity from the current itinerary
     * @param {string} activityId - ID of activity to remove
     */
    const removeActivity = (activityId) => {
        if (!currentItinerary) {
            setError('No active itinerary');
            return;
        }

        setCurrentItinerary(prev => ({
            ...prev,
            activities: prev.activities.filter(a => a.id !== activityId)
        }));
    };

    /**
     * Save the current itinerary to user profile
     */
    const saveCurrentItinerary = async () => {
        if (!userId) {
            setError('You must be logged in to save itineraries');
            return;
        }

        if (!currentItinerary) {
            setError('No active itinerary to save');
            return;
        }

        setIsLoading(true);
        try {
            // Create a clean version without temp flags
            const itineraryToSave = {
                ...currentItinerary,
                isTemp: false
            };

            const savedItinerary = await saveItinerary(userId, itineraryToSave);

            // Replace the temporary itinerary with the saved one
            setItineraries(prev => {
                const exists = prev.some(i => i.id === savedItinerary.id);
                if (exists) {
                    return prev.map(i => i.id === savedItinerary.id ? savedItinerary : i);
                } else {
                    return [...prev, savedItinerary];
                }
            });

            setCurrentItinerary(savedItinerary);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to save itinerary');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Load an existing itinerary as the current itinerary
     * @param {string} itineraryId - ID of itinerary to load
     */
    const loadItinerary = (itineraryId) => {
        const itinerary = itineraries.find(i => i.id === itineraryId);
        if (itinerary) {
            setCurrentItinerary(itinerary);
            setError(null);
        } else {
            setError('Itinerary not found');
        }
    };

    /**
     * Delete an itinerary
     * @param {string} itineraryId - ID of itinerary to delete
     */
    const removeItinerary = async (itineraryId) => {
        if (!userId) {
            setError('You must be logged in to delete itineraries');
            return;
        }

        setIsLoading(true);
        try {
            await deleteItinerary(userId, itineraryId);
            setItineraries(prev => prev.filter(i => i.id !== itineraryId));

            // If we deleted the current itinerary, clear it
            if (currentItinerary && currentItinerary.id === itineraryId) {
                setCurrentItinerary(null);
            }

            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to delete itinerary');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        itineraries,
        currentItinerary,
        isLoading,
        error,
        createItinerary,
        addDestination,
        addActivity,
        removeDestination,
        removeActivity,
        saveCurrentItinerary,
        loadItinerary,
        removeItinerary
    };
};

export default useItinerary;