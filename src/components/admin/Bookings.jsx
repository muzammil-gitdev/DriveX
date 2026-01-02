import React, { useEffect, useState } from "react";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true); // initial fetch loading
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [isUpdating, setIsUpdating] = useState(false); // controls modal "Updating..." state

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const formatDateRange = (pickup, dropoff) => {
        const options = { month: "short", day: "numeric" };
        const p = new Date(pickup).toLocaleDateString("en-US", options);
        const d = new Date(dropoff).toLocaleDateString("en-US", options);
        return `${p} - ${d}`;
    };

    const autoCompleteStatus = async (booking) => {
        const today = new Date().toISOString().split("T")[0];
        const dropDate = booking.dropoffDate.split("T")[0];

        if (today === dropDate && booking.status !== "Completed") {
            try {
                await fetch(`${BASE_URL}/api/booking/edit/${booking._id}/status`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "Completed" }),
                });
            } catch (err) {
                console.error("autoCompleteStatus error:", err);
            }
        }
    };

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/api/booking/all`);
            const data = await res.json();

            if (data.success) {
                setBookings(data.data);
                data.data.forEach((b) => autoCompleteStatus(b));
            }
        } catch (error) {
            console.log("Error fetching bookings", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this booking?")) return;

        try {
            await fetch(`${BASE_URL}/api/booking/delete/${id}`, { method: "DELETE" });
            setBookings((prev) => prev.filter((b) => b._id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete booking. Try again.");
        }
    };

    const handleUpdateStatus = async () => {
        if (!selectedBooking) return;

        setIsUpdating(true);
        try {
            const res = await fetch(`${BASE_URL}/api/booking/edit/${selectedBooking._id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to update status");
            }

            // update local bookings state optimistically (so list updates instantly)
            setBookings((prev) =>
                prev.map((b) =>
                    b._id === selectedBooking._id ? { ...b, status: newStatus } : b
                )
            );

            // close modal
            setSelectedBooking(null);
            setNewStatus("");
        } catch (err) {
            console.error("Update status error:", err);
            alert("Failed to update status. Please try again.");
        } finally {
            setIsUpdating(false);
            // refresh from server to ensure data consistency
            fetchBookings();
        }
    };

    // Disable scroll when modal is open
    useEffect(() => {
        if (selectedBooking) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedBooking]);

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
                                    <td className="px-6 py-4 font-normal text-sm text-gray-900">{booking.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{booking.carName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {formatDateRange(booking.pickupDate, booking.dropoffDate)}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-sm text-gray-900">{booking.totalPrice} pkr</td>

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

            {/* MODAL WITH BLUR EFFECT */}
            {selectedBooking && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-4 relative">
                        <h3 className="text-xl font-bold">Update Status</h3>

                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                            disabled={isUpdating}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                        </select>

                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded-lg"
                                onClick={() => setSelectedBooking(null)}
                                disabled={isUpdating}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center"
                                onClick={handleUpdateStatus}
                                disabled={isUpdating}
                                aria-busy={isUpdating}
                            >
                                {isUpdating ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bookings;
