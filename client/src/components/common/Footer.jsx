import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: 'About',
            links: [
                { name: 'Our Story', path: '/about' },
                { name: 'How It Works', path: '/how-it-works' },
                { name: 'Team', path: '/team' },
                { name: 'Careers', path: '/careers' }
            ]
        },
        {
            title: 'Discover',
            links: [
                { name: 'Trending Destinations', path: '/trending' },
                { name: 'Seasonal Picks', path: '/seasonal' },
                { name: 'Travel Guides', path: '/guides' },
                { name: 'Travel Tips', path: '/tips' }
            ]
        },
        {
            title: 'Support',
            links: [
                { name: 'FAQ', path: '/faq' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' }
            ]
        }
    ];

    const socialLinks = [
        { name: 'Facebook', icon: 'facebook', url: 'https://facebook.com' },
        { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com' },
        { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com' },
        { name: 'Pinterest', icon: 'pinterest', url: 'https://pinterest.com' }
    ];

    // Simple social icon mapping
    const getSocialIcon = (iconName) => {
        const icons = {
            facebook: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0C4.477 0 0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.879V12.89h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.989C16.343 19.129 20 14.99 20 10c0-5.523-4.477-10-10-10z" /></svg>,
            twitter: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M20 3.894a8.299 8.299 0 01-2.357.636A4.062 4.062 0 0019.448 2.2a8.25 8.25 0 01-2.606.98A4.126 4.126 0 0013.847 2c-2.65 0-4.596 2.433-3.998 4.959a11.71 11.71 0 01-8.457-4.24 4.007 4.007 0 001.27 5.394 4.135 4.135 0 01-1.858-.505C.774 9.05 2.14 10.95 4.2 11.358a4.15 4.15 0 01-1.853.069 4.108 4.108 0 003.831 2.807A8.36 8.36 0 010 16.29a11.732 11.732 0 006.291 1.818c7.618 0 11.922-6.434 11.663-12.205A8.262 8.262 0 0020 3.894z" /></svg>,
            instagram: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.06 5.877.01 6.944 0 7.284 0 10s.012 3.057.06 4.123c.167 3.632 2.182 5.65 5.817 5.817 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c3.629-.167 5.652-2.182 5.817-5.817.048-1.066.06-1.407.06-4.123s-.012-3.056-.06-4.123C19.777 2.249 17.76.228 14.124.06 13.057.01 12.716 0 10 0zm0 1.802c2.67 0 2.987.01 4.042.058 2.71.123 3.976 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.718-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.047 1.37-.057 4.04-.057z" /><path d="M10 13.333a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm0-8.466a5.133 5.133 0 100 10.266 5.133 5.133 0 000-10.266zm6.538-.203a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" /></svg>,
            pinterest: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0C4.478 0 0 4.477 0 10c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.744 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S15.523 0 10 0z" /></svg>
        };

        return icons[iconName] || null;
    };

    return (
        <footer className="bg-gray-800 text-white pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand and Description */}
                    <div>
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <img
                                src="/images/icons/logo-white.svg"
                                alt="Wanderlust Logo"
                                className="h-8 w-auto"
                            />
                            <span className="text-xl font-bold">Wanderlust</span>
                        </Link>
                        <p className="text-gray-400 mb-4">
                            Discover your perfect destination based on your unique preferences and travel style.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                    aria-label={social.name}
                                >
                                    {getSocialIcon(social.icon)}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Navigation Sections */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.path} className="text-gray-400 hover:text-white transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter Subscription */}
                <div className="border-t border-gray-700 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h3>
                            <p className="text-gray-400">Get travel tips and exclusive destination recommendations.</p>
                        </div>
                        <div className="flex w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="px-4 py-2 rounded-l-md w-full md:w-64 text-gray-800 focus:outline-none"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-500 text-sm mt-12">
                    <p>&copy; {currentYear} Wanderlust Travel Recommendations. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;