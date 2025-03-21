import { useNavigate } from 'react-router-dom';
import RecommendationCard from './RecommendationCard';
import '../../styles/components/RecommendationList.scss';

const RecommendationList = ({ recommendations }) => {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/destination/${id}`);
    };

    if (recommendations.length === 0) {
        return (
            <div className="empty-recommendations">
                <h3>No matching destinations found</h3>
                <p>Try adjusting your filters to see more options</p>
            </div>
        );
    }

    return (
        <div className="recommendation-list">
            {recommendations.map((destination) => (
                <RecommendationCard
                    key={destination.id}
                    destination={destination}
                    onClick={() => handleCardClick(destination.id)}
                />
            ))}
        </div>
    );
};

export default RecommendationList;