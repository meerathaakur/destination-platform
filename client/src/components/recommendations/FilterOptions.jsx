import { useState, useEffect } from 'react';
import "../../styles/components/FilterOptions.scss"
const INTEREST_OPTIONS = [
    { id: 'adventure', label: 'Adventure', icon: '🧗‍♂️' },
    { id: 'beach', label: 'Beaches', icon: '🏖️' },
    { id: 'city', label: 'City', icon: '🏙️' },
    { id: 'culture', label: 'Culture', icon: '🏛️' },
    { id: 'food', label: 'Food', icon: '🍴' },
    { id: 'nature', label: 'Nature', icon: '🏞️' },
    { id: 'relaxation', label: 'Relaxation', icon: '🧘‍♀️' },
    { id: 'nightlife', label: 'Nightlife', icon: '🍸' },
];

const BUDGET_OPTIONS = [
    { id: 'budget', label: 'Budget' },
    { id: 'medium', label: 'Mid-range' },
    { id: 'luxury', label: 'Luxury' },
];

const SEASON_OPTIONS = [
    { id: 'spring', label: 'Spring', icon: '🌸' },
    { id: 'summer', label: 'Summer', icon: '☀️' },
    { id: 'fall', label: 'Fall/Autumn', icon: '🍂' },
    { id: 'winter', label: 'Winter', icon: '❄️' },
    { id: 'any', label: 'Any Season', icon: '🌍' },
];

const FilterOptions = ({ filters, onFilterChange, interestOptions = [] }) => {
    const [localFilters, setLocalFilters] = useState({
        minRating: filters.minRating || 0,
        budget: filters.budget || [],
        interests: filters.interests || [],
        seasons: filters.seasons || [],
    });

    const [expanded, setExpanded] = useState({
        rating: true,
        budget: true,
        interests: true,
        seasons: true,
    });

    // Update filters in parent component with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            onFilterChange(localFilters);
        }, 300);
        return () => clearTimeout(timer);
    }, [localFilters, onFilterChange]);

    const handleRatingChange = (value) => {
        setLocalFilters((prevFilters) => ({
            ...prevFilters,
            minRating: value,
        }));
    };

    const toggleSelection = (key, id) => {
        setLocalFilters((prevFilters) => ({
            ...prevFilters,
            [key]: prevFilters[key].includes(id)
                ? prevFilters[key].filter((item) => item !== id)
                : [...prevFilters[key], id],
        }));
    };

    const toggleSection = (section) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [section]: !prevExpanded[section],
        }));
    };

    const clearAllFilters = () => {
        setLocalFilters({
            minRating: 0,
            budget: [],
            interests: [],
            seasons: [],
        });
    };

    return (
        <div className="filter-options">
            <div className="filter-header">
                <h3>Filter Options</h3>
                <button className="clear-filters" onClick={clearAllFilters}>
                    Clear All
                </button>
            </div>

            {/* Rating Filter */}
            <div className="filter-section">
                <div className="section-header" onClick={() => toggleSection('rating')}>
                    <h4>Minimum Rating</h4>
                    <span className="toggle-icon">{expanded.rating ? '−' : '+'}</span>
                </div>
                {expanded.rating && (
                    <div className="section-content">
                        <input
                            type="range"
                            min="0"
                            max="5"
                            step="0.5"
                            value={localFilters.minRating}
                            onChange={(e) => handleRatingChange(parseFloat(e.target.value))}
                        />
                        <div className="slider-labels">
                            <span>Any</span>
                            <span>{localFilters.minRating > 0 ? `${localFilters.minRating}★+` : 'Any'}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Budget Filter */}
            <div className="filter-section">
                <div className="section-header" onClick={() => toggleSection('budget')}>
                    <h4>Budget Level</h4>
                    <span className="toggle-icon">{expanded.budget ? '−' : '+'}</span>
                </div>
                {expanded.budget && (
                    <div className="section-content">
                        {BUDGET_OPTIONS.map((option) => (
                            <label key={option.id} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={localFilters.budget.includes(option.id)}
                                    onChange={() => toggleSelection('budget', option.id)}
                                />
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Interest Filter */}
            <div className="filter-section">
                <div className="section-header" onClick={() => toggleSection('interests')}>
                    <h4>Interests</h4>
                    <span className="toggle-icon">{expanded.interests ? '−' : '+'}</span>
                </div>
                {expanded.interests && (
                    <div className="section-content interests-grid">
                        {INTEREST_OPTIONS.filter((interest) =>
                            Array.isArray(interestOptions) && interestOptions.includes(interest.id)
                        ).map((interest) => (
                            <div
                                key={interest.id}
                                className={`interest-pill ${localFilters?.interests?.includes(interest.id) ? 'selected' : ''}`}
                                onClick={() => toggleSelection('interests', interest.id)}
                            >
                                <span className="interest-icon">{interest.icon}</span>
                                <span>{interest.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Season Filter */}
            <div className="filter-section">
                <div className="section-header" onClick={() => toggleSection('seasons')}>
                    <h4>Season</h4>
                    <span className="toggle-icon">{expanded.seasons ? '−' : '+'}</span>
                </div>
                {expanded.seasons && (
                    <div className="section-content seasons-grid">
                        {SEASON_OPTIONS.map((season) => (
                            <div
                                key={season.id}
                                className={`season-pill ${localFilters.seasons.includes(season.id) ? 'selected' : ''}`}
                                onClick={() => toggleSelection('seasons', season.id)}
                            >
                                <span className="season-icon">{season.icon}</span>
                                <span>{season.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterOptions;
