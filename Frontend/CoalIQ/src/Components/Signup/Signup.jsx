import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step < 2) {
            setStep(step + 1);
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/signup', { name, email, password }, {
                headers: { 'Content-Type': 'application/json' }
            });
            setSuccess(true);
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("Email already exists. Please use a different email or login.");
            } else {
                alert("Signup failed. Please try again.");
            }
            console.error("Signup error:", error);
        } finally {
            setIsLoading(false);
        }
    };


    const getStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-indigo-700">Let's get started</h2>
                        <p className="text-gray-600">First, tell us your name</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none"
                            required
                        />
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-indigo-700">Welcome, {name}!</h2>
                        <p className="text-gray-600">Now, let's get your email address</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email"
                            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none"
                            required
                        />
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-indigo-700">Almost there!</h2>
                        <p className="text-gray-600">Create a strong password</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your password"
                            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none"
                            required
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    const formContainer = () => {
        if (success) {
            return (
                <div className="bg-gradient-to-tr from-indigo-100 to-purple-100 p-10 rounded-2xl shadow-lg max-w-md w-full mx-auto text-center space-y-8 relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-400 rounded-full opacity-20"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-400 rounded-full opacity-20"></div>

                    <div className="animate-bounce bg-green-500 text-white p-5 mx-auto rounded-full w-20 h-20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-bold text-indigo-700">Welcome aboard!</h2>
                    <p className="text-gray-600 text-lg">Thanks for signing up, {name}! We've sent a confirmation email to {email}.</p>
                    <button
                        className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 text-lg mt-4"
                        onClick={() => {
                            setSuccess(false);
                            setStep(0);
                            setName('');
                            setEmail('');
                            setPassword('');
                        }}
                    >
                        Start Over
                    </button>
                </div>
            );
        }

        return (
            <div className="bg-gradient-to-tr from-indigo-100 to-purple-100 p-10 rounded-2xl shadow-lg max-w-md w-full mx-auto relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full opacity-20"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400 rounded-full opacity-20"></div>

                <form onSubmit={handleSubmit} className="relative z-10">
                    <div className="mb-10">
                        <div className="flex justify-between mb-8">
                            {[0, 1, 2].map((idx) => (
                                <div
                                    key={idx}
                                    className={`w-1/3 h-2 rounded-full mx-2 transition-all duration-500 ${idx <= step ? 'bg-indigo-600' : 'bg-gray-300'}`}
                                ></div>
                            ))}
                        </div>

                        <div className="transition-opacity duration-500 ease-in-out min-h-32">
                            {getStepContent()}
                        </div>

                    </div>
                    <div className="flex justify-between mt-8">
                        {step > 0 && (
                            <button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                className="py-4 px-8 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-all duration-300 text-lg"
                            >
                                Back
                            </button>
                        )}

                        <button
                            type="submit"
                            className={`py-4 px-8 ${step === 0 ? 'w-full' : 'w-auto'} bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 text-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                    Processing...
                                </div>
                            ) : step < 2 ? 'Continue' : 'Sign Up'}
                        </button>

                    </div>
                    <br />
                    <p className="text-gray-600 text-center">
                        Have an account?{' '}
                        <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300">
                            Log in
                        </a>
                    </p>
                </form>
            </div>
        );
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gray-50">
            {formContainer()}
        </div>
    );
};

export default Signup;