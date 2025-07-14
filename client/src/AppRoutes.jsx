import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Pages/HomePage';
import LoginPage from "./components/Pages/LoginPage"
import SurveyPage from './components/Pages/SurveyPage';
import RecommendationsPage from './components/Pages/Recommendations';
import DestinationDetailPage from './components/Pages/DestinationDetailPage';
// import ItineraryPage from './pages/ItineraryPage';
// import ProfilePage from './pages/ProfilePage';
import PastTravelersPage from './components/Pages/PastTravelersPage.jsx';
import ComparisonPage from './components/Pages/ComparisonPage.jsx';
// import SignIn from "./components/Pages/LoginPage"
import SignupPage from './components/Pages/SignUpPage';
import ProtectedRoute from './components/ProtectedRoutes.jsx';
import { AuthProvider } from './components/context/AuthContext.jsx';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={
          // <ProtectedRoute>
            <HomePage />
          // </ProtectedRoute>
        } />

        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<SignupPage />} />

        {/* <Route path="/travelers" element={
        <ProtectedRoute>
          <PastTravelersPage />
        </ProtectedRoute>} /> */}
        {/* <Route path="/survey" element={
        <ProtectedRoute>
          <SurveyPage />
        </ProtectedRoute>} /> */}
        {/* <Route path="/recommendations" element={
        <ProtectedRoute>
          <RecommendationsPage />
        </ProtectedRoute>} /> */}
        {/* <Route path="/destination/:id" element={
        <ProtectedRoute>
          <DestinationDetailPage />
        </ProtectedRoute>} /> */}
        {/* <Route path="/itinerary" element={
      <ProtectedRoute>
      <ItineraryPage />
      </ProtectedRoute>
      } /> */}
        {/* <Route path="/profile" element={
      <ProtectedRoute>
      <ProfilePage />
      </ProtectedRoute>
      } /> */}
        {/* <Route path="/compare" element={
        <ProtectedRoute>
          <ComparisonPage />
        </ProtectedRoute>} /> */}
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;