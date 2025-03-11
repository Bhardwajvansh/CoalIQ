import React, { useEffect, useState } from "react";

export const Carousel = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const coalTypes = [
        {
            title: "Anthracite Coal",
            description: "Known as hard coal, anthracite has the highest carbon content (86-97%) and energy density. It burns cleanly with little smoke and is primarily used for residential and commercial space heating, as well as in some industrial processes requiring high heat.",
            color: "from-gray-800 to-black"
        },
        {
            title: "Bituminous Coal",
            description: "The most abundant type of coal, bituminous contains 45-86% carbon. It's used extensively to generate electricity and in steel production. Formed under high pressure, it has a blocky appearance and often contains bands of different materials.",
            color: "from-gray-600 to-gray-900"
        },
        {
            title: "Sub-bituminous Coal",
            description: "With carbon content between 35-45%, sub-bituminous coal has a lower heating value than bituminous coal but higher than lignite. It produces less sulfur and ash when burned, making it environmentally preferable for electricity generation.",
            color: "from-gray-500 to-gray-700"
        },
        {
            title: "Lignite Coal",
            description: "Often called brown coal, lignite is the lowest rank with carbon content of 25-35%. It has high moisture content and low heating value. Primarily used in electricity generation near mine sites due to its tendency to crumble when transported.",
            color: "from-amber-700 to-amber-900"
        },
        {
            title: "Peat",
            description: "While not technically coal, peat is a precursor to coal formation. It contains partially decayed plant material and has the lowest carbon content. When dried, it can be used as fuel in some regions, though it has low energy density.",
            color: "from-amber-600 to-brown-800"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prevSlide) => (prevSlide + 1) % coalTypes.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    const prevSlide = () => {
        setActiveSlide((prevSlide) => (prevSlide - 1 + coalTypes.length) % coalTypes.length);
    };
    const nextSlide = () => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % coalTypes.length);
    };

    return (
        <div className="relative overflow-hidden h-96">
            <div className="absolute w-full h-full">
                {coalTypes.map((coal, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full transition-opacity duration-1000 bg-gradient-to-tr ${coal.color} p-10 shadow-lg
                            ${index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <div className="relative z-10 text-white h-full flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-4">{coal.title}</h2>
                            <br />
                            <p className="text-lg mb-6 max-w-3xl">{coal.description}</p>
                            <br />
                            <button className="bg-white text-gray-800 px-6 py-2 rounded-md font-medium w-fit hover:bg-gray-100 transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>
                ))}
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