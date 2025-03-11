import React, { useState, useEffect, useRef } from "react";

export const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm the CoalIQ AI assistant. How can I help you today?", isBot: true }
    ]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const toggleChat = () => {
        setIsOpen(!isOpen);
    };
    const generateGeminiResponse = async (userMessage) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}?key=${import.meta.env.VITE_GEMINI_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: userMessage }]
                    }]
                })
            });
            const data = await response.json();
            if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                return data.candidates[0].content.parts[0].text;
            } else if (data.error) {
                console.error("Gemini API error:", data.error);
                return "I'm sorry, I encountered an error processing your request. Please try again later.";
            } else {
                return "I'm sorry, I couldn't generate a response. Please try again.";
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            return "I'm having trouble connecting to my backend. Please try again later.";
        } finally {
            setIsLoading(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputText.trim() === "" || isLoading) return;

        const userMessage = inputText.trim();
        setInputText("");
        setMessages(prevMessages => [...prevMessages, { text: userMessage, isBot: false }]);
        setMessages(prevMessages => [...prevMessages, { text: "...", isBot: true, isLoading: true }]);
        const botResponse = await generateGeminiResponse(userMessage);
        setMessages(prevMessages => {
            const filtered = prevMessages.filter(msg => !msg.isLoading);
            return [...filtered, { text: botResponse, isBot: true }];
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={toggleChat}
                className={`w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ${isOpen ? 'rotate-90 transform' : ''}`}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[500px]">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex-shrink-0">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-white font-medium">CoalIQ AI Assistant</h3>
                            </div>
                        </div>
                    </div>
                    <div className="h-80 overflow-y-auto p-4 bg-gray-50 flex-grow">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-3 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                            >
                                <div
                                    className={`rounded-lg px-4 py-2 max-w-3/4 ${message.isBot
                                            ? 'bg-gray-200 text-gray-800'
                                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                        }`}
                                >
                                    {message.isLoading ? (
                                        <div className="flex space-x-1 items-center py-1">
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    ) : (
                                        message.text
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white flex-shrink-0">
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className={`ml-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none transition-opacity ${isLoading || inputText.trim() === "" ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                                    }`}
                                disabled={isLoading || inputText.trim() === ""}
                                aria-label="Send message"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};