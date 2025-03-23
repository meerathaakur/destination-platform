import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import RecommendationList from '../RecommendationList.jsx';
import FilterOptions from '../FilterOptions.jsx';
import { usePreferenceStore } from '../store/usePreferenceStore.js';
import { useRecommendationStore } from '../store/recommendationStore.js';
import LoadingSpinner from '../LoadingSpinner.jsx';

const RecommendationsPage = () => {
    const navigate = useNavigate();
    const preferences = usePreferenceStore((state) => state.preferences);
    const { recommendations, loading, error, fetchRecommendations } = useRecommendationStore((state) => state);

    const [filters, setFilters] = useState({
        minRating: 0,
        budget: [],
        interests: [],
        seasons: []
    });

    const [filteredRecommendations, setFilteredRecommendations] = useState([]);

    useEffect(() => {
        if (!preferences?.interests?.length) {
            navigate('/survey');
            return;
        }
        fetchRecommendations(preferences);
    }, [preferences, fetchRecommendations, navigate]);

    const applyFilters = useCallback(() => {
        let filtered = [...recommendations];

        if (filters.minRating > 0) {
            filtered = filtered.filter(item => item.rating >= filters.minRating);
        }

        if (filters.budget.length > 0) {
            filtered = filtered.filter(item => filters.budget.includes(item.budget));
        }

        if (filters.interests.length > 0) {
            filtered = filtered.filter(item =>
                filters.interests.some(interest => item.interests.includes(interest))
            );
        }

        if (filters.seasons.length > 0) {
            filtered = filtered.filter(item => filters.seasons.includes(item.bestSeason));
        }

        setFilteredRecommendations(filtered);
    }, [filters, recommendations]);

    useEffect(() => {
        applyFilters();
    }, [recommendations, filters, applyFilters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleCompare = () => {
        navigate('/compare');
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
                <LoadingSpinner />
                <h2 className="text-2xl font-semibold mt-4">Finding your perfect destinations...</h2>
                <p className="text-gray-500 mt-2">We're analyzing your preferences to create personalized recommendations</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
                <h2 className="text-2xl font-semibold text-red-600">Oops! Something went wrong</h2>
                <p className="text-gray-500 mt-2">{error}</p>
                <button
                    onClick={() => fetchRecommendations(preferences)}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Your Personalized Travel Recommendations</h1>
                <p className="text-gray-600 mt-2">Based on your preferences, we think you'll love these destinations</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-6">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-6">
                    <FilterOptions
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        interestOptions={preferences.interests}
                    />
                    <button
                        className="w-full mt-4 py-2 px-4 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition"
                        onClick={handleCompare}
                    >
                        Compare Selected Destinations
                    </button>
                </aside>

                {/* Main Recommendations Section */}
                <main className="w-full md:w-2/3">
                    {filteredRecommendations.length > 0 ? (
                        <RecommendationList recommendations={filteredRecommendations} />
                    ) : (
                        <p className="text-gray-500 text-center">No recommendations match your filters. Try adjusting them.</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default RecommendationsPage;
