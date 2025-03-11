import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Stats = () => {
    const [activeTab, setActiveTab] = useState('stacked');
    const data = [
        { state: 'Odisha', Measured: 52.05, Indicated: 37.54, Inferred: 4.94, Total: 94.52 },
        { state: 'Jharkhand', Measured: 55.75, Indicated: 26.99, Inferred: 5.09, Total: 87.84 },
        { state: 'Chhattisgarh', Measured: 37.24, Indicated: 42.29, Inferred: 1.24, Total: 80.77 },
        { state: 'West Bengal', Measured: 17.46, Indicated: 12.70, Inferred: 3.78, Total: 33.93 },
        { state: 'Madhya Pradesh', Measured: 15.28, Indicated: 12.46, Inferred: 4.48, Total: 32.22 },
        { state: 'Telangana', Measured: 11.26, Indicated: 8.50, Inferred: 3.43, Total: 23.19 },
        { state: 'Maharashtra', Measured: 8.06, Indicated: 3.42, Inferred: 1.85, Total: 13.34 },
        { state: 'Bihar', Measured: 0.31, Indicated: 5.04, Inferred: 0.05, Total: 5.40 },
        { state: 'Andhra Pradesh', Measured: 1.02, Indicated: 2.37, Inferred: 0.78, Total: 4.17 },
        { state: 'Uttar Pradesh', Measured: 0.88, Indicated: 0.18, Inferred: 0.00, Total: 1.06 },
        { state: 'Meghalaya', Measured: 0.09, Indicated: 0.02, Inferred: 0.47, Total: 0.58 },
        { state: 'Assam', Measured: 0.46, Indicated: 0.06, Inferred: 0.00, Total: 0.53 },
        { state: 'Nagaland', Measured: 0.01, Indicated: 0.02, Inferred: 0.45, Total: 0.48 },
        { state: 'Sikkim', Measured: 0.00, Indicated: 0.06, Inferred: 0.04, Total: 0.10 },
        { state: 'Arunachal Pradesh', Measured: 0.03, Indicated: 0.04, Inferred: 0.02, Total: 0.09 }
    ];
    const sortedData = [...data].sort((a, b) => b.Total - a.Total);
    const topStates = sortedData.slice(0, 5);
    const [showAllStates, setShowAllStates] = useState(false);
    const displayData = showAllStates ? sortedData : topStates;
    const tabs = [
        { id: 'stacked', label: 'Resource Distribution' },
        { id: 'total', label: 'Total Resources' },
        { id: 'table', label: 'Data Table' }
    ];
    return (
        <div id='Statistics' className="flex flex-col items-center w-full container mx-automd:px-6">
            <div className="p-4 md:p-10 mx-auto relative overflow-hidden w-full rounded-lg">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-indigo-700 mb-2">Coal Resources in India</h1>
                    <br />
                    <div className="flex flex-wrap mb-6 border-b border-gray-200">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 text-sm md:text-base font-medium rounded-t-lg mr-2 ${activeTab === tab.id
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    {activeTab === 'stacked' && (
                        <div className="w-full h-80 md:h-96 bg-white bg-opacity-70 p-4 md:p-6 rounded-lg shadow-md mb-6 relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-300 rounded-full opacity-20"></div>
                            <h3 className="text-lg md:text-xl font-semibold text-indigo-700 mb-2 md:mb-4">Coal Resource Distribution by Type</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={displayData}
                                    margin={{ top: 20, right: 10, left: 10, bottom: 70 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis
                                        dataKey="state"
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                        interval={0}
                                        tick={{ fill: '#4a5568', fontSize: '0.7rem' }}
                                    />
                                    <YAxis
                                        label={{ value: 'Billion Tonnes', angle: -90, position: 'insideLeft', fill: '#4a5568', fontSize: '0.8rem' }}
                                        tick={{ fill: '#4a5568', fontSize: '0.7rem' }}
                                    />
                                    <Tooltip
                                        formatter={(value) => [`${value.toFixed(2)} billion tonnes`, undefined]}
                                        labelFormatter={(label) => `State: ${label}`}
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                                    />
                                    <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '0.8rem' }} />
                                    <Bar dataKey="Measured" stackId="a" fill="#6366f1" name="Measured (331)" />
                                    <Bar dataKey="Indicated" stackId="a" fill="#a78bfa" name="Indicated (332)" />
                                    <Bar dataKey="Inferred" stackId="a" fill="#c4b5fd" name="Inferred (333)" />
                                </BarChart>
                            </ResponsiveContainer>
                            {!showAllStates && (
                                <div className="text-center mt-2">
                                    <button
                                        onClick={() => setShowAllStates(true)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                    >
                                        Show all states
                                    </button>
                                </div>
                            )}
                            {showAllStates && (
                                <div className="text-center mt-2">
                                    <button
                                        onClick={() => setShowAllStates(false)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                    >
                                        Show top 5 states
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {activeTab === 'total' && (
                        <div className="w-full h-80 md:h-96 bg-white bg-opacity-70 p-4 md:p-6 rounded-lg shadow-md mb-6 relative overflow-hidden">
                            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-300 rounded-full opacity-20"></div>
                            <h3 className="text-lg md:text-xl font-semibold text-indigo-700 mb-2 md:mb-4">Total Coal Resources by State</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={displayData}
                                    margin={{ top: 20, right: 10, left: 10, bottom: 70 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis
                                        dataKey="state"
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                        interval={0}
                                        tick={{ fill: '#4a5568', fontSize: '0.7rem' }}
                                    />
                                    <YAxis
                                        label={{ value: 'Billion Tonnes', angle: -90, position: 'insideLeft', fill: '#4a5568', fontSize: '0.8rem' }}
                                        tick={{ fill: '#4a5568', fontSize: '0.7rem' }}
                                    />
                                    <Tooltip
                                        formatter={(value) => [`${value.toFixed(2)} billion tonnes`, undefined]}
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                                    />
                                    <Bar dataKey="Total" fill="#4338ca" name="Total Resource" />
                                </BarChart>
                            </ResponsiveContainer>
                            {!showAllStates && (
                                <div className="text-center mt-2">
                                    <button
                                        onClick={() => setShowAllStates(true)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                    >
                                        Show all states
                                    </button>
                                </div>
                            )}
                            {showAllStates && (
                                <div className="text-center mt-2">
                                    <button
                                        onClick={() => setShowAllStates(false)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                    >
                                        Show top 5 states
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {activeTab === 'table' && (
                        <div className="w-full bg-white bg-opacity-70 p-4 md:p-6 rounded-lg shadow-md overflow-x-auto relative">
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-300 rounded-full opacity-20"></div>
                            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-300 rounded-full opacity-20"></div>
                            <h3 className="text-lg md:text-xl font-semibold text-indigo-700 mb-2 md:mb-4">Coal Resources Data Table (Billion Tons)</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white bg-opacity-90 rounded-lg overflow-hidden text-sm md:text-base">
                                    <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                                        <tr>
                                            <th className="px-2 md:px-4 py-2 md:py-3 text-left">State</th>
                                            <th className="px-2 md:px-4 py-2 md:py-3 text-right">Measured</th>
                                            <th className="px-2 md:px-4 py-2 md:py-3 text-right">Indicated</th>
                                            <th className="px-2 md:px-4 py-2 md:py-3 text-right">Inferred</th>
                                            <th className="px-2 md:px-4 py-2 md:py-3 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedData.map((row, index) => (
                                            <tr key={row.state} className={index % 2 === 0 ? 'bg-indigo-50' : 'bg-white'}>
                                                <td className="border-t border-gray-200 px-2 md:px-4 py-1 md:py-2 font-medium text-indigo-700">{row.state}</td>
                                                <td className="border-t border-gray-200 px-2 md:px-4 py-1 md:py-2 text-right">{row.Measured.toFixed(2)}</td>
                                                <td className="border-t border-gray-200 px-2 md:px-4 py-1 md:py-2 text-right">{row.Indicated.toFixed(2)}</td>
                                                <td className="border-t border-gray-200 px-2 md:px-4 py-1 md:py-2 text-right">{row.Inferred.toFixed(2)}</td>
                                                <td className="border-t border-gray-200 px-2 md:px-4 py-1 md:py-2 text-right font-medium">{row.Total.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                        <tr className="bg-gradient-to-r from-indigo-100 to-purple-100 font-bold">
                                            <td className="border-t border-gray-200 px-2 md:px-4 py-2 md:py-3">Total</td>
                                            <td className="border-t border-gray-200 px-2 md:px-4 py-2 md:py-3 text-right">199.90</td>
                                            <td className="border-t border-gray-200 px-2 md:px-4 py-2 md:py-3 text-right">151.68</td>
                                            <td className="border-t border-gray-200 px-2 md:px-4 py-2 md:py-3 text-right">26.62</td>
                                            <td className="border-t border-gray-200 px-2 md:px-4 py-2 md:py-3 text-right">378.21</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};