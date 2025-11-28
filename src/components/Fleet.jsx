import React, { useEffect, useState } from "react";

const Fleet = ({ onBookNow }) => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCars = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cars/all`);
            const data = await res.json();
            if (data.success) {
                setCars(data.data);
            } else {
                console.error(data.message || "Failed to fetch cars");
            }
        } catch (err) {
            console.error("Network error", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <section id="fleet" className="py-20 bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Fleet</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Choose from our exclusive collection of high-performance and luxury vehicles.
                    </p>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading cars...</p>
                ) : cars.length === 0 ? (
                    <p className="text-center text-gray-500">No cars available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cars.map((car) => (
                            <div
                                key={car._id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={car.image}
                                        alt={car.carname}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                                        {car.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">{car.carname}</h3>
                                        <span className="text-blue-600 font-bold">${car.pricePerDay}/day</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {car.features.map((feature, index) => (
                                            <span
                                                key={index}
                                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => onBookNow(car)}
                                        className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors duration-300"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Fleet;
