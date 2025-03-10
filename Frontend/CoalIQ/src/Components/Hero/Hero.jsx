import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    return <div>Hero</div>;
};
