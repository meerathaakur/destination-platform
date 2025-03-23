import { useNavigate } from "react-router-dom";
import RecommendationCard from "./RecommendationCard";

const RecommendationList = ({ recommendations }) => {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/destination/${id}`);
    };

    if (recommendations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-100 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">
                    No matching destinations found
                </h3>
                <p className="text-gray-500">Try adjusting your filters to see more options</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {recommendations.map((destination) => (
                <RecommendationCard
                    key={destination.id}
                    destination={destination}
                    onClick={() => handleCardClick(destination.id)}
                    className="cursor-pointer transition-transform transform hover:scale-105"
                />
            ))}
        </div>
    );
};

export default RecommendationList;
