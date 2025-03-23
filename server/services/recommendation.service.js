import { find, findById } from '../models/Destination';
import { findById as _findById } from '../models/User';
import Review from '../models/Review';

class RecommendationService {
    /**
     * Get personalized destination recommendations based on user preferences
     * @param {string} userId - User ID
     * @param {Object} filters - Additional filters to apply
     * @param {number} limit - Maximum number of recommendations to return
     * @returns {Promise<Array>} - Array of recommended destinations
     */
    async getPersonalizedRecommendations(userId, filters = {}, limit = 10) {
        try {
            // Get user with preferences
            const user = await _findById(userId).select('preferences pastTrips');

            if (!user || !user.preferences) {
                return this.getTrendingDestinations(limit);
            }

            // Extract user preferences
            const { travelStyle, interests, budget, accommodationType, tripDuration, seasonPreference, activities } = user.preferences;

            // Prepare query to find matching destinations
            const query = {};

            // Apply preference-based filters
            if (interests && interests.length > 0) {
                query.categories = { $in: interests };
            }

            // Apply season preference if available
            if (seasonPreference && seasonPreference.length > 0) {
                const currentDate = new Date();
                const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

                query['bestTimeToVisit.name'] = { $in: seasonPreference };
                query['bestTimeToVisit.months'] = currentMonth;
            }

            // Apply budget filter if available
            if (budget) {
                let budgetLevel;
                switch (budget) {
                    case 'Budget':
                        budgetLevel = 'budget';
                        break;
                    case 'Mid-range':
                        budgetLevel = 'midRange';
                        break;
                    case 'Luxury':
                    case 'Ultra-luxury':
                        budgetLevel = 'luxury';
                        break;
                    default:
                        budgetLevel = 'midRange';
                }

                // No specific price filtering here as it depends on user currency preferences
                // Just used for scoring later
            }

            // Apply additional filters from request
            if (filters.country) {
                query['location.country'] = filters.country;
            }

            if (filters.category) {
                if (!query.categories) {
                    query.categories = { $in: [] };
                }
                query.categories.$in = [...query.categories.$in, filters.category];
            }

            // Get destinations that match basic criteria
            let destinations = await find({
                ...query,
                status: 'active'
            }).limit(50); // Get more than needed for scoring

            // Score destinations based on user preferences
            const scoredDestinations = await this.scoreDestinations(destinations, user, filters);

            // Sort by score (descending) and take the top 'limit' results
            return scoredDestinations
                .sort((a, b) => b.score - a.score)
                .slice(0, limit)
                .map(item => item.destination);

        } catch (error) {
            console.error('Error in recommendation service:', error);
            return this.getTrendingDestinations(limit);
        }
    }

    /**
     * Score destinations based on user preferences
     * @param {Array} destinations - Array of destination objects
     * @param {Object} user - User object with preferences
     * @param {Object} filters - Additional filters
     * @returns {Promise<Array>} - Array of scored destinations
     */
    async scoreDestinations(destinations, user, filters = {}) {
        const scoredDestinations = [];
        const { preferences, pastTrips } = user;

        // Get past destinations to avoid recommending the same places
        const pastDestinationIds = pastTrips?.map(trip => trip.destination.toString()) || [];

        for (const destination of destinations) {
            // Skip if user has already visited this destination
            if (pastDestinationIds.includes(destination._id.toString())) {
                continue;
            }

            let score = 0;

            // Score based on matching interests/categories
            if (preferences.interests && preferences.interests.length > 0) {
                const matchingInterests = destination.categories.filter(category =>
                    preferences.interests.includes(category)
                );
                score += (matchingInterests.length / preferences.interests.length) * 30;
            }

            // Score based on season match
            if (preferences.seasonPreference && preferences.seasonPreference.length > 0) {
                const currentDate = new Date();
                const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

                for (const season of destination.bestTimeToVisit) {
                    if (preferences.seasonPreference.includes(season.name) &&
                        season.months.includes(currentMonth)) {
                        if (season.recommendation === 'Ideal') score += 20;
                        else if (season.recommendation === 'Good') score += 15;
                        else if (season.recommendation === 'OK') score += 10;
                    }
                }
            }

            // Score based on trending status
            if (destination.trending) {
                score += 15;
            }

            // Score based on ratings
            score += destination.averageRating * 5;

            // Activity matching
            if (preferences.activities && preferences.activities.length > 0) {
                // Check if destination has attractions in user's preferred activity categories
                const attractionCategories = destination.attractions.map(a => a.category);

                // Map user activities to corresponding attraction categories
                const activityCategoryMap = {
                    'Sightseeing': ['Historical', 'Cultural', 'Religious'],
                    'Museums': ['Cultural', 'Historical'],
                    'Hiking': ['Natural', 'Sports'],
                    'Beach activities': ['Natural', 'Sports'],
                    'Local cuisine': ['Food'],
                    'Shopping': ['Shopping'],
                    'Photography': ['Natural', 'Historical', 'Cultural'],
                    'Nightlife': ['Entertainment'],
                    'Water sports': ['Sports', 'Natural'],
                    'Wildlife': ['Natural']
                };

                let activityMatchScore = 0;

                for (const activity of preferences.activities) {
                    const relatedCategories = activityCategoryMap[activity] || [];

                    const hasMatchingAttractions = relatedCategories.some(category =>
                        attractionCategories.includes(category)
                    );

                    if (hasMatchingAttractions) {
                        activityMatchScore += 5;
                    }
                }

                score += Math.min(activityMatchScore, 25); // Cap at 25 points
            }

            // Add to scored destinations
            scoredDestinations.push({
                destination,
                score
            });
        }

        return scoredDestinations;
    }

