import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Car, Calendar, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Add Car', path: '/admin/add-car', icon: PlusCircle },
        { name: 'Manage Cars', path: '/admin/manage-cars', icon: Car },
        { name: 'Bookings', path: '/admin/bookings', icon: Calendar },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:block z-10 relative">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Drive<span className="text-blue-600">X</span> Admin
                    </h1>
                </div>
                <nav className="mt-6">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="relative flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabBackground"
                                        className="absolute inset-0 bg-blue-50"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{ zIndex: -1 }}
                                    />
                                )}
                                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : ''}`} />
                                <span className={`font-medium ${isActive ? 'text-blue-600' : ''}`}>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
                    <Link to="/" className="flex items-center text-gray-600 hover:text-red-600 transition-colors px-2 py-2 rounded-lg hover:bg-red-50">
                        <LogOut className="w-5 h-5 mr-3" />
                        <span className="font-medium">Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="h-full"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default AdminLayout;
