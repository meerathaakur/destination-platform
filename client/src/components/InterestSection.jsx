import { useState } from "react";

const INTEREST_OPTIONS = [
    { id: "adventure", label: "Adventure", icon: "🧗‍♂️" },
    { id: "beach", label: "Beaches", icon: "🏖️" },
    { id: "city", label: "City Exploration", icon: "🏙️" },
    { id: "culture", label: "Culture & History", icon: "🏛️" },
    { id: "food", label: "Food & Cuisine", icon: "🍴" },
    { id: "nature", label: "Nature & Landscapes", icon: "🏞️" },
    { id: "relaxation", label: "Relaxation", icon: "🧘‍♀️" },
    { id: "shopping", label: "Shopping", icon: "🛍️" },
    { id: "wildlife", label: "Wildlife", icon: "🦁" },
    { id: "nightlife", label: "Nightlife", icon: "🍸" },
    { id: "arts", label: "Arts & Museums", icon: "🎨" },
    { id: "sports", label: "Sports & Recreation", icon: "⚽" },
];

const ACTIVITY_OPTIONS = [
    { id: "hiking", label: "Hiking", icon: "🥾" },
    { id: "swimming", label: "Swimming", icon: "🏊‍♀️" },
    { id: "sightseeing", label: "Sightseeing", icon: "📸" },
    { id: "museums", label: "Museums", icon: "🏛️" },
    { id: "localFood", label: "Local Food", icon: "🍽️" },
    { id: "shopping", label: "Shopping", icon: "🛒" },
    { id: "nightlife", label: "Nightlife", icon: "🌃" },
    { id: "adventure", label: "Adventure Activities", icon: "🪂" },
    { id: "relaxation", label: "Spa & Wellness", icon: "💆‍♀️" },
    { id: "festivals", label: "Festivals & Events", icon: "🎭" },
    { id: "photography", label: "Photography", icon: "📷" },
    { id: "boating", label: "Boating & Water Sports", icon: "🚤" },
];

const InterestsSection = ({ data, updateData, onNext }) => {
    const [selectedInterests, setSelectedInterests] = useState(data.interests || []);
    const [selectedActivities, setSelectedActivities] = useState(data.activities || []);

    const toggleInterest = (interestId) => {
        setSelectedInterests((prev) =>
            prev.includes(interestId) ? prev.filter((id) => id !== interestId) : [...prev, interestId]
        );
    };

    const toggleActivity = (activityId) => {
        setSelectedActivities((prev) =>
            prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId]
        );
    };

    const handleNext = () => {
        updateData({ interests: selectedInterests, activities: selectedActivities });
        onNext();
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800">🌍 What are you interested in?</h2>
            <p className="text-gray-500 text-center mt-2">Select all that apply</p>

            {/* Travel Interests */}
            <h3 className="text-lg font-semibold mt-6 text-gray-700">✈️ Travel Interests</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                {INTEREST_OPTIONS.map((interest) => (
                    <button
                        key={interest.id}
                        className={`flex flex-col items-center p-4 border rounded-lg transition-all duration-200 ${selectedInterests.includes(interest.id)
                                ? "bg-blue-600 text-white"
                                : "border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => toggleInterest(interest.id)}
                    >
                        <span className="text-2xl">{interest.icon}</span>
                        <span className="text-sm mt-2">{interest.label}</span>
                    </button>
                ))}
            </div>

            {/* Activities */}
            <h3 className="text-lg font-semibold mt-6 text-gray-700">🎯 Preferred Activities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                {ACTIVITY_OPTIONS.map((activity) => (
                    <button
                        key={activity.id}
                        className={`flex flex-col items-center p-4 border rounded-lg transition-all duration-200 ${selectedActivities.includes(activity.id)
                                ? "bg-green-500 text-white"
                                : "border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => toggleActivity(activity.id)}
                    >
                        <span className="text-2xl">{activity.icon}</span>
                        <span className="text-sm mt-2">{activity.label}</span>
                    </button>
                ))}
            </div>

            {/* Navigation Button */}
            <div className="mt-6 text-center">
                <button
                    className="px-6 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 transition-all"
                    onClick={handleNext}
                    disabled={selectedInterests.length === 0}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default InterestsSection;
