import React, { useEffect, useState } from "react";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    // Format dates like: Oct 12 - Oct 15
    const formatDateRange = (pickup, dropoff) => {
        const options = { month: "short", day: "numeric" };

        const p = new Date(pickup).toLocaleDateString("en-US", options);
        const d = new Date(dropoff).toLocaleDateString("en-US", options);

        return `${p} - ${d}`;
    };

    // Auto complete bookings where dropoffDate == current date
    const autoCompleteStatus = async (booking) => {
        const today = new Date().toISOString().split("T")[0];
        const dropDate = booking.dropoffDate.split("T")[0];

        if (today === dropDate && booking.status !== "Completed") {
            await fetch(`${BASE_URL}/api/booking/edit/${booking._id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Completed" }),
            });
        }
    };

    // Fetch all bookings
    const fetchBookings = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/booking/all`);
            const data = await res.json();

            if (data.success) {
                setBookings(data.data);

                // Auto update completed bookings
                data.data.forEach((b) => autoCompleteStatus(b));
            }
        } catch (error) {
            console.log("Error fetching bookings", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // Delete booking
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this booking?")) return;

        await fetch(`${BASE_URL}/api/booking/delete/${id}`, {
            method: "DELETE",
        });

        setBookings(bookings.filter((b) => b._id !== id));
    };

    // Update booking status
    const handleUpdateStatus = async () => {
        if (!selectedBooking) return;

        await fetch(`${BASE_URL}/api/booking/edit/${selectedBooking._id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });

        setSelectedBooking(null);
        setNewStatus("");

        fetchBookings();
    };

    if (loading) return <p>Loading...</p>;

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
                                <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-sm text-gray-500">{booking.bookingId}</td>
                                    <td className="px-6 py-4 font-normal text-gray-900">{booking.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{booking.carName}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {formatDateRange(booking.pickupDate, booking.dropoffDate)}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">${booking.totalPrice}</td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium 
                                            ${booking.status === "Confirmed"
                                                    ? "bg-green-100 text-green-700"
                                                    : booking.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 flex gap-3">
                                        <button
                                            onClick={() => {
                                                setSelectedBooking(booking);
                                                setNewStatus(booking.status);
                                            }}
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Update
                                        </button>

                                        <button
                                            onClick={() => handleDelete(booking._id)}
                                            className="text-red-600 hover:text-red-800 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL */}
            {selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-4">
                        <h3 className="text-xl font-bold">Update Status</h3>

                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                        </select>

                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded-lg"
                                onClick={() => setSelectedBooking(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                onClick={handleUpdateStatus}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bookings;
