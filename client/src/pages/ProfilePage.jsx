import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import "../styles/components/UserProfile.scss"

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('preferences');
    const [userProfile, setUserProfile] = useState(null);

    // Mock data - in a real app, this would come from an API call
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setUserProfile({
                name: "Alex Johnson",
                email: "alex.johnson@example.com",
                profileImage: "https://res.cloudinary.com/dagmoqwr5/image/upload/v1741263602/samples/smile.jpg",
                joinDate: "January 2023",
                preferences: {
                    travelStyle: ["Adventure", "Cultural", "Budget-friendly"],
                    interests: ["Hiking", "Local Cuisine", "Historical Sites", "Photography"],
                    avoidances: ["Crowded Tourist Spots", "Extreme Weather"],
                    budgetRange: "$1,000 - $3,000",
                    tripLength: "1-2 weeks"
                },
                travelHistory: [
                    {
                        id: 1,
                        destination: "Kyoto, Japan",
                        date: "March 2024",
                        rating: 5,
                        highlights: ["Fushimi Inari Shrine", "Traditional Tea Ceremony", "Arashiyama Bamboo Grove"]
                    },
                    {
                        id: 2,
                        destination: "Barcelona, Spain",
                        date: "August 2023",
                        rating: 4,
                        highlights: ["Sagrada Familia", "Park Güell", "La Boqueria Market"]
                    },
                    {
                        id: 3,
                        destination: "Bali, Indonesia",
                        date: "December 2022",
                        rating: 5,
                        highlights: ["Ubud Monkey Forest", "Rice Terraces", "Uluwatu Temple"]
                    }
                ],
                savedDestinations: [
                    {
                        id: 101,
                        name: "Santorini, Greece",
                        image: "https://res.cloudinary.com/dagmoqwr5/image/upload/v1742586935/gf54ikr5urvxzt8z6gqp.jpg",
                        description: "Stunning white-washed buildings with blue domes overlooking the Aegean Sea.",
                        matchScore: 92
                    },
                    {
                        id: 102,
                        name: "Cusco, Peru",
                        image: "https://res.cloudinary.com/dagmoqwr5/image/upload/v1742586987/nhih91kehrpqbksjmutv.jpg",
                        description: "Ancient Incan capital near Machu Picchu with rich history and culture.",
                        matchScore: 88
                    },
                    {
                        id: 103,
                        name: "Queenstown, New Zealand",
                        image: "https://res.cloudinary.com/dagmoqwr5/image/upload/v1742587033/k3nsqzscxevrcnv7a6ge.jpg",
                        description: "Adventure capital surrounded by mountains and Lake Wakatipu.",
                        matchScore: 85
                    }
                ],
                upcomingTrips: [
                    {
                        id: 201,
                        destination: "Prague, Czech Republic",
                        startDate: "2025-06-15",
                        endDate: "2025-06-22",
                    }
                ]
            });
            setIsLoading(false);
        }, 1500);
    }, []);

    // Rating stars component
    const RatingStars = ({ rating }) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    if (isLoading) {
        return <LoadingSpinner fullScreen={true} />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="relative">
                        <img
                            src={userProfile.profileImage}
                            alt={userProfile.name}
                            className="rounded-full w-24 h-24 object-cover border-4 border-blue-500"
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/150";
                            }}
                        />
                        <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                        <p className="text-gray-600">{userProfile.email}</p>
                        <p className="text-gray-500 text-sm">Member since {userProfile.joinDate}</p>

                        <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                            {userProfile.preferences.travelStyle.map((style) => (
                                <span
                                    key={style}
                                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                                >
                                    {style}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
                        >
                            Edit Profile
                        </button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition-colors">
                            Account Settings
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile Content Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                    <li className="mr-2">
                        <button
                            className={`inline-block p-4 rounded-t-lg ${activeTab === 'preferences'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                                }`}
                            onClick={() => setActiveTab('preferences')}
                        >
                            Travel Preferences
                        </button>
                    </li>
                    <li className="mr-2">
                        <button
                            className={`inline-block p-4 rounded-t-lg ${activeTab === 'history'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                                }`}
                            onClick={() => setActiveTab('history')}
                        >
                            Travel History
                        </button>
                    </li>
                    <li className="mr-2">
                        <button
                            className={`inline-block p-4 rounded-t-lg ${activeTab === 'saved'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                                }`}
                            onClick={() => setActiveTab('saved')}
                        >
                            Saved Destinations
                        </button>
                    </li>
                    <li>
                        <button
                            className={`inline-block p-4 rounded-t-lg ${activeTab === 'upcoming'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                                }`}
                            onClick={() => setActiveTab('upcoming')}
                        >
                            Upcoming Trips
                        </button>
                    </li>
                </ul>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Your Travel Preferences</h2>
                            <Link to="/survey" className="text-blue-600 hover:text-blue-800 flex items-center">
                                <span>Update Preferences</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium text-gray-700 mb-2">Travel Style</h3>
                                <div className="flex flex-wrap gap-2">
                                    {userProfile.preferences.travelStyle.map((style) => (
                                        <span key={style} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                            {style}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium text-gray-700 mb-2">Budget Range</h3>
                                <p>{userProfile.preferences.budgetRange}</p>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium text-gray-700 mb-2">Trip Length</h3>
                                <p>{userProfile.preferences.tripLength}</p>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium text-gray-700 mb-2">Interests</h3>
                                <div className="flex flex-wrap gap-2">
                                    {userProfile.preferences.interests.map((interest) => (
                                        <span key={interest} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="border rounded-lg p-4 md:col-span-2">
                                <h3 className="font-medium text-gray-700 mb-2">Avoidances</h3>
                                <div className="flex flex-wrap gap-2">
                                    {userProfile.preferences.avoidances.map((avoidance) => (
                                        <span key={avoidance} className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                            {avoidance}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Travel History Tab */}
                {activeTab === 'history' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Your Travel History</h2>
                            <button className="text-blue-600 hover:text-blue-800 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                <span>Add Trip</span>
                            </button>
                        </div>

                        {userProfile.travelHistory.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">You haven't added any trips yet.</p>
                                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
                                    Add Your First Trip
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {userProfile.travelHistory.map((trip) => (
                                    <div key={trip.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex flex-col md:flex-row justify-between">
                                            <div>
                                                <h3 className="font-semibold text-lg">{trip.destination}</h3>
                                                <p className="text-gray-600">{trip.date}</p>
                                            </div>
                                            <div className="mt-2 md:mt-0">
                                                <RatingStars rating={trip.rating} />
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <h4 className="text-sm font-medium text-gray-700">Highlights:</h4>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {trip.highlights.map((highlight, index) => (
                                                    <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                        {highlight}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-2 space-x-2">
                                            <button className="text-gray-600 hover:text-gray-800">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Saved Destinations Tab */}
                {activeTab === 'saved' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Your Saved Destinations</h2>
                            <Link to="/destinations" className="text-blue-600 hover:text-blue-800 flex items-center">
                                <span>Explore More</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userProfile.savedDestinations.map((destination) => (
                                <div key={destination.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="relative h-48">
                                        <img
                                            src={destination.image}
                                            alt={destination.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/400x200?text=Destination";
                                            }}
                                        />
                                        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                                            <button className="text-red-500 hover:text-red-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                            {destination.matchScore}% Match
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg">{destination.name}</h3>
                                        <p className="text-gray-600 text-sm mt-1">{destination.description}</p>

                                        <div className="mt-4 flex justify-between">
                                            <Link to={`/destinations/${destination.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                View Details
                                            </Link>
                                            <Link to={`/itinerary/create/${destination.id}`} className="text-green-600 hover:text-green-800 text-sm font-medium">
                                                Plan Trip
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Upcoming Trips Tab */}
                {activeTab === 'upcoming' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Your Upcoming Trips</h2>
                            <Link to="/itinerary/create" className="text-blue-600 hover:text-blue-800 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                <span>Plan New Trip</span>
                            </Link>
                        </div>

                        {userProfile.upcomingTrips.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">You have no upcoming trips.</p>
                                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
                                    Plan Your First Trip
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {userProfile.upcomingTrips.map((trip) => {
                                    const startDate = new Date(trip.startDate);
                                    const endDate = new Date(trip.endDate);
                                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                                    const formattedStart = startDate.toLocaleDateString(undefined, options);
                                    const formattedEnd = endDate.toLocaleDateString(undefined, options);

                                    const today = new Date();
                                    const daysUntil = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));

                                    return (
                                        <div key={trip.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex flex-col md:flex-row justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-lg">{trip.destination}</h3>
                                                    <p className="text-gray-600">{formattedStart} - {formattedEnd}</p>
                                                </div>
                                                <div className="mt-2 md:mt-0 bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                                                    {daysUntil} days away
                                                </div>
                                            </div>

                                            <div className="flex justify-end mt-4 space-x-2">
                                                <Link to={`/itinerary/${trip.id}`} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm transition-colors">
                                                    View Itinerary
                                                </Link>
                                                <button className="bg-red-50 text-red-700 hover:bg-red-100 py-1 px-3 rounded text-sm transition-colors">
                                                    Cancel Trip
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;