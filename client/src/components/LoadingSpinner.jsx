import React from "react";

const LoadingSpinner = ({ size = "md", color = "border-blue-500", className = "" }) => {
    const sizeClasses = {
        sm: "w-6 h-6 border-2",
        md: "w-10 h-10 border-4",
        lg: "w-16 h-16 border-4",
    };

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div
                className={`${sizeClasses[size]} border-gray-300 ${color} border-t-4 rounded-full animate-spin`}
            ></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default LoadingSpinner;
