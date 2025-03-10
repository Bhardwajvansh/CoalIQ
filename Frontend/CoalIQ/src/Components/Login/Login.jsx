import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/login', { email, password }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            if (response.status === 200) {
                navigate('/');
            } else {
                alert(response.data); 
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response) {
                if (error.response.status === 404) {
                    alert("User not found. Please sign up.");
                } else if (error.response.status === 401) {
                    alert("Incorrect password. Please try again.");
                } else {
                    alert("Login failed. Please try again later.");
                }
            } else {
                alert("Network error. Please check your connection.");
            }
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gray-50">
            <div className="bg-gradient-to-tr from-indigo-100 to-purple-100 p-10 rounded-2xl shadow-lg max-w-md w-full mx-auto relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full opacity-20"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400 rounded-full opacity-20"></div>

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Welcome back</h2>
                        <p className="text-gray-600">Please log in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none"
                                    required
                                />
                            </div>
                            <br />
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                                    <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm transition-colors duration-300">Forgot password?</a>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none"
                                    required
                                />
                            </div>
                        </div>
                        <br />
                        <button
                            type="submit"
                            className={`w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 text-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                    Logging in...
                                </div>
                            ) : 'Log In'}
                        </button>
                    </form>

                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300">
                                Sign up
                            </a>
                        </p>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Login;