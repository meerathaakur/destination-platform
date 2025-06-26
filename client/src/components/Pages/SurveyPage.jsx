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
        setFormData((prev) => ({
            ...prev,
            [section]: data,
        }));
    };

    const nextStep = () => {
        setStep((prev) => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = () => {
        setPreferences(formData);
        navigate("/recommendations");
    };

    const renderCurrentStep = () => {
        const commonProps = {
            onNext: nextStep,
            onPrev: prevStep,
        };

        const steps = {
            1: (
                <InterestsSection
                    key="interests"
                    data={formData.interests}
                    updateData={(data) => updateFormData("interests", data)}
                    onNext={commonProps.onNext}
                />
            ),
            2: (
                <BudgetSection
                    key="budget"
                    data={formData.budget}
                    updateData={(data) => updateFormData("budget", data)}
                    onNext={commonProps.onNext}
                    onPrev={commonProps.onPrev}
                />
            ),
            3: (
                <TravelStyleSection
                    key="travelStyle"
                    data={formData.travelStyle}
                    updateData={(data) => updateFormData("travelStyle", data)}
                    onSubmit={handleSubmit}
                    onPrev={commonProps.onPrev}
                />
            ),
        };

        return steps[step] || null;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800">🌍 Plan Your Dream Vacation</h1>
                <p className="text-gray-500 text-center mt-2">Tell us about your travel preferences.</p>

                {/* Progress Bar */}
                <div className="flex justify-center mt-8 mb-4 px-4">
                    <div className="flex items-center w-full max-w-md">
                        {[1, 2, 3].map((stepNumber, index) => (
                            <div key={stepNumber} className="flex items-center w-full relative">
                                {/* Step Circle */}
                                <div
                                    className={`z-10 flex items-center justify-center w-10 h-10 rounded-full text-white font-semibold transition duration-300 ${step >= stepNumber ? "bg-blue-600" : "bg-gray-300"
                                        }`}
                                >
                                    {stepNumber}
                                </div>

                                {/* Connector Line (if not last step) */}
                                {index < 2 && (
                                    <div className="flex-1 h-1 mx-2 bg-gray-300 relative">
                                        <div
                                            className={`absolute top-0 left-0 h-full transition-all duration-300 ${step > stepNumber ? "bg-blue-600 w-full" : "bg-transparent w-0"
                                                }`}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>



                {/* Dynamic Step Form Section */}
                <div className="mt-6">{renderCurrentStep()}</div>
            </div>
        </div>
    );
};

export default SurveyPage;
