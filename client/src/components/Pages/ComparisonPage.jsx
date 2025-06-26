import { useRecommendationStore } from "../store/recommendationStore";

const ComparisonPage = () => {
    const {
        recommendations,
        comparisonList,
        removeFromComparison,
        clearComparison
    } = useRecommendationStore();

    // Defensive fallback
    const comparedDestinations = (recommendations || []).filter(dest =>
        comparisonList.includes(dest.id)
    );

    if (comparedDestinations.length === 0) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">No destinations to compare</h2>
                <p className="text-gray-500">Add some destinations to the comparison list.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Compare Destinations</h1>
                <button
                    onClick={clearComparison}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Clear All
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {comparedDestinations.map(dest => (
                    <div key={dest.id} className="bg-white shadow-lg rounded-lg p-4">
                        <img
                            src={dest.image}
                            alt={dest.name}
                            className="h-40 w-full object-cover rounded mb-3"
                        />
                        <h2 className="text-xl font-semibold">{dest.name}</h2>
                        <p className="text-sm text-gray-600 mb-2">{dest.description}</p>

                        <ul className="text-sm text-gray-700 space-y-1">
                            <li><strong>Rating:</strong> {dest.rating} ({dest.reviewCount} reviews)</li>
                            <li><strong>Budget:</strong> {dest.budget}</li>
                            <li><strong>Best Season:</strong> {dest.bestSeason}</li>
                            <li><strong>Travel Duration:</strong> {dest.travelDuration}</li>
                            <li><strong>Good For:</strong> {dest.goodFor.join(", ")}</li>
                            <li><strong>Interests:</strong> {dest.interests.join(", ")}</li>
                            <li><strong>Match Score:</strong> {dest.matchScore}%</li>
                        </ul>

                        <button
                            onClick={() => removeFromComparison(dest.id)}
                            className="mt-4 text-sm text-red-500 hover:underline"
                        >
                            Remove from Comparison
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComparisonPage;
