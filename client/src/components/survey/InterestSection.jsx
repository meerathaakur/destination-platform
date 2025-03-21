import { useState } from 'react';
import '../../styles/components/InterestsSection.scss';

const INTEREST_OPTIONS = [
    { id: 'adventure', label: 'Adventure', icon: '🧗‍♂️' },
    { id: 'beach', label: 'Beaches', icon: '🏖️' },
    { id: 'city', label: 'City Exploration', icon: '🏙️' },
    { id: 'culture', label: 'Culture & History', icon: '🏛️' },
    { id: 'food', label: 'Food & Cuisine', icon: '🍴' },
    { id: 'nature', label: 'Nature & Landscapes', icon: '🏞️' },
    { id: 'relaxation', label: 'Relaxation', icon: '🧘‍♀️' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'wildlife', label: 'Wildlife', icon: '🦁' },
    { id: 'nightlife', label: 'Nightlife', icon: '🍸' },
    { id: 'arts', label: 'Arts & Museums', icon: '🎨' },
    { id: 'sports', label: 'Sports & Recreation', icon: '⚽' },
];

const ACTIVITY_OPTIONS = [
    { id: 'hiking', label: 'Hiking', icon: '🥾' },
    { id: 'swimming', label: 'Swimming', icon: '🏊‍♀️' },
    { id: 'sightseeing', label: 'Sightseeing', icon: '📸' },
    { id: 'museums', label: 'Museums', icon: '🏛️' },
    { id: 'localFood', label: 'Local Food', icon: '🍽️' },
    { id: 'shopping', label: 'Shopping', icon: '🛒' },
    { id: 'nightlife', label: 'Nightlife', icon: '🌃' },
    { id: 'adventure', label: 'Adventure Activities', icon: '🪂' },
    { id: 'relaxation', label: 'Spa & Wellness', icon: '💆‍♀️' },
    { id: 'festivals', label: 'Festivals & Events', icon: '🎭' },
    { id: 'photography', label: 'Photography', icon: '📷' },
    { id: 'boating', label: 'Boating & Water Sports', icon: '🚤' },
];

const InterestsSection = ({ data, updateData, onNext }) => {
    const [selectedInterests, setSelectedInterests] = useState(data.interests || []);
    const [selectedActivities, setSelectedActivities] = useState(data.activities || []);

    const toggleInterest = (interestId) => {
        if (selectedInterests.includes(interestId)) {
            setSelectedInterests(selectedInterests.filter(id => id !== interestId));
        } else {
            setSelectedInterests([...selectedInterests, interestId]);
        }
    };

    const toggleActivity = (activityId) => {
        if (selectedActivities.includes(activityId)) {
            setSelectedActivities(selectedActivities.filter(id => id !== activityId));
        } else {
            setSelectedActivities([...selectedActivities, activityId]);
        }
    };

    const handleNext = () => {
        updateData({
            interests: selectedInterests,
            activities: selectedActivities
        });
        onNext();
    };

    return (
        <div className="interests-section">
            <h2>What are you interested in?</h2>
            <p>Select all that apply to you</p>

            <h3>Travel Interests</h3>
            <div className="interest-grid">
                {INTEREST_OPTIONS.map((interest) => (
                    <div
                        key={interest.id}
                        className={`interest-card ${selectedInterests.includes(interest.id) ? 'selected' : ''}`}
                        onClick={() => toggleInterest(interest.id)}
                    >
                        <div className="interest-icon">{interest.icon}</div>
                        <div className="interest-label">{interest.label}</div>
                    </div>
                ))}
            </div>

            <h3>Preferred Activities</h3>
            <div className="activity-grid">
                {ACTIVITY_OPTIONS.map((activity) => (
                    <div
                        key={activity.id}
                        className={`activity-card ${selectedActivities.includes(activity.id) ? 'selected' : ''}`}
                        onClick={() => toggleActivity(activity.id)}
                    >
                        <div className="activity-icon">{activity.icon}</div>
                        <div className="activity-label">{activity.label}</div>
                    </div>
                ))}
            </div>

            <div className="survey-navigation">
                <button
                    className="next-button"
                    onClick={handleNext}
                    disabled={selectedInterests.length === 0}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default InterestsSection;