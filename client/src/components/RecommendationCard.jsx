import { useState } from "react";
import { useRecommendationStore } from "../components/store/recommendationStore";

const RecommendationCard = ({ destination, onClick, className = "" }) => {
    const {
        toggleFavorite,
        favorites,
        addToComparison,
        comparisonList
    } = useRecommendationStore();

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
        setShowDetails((prev) => !prev);
    };

    return (
        <div
            className={`bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-lg cursor-pointer ${className}`}
            onClick={onClick}
        >
            {/* Image Header */}
            <div className="relative">
                

                <img
                    src={destination.image || "/images/destinations/placeholder.jpg"}
                    alt={destination.name || "Destination"}
                    className="w-full h-48 object-cover"
                />

                {/* Favorite and Compare Buttons */}
                <div className="absolute top-0 right-0 flex space-x-2">

                    <button
                        className={`text-sm px-3 py-1 rounded ${isInComparison
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        onClick={handleCompareClick}
                        disabled={isInComparison || comparisonList.length >= 3}
                        aria-label={isInComparison ? "Added to comparison" : "Add to comparison"}
                        aria-pressed={isInComparison}
                        title={isInComparison ? "Already in comparison list" : "Add to comparison"}
                    >
                        {isInComparison ? "✓ Compare" : "+ Compare"}
                    </button>
                </div>
                <div className="absolute bottom-0 left-0 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {destination.matchScore ?? 0}% Match
                </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
                <div className="flex flex justify-between"><h3 className="text-lg font-semibold">{destination.name}</h3>
                    <button
                        className={`text-lg ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
                        onClick={handleFavoriteClick}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        aria-pressed={isFavorite}
                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        {isFavorite ? "❤️" : "🤍"}
                    </button></div>

                {/* Rating Section */}
                <div className="flex items-center text-yellow-500 mt-1">
                    {Array.from({ length: 5 }, (_, i) => (
                        <span key={i}>
                            {i < Math.floor(destination.rating || 0) ? "★" : "☆"}
                        </span>
                    ))}
                    {destination.rating !== undefined && (
                        <span className="ml-2 text-sm text-gray-600">
                            {(destination.rating).toFixed(1)}
                        </span>
                    )}
                    <span className="ml-1 text-xs text-gray-400">
                        ({destination.reviewCount ?? 0})
                    </span>
                </div>

                {/* Short Description */}
                <p className="text-gray-600 text-sm mt-2 line-clamp-2 overflow-hidden">
                    {destination.description || "No description available."}
                </p>

                {/* Interest Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {(destination.interests ?? []).slice(0, 3).map((interest) => (
                        <span
                            key={interest}
                            className="bg-gray-200 text-xs px-2 py-1 rounded"
                        >
                            {interest}
                        </span>
                    ))}
                </div>

                {/* Toggle Details */}
                <button
                    className="mt-3 text-blue-500 text-sm hover:underline"
                    onClick={handleToggleDetails}
                >
                    {showDetails ? "Show Less" : "Show More"}
                </button>

                {/* Detailed Section */}
                {showDetails && (
                    <div className="mt-3 border-t pt-3">
                        {destination.attractions?.length > 0 && (
                            <>
                                <h4 className="text-sm font-semibold">Top Attractions</h4>
                                <ul className="text-sm text-gray-600 list-disc list-inside">
                                    {destination.attractions.map((attraction) => (
                                        <li key={attraction}>{attraction}</li>
                                    ))}
                                </ul>
                            </>
                        )}

                        <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                            <InfoTile label="Best Season" value={destination.bestSeason} />
                            <InfoTile label="Budget Level" value={destination.budget} />
                            <InfoTile label="Ideal Duration" value={destination.travelDuration} />
                            <InfoTile
                                label="Good For"
                                value={(destination.goodFor ?? []).join(", ")}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const InfoTile = ({ label, value }) => (
    <div className="bg-gray-100 p-2 rounded">
        <span className="font-semibold">{label}:</span>{" "}
        {value && value !== "" ? value : "N/A"}
    </div>
);

export default RecommendationCard;
