import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Pages/HomePage';
import LoginPage from "./components/Pages/LoginPage"
import SurveyPage from './components/Pages/SurveyPage';
import RecommendationsPage from './components/Pages/Recommendations';
// import DestinationDetailPage from './pages/DestinationDetailPage';
// import ItineraryPage from './pages/ItineraryPage';
// import ProfilePage from './pages/ProfilePage';
// import ComparisonPage from './pages/ComparisonPage';
import SignIn from "./components/Pages/LoginPage"
import SignupPage from './components/Pages/SignUpPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/register' element={<SignupPage/>}/>
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route path="/survey" element={<SurveyPage />} />
      <Route path="/recommendations" element={<RecommendationsPage />} />
      {/* <Route path="/destination/:id" element={<DestinationDetailPage />} />
      <Route path="/itinerary" element={<ItineraryPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/compare" element={<ComparisonPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;