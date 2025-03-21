import { useState } from 'react';
import '../../styles/components/BudgetSection.scss';

const budgetOptions = {
    accommodation: [
        { value: 'budget', label: 'Budget', description: 'Hostels, guest houses, economy hotels' },
        { value: 'medium', label: 'Mid-range', description: '3-4 star hotels, comfortable apartments' },
        { value: 'luxury', label: 'Luxury', description: '5-star hotels, resorts, premium rentals' }
    ],
    food: [
        { value: 'budget', label: 'Budget', description: 'Street food, markets, cooking own meals' },
        { value: 'medium', label: 'Mid-range', description: 'Mix of local restaurants and some fine dining' },
        { value: 'luxury', label: 'Gourmet', description: 'Fine dining, premium restaurants, culinary experiences' }
    ],
    activities: [
        { value: 'budget', label: 'Budget', description: 'Free sights, public beaches, self-guided tours' },
        { value: 'medium', label: 'Mid-range', description: 'Mix of paid attractions and free activities' },
        { value: 'luxury', label: 'Premium', description: 'Private tours, exclusive experiences, VIP access' }
    ],
    overall: [
        { value: 'budget', label: 'Budget Travel', description: 'Under $100 per day' },
        { value: 'medium', label: 'Mid-range', description: '$100-300 per day' },
        { value: 'luxury', label: 'Luxury', description: 'Over $300 per day' }
    ]
};

const BudgetSection = ({ data, updateData, onNext, onPrev }) => {
    const [budgetPreferences, setBudgetPreferences] = useState(data || {
        accommodation: 'medium',
        food: 'medium',
        activities: 'medium',
        overall: 'medium'
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
        <div className="budget-section">
            <h2>What's your budget preference?</h2>
            <p>Help us understand your spending comfort for different aspects of travel</p>

            <div className="budget-categories">
                <div className="budget-category">
                    <h3>Accommodation</h3>
                    <div className="budget-options">
                        {budgetOptions.accommodation.map((option) => (
                            <div
                                key={option.value}
                                className={`budget-option ${budgetPreferences.accommodation === option.value ? 'selected' : ''}`}
                                onClick={() => handleBudgetChange('accommodation', option.value)}
                            >
                                <h4>{option.label}</h4>
                                <p>{option.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="budget-category">
                    <h3>Food & Dining</h3>
                    <div className="budget-options">
                        {budgetOptions.food.map((option) => (
                            <div
                                key={option.value}
                                className={`budget-option ${budgetPreferences.food === option.value ? 'selected' : ''}`}
                                onClick={() => handleBudgetChange('food', option.value)}
                            >
                                <h4>{option.label}</h4>
                                <p>{option.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="budget-category">
                    <h3>Activities & Attractions</h3>
                    <div className="budget-options">
                        {budgetOptions.activities.map((option) => (
                            <div
                                key={option.value}
                                className={`budget-option ${budgetPreferences.activities === option.value ? 'selected' : ''}`}
                                onClick={() => handleBudgetChange('activities', option.value)}
                            >
                                <h4>{option.label}</h4>
                                <p>{option.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="budget-category">
                    <h3>Overall Budget</h3>
                    <div className="budget-options">
                        {budgetOptions.overall.map((option) => (
                            <div
                                key={option.value}
                                className={`budget-option ${budgetPreferences.overall === option.value ? 'selected' : ''}`}
                                onClick={() => handleBudgetChange('overall', option.value)}
                            >
                                <h4>{option.label}</h4>
                                <p>{option.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="survey-navigation">
                <button className="back-button" onClick={onPrev}>
                    Back
                </button>
                <button className="next-button" onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default BudgetSection;