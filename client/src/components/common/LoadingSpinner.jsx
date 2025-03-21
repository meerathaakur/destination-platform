import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ size, color }) => {
    const sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-12 h-12',
        large: 'w-16 h-16',
    };

    const colorClasses = {
        blue: 'text-blue-600',
        white: 'text-white',
        purple: 'text-purple-600',
        gray: 'text-gray-600',
    };

    return (
        <div className="flex justify-center items-center" role="status" aria-label="Loading">
            <svg
                className={`animate-spin ${sizeClasses[size] || sizeClasses.medium} ${colorClasses[color] || colorClasses.blue}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </div>
    );
};

// Prop Type Validation
LoadingSpinner.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.oneOf(['blue', 'white', 'purple', 'gray']),
};

// Default Props
LoadingSpinner.defaultProps = {
    size: 'medium',
    color: 'blue',
};

export default LoadingSpinner;