    /**
     * Get trending destinations
     * @param {number} limit - Maximum number of destinations to return
     * @returns {Promise<Array>} - Array of trending destinations
     */
    async getTrendingDestinations(limit = 10) {
        try {
            return await find({
                status: 'active',
                trending: true
            })
                .sort({ averageRating: -1 })
                .limit(limit);
        } catch (error) {
            console.error('Error getting trending destinations:', error);
            return [];
        }
    }

    /**
     * Get similar destinations to a specific destination
     * @param {string} destinationId - Destination ID
     * @param {number} limit - Maximum number of similar destinations to return
     * @returns {Promise<Array>} - Array of similar destinations
     */
    async getSimilarDestinations(destinationId, limit = 5) {
        try {
            const destination = await findById(destinationId);

            if (!destination) {
                throw new Error('Destination not found');
            }

            // Find destinations with similar categories and tags
            const similarDestinations = await find({
                _id: { $ne: destinationId },
                categories: { $in: destination.categories },
                status: 'active'
            })
                .limit(limit * 3); // Get more than needed for scoring

            // Score similar destinations
            const scoredDestinations = [];

            for (const similar of similarDestinations) {
                let score = 0;

                // Score based on matching categories
                const matchingCategories = similar.categories.filter(category =>
                    destination.categories.includes(category)
                );
                score += (matchingCategories.length / destination.categories.length) * 50;

                // Score based on matching tags
                if (destination.tags && destination.tags.length > 0 &&
                    similar.tags && similar.tags.length > 0) {
                    const matchingTags = similar.tags.filter(tag =>
                        destination.tags.includes(tag)
                    );
                    score += (matchingTags.length / destination.tags.length) * 30;
                }

                // Score based on ratings
                score += similar.averageRating * 4;

                // Add to scored destinations
                scoredDestinations.push({
                    destination: similar,
                    score
                });
            }

            // Sort by score and return top results
            return scoredDestinations
                .sort((a, b) => b.score - a.score)
                .slice(0, limit)
                .map(item => item.destination);

        } catch (error) {
            console.error('Error getting similar destinations:', error);
            return [];
        }
    }

