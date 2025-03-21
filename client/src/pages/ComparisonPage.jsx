import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button';
import { X, ChevronLeft, Share2 } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getDestinationDetails } from '../services/recommendationService';

const ComparisonPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Parse destination IDs from URL query params
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const destinationIds = searchParams.get('ids')?.split(',') || [];

        if (destinationIds.length === 0) {
            setError('No destinations selected for comparison');
            setLoading(false);
            return;
        }

        // Validate that IDs are valid (numeric or valid format)
        const validIds = destinationIds.filter(id => !isNaN(id));
        if (validIds.length === 0) {
            setError('Invalid destination IDs');
            setLoading(false);
            return;
        }

        const fetchDestinations = async () => {
            try {
                setLoading(true);
                const destinationPromises = validIds.map(id => getDestinationDetails(id));
                const destinationData = await Promise.all(destinationPromises);
                setDestinations(destinationData);
            } catch (err) {
                setError('Failed to load destinations for comparison');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, [location.search]);

    const removeDestination = (id) => {
        const updatedDestinations = destinations.filter(dest => dest.id !== id);
        setDestinations(updatedDestinations);

        // Update URL
        const newIds = updatedDestinations.map(dest => dest.id).join(',');
        if (newIds.length > 0) {
            navigate(`/comparison?ids=${newIds}`, { replace: true });
        } else {
            navigate('/recommendations', { replace: true });
        }
    };

    const handleShareComparison = () => {
        const comparisonUrl = `${window.location.origin}/comparison?ids=${destinations.map(dest => dest.id).join(',')}`;

        if (navigator.share) {
            navigator.share({
                title: 'Destination Comparison',
                text: `Check out my destination comparison: ${destinations.map(dest => dest.name).join(' vs ')}`,
                url: comparisonUrl
            }).catch(error => console.log('Error sharing:', error));
        } else {
            // Fallback if navigator.share is not supported
            navigator.clipboard.writeText(comparisonUrl).then(() => {
                alert('Comparison link copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy link:', err);
            });
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                {/* <Header /> */}
                <main className="flex-grow flex items-center justify-center">
                    <LoadingSpinner />
                </main>
                {/* <Footer /> */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen">
                {/* <Header /> */}
                <main className="flex-grow p-4 container mx-auto">
                    <Card className="w-full mb-4 shadow-lg">
                        <CardContent className="p-6">
                            <div className="text-center py-8">
                                <h2 className="text-xl font-bold text-red-600 mb-4">{error}</h2>
                                <Button onClick={goBack}>
                                    <ChevronLeft className="mr-2 h-4 w-4" />
                                    Return to Recommendations
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </main>
                {/* <Footer /> */}
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-4 container mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <Button variant="outline" onClick={goBack} aria-label="Go back to recommendations">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <h1 className="text-2xl font-bold">Destination Comparison</h1>
                    <Button variant="outline" onClick={handleShareComparison} aria-label="Share comparison link">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                </div>

                {destinations.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Feature
                                    </th>
                                    {destinations.map((destination) => (
                                        <th key={destination.id} className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center justify-between">
                                                <span>{destination.name}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeDestination(destination.id)}
                                                    className="h-6 w-6 p-0 rounded-full"
                                                    aria-label={`Remove ${destination.name} from comparison`}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* Overview Row */}
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Image
                                    </td>
                                    {destinations.map((destination) => (
                                        <td key={`${destination.id}-image`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <img
                                                src={destination.imageUrl || '/default-image.jpg'} // Fallback if imageUrl is missing
                                                alt={destination.name}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                        </td>
                                    ))}
                                </tr>

                                {/* Description Row */}
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Description
                                    </td>
                                    {destinations.map((destination) => (
                                        <td key={`${destination.id}-desc`} className="px-6 py-4 text-sm text-gray-500">
                                            <p>{destination.shortDescription || 'No description available.'}</p> {/* Fallback if description is missing */}
                                        </td>
                                    ))}
                                </tr>

                                {/* Rating Row */}
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Rating
                                    </td>
                                    {destinations.map((destination) => (
                                        <td key={`${destination.id}-rating`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <span className="text-yellow-500 mr-1">★</span>
                                                <span>{destination.rating.toFixed(1)}/5</span>
                                                <span className="ml-2 text-gray-400">({destination.reviewCount} reviews)</span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Estimated Budget Row */}
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Estimated Budget
                                    </td>
                                    {destinations.map((destination) => (
                                        <td key={`${destination.id}-budget`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className="font-semibold">${destination.budget?.min || 'N/A'} - ${destination.budget?.max || 'N/A'}</span>
                                            <span className="text-gray-400"> per person</span>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8 text-lg text-gray-500">No destinations selected for comparison.</div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default ComparisonPage;
