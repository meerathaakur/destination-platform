import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InterestsSection from "../InterestSection";
import BudgetSection from "../BudgetSection";
import TravelStyleSection from "../TravelStyleSection";
import { usePreferenceStore } from "../store/usePreferenceStore";

const SurveyPage = () => {
    const navigate = useNavigate();
    const setPreferences = usePreferenceStore((state) => state.setPreferences);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        interests: [],
        activities: [],
        budget: {
            accommodation: "medium",
            food: "medium",
            activities: "medium",
            overall: "medium",
        },
        travelStyle: {
            pace: "moderate",
            accommodation: "hotel",
            tripLength: "7-14 days",
            travelWith: "partner",
        },
        seasonPreference: "summer",
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
        setPreferences(formData);
        navigate("/recommendations");
    };

    const renderCurrentStep = () => {
        switch (step) {
            case 1:
                return (
                    <InterestsSection
                        data={formData.interests}
                        updateData={(data) => updateFormData("interests", data)}
                        onNext={nextStep}
                    />
                );
            case 2:
                return (
                    <BudgetSection
                        data={formData.budget}
                        updateData={(data) => updateFormData("budget", data)}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                );
            case 3:
                return (
                    <TravelStyleSection
                        data={formData.travelStyle}
                        updateData={(data) => updateFormData("travelStyle", data)}
                        onSubmit={handleSubmit}
                        onPrev={prevStep}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-55 to-indigo-300 p-6">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800">🌍 Plan Your Dream Vacation</h1>
                <p className="text-gray-500 text-center mt-2">Tell us about your travel preferences.</p>

                {/* Progress Bar */}
                <div className="flex justify-between items-center my-6">
                    {[1, 2, 3].map((stepNumber) => (
                        <div key={stepNumber} className="relative flex flex-col items-center">
                            <div
                                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
                                    step >= stepNumber ? "bg-blue-600" : "bg-gray-300"
                                }`}
                            >
                                {stepNumber}
                            </div>
                            {stepNumber < 3 && (
                                <div className="w-16 h-1 bg-gray-300 absolute top-1/2 left-12 transform -translate-y-1/2">
                                    <div
                                        className={`h-full ${
                                            step > stepNumber ? "bg-blue-600" : ""
                                        }`}
                                    ></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Survey Content */}
                <div className="mt-6">{renderCurrentStep()}</div>
            </div>
        </div>
    );
};

export default SurveyPage;
