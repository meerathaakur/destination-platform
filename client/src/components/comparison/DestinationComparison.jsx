import React, { useState, useEffect } from 'react';
import '../../styles/components/DestinationComparison.scss'; // Import the SCSS file

const DestinationComparison = ({ destinations = [] }) => {
  const [comparisonItems, setComparisonItems] = useState([]);

  const metrics = [
    { id: 'budget', label: 'Average Cost', icon: '💰' },
    { id: 'weather', label: 'Weather', icon: '☀️' },
    { id: 'safety', label: 'Safety', icon: '🛡️' },
    { id: 'food', label: 'Food', icon: '🍽️' },
    { id: 'activities', label: 'Activities', icon: '🏄‍♂️' },
    { id: 'accommodation', label: 'Accommodation', icon: '🏨' },
    { id: 'transportation', label: 'Transportation', icon: '🚆' },
    { id: 'rating', label: 'User Rating', icon: '⭐' }
  ];

  useEffect(() => {
    setComparisonItems(destinations.slice(0, 3)); // Limit to 3 destinations
  }, [destinations]);

  if (comparisonItems.length === 0) {
    return (
      <div className="comparison__empty">
        <h3>Select destinations to compare</h3>
        <p>Add destinations to see how they compare.</p>
      </div>
    );
  }

  return (
    <div className="comparison__container">
      <h2>Destination Comparison</h2>

      <div className="comparison__table-wrapper">
        <table className="comparison__table">
          <thead>
            <tr>
              <th></th>
              {comparisonItems.map(destination => (
                <th key={destination.id}>
                  <div className="destination__header">
                    <img
                      src={destination.imageUrl || '/default-image.jpg'}
                      alt={destination.name || 'Destination'}
                      className="destination__image"
                    />
                    <h3>{destination.name || 'Unknown'}</h3>
                    <p>{destination.country || 'Unknown'}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {metrics.map(metric => (
              <tr key={metric.id}>
                <td>
                  <span>{metric.icon}</span> {metric.label}
                </td>
                {comparisonItems.map(destination => (
                  <td key={`${destination.id}-${metric.id}`}>
                    {metric.id === 'rating' ? (
                      <div className="rating">
                        <span className="star">⭐</span>
                        {destination[metric.id] || '4.5'}/5
                      </div>
                    ) : metric.id === 'budget' ? (
                      <>
                        {destination[metric.id] || '$$$'}
                        <div className="subtext">~${destination.avgCost || '120'}/day</div>
                      </>
                    ) : (
                      destination[metric.id] || 'N/A'
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* Highlights Row */}
            <tr>
              <td>
                <span>📝</span> Highlights
              </td>
              {comparisonItems.map(destination => (
                <td key={`${destination.id}-highlights`}>
                  <ul>
                    {(destination.highlights || ['Beautiful beaches', 'Local cuisine']).map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="comparison__buttons">
        <button className="btn btn-primary">Add to Itinerary</button>
        <button className="btn btn-secondary">Clear Comparison</button>
      </div>
    </div>
  );
};

export default DestinationComparison;
