import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const BookingModal = ({ isOpen, onClose, selectedCar }) => {
    if (!isOpen) return null;

    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        pickupDate: "",
        dropoffDate: "",
        carId: selectedCar?._id || "",
        pricePerDay: selectedCar?.pricePerDay || 0,
    });

    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedCar) {
            setFormData((prev) => ({
                ...prev,
                carId: selectedCar._id,
                pricePerDay: selectedCar.pricePerDay,
            }));
        }
    }, [selectedCar]);

    useEffect(() => {
        if (!formData.pickupDate || !formData.dropoffDate) {
            setTotalPrice(0);
            return;
        }
        const start = new Date(formData.pickupDate);
        const end = new Date(formData.dropoffDate);
        if (end <= start) {
            setTotalPrice(0);
            return;
        }
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        setTotalPrice(days * formData.pricePerDay);
    }, [formData.pickupDate, formData.dropoffDate, formData.pricePerDay]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!formData.name.trim()) return "Enter full name";
        if (!formData.email.trim()) return "Enter email";
        if (!formData.contact.trim()) return "Enter contact number";
        if (!formData.pickupDate) return "Select pickup date";
        if (!formData.dropoffDate) return "Select dropoff date";

        const start = new Date(formData.pickupDate);
        const end = new Date(formData.dropoffDate);

        if (start < new Date(today)) return "Pickup date cannot be in the past";
        if (end <= start) return "Dropoff date must be after pickup date";

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validate();
        if (error) return toast.error(error);

        setLoading(true);

        const payload = {
            carId: formData.carId,
            name: formData.name,
            email: formData.email,
            contact: formData.contact,
            pickupDate: formData.pickupDate,
            dropoffDate: formData.dropoffDate,
        };

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/booking/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            setLoading(false);

            if (!data.success) {
                toast.error(data.message || "Booking failed");
                return;
            }

            toast.success(`Booking Confirmed! Booking ID: ${data.bookingId}`);
            onClose();
        } catch (err) {
            setLoading(false);
            console.error(err);
            toast.error("Something went wrong while booking");
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">

                {/* Header */}
                <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
                    <h3 className="text-2xl font-bold">Book Your Ride</h3>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 text-xl font-bold"
                    >
                        ✖
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Selected Car */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Selected Car</label>
                            <input
                                type="text"
                                value={selectedCar?.carname}
                                readOnly
                                className="w-full px-4 py-2 border border-blue-800 rounded-lg bg-gray-100"
                            />
                        </div>

                        {/* Name */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-blue-800 focus:outline-none rounded-lg"
                                required
                            />
                        </div>

                        {/* Email + Contact */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-blue-800 focus:outline-none rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Contact</label>
                                <input
                                    type="tel"
                                    name="contact"
                                    placeholder="03XX-XXXXXXX"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-blue-800 focus:outline-none rounded-lg"
                                    required
                                />
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Pickup Date</label>
                                <input
                                    type="date"
                                    name="pickupDate"
                                    min={today}
                                    value={formData.pickupDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-blue-400 focus:ring-2 focus:ring-blue-500 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Dropoff Date</label>
                                <input
                                    type="date"
                                    name="dropoffDate"
                                    min={formData.pickupDate || today}
                                    value={formData.dropoffDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-blue-400 focus:ring-2 focus:ring-blue-500 rounded-lg"
                                    required
                                />
                            </div>
                        </div>

                        {/* Total Price */}
                        <p className="text-lg font-semibold text-blue-700 mt-2">
                            {totalPrice > 0
                                ? `Estimated Price: PKR ${totalPrice}`
                                : "Select valid dates to see price"}
                        </p>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                "Confirm Booking"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
