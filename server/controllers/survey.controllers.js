// Survey controller for user preferences and recommendations

// Mock survey data - in real app this would come from a database
const surveyQuestions = [
    {
        id: 1,
        question: "What type of destination do you prefer?",
        options: ["Mountains", "Beaches", "Cities", "Countryside", "Desert"]
    },
    {
        id: 2, 
        question: "What's your budget range?",
        options: ["Low (Under $500)", "Medium ($500-1500)", "High ($1500+)"]
    },
    {
        id: 3,
        question: "What activities interest you most?",
        options: ["Adventure Sports", "Cultural Tours", "Relaxation", "Food & Dining", "Shopping"]
    }
];

export const getSurveyQuestions = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            questions: surveyQuestions
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching survey questions", error });
    }
};

export const submitSurveyResponse = async (req, res) => {
    try {
        const { responses } = req.body;
        const userId = req.user?.id;
        
        // In a real app, you would save this to a database
        // and use it for personalized recommendations
        
        res.status(200).json({
            success: true,
            message: "Survey response submitted successfully",
            data: {
                userId,
                responses,
                submittedAt: new Date()
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error submitting survey response", error });
    }
};

export const getPersonalizedRecommendations = async (req, res) => {
    try {
        const userId = req.user?.id;
        
        // Mock recommendations based on survey responses
        const recommendations = [
            {
                name: "Himachal Pradesh",
                type: "Mountains",
                reason: "Based on your preference for mountain destinations"
            },
            {
                name: "Goa",
                type: "Beaches", 
                reason: "Perfect for relaxation and coastal activities"
            }
        ];
        
        res.status(200).json({
            success: true,
            recommendations
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching recommendations", error });
    }
};
