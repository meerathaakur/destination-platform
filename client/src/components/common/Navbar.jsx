// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/components/Navbar.scss"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="flex items-center">
            <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-white hover:text-blue-100">Home</Link>
                <Link to="/survey" className="text-white hover:text-blue-100">Discover</Link>
                <Link to="/recommendations" className="text-white hover:text-blue-100">Recommendations</Link>
                <Link to="/itinerary" className="text-white hover:text-blue-100">My Itineraries</Link>
                <Link to="/profile" className="text-white hover:text-blue-100">Profile</Link>
            </div>

            <div className="flex items-center ml-6">
                <button className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300">
                    Sign In
                </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden ml-4">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="absolute top-16 right-0 left-0 bg-blue-600 z-50 md:hidden">
                    <div className="flex flex-col px-4 py-2 space-y-2">
                        <Link to="/" className="text-white hover:text-blue-100 py-2">Home</Link>
                        <Link to="/survey" className="text-white hover:text-blue-100 py-2">Discover</Link>
                        <Link to="/recommendations" className="text-white hover:text-blue-100 py-2">Recommendations</Link>
                        <Link to="/itinerary" className="text-white hover:text-blue-100 py-2">My Itineraries</Link>
                        <Link to="/profile" className="text-white hover:text-blue-100 py-2">Profile</Link>
                        <hr className="border-blue-400" />
                        <Link to="/signin" className="text-white hover:text-blue-100 py-2">Sign In</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
