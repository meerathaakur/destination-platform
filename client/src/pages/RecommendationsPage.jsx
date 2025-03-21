import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import RecommendationList from '../components/recommendations/RecommendationList';
import FilterOptions from '../components/recommendations/FilterOptions';
import { usePreferenceStore } from '../store/preferenceStore';
import { useRecommendationStore } from '../store/recommendationStore';
import LoadingSpinner from '../components/common/LoadingSpinner';
import "../styles/components/RecommendationPage.scss"

const RecommendationsPage = () => {
  const navigate = useNavigate();
  const preferences = usePreferenceStore((state) => state.preferences);
  const {
    recommendations,
    loading,
    error,
    fetchRecommendations,
  } = useRecommendationStore((state) => state);

  const [filters, setFilters] = useState({
    minRating: 0,
    budget: [],
    interests: [],
    seasons: [],
  });

  const [filteredRecommendations, setFilteredRecommendations] = useState([]);

  useEffect(() => {
    if (!preferences.interests || preferences.interests.length === 0) {
      navigate('/survey');
    } else {
      fetchRecommendations(preferences);
    }
  }, [preferences, fetchRecommendations,navigate]);

  // Filter application logic
  const applyFilters = useCallback(() => {
    let filtered = [...recommendations];

    if (filters.minRating > 0) {
      filtered = filtered.filter((item) => item.rating >= filters.minRating);
    }

    if (filters.budget.length > 0) {
      filtered = filtered.filter((item) => filters.budget.includes(item.budget));
    }

    if (filters.interests.length > 0) {
      filtered = filtered.filter((item) =>
        filters.interests.some((interest) => item.interests.includes(interest))
      );
    }

    if (filters.seasons.length > 0) {
      filtered = filtered.filter((item) => filters.seasons.includes(item.bestSeason));
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
      <div className="recommendations-loading">
        <LoadingSpinner />
        <h2>Finding your perfect destinations...</h2>
        <p>We're analyzing your preferences to create personalized recommendations</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recommendations-error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => fetchRecommendations(preferences)}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="recommendations-page">
      <header className="recommendations-header">
        <h1>Your Personalized Travel Recommendations</h1>
        <p>Based on your preferences, we think you'll love these destinations</p>
      </header>

      <div className="recommendations-content">
        <aside className="filter-sidebar">
          <FilterOptions
            filters={filters}
            onFilterChange={handleFilterChange}
            interestOptions={preferences.interests||[]}
          />
          <button className="compare-button" onClick={handleCompare}>
            Compare Selected Destinations
          </button>
        </aside>

        <main className="recommendations-main">
          <RecommendationList
            recommendations={filteredRecommendations.length > 0 ? filteredRecommendations : recommendations}
          />
        </main>
      </div>
    </div>
  );
};

export default RecommendationsPage;
