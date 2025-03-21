import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Default preferences object to avoid duplication
const defaultPreferences = {
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
};

export const usePreferenceStore = create(
  persist(
    (set) => ({
      preferences: defaultPreferences,

      // Update the entire preferences object
      setPreferences: (newPreferences) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            ...newPreferences, // Ensures partial updates work
          },
        })),

      // Handle deep updates (for nested structures like budget, travelStyle)
      updatePreference: (key, value) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            [key]: typeof value === 'object' && value !== null
              ? { ...state.preferences[key], ...value } // Merge nested updates
              : value,
          },
        })),

      // Reset to default preferences
      resetPreferences: () => set({ preferences: defaultPreferences }),
    }),
    {
      name: 'travel-preferences',
    }
  )
);
