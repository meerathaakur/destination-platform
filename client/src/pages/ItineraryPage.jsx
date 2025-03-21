import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItineraryBuilder from '../components/itinerary/ItineraryBuilder';
import ItineraryItem from '../components/itinerary/ItineraryItem';
import InteractiveMap from '../components/map/InteractiveMap';
import { getUserItinerary, saveUserItinerary } from '../services/userService';
import { getDestinationDetails } from '../services/recommendationService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ItineraryPage = () => {
    const { itineraryId } = useParams();
    const navigate = useNavigate();
    const [itinerary, setItinerary] = useState(null);
    const [destinations, setDestinations] = useState([]);
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [activeDay, setActiveDay] = useState(1);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [sharableLink, setSharableLink] = useState('');

    // Fetch itinerary data
    useEffect(() => {
        const fetchItinerary = async () => {
            try {
                setIsLoading(true);

                if (itineraryId === 'new') {
                    // Create a new empty itinerary
                    setItinerary({
                        id: 'temp-id',
                        title: 'New Itinerary',
                        startDate: null,
                        endDate: null,
                        destinations: [],
                        days: [],
                        notes: '',
                        isPublic: false,
                    });
                    setIsEditing(true);
                } else {
                    // Fetch existing itinerary
                    const data = await getUserItinerary(itineraryId);
                    setItinerary(data);

                    // Fetch destination details for each destination in the itinerary
                    const destinationPromises = data.destinations.map(id =>
                        getDestinationDetails(id)
                    );

                    const destinationData = await Promise.all(destinationPromises);
                    setDestinations(destinationData);

                    // Extract all activities from days
                    const allActivities = data.days.flatMap(day => day.activities);
                    setActivities(allActivities);
                }
            } catch (error) {
                console.error('Error fetching itinerary:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItinerary();
    }, [itineraryId]);

    const handleSaveItinerary = async () => {
        try {
            setIsLoading(true);
            const updatedItinerary = await saveUserItinerary(itinerary);
            setItinerary(updatedItinerary);
            setIsEditing(false);

            // If this was a new itinerary, redirect to the saved itinerary page
            if (itineraryId === 'new') {
                navigate(`/itinerary/${updatedItinerary.id}`, { replace: true });
            }
        } catch (error) {
            console.error('Error saving itinerary:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddDay = () => {
        const newDay = {
            day: itinerary.days.length + 1,
            activities: [],
            notes: ''
        };

        setItinerary({
            ...itinerary,
            days: [...itinerary.days, newDay]
        });

        // Set active day to newly added day
        setActiveDay(newDay.day);
    };

    const handleRemoveDay = (dayIndex) => {
        const updatedDays = itinerary.days.filter((_, index) => index !== dayIndex)
            .map((day, index) => ({ ...day, day: index + 1 }));

        setItinerary({
            ...itinerary,
            days: updatedDays
        });

        // Adjust active day if needed
        if (activeDay > updatedDays.length) {
            setActiveDay(Math.max(1, updatedDays.length));
        }
    };

    const handleAddActivity = (dayIndex, activity) => {
        const updatedDays = [...itinerary.days];
        updatedDays[dayIndex].activities.push({
            id: `activity-${Date.now()}`,
            ...activity
        });

        setItinerary({
            ...itinerary,
            days: updatedDays
        });

        // Update activities list
        setActivities([...activities, activity]);
    };

    const handleRemoveActivity = (dayIndex, activityId) => {
        const updatedDays = [...itinerary.days];
        updatedDays[dayIndex].activities = updatedDays[dayIndex].activities
            .filter(activity => activity.id !== activityId);

        setItinerary({
            ...itinerary,
            days: updatedDays
        });

        // Update activities list
        setActivities(activities.filter(activity => activity.id !== activityId));
    };

    const handleUpdateActivity = (dayIndex, activityId, updatedActivity) => {
        const updatedDays = [...itinerary.days];
        updatedDays[dayIndex].activities = updatedDays[dayIndex].activities.map(activity =>
            activity.id === activityId ? { ...activity, ...updatedActivity } : activity
        );

        setItinerary({
            ...itinerary,
            days: updatedDays
        });

        // Update activities list
        setActivities(activities.map(activity =>
            activity.id === activityId ? { ...activity, ...updatedActivity } : activity
        ));
    };

    const handleMoveActivity = (fromDayIndex, toDayIndex, activityId) => {
        const updatedDays = [...itinerary.days];
        const activityToMove = updatedDays[fromDayIndex].activities
            .find(activity => activity.id === activityId);

        // Remove from original day
        updatedDays[fromDayIndex].activities = updatedDays[fromDayIndex].activities
            .filter(activity => activity.id !== activityId);

        // Add to target day
        updatedDays[toDayIndex].activities.push(activityToMove);

        setItinerary({
            ...itinerary,
            days: updatedDays
        });
    };

    // const handleAddDestination = (destination) => {
    //     // Check if destination is already in the itinerary
    //     if (!itinerary.destinations.includes(destination.id)) {
    //         setItinerary({
    //             ...itinerary,
    //             destinations: [...itinerary.destinations, destination.id]
    //         });

    //         setDestinations([...destinations, destination]);
    //     }
    // };

    const handleRemoveDestination = (destinationId) => {
        setItinerary({
            ...itinerary,
            destinations: itinerary.destinations.filter(id => id !== destinationId)
        });

        setDestinations(destinations.filter(destination => destination.id !== destinationId));

        // Remove activities related to this destination
        const updatedDays = itinerary.days.map(day => ({
            ...day,
            activities: day.activities.filter(activity => activity.destinationId !== destinationId)
        }));

        setItinerary({
            ...itinerary,
            days: updatedDays
        });

        setActivities(activities.filter(activity => activity.destinationId !== destinationId));
    };

    const handleShare = () => {
        // Generate shareable link
        const link = `${window.location.origin}/shared-itinerary/${itinerary.id}`;
        setSharableLink(link);
        setShareModalOpen(true);
    };

    const handleUpdateDates = (startDate, endDate) => {
        setItinerary({
            ...itinerary,
            startDate,
            endDate
        });

        // If no days exist or if days don't match the date range, create empty days
        const durationDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;

        if (durationDays > 0 && (!itinerary.days.length || itinerary.days.length !== durationDays)) {
            const newDays = Array.from({ length: durationDays }, (_, i) => ({
                day: i + 1,
                date: new Date(new Date(startDate).setDate(new Date(startDate).getDate() + i)).toISOString().split('T')[0],
                activities: [],
                notes: ''
            }));

            setItinerary({
                ...itinerary,
                startDate,
                endDate,
                days: newDays
            });
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    {isEditing ? (
                        <input
                            type="text"
                            value={itinerary.title}
                            onChange={(e) => setItinerary({ ...itinerary, title: e.target.value })}
                            className="text-2xl font-bold px-2 py-1 border border-gray-300 rounded"
                        />
                    ) : (
                        <h1 className="text-3xl font-bold">{itinerary.title}</h1>
                    )}
                    {itinerary.startDate && itinerary.endDate && (
                        <p className="text-gray-600">
                            {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}
                            {' '}({itinerary.days.length} days)
                        </p>
                    )}
                </div>
                <div className="flex gap-3">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSaveItinerary}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Save Itinerary
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Edit Itinerary
                            </button>
                            <button
                                onClick={handleShare}
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                            >
                                Share
                            </button>
                        </>
                    )}
                </div>
            </div>

            {isEditing && (
                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <h2 className="text-xl font-semibold mb-3">Trip Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                                type="date"
                                value={itinerary.startDate || ''}
                                onChange={(e) => handleUpdateDates(e.target.value, itinerary.endDate)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <input
                                type="date"
                                value={itinerary.endDate || ''}
                                onChange={(e) => handleUpdateDates(itinerary.startDate, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                min={itinerary.startDate}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea
                            value={itinerary.notes || ''}
                            onChange={(e) => setItinerary({ ...itinerary, notes: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
                            placeholder="Add any general notes about your trip here..."
                        />
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left sidebar - Day navigation */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <h2 className="text-xl font-semibold mb-3">Trip Days</h2>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {itinerary.days.map((day, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveDay(day.day)}
                                    className={`w-full text-left px-4 py-2 rounded-md transition ${activeDay === day.day
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span>
                                            Day {day.day}
                                            {day.date && ` - ${new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`}
                                        </span>
                                        {isEditing && itinerary.days.length > 1 && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveDay(index);
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                    {day.activities.length > 0 && (
                                        <span className="text-sm text-gray-600">{day.activities.length} activities</span>
                                    )}
                                </button>
                            ))}
                        </div>
                        {isEditing && (
                            <button
                                onClick={handleAddDay}
                                className="w-full mt-3 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 flex items-center justify-center"
                            >
                                <span>+ Add Day</span>
                            </button>
                        )}
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-3">Destinations</h2>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {destinations.map(destination => (
                                <div
                                    key={destination.id}
                                    className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md"
                                >
                                    <div className="flex items-center">
                                        <img
                                            src={destination.imageUrl || '/images/destinations/placeholder.jpg'}
                                            alt={destination.name}
                                            className="w-10 h-10 rounded-full object-cover mr-3"
                                        />
                                        <span>{destination.name}</span>
                                    </div>
                                    {isEditing && (
                                        <button
                                            onClick={() => handleRemoveDestination(destination.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        {isEditing && (
                            <button
                                onClick={() => navigate('/recommendations', { state: { returnTo: `/itinerary/${itineraryId}` } })}
                                className="w-full mt-3 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 flex items-center justify-center"
                            >
                                <span>+ Add Destination</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Main content area */}
                <div className="lg:col-span-2">
                    {/* Map view */}
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <h2 className="text-xl font-semibold mb-3">Trip Map</h2>
                        <div className="h-64">
                            <InteractiveMap
                                destinations={destinations}
                                activities={activities}
                                activeDay={activeDay}
                                highlightDay={true}
                            />
                        </div>
                    </div>

                    {/* Day detail */}
                    {itinerary.days.length > 0 && (
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-semibold mb-4">
                                Day {activeDay} Itinerary
                                {itinerary.days[activeDay - 1]?.date &&
                                    ` - ${new Date(itinerary.days[activeDay - 1].date).toLocaleDateString()}`
                                }
                            </h2>

                            {isEditing && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Day Notes</label>
                                    <textarea
                                        value={itinerary.days[activeDay - 1]?.notes || ''}
                                        onChange={(e) => {
                                            const updatedDays = [...itinerary.days];
                                            updatedDays[activeDay - 1].notes = e.target.value;
                                            setItinerary({
                                                ...itinerary,
                                                days: updatedDays
                                            });
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md h-20"
                                        placeholder="Add notes for this day..."
                                    />
                                </div>
                            )}

                            <ItineraryBuilder
                                day={itinerary.days[activeDay - 1]}
                                destinations={destinations}
                                onAddActivity={(activity) => handleAddActivity(activeDay - 1, activity)}
                                onUpdateActivity={(activityId, activity) => handleUpdateActivity(activeDay - 1, activityId, activity)}
                                onRemoveActivity={(activityId) => handleRemoveActivity(activeDay - 1, activityId)}
                                onMoveActivity={(activityId, targetDayIndex) => handleMoveActivity(activeDay - 1, targetDayIndex, activityId)}
                                isEditing={isEditing}
                                availableDays={itinerary.days.length}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Share Modal */}
            {shareModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">Share Your Itinerary</h3>
                        <p className="mb-4">Share this link with friends and family:</p>
                        <div className="flex">
                            <input
                                type="text"
                                value={sharableLink}
                                readOnly
                                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                            />
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(sharableLink);
                                    alert('Link copied to clipboard!');
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                            >
                                Copy
                            </button>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setShareModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItineraryPage;