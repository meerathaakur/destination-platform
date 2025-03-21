import React, { useState, useMemo } from 'react';
import { Star, ThumbsUp, Flag, ChevronDown, ChevronUp } from 'lucide-react';

const ReviewList = ({ reviews = [], onHelpfulClick }) => {
    const [sortBy, setSortBy] = useState('newest');
    const [filterRating, setFilterRating] = useState(0);
    const [showFilters, setShowFilters] = useState(false);

    // Memoized sorting logic for efficiency
    const sortedReviews = useMemo(() => {
        return [...reviews].sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'highest':
                    return b.rating - a.rating;
                case 'lowest':
                    return a.rating - b.rating;
                case 'helpful':
                    return (b.helpfulCount || 0) - (a.helpfulCount || 0);
                default:
                    return 0;
            }
        });
    }, [reviews, sortBy]);

    // Memoized filtering logic
    const filteredReviews = useMemo(() => {
        return filterRating > 0
            ? sortedReviews.filter((review) => review.rating === filterRating)
            : sortedReviews;
    }, [sortedReviews, filterRating]);

    // Format date helper function
    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown';
        return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
    };

    // Travel type display names
    const travelTypeNames = {
        solo: 'Solo Traveler',
        couple: 'Couple',
        family: 'Family',
        friends: 'Friends',
        business: 'Business Traveler'
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Traveler Reviews</h3>
                <button
                    className="text-blue-600 flex items-center"
                    onClick={() => setShowFilters(!showFilters)}
                    aria-label="Toggle Filters"
                >
                    Filter & Sort
                    {showFilters ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
                </button>
            </div>

            {showFilters && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-2">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                aria-label="Sort Reviews"
                            >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="highest">Highest Rating</option>
                                <option value="lowest">Lowest Rating</option>
                                <option value="helpful">Most Helpful</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-2">Filter By Rating</label>
                            <div className="flex items-center space-x-2">
                                {[0, 5, 4, 3, 2, 1].map((rating) => (
                                    <button
                                        key={rating}
                                        className={`px-3 py-1 rounded-md transition ${filterRating === rating
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                            }`}
                                        onClick={() => setFilterRating(rating)}
                                        aria-label={`Filter by ${rating === 0 ? 'All ratings' : `${rating}-star rating`}`}
                                    >
                                        {rating === 0 ? 'All' : `${rating}★`}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {filteredReviews.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No reviews match your criteria.</div>
            ) : (
                <div className="space-y-6">
                    {filteredReviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={`${i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                                    }`}
                                                fill={i < review.rating ? 'currentColor' : 'none'}
                                            />
                                        ))}
                                    </div>
                                    <h4 className="font-semibold text-lg">{review.title}</h4>
                                </div>
                                <div className="text-sm text-gray-500">{formatDate(review.createdAt)}</div>
                            </div>

                            <div className="mt-2 text-sm text-gray-600">
                                {review.travelType && (
                                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                        {travelTypeNames[review.travelType] || 'Traveler'}
                                    </span>
                                )}
                                {review.visitDate && (
                                    <span className="ml-2 text-gray-500">Visited: {formatDate(review.visitDate)}</span>
                                )}
                            </div>

                            <p className="mt-3 text-gray-700">{review.comment}</p>

                            <div className="mt-4 flex items-center text-sm text-gray-500">
                                <button
                                    className="flex items-center mr-6 hover:text-blue-600"
                                    onClick={() => onHelpfulClick(review.id)}
                                    aria-label="Mark as helpful"
                                >
                                    <ThumbsUp size={14} className="mr-1" />
                                    Helpful{review.helpfulCount > 0 ? ` (${review.helpfulCount})` : ''}
                                </button>
                                <button className="flex items-center hover:text-red-600" aria-label="Report review">
                                    <Flag size={14} className="mr-1" />
                                    Report
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewList;
