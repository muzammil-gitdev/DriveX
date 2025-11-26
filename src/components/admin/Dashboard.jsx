import React from 'react';

const Dashboard = () => {
    const stats = [
        { title: 'Total Cars', value: '12', color: 'bg-blue-500' },
        { title: 'Active Bookings', value: '5', color: 'bg-green-500' },
        { title: 'Total Revenue', value: '$12,450', color: 'bg-purple-500' },
        { title: 'Pending Requests', value: '3', color: 'bg-yellow-500' },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                            </div>
                            <div className={`w-10 h-10 rounded-full ${stat.color} opacity-20`}></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
                                <div>
                                    <p className="font-medium text-gray-800">New Booking #10{item}</p>
                                    <p className="text-sm text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                            <span className="text-sm text-blue-600 font-medium">View</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
