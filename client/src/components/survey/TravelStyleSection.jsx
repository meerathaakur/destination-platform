import { useState } from 'react';
import '../../styles/components/TravelStyleSection.scss';

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

const seasonOptions = [
    { value: 'spring', label: 'Spring', icon: '🌸' },
    { value: 'summer', label: 'Summer', icon: '☀️' },
    { value: 'fall', label: 'Fall/Autumn', icon: '🍂' },
    { value: 'winter', label: 'Winter', icon: '❄️' },
    { value: 'any', label: 'Any Season', icon: '🌍' }
];

const avoidOptions = [
    { value: 'crowds', label: 'Crowds', icon: '👥' },
    { value: 'cold', label: 'Cold Weather', icon: '🥶' },
    { value: 'heat', label: 'Hot Weather', icon: '🥵' },
    { value: 'longFlights', label: 'Long Flights', icon: '✈️' },
    { value: 'language', label: 'Language Barriers', icon: '🗣️' },
    { value: 'touristy', label: 'Touristy Places', icon: '📸' }
];

const TravelStyleSection = ({ data, updateData, onSubmit, onPrev }) => {
    const [travelStyle, setTravelStyle] = useState(data || {
        pace: 'moderate',
        accommodation: 'hotel',
        tripLength: '7-14 days',
        travelWith: 'partner'
    });

    const [seasonPreference, setSeasonPreference] = useState('summer');
    const [mustAvoid, setMustAvoid] = useState([]);

    const handleStyleChange = (category, value) => {
        setTravelStyle({
            ...travelStyle,
            [category]: value
        });
    };

    const toggleAvoid = (value) => {
        if (mustAvoid.includes(value)) {
            setMustAvoid(mustAvoid.filter(item => item !== value));
        } else {
            setMustAvoid([...mustAvoid, value]);
        }
    };

    const handleSubmit = () => {
        updateData({
            ...travelStyle,
            seasonPreference,
            mustAvoid
        });
        onSubmit();
    };

    return (
        <div className="travel-style-section">
            <h2>What's your travel style?</h2>
            <p>Tell us how you like to travel</p>

            <div className="style-categories">
                <div className="style-category">
                    <h3>Travel Pace</h3>
                    <div className="style-options">
                        {travelStyleOptions.pace.map((option) => (
                            <div
                                key={option.value}
                                className={`style-option ${travelStyle.pace === option.value ? 'selected' : ''}`}
                                onClick={() => handleStyleChange('pace', option.value)}
                            >
                                <div className="option-icon">{option.icon}</div>
                                <h4>{option.label}</h4>
                                <p>{option.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="style-category">
                    <h3>Preferred Accommodation</h3>
                    <div className="style-options">
                        {travelStyleOptions.accommodation.map((option) => (
                            <div
                                key={option.value}
                                className={`style-option ${travelStyle.accommodation === option.value ? 'selected' : ''}`}
                                onClick={() => handleStyleChange('accommodation', option.value)}
                            >
                                <div className="option-icon">{option.icon}</div>
                                <h4>{option.label}</h4>
                                <p>{option.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="style-category">
                    <h3>Ideal Trip Length</h3>
                    <div className="style-options">
                        {travelStyleOptions.tripLength.map((option) => (
                            <div
                                key={option.value}
                                className={`style-option ${travelStyle.tripLength === option.value ? 'selected' : ''}`}
                                onClick={() => handleStyleChange('tripLength', option.value)}
                            >
                                <div className="option-icon">{option.icon}</div>
                                <h4>{option.label}</h4>
                                <p>{option.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="style-category">
                    <h3>I'm Traveling With</h3>
                    <div className="style-options">
                        {travelStyleOptions.travelWith.map((option) => (
                            <div
                                key={option.value}
                                className={`style-option ${travelStyle.travelWith === option.value ? 'selected' : ''}`}
                                onClick={() => handleStyleChange('travelWith', option.value)}
                            >
                                <div className="option-icon">{option.icon}</div>
                                <h4>{option.label}</h4>
                                <p>{option.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="style-category">
                    <h3>Preferred Season</h3>
                    <div className="season-options">
                        {seasonOptions.map((option) => (
                            <div
                                key={option.value}
                                className={`season-option ${seasonPreference === option.value ? 'selected' : ''}`}
                                onClick={() => setSeasonPreference(option.value)}
                            >
                                <div className="option-icon">{option.icon}</div>
                                <span>{option.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="style-category">
                    <h3>Must Avoid (Optional)</h3>
                    <div className="avoid-options">
                        {avoidOptions.map((option) => (
                            <div
                                key={option.value}
                                className={`avoid-option ${mustAvoid.includes(option.value) ? 'selected' : ''}`}
                                onClick={() => toggleAvoid(option.value)}
                            >
                                <div className="option-icon">{option.icon}</div>
                                <span>{option.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="survey-navigation">
                <button className="back-button" onClick={onPrev}>
                    Back
                </button>
                <button className="submit-button" onClick={handleSubmit}>
                    Get My Recommendations
                </button>
            </div>
        </div>
    );
};

export default TravelStyleSection;