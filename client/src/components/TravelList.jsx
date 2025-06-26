import React from 'react';



const TravelList = ({ people, title = "Past Travelers" }) => {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            <ul role="list" className="divide-y divide-gray-200">
                {people.map((person) => (
                    <li key={person.email} className="py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                className="h-12 w-12 rounded-full object-cover"
                                src={person.imageUrl}
                                alt={`${person.name}'s profile`}
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-900">{person.name}</p>
                                <p className="text-sm text-gray-500">{person.role}</p>
                                <p className="text-xs text-gray-400">{person.email}</p>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            {person.lastSeen ? (
                                <p>Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time></p>
                            ) : (
                                <p className="italic text-gray-400">Not seen recently</p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TravelList;
