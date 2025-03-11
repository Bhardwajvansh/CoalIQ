import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { Headlines } from "../Headlines/Headlines";
import { Stats } from "../Stats/Stats";
import { Carousel } from "../Carousel/Carousel";
import { Footer } from "../Footer/Footer";

export const Hero = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.get("http://localhost:3000/", { withCredentials: true });
                if (response.data !== "Success") {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Authentication error:", error);
                navigate("/login");
            }
        };
        verifyUser();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="bg-gradient-to-tr from-indigo-100 to-purple-100 p-10 mx-auto relative overflow-hidden shadow-sm lg:h-screen">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full opacity-20"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400 rounded-full opacity-20"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-indigo-700 lg:text-7xl mb-4">Welcome to CoalIQ</h1>
                    <br />
                    <p className="text-gray-600">
                        Your comprehensive intelligence platform for the coal industry. CoalIQ delivers real-time market insights,
                        price analytics, and supply chain intelligence to help you make data-driven decisions in a rapidly evolving
                        energy landscape. Our advanced analytics platform combines satellite imagery, market data, and AI-powered
                        forecasting to give you the competitive edge.
                    </p>
                    <br />
                    <div className="flex flex-col sm:flex-row gap-4 lg:mt-20">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
                            Explore Statistics
                        </button>
                        <button className="bg-white hover:bg-gray-100 text-indigo-600 font-medium py-2 px-6 rounded-md border border-indigo-200 transition duration-300">
                            Types of Coal
                        </button>
                    </div>
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="text-indigo-500 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">Statistics</h3>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, dolores.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="text-indigo-500 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">Volume</h3>
                            <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, incidunt.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="text-indigo-500 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">Analytics</h3>
                            <p className="text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, rem?</p>
                        </div>
                    </div>
                </div>
            </div>

            <Carousel />
            <Stats />
            <Headlines />
            <Footer />
        </div>
    );
};