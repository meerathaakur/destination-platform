import { useState } from "react";

const budgetOptions = {
    accommodation: [
        { value: "budget", label: "Budget", description: "Hostels, guest houses, economy hotels" },
        { value: "medium", label: "Mid-range", description: "3-4 star hotels, comfortable apartments" },
        { value: "luxury", label: "Luxury", description: "5-star hotels, resorts, premium rentals" }
    ],
    food: [
        { value: "budget", label: "Budget", description: "Street food, markets, cooking own meals" },
        { value: "medium", label: "Mid-range", description: "Mix of local restaurants and some fine dining" },
        { value: "luxury", label: "Gourmet", description: "Fine dining, premium restaurants, culinary experiences" }
    ],
    activities: [
        { value: "budget", label: "Budget", description: "Free sights, public beaches, self-guided tours" },
        { value: "medium", label: "Mid-range", description: "Mix of paid attractions and free activities" },
        { value: "luxury", label: "Premium", description: "Private tours, exclusive experiences, VIP access" }
    ],
    overall: [
        { value: "budget", label: "Budget Travel", description: "Under $100 per day" },
        { value: "medium", label: "Mid-range", description: "$100-300 per day" },
        { value: "luxury", label: "Luxury", description: "Over $300 per day" }
    ]
};

const BudgetSection = ({ data, updateData, onNext, onPrev }) => {
    const [budgetPreferences, setBudgetPreferences] = useState(data || {
        accommodation: "medium",
        food: "medium",
        activities: "medium",
        overall: "medium"
    });

    const handleBudgetChange = (category, value) => {
        setBudgetPreferences({
            ...budgetPreferences,
            [category]: value
        });
    };

    const handleNext = () => {
        updateData(budgetPreferences);
        onNext();
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800">💰 What's your budget preference?</h2>
            <p className="text-gray-500 text-center mt-2">Help us understand your spending comfort for different aspects of travel.</p>

            <div className="mt-6 space-y-6">
                {Object.entries(budgetOptions).map(([category, options]) => (
                    <div key={category}>
                        <h3 className="text-lg font-semibold text-gray-700">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    className={`p-4 border rounded-lg transition-all duration-200 text-center ${budgetPreferences[category] === option.value ? "bg-blue-600 text-white" : "border-gray-300 hover:bg-gray-100"
                                        }`}
                                    onClick={() => handleBudgetChange(category, option.value)}
                                >
                                    <h4 className="text-md font-medium">{option.label}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between">
                <button className="px-6 py-2 rounded-lg text-white bg-gray-500 hover:bg-gray-600 transition-all" onClick={onPrev}>
                    Back
                </button>
                <button className="px-6 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all" onClick={handleNext}>
                    Next →
                </button>
            </div>
        </div>
    );
};

export default BudgetSection;
