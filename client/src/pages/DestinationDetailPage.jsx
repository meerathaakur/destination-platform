import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaHeart, FaShareAlt, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaUmbrellaBeach, FaUtensils, FaCamera, FaHiking } from 'react-icons/fa';
import { MdCompareArrows } from 'react-icons/md';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';
import InteractiveMap from '../components/map/InteractiveMap';
import ItineraryBuilder from '../components/itinerary/ItineraryBuilder';
import { getDestinationById } from '../services/recommendationService';
import { addToFavorites, checkIfFavorite } from '../services/userService';
// import {userService}from "../services/userService.js"
import '../styles/components/DestinationDetailPage.scss';

const DestinationDetailPage = () => {
    const { id } = useParams();
    const [destination, setDestination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [isFavorite, setIsFavorite] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [compareList, setCompareList] = useState([]);

    useEffect(() => {
        const fetchDestinationDetails = async () => {
            try {
                setLoading(true);
                // Fetch destination details from API
                const data = await getDestinationById(id);
                setDestination(data);

                // Check if destination is in user's favorites
                const favoriteStatus = await checkIfFavorite(id);
                setIsFavorite(favoriteStatus);

                // Get compare list from localStorage or state management
                const storedCompareList = JSON.parse(localStorage.getItem('compareList')) || [];
                setCompareList(storedCompareList);

                setLoading(false);
            } catch (err) {
                setError('Failed to load destination details');
                setLoading(false);
                console.error('Error fetching destination details:', err);
            }
        };

        fetchDestinationDetails();
    }, [id]);

    const handleFavoriteToggle = async () => {
        try {
            await addToFavorites(id, !isFavorite);
            setIsFavorite(!isFavorite);
        } catch (err) {
            console.error('Error toggling favorite status:', err);
        }
    };

    const handleAddToCompare = () => {
        const isAlreadyInList = compareList.some(item => item.id === destination.id);

        if (!isAlreadyInList) {
            const newCompareList = [...compareList, {
                id: destination.id,
                name: destination.name,
                image: destination.images[0]
            }];

            // Store in localStorage or state management
            localStorage.setItem('compareList', JSON.stringify(newCompareList));
            setCompareList(newCompareList);
        }
    };

    const renderWeatherInfo = () => {
        const { weather } = destination;

        return (
            <div className="weather-info">
                <h3>Weather & Climate</h3>
                <div className="seasons-container">
                    {Object.entries(weather.seasons).map(([season, data]) => (
                        <div key={season} className="season-card">
                            <h4>{season}</h4>
                            <p>Avg. Temp: {data.avgTemp}°C</p>
                            <p>Precipitation: {data.precipitation}</p>
                            <p>{data.description}</p>
                        </div>
                    ))}
                </div>
                <div className="best-time">
                    <h4>Best Time to Visit</h4>
                    <p>{weather.bestTimeToVisit}</p>
                </div>
            </div>
        );
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="error-message">{error}</div>;
    if (!destination) return <div className="error-message">Destination not found</div>;

    const {
        name,
        images,
        description,
        rating,
        reviewCount,
        location,
        travelTypes,
        activities,
        accommodations,
        costLevel,
        bestSeasons,
        localCuisine
    } = destination;

    return (
        <div className="destination-detail-page">
            <div className="destination-header">
                <div className="image-gallery">
                    <img src={images[0]} alt={name} className="main-image" />
                    <div className="thumbnail-container">
                        {images.slice(1, 5).map((img, index) => (
                            <img key={index} src={img} alt={`${name} - view ${index + 2}`} className="thumbnail" />
                        ))}
                    </div>
                </div>

                <div className="destination-header-info">
                    <div className="destination-title-container">
                        <h1>{name}</h1>
                        <div className="destination-location">
                            <FaMapMarkerAlt />
                            <span>{location.country}, {location.region}</span>
                        </div>
                    </div>

                    <div className="rating-container">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < Math.floor(rating) ? "filled" : "empty"} />
                            ))}
                            <span className="rating-value">{rating.toFixed(1)}</span>
                        </div>
                        <span className="review-count">({reviewCount} reviews)</span>
                    </div>

                    <div className="destination-tags">
                        {travelTypes.map((type, index) => (
                            <span key={index} className="tag">{type}</span>
                        ))}
                    </div>

                    <div className="action-buttons">
                        <button
                            className={`favorite-button ${isFavorite ? 'active' : ''}`}
                            onClick={handleFavoriteToggle}
                        >
                            <FaHeart /> {isFavorite ? 'Saved' : 'Save'}
                        </button>
                        <button className="share-button">
                            <FaShareAlt /> Share
                        </button>
                        <button className="compare-button" onClick={handleAddToCompare}>
                            <MdCompareArrows /> Add to Compare
                        </button>
                    </div>
                </div>
            </div>

            <div className="destination-content">
                <div className="content-main">
                    <div className="tab-navigation">
                        <button
                            className={activeTab === 'overview' ? 'active' : ''}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        <button
                            className={activeTab === 'activities' ? 'active' : ''}
                            onClick={() => setActiveTab('activities')}
                        >
                            Activities
                        </button>
                        <button
                            className={activeTab === 'accommodations' ? 'active' : ''}
                            onClick={() => setActiveTab('accommodations')}
                        >
                            Accommodations
                        </button>
                        <button
                            className={activeTab === 'reviews' ? 'active' : ''}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews
                        </button>
                        <button
                            className={activeTab === 'map' ? 'active' : ''}
                            onClick={() => setActiveTab('map')}
                        >
                            Map
                        </button>
                        <button
                            className={activeTab === 'itinerary' ? 'active' : ''}
                            onClick={() => setActiveTab('itinerary')}
                        >
                            Plan Itinerary
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'overview' && (
                            <div className="overview-tab">
                                <div className="description-section">
                                    <h2>About {name}</h2>
                                    <p className={showFullDescription ? '' : 'truncated'}>
                                        {description}
                                    </p>
                                    {description.length > 300 && (
                                        <button
                                            className="read-more-button"
                                            onClick={() => setShowFullDescription(!showFullDescription)}
                                        >
                                            {showFullDescription ? 'Read Less' : 'Read More'}
                                        </button>
                                    )}
                                </div>

                                <div className="key-info-section">
                                    <div className="info-card">
                                        <FaCalendarAlt className="info-icon" />
                                        <h3>Best Time to Visit</h3>
                                        <p>{bestSeasons.join(', ')}</p>
                                    </div>

                                    <div className="info-card">
                                        <FaMoneyBillWave className="info-icon" />
                                        <h3>Cost Level</h3>
                                        <div className="cost-indicator">
                                            {[...Array(5)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={i < costLevel ? "cost-unit filled" : "cost-unit"}
                                                >$</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="info-card">
                                        <FaUtensils className="info-icon" />
                                        <h3>Known For</h3>
                                        <ul className="highlights-list">
                                            {localCuisine.slice(0, 3).map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {renderWeatherInfo()}
                            </div>
                        )}

                        {activeTab === 'activities' && (
                            <div className="activities-tab">
                                <h2>Top Activities in {name}</h2>
                                <div className="activities-grid">
                                    {activities.map((activity, index) => (
                                        <div key={index} className="activity-card">
                                            <div className="activity-image-container">
                                                <img src={activity.image} alt={activity.name} />
                                            </div>
                                            <h3>{activity.name}</h3>
                                            <p>{activity.description}</p>
                                            <div className="activity-meta">
                                                <span className="activity-duration">
                                                    <FaCalendarAlt /> {activity.duration}
                                                </span>
                                                <span className="activity-price">
                                                    <FaMoneyBillWave /> {activity.priceRange}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'accommodations' && (
                            <div className="accommodations-tab">
                                <h2>Places to Stay in {name}</h2>
                                <div className="accommodations-list">
                                    {accommodations.map((accommodation, index) => (
                                        <div key={index} className="accommodation-card">
                                            <img src={accommodation.image} alt={accommodation.name} />
                                            <div className="accommodation-info">
                                                <h3>{accommodation.name}</h3>
                                                <div className="accommodation-rating">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar key={i} className={i < accommodation.rating ? "filled" : "empty"} />
                                                    ))}
                                                    <span>({accommodation.reviewCount})</span>
                                                </div>
                                                <p className="accommodation-type">{accommodation.type}</p>
                                                <p className="accommodation-address">{accommodation.address}</p>
                                                <p className="accommodation-price-range">Price: {accommodation.priceRange}</p>
                                                <a href="#" className="view-details-link">View Details</a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="reviews-tab">
                                <h2>Traveler Reviews</h2>
                                <div className="reviews-summary">
                                    <div className="overall-rating">
                                        <span className="large-rating">{rating.toFixed(1)}</span>
                                        <div className="rating-stars">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className={i < Math.floor(rating) ? "filled" : "empty"} />
                                            ))}
                                        </div>
                                        <span className="review-count">{reviewCount} reviews</span>
                                    </div>

                                    <div className="rating-breakdown">
                                        {/* This would be populated from the destination data */}
                                        <div className="rating-bar">
                                            <span>5 Stars</span>
                                            <div className="bar-container">
                                                <div className="bar" style={{ width: '70%' }}></div>
                                            </div>
                                            <span>70%</span>
                                        </div>
                                        <div className="rating-bar">
                                            <span>4 Stars</span>
                                            <div className="bar-container">
                                                <div className="bar" style={{ width: '20%' }}></div>
                                            </div>
                                            <span>20%</span>
                                        </div>
                                        <div className="rating-bar">
                                            <span>3 Stars</span>
                                            <div className="bar-container">
                                                <div className="bar" style={{ width: '5%' }}></div>
                                            </div>
                                            <span>5%</span>
                                        </div>
                                        <div className="rating-bar">
                                            <span>2 Stars</span>
                                            <div className="bar-container">
                                                <div className="bar" style={{ width: '3%' }}></div>
                                            </div>
                                            <span>3%</span>
                                        </div>
                                        <div className="rating-bar">
                                            <span>1 Star</span>
                                            <div className="bar-container">
                                                <div className="bar" style={{ width: '2%' }}></div>
                                            </div>
                                            <span>2%</span>
                                        </div>
                                    </div>
                                </div>

                                <ReviewList destinationId={id} />
                                <ReviewForm destinationId={id} />
                            </div>
                        )}

                        {activeTab === 'map' && (
                            <div className="map-tab">
                                <h2>{name} on Map</h2>
                                <InteractiveMap
                                    location={location}
                                    markers={[
                                        { ...location, name },
                                        ...activities.map(a => ({
                                            lat: a.coordinates.lat,
                                            lng: a.coordinates.lng,
                                            name: a.name,
                                            type: 'activity'
                                        })),
                                        ...accommodations.map(a => ({
                                            lat: a.coordinates.lat,
                                            lng: a.coordinates.lng,
                                            name: a.name,
                                            type: 'accommodation'
                                        }))
                                    ]}
                                />
                                <div className="nearby-places">
                                    <h3>Nearby Attractions</h3>
                                    <div className="nearby-places-list">
                                        {activities.slice(0, 5).map((activity, index) => (
                                            <div key={index} className="nearby-place-item">
                                                <img src={activity.image} alt={activity.name} />
                                                <div className="nearby-place-info">
                                                    <h4>{activity.name}</h4>
                                                    <p className="distance">{activity.distanceFromCenter}km from center</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'itinerary' && (
                            <div className="itinerary-tab">
                                <h2>Plan Your Trip to {name}</h2>
                                <ItineraryBuilder destination={destination} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="content-sidebar">
                    <div className="sidebar-widget weather-widget">
                        <h3>Current Weather</h3>
                        <div className="weather-display">
                            <div className="temperature">24°C</div>
                            <div className="weather-condition">Sunny</div>
                            <div className="forecast">
                                <div className="forecast-day">
                                    <span>Mon</span>
                                    <span>25°C</span>
                                </div>
                                <div className="forecast-day">
                                    <span>Tue</span>
                                    <span>24°C</span>
                                </div>
                                <div className="forecast-day">
                                    <span>Wed</span>
                                    <span>23°C</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-widget popular-activities-widget">
                        <h3>Popular Activities</h3>
                        <ul className="popular-activities-list">
                            {activities.slice(0, 4).map((activity, index) => (
                                <li key={index} className="popular-activity">
                                    <img src={activity.image} alt={activity.name} />
                                    <div className="activity-info">
                                        <h4>{activity.name}</h4>
                                        <span className="activity-price">{activity.priceRange}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className="view-all-button" onClick={() => setActiveTab('activities')}>
                            View All Activities
                        </button>
                    </div>

                    <div className="sidebar-widget similar-destinations-widget">
                        <h3>Similar Destinations</h3>
                        <div className="similar-destinations-list">
                            {/* This would be populated from API data */}
                            <div className="similar-destination">
                                <img src="/images/destinations/similar-1.jpg" alt="Similar destination" />
                                <div className="similar-destination-info">
                                    <h4>Bali, Indonesia</h4>
                                    <div className="quick-rating">
                                        <FaStar className="filled" />
                                        <span>4.7</span>
                                    </div>
                                </div>
                            </div>
                            <div className="similar-destination">
                                <img src="/images/destinations/similar-2.jpg" alt="Similar destination" />
                                <div className="similar-destination-info">
                                    <h4>Phuket, Thailand</h4>
                                    <div className="quick-rating">
                                        <FaStar className="filled" />
                                        <span>4.5</span>
                                    </div>
                                </div>
                            </div>
                            <div className="similar-destination">
                                <img src="/images/destinations/similar-3.jpg" alt="Similar destination" />
                                <div className="similar-destination-info">
                                    <h4>Fiji Islands</h4>
                                    <div className="quick-rating">
                                        <FaStar className="filled" />
                                        <span>4.8</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationDetailPage;