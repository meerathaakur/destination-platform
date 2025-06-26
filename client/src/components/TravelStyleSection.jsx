import { useState } from 'react';

const travelStyleOptions = {
    pace: [
        { value: 'relaxed', label: 'Relaxed', icon: '🧘‍♀️', description: 'Few activities per day, plenty of downtime' },
        { value: 'moderate', label: 'Moderate', icon: '🚶‍♂️', description: 'Balanced mix of activities and relaxation' },
        { value: 'active', label: 'Active', icon: '🏃‍♀️', description: 'Packed schedule, see and do as much as possible' }
    ],
    accommodation: [
        { value: 'hostel', label: 'Hostel/Backpacking', icon: '🎒', description: 'Social, basic accommodations' },
        { value: 'hotel', label: 'Hotels/Resorts', icon: '🏨', description: 'Comfortable, service-oriented stays' },
        { value: 'apartment', label: 'Vacation Rentals', icon: '🏠', description: 'Home-like amenities, local experience' },
        { value: 'unique', label: 'Unique Stays', icon: '🏕️', description: 'Treehouses, glamping, boutique accommodations' }
    ],
    tripLength: [
        { value: '1-3 days', label: 'Weekend Getaway', icon: '📅', description: '1-3 days' },
        { value: '4-6 days', label: 'Short Trip', icon: '📆', description: '4-6 days' },
        { value: '7-14 days', label: 'Standard Vacation', icon: '🗓️', description: '7-14 days' },
        { value: '15+ days', label: 'Extended Journey', icon: '📚', description: '15+ days' }
    ],
    travelWith: [
        { value: 'solo', label: 'Solo', icon: '🧍', description: 'Traveling on your own' },
        { value: 'partner', label: 'Couple', icon: '👫', description: 'Traveling with a partner' },
        { value: 'friends', label: 'Friends', icon: '👯', description: 'Traveling with friends' },
        { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', description: 'Traveling with children' }
    ]
};

const defaultStyle = {
    pace: 'moderate',
    accommodation: 'hotel',
    tripLength: '7-14 days',
    travelWith: 'partner'
};

const formatCategoryLabel = (category) =>
    category
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());

const TravelStyleSection = ({ data = {}, updateData, onSubmit, onPrev }) => {
    const [travelStyle, setTravelStyle] = useState({ ...defaultStyle, ...data });

    const handleStyleChange = (category, value) => {
        setTravelStyle((prev) => ({
            ...prev,
            [category]: value
        }));
    };

    const handleSubmit = () => {
        updateData(travelStyle);
        onSubmit();
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">🌐 What's your travel style?</h2>
            <p className="text-gray-600 text-center mb-6">Tell us how you like to travel</p>

            <div className="space-y-6">
                {Object.entries(travelStyleOptions).map(([category, options]) => (
                    <div key={category}>
                        <h3 className="text-lg font-semibold mb-3 text-gray-700">{formatCategoryLabel(category)}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {options.map((option) => {
                                const isSelected = travelStyle[category] === option.value;
                                return (
                                    <div
                                        key={option.value}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleStyleChange(category, option.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') handleStyleChange(category, option.value);
                                        }}
                                        className={`p-4 border rounded-lg cursor-pointer text-center shadow-sm transition-all 
                                            ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                    >
                                        <div className="text-2xl">{option.icon}</div>
                                        <h4 className="font-medium mt-2">{option.label}</h4>
                                        <p className={`text-sm mt-1 ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                                            {option.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-8">
                <button
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-lg"
                    onClick={onPrev}
                >
                    ← Back
                </button>
                <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    onClick={handleSubmit}
                >
                    Get My Recommendations →
                </button>
            </div>
        </div>
    );
};

export default TravelStyleSection;
