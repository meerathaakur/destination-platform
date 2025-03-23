import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const usePreferenceStore = create(
    persist(
        immer((set) => ({
            preferences: {
                interests: [],
                activities: [],
                budget: {
                    accommodation: 'medium',
                    food: 'medium',
                    activities: 'medium',
                    overall: 'medium',
                },
                travelStyle: {
                    pace: 'moderate',
                    accommodation: 'hotel',
                    tripLength: '7-14 days',
                    travelWith: 'partner',
                },
                seasonPreference: 'summer',
                mustAvoid: [],
            },

            setPreferences: (newPreferences) => set({ preferences: newPreferences }),

            updatePreference: (key, value) =>
                set((state) => {
                    if (typeof key === 'string' && key.includes('.')) {
                        const [mainKey, subKey] = key.split('.');
                        if (state.preferences[mainKey]) {
                            state.preferences[mainKey][subKey] = value;
                        }
                    } else {
                        state.preferences[key] = value;
                    }
                }),

            resetPreferences: () =>
                set({
                    preferences: {
                        interests: [],
                        activities: [],
                        budget: {
                            accommodation: 'medium',
                            food: 'medium',
                            activities: 'medium',
                            overall: 'medium',
                        },
                        travelStyle: {
                            pace: 'moderate',
                            accommodation: 'hotel',
                            tripLength: '7-14 days',
                            travelWith: 'partner',
                        },
                        seasonPreference: 'summer',
                        mustAvoid: [],
                    },
                }),

            clearPreferences: (category) =>
                set((state) => {
                    if (state.preferences[category]) {
                        state.preferences[category] = Array.isArray(state.preferences[category]) ? [] : {};
                    }
                }),
        })),
        {
            name: 'travel-preferences',
            getStorage: () => localStorage, // Allows for flexibility in storage type
        }
    )
);
