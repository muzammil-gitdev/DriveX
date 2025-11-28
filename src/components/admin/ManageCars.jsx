import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ManageCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null); // car being deleted
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    const fetchCars = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cars/all`);
            const data = await res.json();
            if (data.success) setCars(data.data);
            else toast.error(data.message || "Failed to fetch cars");
        } catch (err) {
            console.log(err);
            toast.error("Network error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        setDeleting(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cars/delete/${deleteId}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                setCars(cars.filter(car => car._id !== deleteId));
                setDeleteId(null);
            } else {
                toast.error(data.message || "Failed to delete car");
            }
        } catch (err) {
            console.log(err);
            toast.error("Network error");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Manage Cars</h2>
                <button
                    onClick={() => navigate("/admin/add-car")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md"
                >
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
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                        Loading...
                                    </td>
                                </tr>
                            ) : cars.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                        No cars found
                                    </td>
                                </tr>
                            ) : (
                                cars.map(car => (
                                    <tr key={car._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-10 w-16 rounded overflow-hidden mr-3">
                                                    <img src={car.image} alt={car.carname} className="w-full h-full object-cover" />
                                                </div>
                                                <span className="font-medium text-gray-900">{car.carname}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{car.brand}</td>
                                        <td className="px-6 py-4 text-gray-600">${car.pricePerDay}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${car.status === "available"
                                                ? "bg-green-100 text-green-700"
                                                : car.status === "rented"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}>
                                                {car.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 flex space-x-3">
                                            <button
                                                onClick={() => navigate("/admin/add-car", { state: { carData: car } })}
                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => setDeleteId(car._id)}
                                                className="text-red-600 hover:text-red-800 font-medium"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
                        <p className="mb-6">Are you sure you want to delete this car?</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ${deleting ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCars;
