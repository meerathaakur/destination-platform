import { useState } from "react";
import { useRecommendationStore } from "../components/store/recommendationStore";

const RecommendationCard = ({ destination, onClick }) => {
    const { toggleFavorite, favorites, addToComparison, comparisonList } =
        useRecommendationStore();
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
        <div
            className="bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-lg cursor-pointer"
            onClick={onClick}
        >
            {/* Header */}
            <div className="relative">
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {destination.matchScore}% Match
                </div>

                <img
                    src={destination.image || "/images/destinations/placeholder.jpg"}
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                />

                {/* Actions */}
                <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                        className={`text-lg ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
                        onClick={handleFavoriteClick}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        {isFavorite ? "❤️" : "🤍"}
                    </button>
                    <button
                        className={`text-sm px-3 py-1 rounded ${isInComparison ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        onClick={handleCompareClick}
                        disabled={isInComparison || comparisonList.length >= 3}
                        aria-label={isInComparison ? "Added to comparison" : "Add to comparison"}
                    >
                        {isInComparison ? "✓ Compare" : "+ Compare"}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-semibold">{destination.name}</h3>

                {/* Rating */}
                <div className="flex items-center text-yellow-500">
                    {"★".repeat(Math.floor(destination.rating))}
                    {"☆".repeat(5 - Math.floor(destination.rating))}
                    <span className="ml-2 text-sm text-gray-600">{destination.rating.toFixed(1)}</span>
                    <span className="ml-1 text-xs text-gray-400">({destination.reviewCount})</span>
                </div>

                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{destination.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {destination.interests.slice(0, 3).map((interest) => (
                        <span key={interest} className="bg-gray-200 text-xs px-2 py-1 rounded">
                            {interest}
                        </span>
                    ))}
                </div>

                {/* Show More / Less */}
                <button
                    className="mt-3 text-blue-500 text-sm hover:underline"
                    onClick={handleToggleDetails}
                >
                    {showDetails ? "Show Less" : "Show More"}
                </button>

                {/* Extended Details */}
                {showDetails && (
                    <div className="mt-3 border-t pt-3">
                        <h4 className="text-sm font-semibold">Top Attractions</h4>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                            {destination.attractions.map((attraction) => (
                                <li key={attraction}>{attraction}</li>
                            ))}
                        </ul>

                        <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                            <div className="bg-gray-100 p-2 rounded">
                                <span className="font-semibold">Best Season:</span> {destination.bestSeason}
                            </div>
                            <div className="bg-gray-100 p-2 rounded">
                                <span className="font-semibold">Budget Level:</span> {destination.budget}
                            </div>
                            <div className="bg-gray-100 p-2 rounded">
                                <span className="font-semibold">Ideal Duration:</span> {destination.travelDuration}
                            </div>
                            <div className="bg-gray-100 p-2 rounded">
                                <span className="font-semibold">Good For:</span> {destination.goodFor.join(", ")}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendationCard;
