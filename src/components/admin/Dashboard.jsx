import React, { useEffect, useState } from "react";

const Dashboard = () => {
    const [stats, setStats] = useState([
        { title: 'Total Cars', value: '-', color: 'bg-blue-500' },
        { title: 'Active Bookings', value: '-', color: 'bg-green-500' },
        { title: 'Total Revenue', value: '-', color: 'bg-purple-500' },
        { title: 'Pending Requests', value: '-', color: 'bg-yellow-500' },
    ]);

    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard`);
            const data = await res.json();
            if (data.success) {
                setStats([
                    { title: 'Total Cars', value: data.data.totalCars, color: 'bg-blue-500' },
                    { title: 'Active Bookings', value: data.data.activeBookings, color: 'bg-green-500' },
                    { title: 'Total Revenue', value: `$ ${data.data.totalRevenue}`, color: 'bg-purple-500' },
                    { title: 'Pending Requests', value: data.data.pendingRequests, color: 'bg-yellow-500' },
                ]);
            } else {
                console.error(data.message || "Failed to fetch dashboard data");
            }
        } catch (err) {
            console.error("Network error", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
        const interval = setInterval(fetchDashboard, 60000); // refresh every 60s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                    {loading ? "..." : stat.value}
                                </h3>
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
                        <div
                            key={item}
                            className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                        >
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
