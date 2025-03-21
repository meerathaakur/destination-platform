// src/components/reviews/ReviewForm.jsx
import React, { useState } from 'react';

const ReviewForm = ({ destinationId, onSubmitReview }) => {
    const [reviewData, setReviewData] = useState({
        rating: 0,
        title: '',
        content: '',
        visitDate: '',
        travelType: 'solo',
        photos: [],
        tags: []
    });

    const [hoveredRating, setHoveredRating] = useState(0);
    const [errors, setErrors] = useState({});

    const travelTypes = [
        { value: 'solo', label: 'Solo Travel' },
        { value: 'couple', label: 'Couple' },
        { value: 'family', label: 'Family' },
        { value: 'friends', label: 'Friends' },
        { value: 'business', label: 'Business' }
    ];

    const commonTags = [
        'Beautiful Views', 'Family Friendly', 'Good Food', 'Adventure',
        'Relaxing', 'Cultural', 'Historical', 'Budget Friendly', 'Luxury'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReviewData({ ...reviewData, [name]: value });
    };

    const handleRatingClick = (rating) => {
        setReviewData({ ...reviewData, rating });
    };

    const handleTagToggle = (tag) => {
        const updatedTags = reviewData.tags.includes(tag)
            ? reviewData.tags.filter(t => t !== tag)
            : [...reviewData.tags, tag];

        setReviewData({ ...reviewData, tags: updatedTags });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        const newErrors = {};
        if (reviewData.rating === 0) newErrors.rating = 'Please select a rating';
        if (!reviewData.title.trim()) newErrors.title = 'Please provide a title';
        if (!reviewData.content.trim()) newErrors.content = 'Please provide review content';
        if (!reviewData.visitDate) newErrors.visitDate = 'Please select when you visited';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Clear errors
        setErrors({});

        // Submit review
        onSubmitReview({
            ...reviewData,
            destinationId,
            createdAt: new Date().toISOString(),
        });

        // Reset form
        setReviewData({
            rating: 0,
            title: '',
            content: '',
            visitDate: '',
            travelType: 'solo',
            photos: [],
            tags: []
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // In a real app, you'd upload these files to your server
        // and get back URLs. Here we're just creating fake URLs
        const newPhotos = files.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file)
        }));

        setReviewData({
            ...reviewData,
            photos: [...reviewData.photos, ...newPhotos]
        });
    };

    const removePhoto = (index) => {
        const newPhotos = [...reviewData.photos];
        newPhotos.splice(index, 1);
        setReviewData({ ...reviewData, photos: newPhotos });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">Write a Review</h3>

            {/* Rating */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Rating
                </label>
                <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingClick(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="text-2xl focus:outline-none"
                        >
                            <span className={`${(hoveredRating || reviewData.rating) >= star
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}>
                                ★
                            </span>
                        </button>
                    ))}

                    <span className="ml-2 text-sm text-gray-500">
                        {reviewData.rating > 0 ? `${reviewData.rating}/5` : 'Select a rating'}
                    </span>
                </div>
                {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
            </div>

            {/* Review Title */}
            <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Review Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={reviewData.title}
                    onChange={handleInputChange}
                    placeholder="Summarize your experience"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Review Content */}
            <div className="mb-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                </label>
                <textarea
                    id="content"
                    name="content"
                    value={reviewData.content}
                    onChange={handleInputChange}
                    rows="5"
                    placeholder="Share your experience to help other travelers"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                ></textarea>
                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
            </div>

            {/* Visit Date */}
            <div className="mb-6">
                <label htmlFor="visitDate" className="block text-sm font-medium text-gray-700 mb-2">
                    When did you visit?
                </label>
                <input
                    type="month"
                    id="visitDate"
                    name="visitDate"
                    value={reviewData.visitDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.visitDate && <p className="text-red-500 text-xs mt-1">{errors.visitDate}</p>}
            </div>

            {/* Travel Type */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Type
                </label>
                <div className="flex flex-wrap gap-2">
                    {travelTypes.map(type => (
                        <label key={type.value} className="flex items-center">
                            <input
                                type="radio"
                                name="travelType"
                                value={type.value}
                                checked={reviewData.travelType === type.value}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <span>{type.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                    {commonTags.map(tag => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagToggle(tag)}
                            className={`px-3 py-1 rounded-full text-sm ${reviewData.tags.includes(tag)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Photo Upload */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Photos (Optional)
                </label>

                <div className="flex items-center">
                    <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition duration-300">
                        <span>Select Photos</span>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                    <span className="ml-2 text-sm text-gray-500">
                        Up to 5 photos
                    </span>
                </div>

                {reviewData.photos.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {reviewData.photos.map((photo, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={photo.url}
                                    alt={`Uploaded preview ${index + 1}`}
                                    className="w-full h-24 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => removePhoto(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300"
                >
                    Submit Review
                </button>
            </div>
        </form>
    );
};

export default ReviewForm;
