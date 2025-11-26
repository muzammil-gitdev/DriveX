import React from 'react';

const Bookings = () => {
    const bookings = [
        { id: 'BK001', user: 'John Doe', car: 'Tesla Model S', dates: 'Oct 12 - Oct 15', status: 'Confirmed', total: '$450' },
        { id: 'BK002', user: 'Jane Smith', car: 'BMW M4', dates: 'Oct 14 - Oct 16', status: 'Pending', total: '$400' },
        { id: 'BK003', user: 'Mike Johnson', car: 'Mercedes AMG', dates: 'Oct 20 - Oct 25', status: 'Completed', total: '$1250' },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Bookings</h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-700">Booking ID</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Customer</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Car</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Dates</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Total</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-sm text-gray-500">{booking.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{booking.user}</td>
                                    <td className="px-6 py-4 text-gray-600">{booking.car}</td>
                                    <td className="px-6 py-4 text-gray-600">{booking.dates}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{booking.total}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-700'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Details</button>
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

export default Bookings;
