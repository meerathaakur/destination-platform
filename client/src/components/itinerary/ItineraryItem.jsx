import React, { useState } from 'react';

const ActivityIcons = {
    'Sightseeing': '🏛️',
    'Food & Dining': '🍽️',
    'Activity': '🏄‍♂️',
    'Transportation': '🚗',
    'Accommodation': '🏨',
    'Other': '📌'
};

const ItineraryItem = ({ activity, onUpdate, onRemove, isEditing }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isInEditMode, setIsInEditMode] = useState(isEditing); // Renamed to avoid conflict
    const [editedActivity, setEditedActivity] = useState({ ...activity });

    const handleChange = (field, value) => {
        setEditedActivity(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(editedActivity);
        setIsInEditMode(false); // Close edit mode after submitting
    };

    const formatTime = (time) => {
        if (!time) return '';

        try {
            // Parse the time string (HH:MM format)
            const [hours, minutes] = time.split(':');

            // Create a date object to leverage the date formatter
            const date = new Date();
            date.setHours(parseInt(hours, 10));
            date.setMinutes(parseInt(minutes, 10));

            // Format to 12-hour time
            return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        } catch (error) {
            console.error('Error formatting time:', error);
            return time; // Return the original time if parsing fails
        }
    };

    const renderViewMode = () => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center">
                    <span className="text-2xl mr-3" role="img" aria-label={activity.type}>
                        {ActivityIcons[activity.type] || '📌'}
                    </span>
                    <div>
                        <h4 className="font-medium text-lg">{activity.title}</h4>
                        <div className="text-sm text-gray-600">
                            {activity.startTime && (
                                <span className="mr-3">{formatTime(activity.startTime)}</span>
                            )}
                            {activity.endTime && activity.startTime && (
                                <span className="mr-3">- {formatTime(activity.endTime)}</span>
                            )}
                            {activity.location && (
                                <span className="mr-3">📍 {activity.location}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    {isInEditMode && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsInEditMode(true); // Set to edit mode
                                    setEditedActivity({ ...activity });
                                }}
                                className="text-blue-600 hover:text-blue-800 mr-3"
                            >
                                Edit
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove();
                                }}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </>
                    )}
                    <span className="ml-2 text-gray-400">
                        {isExpanded ? '▲' : '▼'}
                    </span>
                </div>
            </div>

            {isExpanded && activity.notes && (
                <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="mt-3">
                        <p className="text-gray-700 whitespace-pre-line">{activity.notes}</p>
                    </div>
                </div>
            )}
        </div>
    );

    const renderEditMode = () => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-4">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Activity Title</label>
                        <input
                            type="text"
                            value={editedActivity.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
                        <select
                            value={editedActivity.type}
                            onChange={(e) => handleChange('type', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                            {Object.keys(ActivityIcons).map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                        <input
                            type="time"
                            value={editedActivity.startTime || ''}
                            onChange={(e) => handleChange('startTime', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                        <input
                            type="time"
                            value={editedActivity.endTime || ''}
                            onChange={(e) => handleChange('endTime', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                        type="text"
                        value={editedActivity.location || ''}
                        onChange={(e) => handleChange('location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                        value={editedActivity.notes || ''}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
                    />
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => setIsInEditMode(false)} // Close edit mode
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );

    return isInEditMode ? renderEditMode() : renderViewMode(); // Use isInEditMode instead of isEditing
};

export default ItineraryItem;
