import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InterestsSection from '../components/survey/InterestSection';
import BudgetSection from '../components/survey/BudgetSection';
import TravelStyleSection from '../components/survey/TravelStyleSection';
import { usePreferenceStore } from '../store/preferenceStore';
import '../styles/components/survey.scss';

const SurveyPage = () => {
    const navigate = useNavigate();
    const setPreferences = usePreferenceStore((state) => state.setPreferences);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        interests: [],
        activities: [],
        budget: {
            accommodation: 'medium',
            food: 'medium',
            activities: 'medium',
            overall: 'medium',
        },
        travelStyle: {
            pace: 'moderate',
            accommodation: 'hotel',
            tripLength: '7-14 days',
            travelWith: 'partner',
        },
        seasonPreference: 'summer',
        mustAvoid: [],
    });

    const updateFormData = (section, data) => {
        setFormData({
            ...formData,
            [section]: data,
        });
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = () => {
        // Save the preferences to the store
        setPreferences(formData);

        // Navigate to recommendations page
        navigate('/recommendations');
    };

    const renderCurrentStep = () => {
        switch (step) {
            case 1:
                return (
                    <InterestsSection
                        data={formData.interests}
                        updateData={(data) => updateFormData('interests', data)}
                        onNext={nextStep}
                    />
                );
            case 2:
                return (
                    <BudgetSection
                        data={formData.budget}
                        updateData={(data) => updateFormData('budget', data)}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                );
            case 3:
                return (
                    <TravelStyleSection
                        data={formData.travelStyle}
                        updateData={(data) => updateFormData('travelStyle', data)}
                        onSubmit={handleSubmit}
                        onPrev={prevStep}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="survey-page">
            <div className="survey-container">
                <div className="survey-header">
                    <h1>Tell Us About Your Dream Vacation</h1>
                    <p>Help us understand your preferences to find your perfect destination</p>

                    <div className="progress-bar">
                        <div className="progress-steps">
                            {[1, 2, 3].map((stepNumber) => (
                                <div
                                    key={stepNumber}
                                    className={`step ${step >= stepNumber ? 'active' : ''}`}
                                >
                                    {stepNumber}
                                </div>
                            ))}
                        </div>
                        <div className="progress-line">
                            <div
                                className="progress-line-fill"
                                style={{ width: `${((step - 1) / 2) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="survey-content">
                    {renderCurrentStep()}
                </div>
            </div>
        </div>
    );
};

export default SurveyPage;