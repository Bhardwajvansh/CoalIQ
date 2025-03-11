import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const Carousel = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const generatePriceData = (basePrice, volatility) => {
        const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
        let currentPrice = basePrice;
        return months.map(month => {
            const change = Math.random() * volatility * 2 - volatility;
            currentPrice = Math.max(100, Math.round(currentPrice + change));
            return {
                month,
                price: currentPrice
            };
        });
    };
    const coalTypes = [
        {
            title: "Anthracite Coal",
            description: "Known as hard coal, anthracite has the highest carbon content (86-97%) and energy density. It burns cleanly with little smoke and is primarily used for residential and commercial space heating, as well as in some industrial processes requiring high heat.",
            color: "from-gray-800 to-black",
            lineColor: "#ffffff",
            priceData: generatePriceData(3500, 300)
        },
        {
            title: "Bituminous Coal",
            description: "The most abundant type of coal, bituminous contains 45-86% carbon. It's used extensively to generate electricity and in steel production. Formed under high pressure, it has a blocky appearance and often contains bands of different materials.",
            color: "from-gray-600 to-gray-900",
            lineColor: "#aaaaff",
            priceData: generatePriceData(2800, 400)
        },
        {
            title: "Sub-bituminous Coal",
            description: "With carbon content between 35-45%, sub-bituminous coal has a lower heating value than bituminous coal but higher than lignite. It produces less sulfur and ash when burned, making it environmentally preferable for electricity generation.",
            color: "from-gray-500 to-gray-700",
            lineColor: "#90cdf4",
            priceData: generatePriceData(2200, 250)
        },
        {
            title: "Lignite Coal",
            description: "Often called brown coal, lignite is the lowest rank with carbon content of 25-35%. It has high moisture content and low heating value. Primarily used in electricity generation near mine sites due to its tendency to crumble when transported.",
            color: "from-amber-700 to-amber-900",
            lineColor: "#fbd38d",
            priceData: generatePriceData(1500, 200)
        },
        {
            title: "Peat",
            description: "While not technically coal, peat is a precursor to coal formation. It contains partially decayed plant material and has the lowest carbon content. When dried, it can be used as fuel in some regions, though it has low energy density.",
            color: "from-amber-600 to-brown-800",
            lineColor: "#f6ad55",
            priceData: generatePriceData(1000, 150)
        }
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prevSlide) => (prevSlide + 1) % coalTypes.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);
    const prevSlide = () => {
        setActiveSlide((prevSlide) => (prevSlide - 1 + coalTypes.length) % coalTypes.length);
    };
    const nextSlide = () => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % coalTypes.length);
    };
    const getPriceTrend = (priceData) => {
        const firstPrice = priceData[0].price;
        const lastPrice = priceData[priceData.length - 1].price;
        const percentChange = ((lastPrice - firstPrice) / firstPrice * 100).toFixed(1);
        return percentChange;
    };
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 rounded shadow-lg text-gray-800 text-sm">
                    <p className="font-medium">₹{payload[0].value}</p>
                    <p>{payload[0].payload.month}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div id="Prices" className="relative overflow-hidden md:h-160 h-screen bg-gray-900">
            <div className="absolute w-full h-full">
                {coalTypes.map((coal, index) => {
                    const priceTrend = getPriceTrend(coal.priceData);
                    const trendColor = priceTrend >= 0 ? "text-green-400" : "text-red-400";
                    return (
                        <div
                            key={index}
                            className={`absolute w-full h-full transition-opacity duration-1000 bg-gradient-to-tr ${coal.color} lg:p-10 p-5 shadow-lg
                                ${index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <div className="relative z-10 text-white h-full flex flex-col justify-evenly lg:flex-row lg:justify-between lg:gap-8">
                                <div className="flex flex-col justify-center lg:w-1/2 mb-6 lg:mb-0">
                                    <h2 className="text-3xl font-bold mb-4">{coal.title}</h2>
                                    <p className="text-lg mb-6 max-w-3xl">{coal.description}</p>
                                    <button className="bg-white text-gray-800 px-6 py-2 rounded-md font-medium w-fit hover:bg-gray-100 transition-colors">
                                        Learn More
                                    </button>
                                </div>
                                <div className="lg:w-1/2 bg-gray-800/30 p-6 rounded-lg backdrop-blur-sm flex flex-col h-96 md:h-auto">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-semibold">Price Trend (₹/Ton)</h3>
                                        <div className="flex items-center">
                                            <span className={`text-lg font-bold ${trendColor}`}>
                                                {priceTrend >= 0 ? "+" : ""}{priceTrend}%
                                            </span>
                                            <span className="ml-2 text-sm text-gray-300">6 months</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 min-h-48">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                data={coal.priceData}
                                                margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                                            >
                                                <XAxis
                                                    dataKey="month"
                                                    stroke="#888"
                                                    tick={{ fill: '#ccc' }}
                                                />
                                                <YAxis
                                                    stroke="#888"
                                                    tick={{ fill: '#ccc' }}
                                                    domain={['dataMin - 100', 'dataMax + 100']}
                                                    tickFormatter={(value) => `₹${value}`}
                                                />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Line
                                                    type="monotone"
                                                    dataKey="price"
                                                    stroke={coal.lineColor}
                                                    strokeWidth={3}
                                                    dot={{ fill: coal.lineColor, strokeWidth: 2, r: 4 }}
                                                    activeDot={{ fill: '#fff', stroke: coal.lineColor, strokeWidth: 2, r: 6 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="mt-4 grid grid-cols-3 gap-4">
                                        <div className="bg-gray-700/50 p-3 rounded">
                                            <p className="text-sm text-gray-300">Current</p>
                                            <p className="text-xl font-bold">₹{coal.priceData[coal.priceData.length - 1].price}</p>
                                        </div>
                                        <div className="bg-gray-700/50 p-3 rounded">
                                            <p className="text-sm text-gray-300">Lowest</p>
                                            <p className="text-xl font-bold">₹{Math.min(...coal.priceData.map(d => d.price))}</p>
                                        </div>
                                        <div className="bg-gray-700/50 p-3 rounded">
                                            <p className="text-sm text-gray-300">Highest</p>
                                            <p className="text-xl font-bold">₹{Math.max(...coal.priceData.map(d => d.price))}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/50 transition-colors p-2 rounded-full z-20"
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/50 transition-colors p-2 rounded-full z-20"
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {coalTypes.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-white' : 'bg-white/50'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};