import { useState, useEffect } from 'react';
import { saveUserPreferences, getUserPreferences } from '../services/userService';

/**
 * Hook for managing user travel preferences
 * @param {string} userId - Optional user ID for logged in users
 * @returns {Object} User preferences state and management functions
 */
const useUserPreferences = (userId = null) => {
    // Default preferences structure
    const defaultPreferences = {
        interests: [],
        budget: {
            min: 0,
            max: 5000
        },
        travelStyle: [],
        activities: [],
        accommodation: '',
        duration: {
            min: 1,
            max: 30
        },
        seasons: [],
        continents: [],
        cuisines: [],
        travelWithChildren: false,
        accessibility: false
    };

    const [preferences, setPreferences] = useState(defaultPreferences);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [surveyProgress, setSurveyProgress] = useState(0);
    const [surveyCompleted, setSurveyCompleted] = useState(false);

    // Load saved preferences if user is logged in
    useEffect(() => {
        const loadPreferences = async () => {
            if (!userId) return;

            setIsLoading(true);
            try {
                const savedPreferences = await getUserPreferences(userId);
                if (savedPreferences) {
                    setPreferences(savedPreferences);
                    // Calculate survey completion based on filled fields
                    const completedFields = Object.keys(savedPreferences).filter(
                        key => {
                            const value = savedPreferences[key];
                            if (Array.isArray(value)) return value.length > 0;
                            if (typeof value === 'object') return Object.keys(value).length > 0;
                            return value !== null && value !== undefined && value !== '';
                        }
                    );

                    const progress = Math.round((completedFields.length / Object.keys(defaultPreferences).length) * 100);
                    setSurveyProgress(progress);
                    setSurveyCompleted(progress === 100);
                }
            } catch (err) {
                setError(err.message || 'Failed to load preferences');
                console.error('Error loading preferences:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadPreferences();
    }, [userId]);

    /**
     * Update a specific preference field
     * @param {string} field - The preference field to update
     * @param {any} value - The new value
     */
    const updatePreference = (field, value) => {
        setPreferences(prev => {
            const updated = { ...prev, [field]: value };

            // Update progress
            const completedFields = Object.keys(updated).filter(
                key => {
                    const fieldValue = updated[key];
                    if (Array.isArray(fieldValue)) return fieldValue.length > 0;
                    if (typeof fieldValue === 'object') return Object.keys(fieldValue).length > 0;
                    return fieldValue !== null && fieldValue !== undefined && fieldValue !== '';
                }
            );

            const progress = Math.round((completedFields.length / Object.keys(defaultPreferences).length) * 100);
            setSurveyProgress(progress);
            setSurveyCompleted(progress === 100);

            return updated;
        });
    };

    /**
     * Save current preferences to user profile
     */
    const savePreferences = async () => {
        if (!userId) {
            setError('You must be logged in to save preferences');
            return;
        }

        setIsLoading(true);
        try {
            await saveUserPreferences(userId, preferences);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to save preferences');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Reset preferences to default values
     */
    const resetPreferences = () => {
        setPreferences(defaultPreferences);
        setSurveyProgress(0);
        setSurveyCompleted(false);
    };

    return {
        preferences,
        isLoading,
        error,
        surveyProgress,
        surveyCompleted,
        updatePreference,
        savePreferences,
        resetPreferences
    };
};

export default useUserPreferences;