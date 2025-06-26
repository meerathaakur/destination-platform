import { useState, useEffect } from "react";

const INTEREST_OPTIONS = [
    { id: "adventure", label: "Adventure", icon: "🧗‍♂️" },
    { id: "beach", label: "Beaches", icon: "🏖️" },
    { id: "city", label: "City", icon: "🏙️" },
    { id: "culture", label: "Culture", icon: "🏛️" },
    { id: "food", label: "Food", icon: "🍴" },
    { id: "nature", label: "Nature", icon: "🏞️" },
    { id: "relaxation", label: "Relaxation", icon: "🧘‍♀️" },
    { id: "nightlife", label: "Nightlife", icon: "🍸" },
];

const BUDGET_OPTIONS = [
    { id: "budget", label: "Budget" },
    { id: "medium", label: "Mid-range" },
    { id: "luxury", label: "Luxury" },
];

const SEASON_OPTIONS = [
    { id: "spring", label: "Spring", icon: "🌸" },
    { id: "summer", label: "Summer", icon: "☀️" },
    { id: "fall", label: "Fall/Autumn", icon: "🍂" },
    { id: "winter", label: "Winter", icon: "❄️" },
    { id: "any", label: "Any Season", icon: "🌍" },
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

    const validInterestOptions = Array.isArray(interestOptions) ? interestOptions : [];
    const availableInterests = INTEREST_OPTIONS.filter(({ id }) =>
        validInterestOptions.includes(id)
    );

    useEffect(() => {
        const timer = setTimeout(() => onFilterChange(localFilters), 300);
        return () => clearTimeout(timer);
    }, [localFilters, onFilterChange]);

    const toggleFilter = (category, id) => {
        setLocalFilters((prev) => ({
            ...prev,
            [category]: prev[category].includes(id)
                ? prev[category].filter((item) => item !== id)
                : [...prev[category], id],
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
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md mx-auto transition-all duration-300 border border-gray-200">
            <div className="flex justify-between items-center border-b pb-3 mb-5">
                <h3 className="text-xl font-bold text-gray-800">Filter Options</h3>
                <button
                    className="text-sm text-red-500 hover:text-red-600 underline transition"
                    onClick={clearAllFilters}
                >
                    Clear All
                </button>
            </div>

            <FilterSection
                title="Minimum Rating"
                isOpen={expanded.rating}
                toggle={() => setExpanded((prev) => ({ ...prev, rating: !prev.rating }))}
            >
                <div className="flex flex-col gap-2">
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.5"
                        value={localFilters.minRating}
                        onChange={(e) =>
                            setLocalFilters((prev) => ({
                                ...prev,
                                minRating: parseFloat(e.target.value),
                            }))
                        }
                        className="w-full cursor-pointer accent-blue-600"
                    />
                    <span className="text-sm text-gray-600">
                        {localFilters.minRating > 0 ? `${localFilters.minRating}★+` : "Any"}
                    </span>
                </div>
            </FilterSection>

            <FilterSection
                title="Budget Level"
                isOpen={expanded.budget}
                toggle={() => setExpanded((prev) => ({ ...prev, budget: !prev.budget }))}
            >
                <CheckboxGroup
                    options={BUDGET_OPTIONS}
                    selected={localFilters.budget}
                    toggle={toggleFilter.bind(null, "budget")}
                />
            </FilterSection>

            <FilterSection
                title="Interests"
                isOpen={expanded.interests}
                toggle={() => setExpanded((prev) => ({ ...prev, interests: !prev.interests }))}
            >
                <PillGroup
                    options={availableInterests}
                    selected={localFilters.interests}
                    toggle={toggleFilter.bind(null, "interests")}
                />
            </FilterSection>

            <FilterSection
                title="Season"
                isOpen={expanded.seasons}
                toggle={() => setExpanded((prev) => ({ ...prev, seasons: !prev.seasons }))}
            >
                <PillGroup
                    options={SEASON_OPTIONS}
                    selected={localFilters.seasons}
                    toggle={toggleFilter.bind(null, "seasons")}
                />
            </FilterSection>
        </div>
    );
};

// Reusable Components

const FilterSection = ({ title, isOpen, toggle, children }) => (
    <div className="mb-5">
        <div
            className="flex justify-between items-center cursor-pointer pb-2 border-b text-gray-700"
            onClick={toggle}
        >
            <h4 className="text-md font-semibold">{title}</h4>
            <span className="text-gray-500 text-xl font-light">{isOpen ? "−" : "+"}</span>
        </div>
        {isOpen && <div className="mt-3">{children}</div>}
    </div>
);

const CheckboxGroup = ({ options, selected, toggle }) => (
    <div className="grid gap-2">
        {options.map(({ id, label }) => (
            <label key={id} className="flex items-center gap-2 text-sm text-gray-800">
                <input
                    type="checkbox"
                    checked={selected.includes(id)}
                    onChange={() => toggle(id)}
                    className="h-4 w-4 text-blue-500"
                />
                {label}
            </label>
        ))}
    </div>
);

const PillGroup = ({ options, selected, toggle }) => (
    <div className="grid grid-cols-2 gap-2">
        {options.map(({ id, label, icon }) => (
            <div
                key={id}
                className={`flex items-center gap-2 p-2 px-3 rounded-xl cursor-pointer border transition ${selected.includes(id)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                    }`}
                onClick={() => toggle(id)}
            >
                {icon && <span className="text-lg">{icon}</span>}
                <span className="text-sm font-medium">{label}</span>
            </div>
        ))}
    </div>
);

export default FilterOptions;
