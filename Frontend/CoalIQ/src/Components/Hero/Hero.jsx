import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { Headlines } from "../Headlines/Headlines";

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
            
            <div className="flex-grow container mx-auto px-4 py-8">
                <div className="bg-gradient-to-tr from-indigo-100 to-purple-100 p-10 rounded-2xl shadow-lg max-w-5xl mx-auto relative overflow-hidden mt-6">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full opacity-20"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400 rounded-full opacity-20"></div>
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold text-indigo-700 mb-4">Welcome to CoalIQ</h1>
                        <p className="text-gray-600 mb-6">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam porro veniam ratione in, provident quisquam repudiandae dolore corporis tempore animi rem blanditiis! Aut explicabo provident eum iusto ea dignissimos, odit nesciunt numquam incidunt, voluptatum, excepturi laboriosam quo quos optio! Architecto temporibus aspernatur atque maxime ratione. Fuga doloribus reprehenderit nostrum sint a voluptatum, eveniet tenetur eaque omnis provident officiis libero ullam iure, aliquam expedita, vitae fugit qui? Cupiditate dolorem ea earum esse vitae? Rerum natus ea hic libero vitae deleniti expedita omnis accusantium quos impedit repellat incidunt perferendis voluptatibus, veniam necessitatibus harum asperiores dolore labore provident illum. Velit quaerat ullam quos.</p>
                    </div>
                </div>
            </div>

            <Headlines />
        </div>
    );
};