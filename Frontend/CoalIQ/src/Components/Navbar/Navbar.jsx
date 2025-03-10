import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full opacity-20"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400 rounded-full opacity-20"></div>

                <div className="flex items-center justify-between h-16 relative z-10">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-white font-extrabold text-4xl tracking-tight hover:scale-105 transition-transform duration-300">
                            CoalIQ
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <Link to="/" className="text-indigo-100 hover:bg-indigo-700 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                                Dashboard
                            </Link>
                            <Link to="/analytics" className="text-indigo-100 hover:bg-indigo-700 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                                Analytics
                            </Link>
                            <Link to="/reports" className="text-indigo-100 hover:bg-indigo-700 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                                Reports
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-indigo-100 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-indigo-800 bg-opacity-95 backdrop-filter backdrop-blur-sm">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/"
                            className="text-indigo-100 hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/analytics"
                            className="text-indigo-100 hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Analytics
                        </Link>
                        <Link
                            to="/reports"
                            className="text-indigo-100 hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Reports
                        </Link>
                        <button
                            onClick={() => {
                                handleLogout();
                                setIsOpen(false);
                            }}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white block w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 mt-4"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};