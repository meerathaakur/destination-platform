import { useState, useEffect } from "react";

const budgetOptions = {
    accommodation: [
        {
            value: "budget",
            label: "Budget",
            description: "Hostels, guest houses, economy hotels",
        },
        {
            value: "medium",
            label: "Mid-range",
            description: "3-4 star hotels, comfortable apartments",
        },
        {
            value: "luxury",
            label: "Luxury",
            description: "5-star hotels, resorts, premium rentals",
        },
    ],
    food: [
        {
            value: "budget",
            label: "Budget",
            description: "Street food, markets, cooking own meals",
        },
        {
            value: "medium",
            label: "Mid-range",
            description: "Mix of local restaurants and some fine dining",
        },
        {
            value: "luxury",
            label: "Gourmet",
            description: "Fine dining, premium restaurants, culinary experiences",
        },
    ],
    activities: [
        {
            value: "budget",
            label: "Budget",
            description: "Free sights, public beaches, self-guided tours",
        },
        {
            value: "medium",
            label: "Mid-range",
            description: "Mix of paid attractions and free activities",
        },
        {
            value: "luxury",
            label: "Premium",
            description: "Private tours, exclusive experiences, VIP access",
        },
    ],
    overall: [
        {
            value: "budget",
            label: "Budget Travel",
            description: "Under $100 per day",
        },
        {
            value: "medium",
            label: "Mid-range",
            description: "$100-300 per day",
        },
        {
            value: "luxury",
            label: "Luxury",
            description: "Over $300 per day",
        },
    ],
};

const BudgetSection = ({ data = {}, updateData, onNext, onPrev }) => {
    const defaultPreferences = {
        accommodation: "medium",
        food: "medium",
        activities: "medium",
        overall: "medium",
    };

    const [budgetPreferences, setBudgetPreferences] = useState({
        ...defaultPreferences,
        ...data,
    });

    useEffect(() => {
        if (data) {
            setBudgetPreferences((prev) => ({ ...prev, ...data }));
        }
    }, [data]);

    const handleBudgetChange = (category, value) => {
        setBudgetPreferences((prev) => ({
            ...prev,
            [category]: value,
        }));
    };

    const handleNext = () => {
        updateData(budgetPreferences);
        onNext();
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800">
                💰 What's your budget preference?
            </h2>
            <p className="text-gray-500 text-center mt-2">
                Help us understand your spending comfort for different aspects of travel.
            </p>

            <div className="mt-6 space-y-6">
                {Object.entries(budgetOptions).map(([category, options]) => (
                    <div key={category}>
                        <h3 className="text-lg font-semibold text-gray-700 capitalize">
                            {category}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {options.map((option) => {
                                const isSelected = budgetPreferences[category] === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        aria-pressed={isSelected}
                                        onClick={() => handleBudgetChange(category, option.value)}
                                        className={`p-4 border rounded-lg text-left transition duration-200 ${isSelected
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                                            }`}
                                    >
                                        <h4 className="text-md font-semibold">{option.label}</h4>
                                        <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                                            {option.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-between">
                <button
                    type="button"
                    onClick={onPrev}
                    className="px-6 py-2 rounded-lg text-white bg-gray-500 hover:bg-gray-600 transition"
                >
                    ← Back
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition"
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default BudgetSection;
