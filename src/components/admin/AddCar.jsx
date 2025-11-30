import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddCar = () => {
    const location = useLocation();
    const carData = location.state?.carData || null;

    const [carName, setCarName] = useState("");
    const [brand, setBrand] = useState("");
    const [pricePerDay, setPricePerDay] = useState("");
    const [category, setCategory] = useState("Luxury");
    const [status, setStatus] = useState("available"); // ⭐ NEW STATUS FIELD
    const [featureInput, setFeatureInput] = useState("");
    const [features, setFeatures] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Prefill form when editing
    useEffect(() => {
        if (carData) {
            setCarName(carData.carname || "");
            setBrand(carData.brand || "");
            setPricePerDay(carData.pricePerDay || "");
            setCategory(carData.category || "Luxury");
            setFeatures(carData.features || []);
            setStatus(carData.status || "available"); // ⭐ PREFILL STATUS
        }
    }, [carData]);

    const handleAddFeature = () => {
        if (!featureInput.trim()) return;
        setFeatures([...features, featureInput.trim()]);
        setFeatureInput("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile && !carData?.image) {
            toast.error("Please select an image");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("carname", carName);
            formData.append("brand", brand);
            formData.append("pricePerDay", pricePerDay);
            formData.append("category", category);
            formData.append("status", status); // ⭐ SEND STATUS TO BACKEND

            if (imageFile) formData.append("image", imageFile);
            features.forEach((f) => formData.append("features", f));

            const endpoint = carData
                ? `${import.meta.env.VITE_BACKEND_URL}/api/cars/edit/${carData._id}`
                : `${import.meta.env.VITE_BACKEND_URL}/api/cars/add`;

            const method = carData ? "PUT" : "POST";

            const res = await fetch(endpoint, { method, body: formData });
            const data = await res.json();

            if (data.success) {
                toast.success(data.message);

                if (!carData) {
                    setCarName("");
                    setBrand("");
                    setPricePerDay("");
                    setCategory("Luxury");
                    setStatus("available");
                    setFeatures([]);
                    setImageFile(null);
                }
            } else {
                toast.error(data.message || "Failed to save car");
            }
        } catch (err) {
            console.log(err);
            toast.error("Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {carData ? "Edit Car" : "Add New Car"}
            </h2>

            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <form className="space-y-6" onSubmit={handleSubmit}>

                    {/* Top Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Car Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Car Name</label>
                            <input
                                type="text"
                                value={carName}
                                onChange={(e) => setCarName(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. Tesla Model S"
                            />
                        </div>

                        {/* Brand */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                            <input
                                type="text"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. Tesla"
                            />
                        </div>

                        {/* Price Per Day */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price per Day</label>
                            <input
                                type="number"
                                value={pricePerDay}
                                onChange={(e) => setPricePerDay(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. 150"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option>Luxury</option>
                                <option>SUV</option>
                                <option>Sedan</option>
                                <option>Sports</option>
                            </select>
                        </div>

                        {/* ⭐ NEW STATUS DROPDOWN */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="available">Available</option>
                                <option value="rented">Rented</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </div>

                    </div>

                    {/* Features */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Features</h3>

                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={featureInput}
                                onChange={(e) => setFeatureInput(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter a feature"
                            />
                            <button
                                type="button"
                                onClick={handleAddFeature}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                            >
                                Add
                            </button>
                        </div>

                        <ul className="mt-3 space-y-2">
                            {features.map((f, i) => (
                                <li key={i} className="px-4 py-2 bg-gray-100 rounded-lg border">
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Car Image</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 20 16">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                />
                            </label>

                            {carData?.image && !imageFile && (
                                <img src={carData.image} alt={carName} className="w-32 h-32 object-cover ml-4 rounded" />
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end">
                        <button type="button" className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg mr-4">Cancel</button>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? (carData ? "Updating..." : "Adding...") : carData ? "Update Car" : "Add Car"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCar;
