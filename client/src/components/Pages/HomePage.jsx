import { useNavigate,Link } from 'react-router-dom';
import { useEffect } from "react";
import FeatureCard from '../FeatureCard';

const features = [
    { icon: "🧭", title: "Share Your Preferences", desc: "Tell us what you love in a destination." },
    { icon: "🔍", title: "Get Personalized Recommendations", desc: "Find the perfect destination for you." },
    { icon: "✈️", title: "Plan Your Trip", desc: "Create itineraries for your adventure." },
];

const DESTINATION = [
    {
        name: "Bali, Indonesia",
        image: "https://source.unsplash.com/600x400/?bali"
    },
    {
        name: "Kyoto, Japan",
        image: "https://source.unsplash.com/600x400/?kyoto"
    },
    {
        name: "Santorini, Greece",
        image: "https://source.unsplash.com/600x400/?santorini"
    },
    {
        name: "Tulum, Mexico",
        image: "https://source.unsplash.com/600x400/?tulum"
    }
];

const HomePage = () => {
    const navigate = useNavigate();

    // Simulated authentication check (replace this with actual API call)
    const isAuthenticated = !!localStorage.getItem("token"); // Example with localStorage

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login"); // Redirect to login page if not authenticated
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-20 px-4">
                <h1 className="text-4xl font-extrabold sm:text-5xl">Discover Your Perfect Destination</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Tell us your preferences and let us help you find your next adventure.
                </p>
                <button
                    onClick={() => navigate("/survey")}
                    className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
                >
                    Start Your Journey
                </button>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </section>

            {/* Trending Destinations Section */}
            <section className="py-16 px-4 bg-gray-200 dark:bg-gray-800">
                <h2 className="text-3xl font-bold text-center mb-8">Trending Destinations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {DESTINATION.map((destination, index) => (
                        <div key={index} className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md text-center">
                            <div className="h-40 bg-gray-300 dark:bg-gray-600 rounded-md mb-4">
                                <img src={destination.image} alt={destination.name} className="w-full h-full object-cover rounded-md" />
                            </div>
                            <h3 className="text-lg font-semibold">{destination.name}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
