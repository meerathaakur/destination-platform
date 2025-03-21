import { useNavigate } from 'react-router-dom';
import '../styles/components/homepage.scss';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartSurvey = () => {
    navigate('/survey');
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Perfect Destination</h1>
          <p>Tell us your preferences and let us help you find your next adventure</p>
          <button className="cta-button" onClick={handleStartSurvey}>
            Start Your Journey
          </button>
        </div>
      </section>

      <section className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🧭</div>
            <h3>Share Your Preferences</h3>
            <p>Tell us what you love in a destination and your travel style</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Get Personalized Recommendations</h3>
            <p>We'll match you with destinations that fit your unique taste</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✈️</div>
            <h3>Plan Your Trip</h3>
            <p>Create itineraries and start planning your perfect getaway</p>
          </div>
        </div>
      </section>

      <section className="trending-section">
        <h2>Trending Destinations</h2>
        <div className="trending-grid">
          {/* Here you would map through trending destinations from your data */}
          {/* This is just placeholder content */}
          {['Bali, Indonesia', 'Kyoto, Japan', 'Santorini, Greece', 'Tulum, Mexico'].map((destination) => (
            <div key={destination} className="trending-card">
              <div className="trending-image-placeholder"></div>
              <h3>{destination}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;