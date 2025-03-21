import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <img
                        src="/images/icons/logo.svg"
                        alt="Wanderlust Logo"
                        className="h-10 w-auto"
                    />
                    <span className="text-2xl font-bold">Wanderlust</span>
                </Link>

                <div className="hidden md:block">
                    <Navbar />
                </div>

                <div className="flex items-center space-x-4">
                    <div className="hidden md:block">
                        <Link
                            to="/survey"
                            className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-full transition-colors"
                        >
                            Find My Destination
                        </Link>
                    </div>

                    <button className="block md:hidden text-white focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation - Hidden by default */}
            <div className="hidden bg-blue-700 md:hidden">
                <div className="container mx-auto px-4 py-2">
                    <Navbar isMobile={true} />
                    <div className="mt-4 mb-2">
                        <Link
                            to="/survey"
                            className="block bg-white text-blue-600 text-center font-medium py-2 px-4 rounded-full"
                        >
                            Find My Destination
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;