import React from 'react';

const ManageCars = () => {
    const cars = [
        { id: 1, name: 'Tesla Model S', brand: 'Tesla', price: 150, status: 'Available', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000' },
        { id: 2, name: 'BMW M4', brand: 'BMW', price: 200, status: 'Rented', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000' }, // Placeholder image
        { id: 3, name: 'Mercedes AMG', brand: 'Mercedes', price: 250, status: 'Maintenance', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000' }, // Placeholder image
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Manage Cars</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                    + Add New Car
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-700">Car</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Brand</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Price/Day</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {cars.map((car) => (
                                <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-16 bg-gray-200 rounded overflow-hidden mr-3">
                                                {/* Placeholder for image */}
                                                <div className="w-full h-full bg-gray-300"></div>
                                            </div>
                                            <span className="font-medium text-gray-900">{car.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{car.brand}</td>
                                    <td className="px-6 py-4 text-gray-600">${car.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${car.status === 'Available' ? 'bg-green-100 text-green-700' :
                                                car.status === 'Rented' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {car.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-3">
                                            <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Edit</button>
                                            <button className="text-red-600 hover:text-red-800 font-medium transition-colors">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageCars;
