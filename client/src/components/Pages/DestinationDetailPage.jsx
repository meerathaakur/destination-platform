import { useParams, useNavigate } from "react-router-dom";
import { useRecommendationStore } from "../store/recommendationStore";

const DestinationDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { recommendations } = useRecommendationStore();

    const destination = recommendations.find((dest) => dest.id === id);

    if (!destination) {
        return (
            <div className="p-6 text-center text-gray-600">
                <h2 className="text-xl font-semibold">Destination not found</h2>
                <p className="mt-2">Please go back and select a valid destination.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
                ← Back
            </button>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                    src={destination.image || "/images/destinations/placeholder.jpg"}
                    alt={destination.name}
                    className="w-full h-64 object-cover"
                />

                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{destination.name}</h2>

                    <div className="flex items-center text-yellow-500 mb-2">
                        {Array.from({ length: 5 }, (_, i) => (
                            <span key={i}>
                                {i < Math.floor(destination.rating || 0) ? "★" : "☆"}
                            </span>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                            {(destination.rating ?? 0).toFixed(1)} ({destination.reviewCount ?? 0})
                        </span>
                    </div>

                    <p className="text-gray-700 mb-4">{destination.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                            <strong>Best Season:</strong> {destination.bestSeason || "N/A"}
                        </div>
                        <div>
                            <strong>Budget:</strong> {destination.budget || "N/A"}
                        </div>
                        <div>
                            <strong>Travel Duration:</strong> {destination.travelDuration || "N/A"}
                        </div>
                        <div>
                            <strong>Good For:</strong> {(destination.goodFor ?? []).join(", ") || "N/A"}
                        </div>
                    </div>

                    {destination.attractions?.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-md font-semibold mb-1">Top Attractions:</h4>
                            <ul className="list-disc list-inside text-gray-600">
                                {destination.attractions.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {destination.interests?.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-md font-semibold mb-1">Interests:</h4>
                            <div className="flex flex-wrap gap-2">
                                {destination.interests.map((interest) => (
                                    <span
                                        key={interest}
                                        className="bg-gray-200 px-2 py-1 rounded text-xs"
                                    >
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {destination.activities?.length > 0 && (
                        <div>
                            <h4 className="text-md font-semibold mb-1">Popular Activities:</h4>
                            <div className="flex flex-wrap gap-2">
                                {destination.activities.map((activity) => (
                                    <span
                                        key={activity}
                                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                                    >
                                        {activity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DestinationDetailPage;
