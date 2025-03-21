// src/components/profile/TravelHistory.jsx
import React, { useState } from 'react';

const TravelHistory = ({ history = [] }) => {
    const [selectedTrip, setSelectedTrip] = useState(null);

    if (history.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 text-5xl mb-4">✈️</div>
                <h3 className="text-lg font-medium text-gray-800">No trips yet</h3>
                <p className="text-gray-500 mt-2">
                    Your travel adventures will appear here once you take your first trip.
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                    Find Your First Destination
                </button>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Your Travel History</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {history.map((trip) => (
                    <div
                        key={trip.id}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition duration-300 cursor-pointer"
                        onClick={() => setSelectedTrip(selectedTrip === trip.id ? null : trip.id)}
                    >
                        <div
                            className="h-40 bg-cover bg-center"
                            style={{ backgroundImage: `url(${trip.photos[0]})` }}
                        >
                            <div className="w-full h-full bg-black bg-opacity-30 flex items-end p-4">
                                <div>
                                    <h4 className="text-white font-semibold text-lg">{trip.destination}</h4>
                                    <div className="flex items-center text-white text-sm mt-1">
                                        <span>{new Date(trip.date).toLocaleDateString()}</span>
                                        <span className="mx-2">•</span>
                                        <span>{trip.duration}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectedTrip === trip.id && (
                            <div className="p-4">
                                <div className="flex items-center mb-3">
                                    <div className="text-yellow-500 mr-1">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={i < trip.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">{trip.rating}/5</span>
                                </div>

                                <p className="text-gray-600 mb-4">{trip.review}</p>

                                {trip.photos.length > 1 && (
                                    <div>
                                        <h5 className="text-sm font-medium text-gray-700 mb-2">Photos</h5>
                                        <div className="grid grid-cols-3 gap-2">
                                            {trip.photos.map((photo, index) => (
                                                <div key={index} className="h-16 rounded overflow-hidden">
                                                    <img src={photo} alt={`${trip.destination} ${index + 1}`} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4 flex space-x-3">
                                    <button className="text-sm px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
                                        Edit Review
                                    </button>
                                    <button className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                                        View Similar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TravelHistory;