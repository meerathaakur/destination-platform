// src/components/profile/UserProfile.jsx
import React, { useState } from 'react';
import TravelHistory from './TravelHistory';

const UserProfile = ({ user = {} }) => {
    const defaultUser = {
        id: 'user123',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        avatar: '/images/avatar-placeholder.jpg',
        joined: '2023-06-15',
        preferences: {
            interests: ['Beach', 'Mountains', 'Cultural', 'Food'],
            travelStyle: ['Adventure', 'Relaxation'],
            budget: 'Medium',
            duration: '1-2 weeks'
        },
        travelHistory: [
            {
                id: 'trip1',
                destination: 'Bali, Indonesia',
                date: '2023-03-10',
                duration: '10 days',
                rating: 5,
                photos: ['data:image/jpeg;base64,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', '/images/destinations/bali2.jpg'],
                review: 'Amazing beaches and friendly locals. The food was incredible!'
            },
            {
                id: 'trip2',
                destination: 'Paris, France',
                date: '2022-09-22',
                duration: '7 days',
                rating: 4,
                photos: ['/images/destinations/paris1.jpg'],
                review: 'Beautiful city with so much history and culture.'
            }
        ]
    };

    const userData = { ...defaultUser, ...user };
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(userData);
    const [activeTab, setActiveTab] = useState('profile');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: value
        });
    };

    const handlePreferenceChange = (category, value, isChecked) => {
        const preferences = { ...editedUser.preferences };

        if (Array.isArray(preferences[category])) {
            if (isChecked) {
                preferences[category] = [...preferences[category], value];
            } else {
                preferences[category] = preferences[category].filter(item => item !== value);
            }
        } else {
            preferences[category] = value;
        }

        setEditedUser({
            ...editedUser,
            preferences
        });
    };
    const handleSaveProfile = () => {
        // Here you would typically send the updated data to your backend
        console.log('Saving profile data:', editedUser);
        // Update the user data (simulating API update)
        // userData = { ...editedUser };
        setIsEditing(false);
        alert('Profile updated successfully!');
    };
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white mb-4 md:mb-0 md:mr-6">
                        <img
                            src={userData.avatar}
                            alt={userData.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{userData.name}</h2>
                        <p className="text-blue-100">Member since {new Date(userData.joined).toLocaleDateString()}</p>
                        <p className="mt-1">{userData.email}</p>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-auto">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="px-4 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition duration-300"
                        >
                            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-4 py-3 font-medium text-sm ${activeTab === 'profile'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('preferences')}
                        className={`px-4 py-3 font-medium text-sm ${activeTab === 'preferences'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Travel Preferences
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-4 py-3 font-medium text-sm ${activeTab === 'history'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Travel History
                    </button>
                </nav>
            </div>

            {/* Content Panels */}
            <div className="p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Account Information</h3>

                        {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedUser.name}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editedUser.email}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <button
                                        onClick={handleSaveProfile}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                                        <p>{userData.name}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
                                        <p>{userData.email}</p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-500">Account Security</h4>
                                    <div className="mt-2">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Travel Preferences</h3>

                        {isEditing ? (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Interests
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {['Beach', 'Mountains', 'Cultural', 'Food', 'Adventure', 'Relaxation', 'City', 'Nature'].map(interest => (
                                            <label key={interest} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={editedUser.preferences.interests.includes(interest)}
                                                    onChange={(e) => handlePreferenceChange('interests', interest, e.target.checked)}
                                                    className="mr-2"
                                                />
                                                <span>{interest}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Budget Preference
                                    </label>
                                    <select
                                        value={editedUser.preferences.budget}
                                        onChange={(e) => handlePreferenceChange('budget', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    >
                                        <option value="Budget">Budget Friendly</option>
                                        <option value="Medium">Medium Range</option>
                                        <option value="Luxury">Luxury</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Preferred Trip Duration
                                    </label>
                                    <select
                                        value={editedUser.preferences.duration}
                                        onChange={(e) => handlePreferenceChange('duration', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    >
                                        <option value="Weekend">Weekend (1-3 days)</option>
                                        <option value="Short">Short Trip (4-7 days)</option>
                                        <option value="1-2 weeks">Medium Trip (1-2 weeks)</option>
                                        <option value="Long">Long Trip (2+ weeks)</option>
                                    </select>
                                </div>

                                <div>
                                    <button
                                        onClick={handleSaveProfile}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                                    >
                                        Save Preferences
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Interests</h4>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {userData.preferences.interests.map(interest => (
                                            <span
                                                key={interest}
                                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                                            >
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Travel Style</h4>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {userData.preferences.travelStyle.map(style => (
                                            <span
                                                key={style}
                                                className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs"
                                            >
                                                {style}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Budget Preference</h4>
                                        <p>{userData.preferences.budget}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Preferred Trip Duration</h4>
                                        <p>{userData.preferences.duration}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                    <TravelHistory history={userData.travelHistory} />
                )}
            </div>
        </div>
    );
};

export default UserProfile;