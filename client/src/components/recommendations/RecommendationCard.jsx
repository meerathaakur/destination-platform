import { useState } from 'react';
import { useRecommendationStore } from '../../store/recommendationStore';
import '../../styles/components/RecommendationCard.scss';

const RecommendationCard = ({ destination, onClick }) => {
    const { toggleFavorite, favorites, addToComparison, comparisonList } = useRecommendationStore();
    const [showDetails, setShowDetails] = useState(false);

    const isFavorite = favorites.includes(destination.id);
    const isInComparison = comparisonList.includes(destination.id);

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        toggleFavorite(destination.id);
    };

    const handleCompareClick = (e) => {
        e.stopPropagation();
        addToComparison(destination.id);
    };

    const handleToggleDetails = (e) => {
        e.stopPropagation();
        setShowDetails(!showDetails);
    };

    return (
        <div className="recommendation-card" onClick={onClick}>
            <div className="card-header">
                <div className="match-score">
                    <div className="score-circle">
                        <span>{destination.matchScore}%</span>
                    </div>
                    <span className="match-label">Match</span>
                </div>
                <div className="destination-image">
                    <img src={destination.image || '/images/destinations/placeholder.jpg'} alt={destination.name} />
                </div>
                <div className="card-actions">
                    <button
                        className={`favorite-button ${isFavorite ? 'active' : ''}`}
                        onClick={handleFavoriteClick}
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        {isFavorite ? '❤️' : '🤍'}
                    </button>
                    <button
                        className={`compare-button ${isInComparison ? 'active' : ''}`}
                        onClick={handleCompareClick}
                        disabled={isInComparison || comparisonList.length >= 3}
                        aria-label={isInComparison ? 'Added to comparison' : 'Add to comparison'}
                    >
                        {isInComparison ? '✓ Compare' : '+ Compare'}
                    </button>
                </div>
            </div>

            <div className="card-content">
                <h3>{destination.name}</h3>
                <div className="destination-rating">
                    {'★'.repeat(Math.floor(destination.rating))}
                    {'☆'.repeat(5 - Math.floor(destination.rating))}
                    <span className="rating-value">{destination.rating.toFixed(1)}</span>
                    <span className="review-count">({destination.reviewCount})</span>
                </div>
                <p className="destination-description">{destination.description}</p>

                <div className="destination-tags">
                    {destination.interests.slice(0, 3).map(interest => (
                        <span key={interest} className="tag">{interest}</span>
                    ))}
                </div>

                <button className="details-toggle" onClick={handleToggleDetails}>
                    {showDetails ? 'Show Less' : 'Show More'}
                </button>

                {showDetails && (
                    <div className="extended-details">
                        <div className="details-section">
                            <h4>Top Attractions</h4>
                            <ul>
                                {destination.attractions.map(attraction => (
                                    <li key={attraction}>{attraction}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="detail-label">Best Season</span>
                                <span className="detail-value">{destination.bestSeason}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Budget Level</span>
                                <span className="detail-value">{destination.budget}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Ideal Duration</span>
                                <span className="detail-value">{destination.travelDuration}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Good For</span>
                                <span className="detail-value">{destination.goodFor.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendationCard;