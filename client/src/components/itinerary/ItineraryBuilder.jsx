import React, { useState } from 'react';
import ItineraryItem from './ItineraryItem';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ActivityTypes = {
    SIGHTSEEING: 'Sightseeing',
    FOOD: 'Food & Dining',
    ACTIVITY: 'Activity',
    TRANSPORTATION: 'Transportation',
    ACCOMMODATION: 'Accommodation',
    OTHER: 'Other'
};

const DraggableItem = ({ activity, index, dayId, onMove, onUpdate, onRemove, isEditing }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ACTIVITY',
        item: { id: activity.id, index, dayId },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        canDrag: () => isEditing,
    }));

    return (
        <div
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="mb-3"
        >
            <ItineraryItem
                activity={activity}
                onUpdate={onUpdate}
                onRemove={onRemove}
                isEditing={isEditing}
            />
        </div>
    );
};

const ItineraryBuilder = ({
    day,
    destinations,
    onAddActivity,
    onUpdateActivity,
    onRemoveActivity,
    onMoveActivity,
    isEditing,
    availableDays
}) => {
    const [newActivity, setNewActivity] = useState({
        title: '',
        type: ActivityTypes.SIGHTSEEING,
        startTime: '',
        endTime: '',
        location: '',
        notes: '',
        destinationId: '',
    });

    const [formVisible, setFormVisible] = useState(false);
    const [moveToDay, setMoveToDay] = useState(day.day);

    const handleActivityChange = (field, value) => {
        setNewActivity((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddActivity = (e) => {
        e.preventDefault();
        onAddActivity(newActivity);
        setNewActivity({
            title: '',
            type: ActivityTypes.SIGHTSEEING,
            startTime: '',
            endTime: '',
            location: '',
            notes: '',
            destinationId: '',
        });
        setFormVisible(false);
    };

    const handleMoveActivity = (activityId) => {
        const targetDayIndex = moveToDay - 1;
        onMoveActivity(activityId, targetDayIndex);
    };

    // Sort activities by start time
    const sortedActivities = [...day?.activities || []].sort((a, b) => {
        if (!a.startTime && !b.startTime) return 0;
        if (!a.startTime) return 1;
        if (!b.startTime) return -1;
        return a.startTime.localeCompare(b.startTime);
    });

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="itinerary-builder">
                {sortedActivities.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-md">
                        <p className="text-gray-500">No activities planned for this day yet.</p>
                        {isEditing && (
                            <button
                                onClick={() => setFormVisible(true)}
                                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Add First Activity
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {sortedActivities.map((activity, index) => (
                            <div key={activity.id} className="relative">
                                <DraggableItem
                                    activity={activity}
                                    index={index}
                                    dayId={day.day}
                                    onMove={handleMoveActivity}
                                    onUpdate={(updatedActivity) => onUpdateActivity(activity.id, updatedActivity)}
                                    onRemove={() => onRemoveActivity(activity.id)}
                                    isEditing={isEditing}
                                />

                                {isEditing && (
                                    <div className="mt-1 ml-4 flex items-center">
                                        <select
                                            value={moveToDay}
                                            onChange={(e) => setMoveToDay(parseInt(e.target.value))}
                                            className="text-sm px-2 py-1 border border-gray-300 rounded mr-2"
                                        >
                                            {Array.from({ length: availableDays }, (_, i) => (
                                                <option
                                                    key={i}
                                                    value={i + 1}
                                                    disabled={i + 1 === day.day}
                                                >
                                                    Move to Day {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={() => handleMoveActivity(activity.id)}
                                            className="text-sm px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                            disabled={moveToDay === day.day}
                                        >
                                            Move
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}

                        {isEditing && !formVisible && (
                            <button
                                onClick={() => setFormVisible(true)}
                                className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 flex items-center justify-center"
                            >
                                <span>+ Add Activity</span>
                            </button>
                        )}
                    </div>
                )}

                {formVisible && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-md">
                        <h3 className="text-lg font-medium mb-3">Add New Activity</h3>
                        <form onSubmit={handleAddActivity}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Activity Title</label>
                                    <input
                                        type="text"
                                        value={newActivity.title}
                                        onChange={(e) => handleActivityChange('title', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
                                    <select
                                        value={newActivity.type}
                                        onChange={(e) => handleActivityChange('type', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    >
                                        {Object.values(ActivityTypes).map(type => (
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
                                        value={newActivity.startTime}
                                        onChange={(e) => handleActivityChange('startTime', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                    <input
                                        type="time"
                                        value={newActivity.endTime}
                                        onChange={(e) => handleActivityChange('endTime', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    value={newActivity.location}
                                    onChange={(e) => handleActivityChange('location', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Related Destination</label>
                                <select
                                    value={newActivity.destinationId}
                                    onChange={(e) => handleActivityChange('destinationId', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">-- Not specific to a destination --</option>
                                    {destinations.map(destination => (
                                        <option key={destination.id} value={destination.id}>
                                            {destination.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                <textarea
                                    value={newActivity.notes}
                                    onChange={(e) => handleActivityChange('notes', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Add Activity
                            </button>

                            <button
                                type="button"
                                onClick={() => setFormVisible(false)}
                                className="mt-2 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </DndProvider>
    );
};

export default ItineraryBuilder;
