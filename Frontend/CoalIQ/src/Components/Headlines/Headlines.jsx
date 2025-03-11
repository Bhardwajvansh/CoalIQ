import React, { useState, useEffect } from 'react';
import { CalendarDays, ExternalLink } from 'lucide-react';

export const Headlines = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`https://newsapi.org/v2/everything?q=coal&apiKey=${import.meta.env.VITE_NEWS_KEY}`);
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }
                const data = await response.json();
                setNews(data.articles.slice(0, 6));
                setLoading(false);
            } catch (err) {
                console.error('Error fetching news:', err);
                setError(err.message || 'Failed to load news');
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    if (loading) return <div className="flex justify-center items-center h-64">Loading news...</div>;
    if (error) return <div className="text-red-500 p-4">Error loading news: {error}</div>;
    return (
        <div id='Headlines' className="mx-auto py-4 lg:px-10 px-4 bg-gradient-to-tr from-indigo-100 to-purple-100">
            <h1 className="text-3xl font-bold text-indigo-700 mb-4">Coal News Headlines</h1>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((article, index) => (
                    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                        {article.urlToImage ? (
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={article.urlToImage}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = "/api/placeholder/400/200";
                                        e.target.alt = "Image not available";
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                                <img src="/api/placeholder/400/200" alt="No image available" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div className="p-4">
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                    {article.source.name || 'Unknown Source'}
                                </span>
                            </div>
                            <h2 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h2>
                            {article.description && (
                                <p className="text-gray-600 mb-4 line-clamp-2">{article.description}</p>
                            )}
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center text-gray-500 text-sm">
                                    <CalendarDays size={16} className="mr-1" />
                                    {formatDate(article.publishedAt)}
                                </div>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                >
                                    Read more
                                    <ExternalLink size={16} className="ml-1" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Headlines;