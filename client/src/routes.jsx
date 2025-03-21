import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SurveyPage from './pages/SurveyPage';
import RecommendationsPage from './pages/RecommendationsPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import ItineraryPage from './pages/ItineraryPage';
import ProfilePage from './pages/ProfilePage';
import ComparisonPage from './pages/ComparisonPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/survey" element={<SurveyPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/destination/:id" element={<DestinationDetailPage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/compare" element={<ComparisonPage />} />
        </Routes>
    );
};

export default AppRoutes;