    /**
     * Get recommendations based on a survey response
     * @param {Object} surveyResponses - User's survey responses
     * @param {number} limit - Maximum number of recommendations to return
     * @returns {Promise<Array>} - Array of recommended destinations
     */
    async getRecommendationsFromSurvey(surveyResponses, limit = 10) {
        try {
            const { interests, budget, travelStyle, tripDuration, activities, seasonPreference } = surveyResponses;

            // Prepare query to find matching destinations
            const query = { status: 'active' };

            // Apply preference-based filters
            if (interests && interests.length > 0) {
                query.categories = { $in: interests };
            }

            // Apply season preference if available
            if (seasonPreference && seasonPreference.length > 0) {
                const currentDate = new Date();
                const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

                query['bestTimeToVisit.name'] = { $in: seasonPreference };
                query['bestTimeToVisit.months'] = currentMonth;
            }

            // Get destinations that match basic criteria
            let destinations = await find(query).limit(50);

            // Score destinations based on survey responses
            const scoredDestinations = [];

            for (const destination of destinations) {
                let score = 0;

                // Score based on matching interests/categories
                if (interests && interests.length > 0) {
                    const matchingInterests = destination.categories.filter(category =>
                        interests.includes(category)
                    );
                    score += (matchingInterests.length / interests.length) * 30;
                }

                // Score based on season match
                if (seasonPreference && seasonPreference.length > 0) {
                    const currentDate = new Date();
                    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

                    for (const season of destination.bestTimeToVisit) {
                        if (seasonPreference.includes(season.name) &&
                            season.months.includes(currentMonth)) {
                            if (season.recommendation === 'Ideal') score += 20;
                            else if (season.recommendation === 'Good') score += 15;
                            else if (season.recommendation === 'OK') score += 10;
                        }
                    }
                }

                // Score based on trending status
                if (destination.trending) {
                    score += 15;
                }

                // Score based on ratings
                score += destination.averageRating * 5;

                // Activity matching
                if (activities && activities.length > 0) {
                    // Check if destination has attractions in user's preferred activity categories
                    const attractionCategories = destination.attractions.map(a => a.category);

                    // Map user activities to corresponding attraction categories
                    const activityCategoryMap = {
                        'Sightseeing': ['Historical', 'Cultural', 'Religious'],
                        'Museums': ['Cultural', 'Historical'],
                        'Hiking': ['Natural', 'Sports'],
                        'Beach activities': ['Natural', 'Sports'],
                        'Local cuisine': ['Food'],
                        'Shopping': ['Shopping'],
                        'Photography': ['Natural', 'Historical', 'Cultural'],
                        'Nightlife': ['Entertainment'],
                        'Water sports': ['Sports', 'Natural'],
                        'Wildlife': ['Natural']
                    };

                    let activityMatchScore = 0;
                    for (const activity of activities) {
                        const relatedCategories = activityCategoryMap[activity] || [];

                        const hasMatchingAttractions = relatedCategories.some(category =>
                            attractionCategories.includes(category)
                        );

                        if (hasMatchingAttractions) {
                            activityMatchScore += 5;
                        }
                    }

                    score += Math.min(activityMatchScore, 25); // Cap at 25 points
                }

                // Budget matching
                if (budget) {
                    // Map budget preferences to numerical values for comparison
                    const budgetValues = {
                        'Budget': 1,
                        'Mid-range': 2,
                        'Luxury': 3,
                        'Ultra-luxury': 4
                    };

                    // Try to determine destination budget level based on cost ranges
                    let destinationBudgetLevel = 2; // Default to mid-range
                    if (destination.costRange) {
                        const avgCost = (
                            destination.costRange.accommodation?.midRange +
                            destination.costRange.meals?.midRange +
                            destination.costRange.transportation?.midRange
                        ) / 3;

                        // This is a simplistic approach - in a real app you'd have more sophisticated logic
                        if (avgCost < 50) destinationBudgetLevel = 1;
                        else if (avgCost > 200) destinationBudgetLevel = 3;
                        else if (avgCost > 500) destinationBudgetLevel = 4;
                    }

                    // Score based on budget match (exact match = 15 points, 1 level difference = 5 points)
                    const budgetDifference = Math.abs(budgetValues[budget] - destinationBudgetLevel);
                    if (budgetDifference === 0) score += 15;
                    else if (budgetDifference === 1) score += 5;
                }

                // Travel style matching
                if (travelStyle && travelStyle.length > 0) {
                    // Map travel styles to destination categories
                    const styleMap = {
                        'Solo': ['Adventure', 'City', 'Cultural'],
                        'Couple': ['Romantic', 'Beach', 'Luxury'],
                        'Family': ['Family-friendly', 'Beach', 'Nature'],
                        'Friends': ['Nightlife', 'Adventure', 'City'],
                        'Business': ['City', 'Luxury'],
                        'Group': ['Cultural', 'City', 'Adventure']
                    };

                    let styleScore = 0;
                    for (const style of travelStyle) {
                        const relatedCategories = styleMap[style] || [];
                        const matchingCategories = destination.categories.filter(category =>
                            relatedCategories.includes(category)
                        );

                        if (matchingCategories.length > 0) {
                            styleScore += 10 * (matchingCategories.length / relatedCategories.length);
                        }
                    }

                    score += Math.min(styleScore, 20); // Cap at 20 points
                }

                // Trip duration matching
                if (tripDuration) {
                    const durationMap = {
                        'Weekend getaway': { min: 2, max: 3 },
                        'Short trip (3-5 days)': { min: 3, max: 5 },
                        'Week-long vacation': { min: 6, max: 9 },
                        'Extended trip (2+ weeks)': { min: 14, max: 30 }
                    };

                    const userDuration = durationMap[tripDuration];

                    if (userDuration && destination.suggestedDuration) {
                        // Perfect match: destination ideal duration falls within user's trip duration range
                        if (destination.suggestedDuration.ideal >= userDuration.min &&
                            destination.suggestedDuration.ideal <= userDuration.max) {
                            score += 15;
                        }
                        // Partial match: destination min-max duration overlaps with user's trip duration
                        else if (destination.suggestedDuration.max >= userDuration.min &&
                            destination.suggestedDuration.min <= userDuration.max) {
                            score += 5;
                        }
                    }
                }

                // Add to scored destinations
                scoredDestinations.push({
                    destination,
                    score
                });
            }

            // Sort by score and return top results
            return scoredDestinations
                .sort((a, b) => b.score - a.score)
                .slice(0, limit)
                .map(item => item.destination);

        } catch (error) {
            console.error('Error getting recommendations from survey:', error);
            return [];
        }
    }
}

export default new RecommendationService();