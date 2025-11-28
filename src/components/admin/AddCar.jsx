import React, { useState } from "react";
import { toast } from "react-hot-toast";

const AddCar = () => {
    const [carName, setCarName] = useState("");
    const [brand, setBrand] = useState("");
    const [pricePerDay, setPricePerDay] = useState("");
    const [category, setCategory] = useState("Luxury");
    const [featureInput, setFeatureInput] = useState("");
    const [features, setFeatures] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAddFeature = () => {
        if (!featureInput.trim()) return;
        setFeatures([...features, featureInput.trim()]);
        setFeatureInput("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile) {
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
            formData.append("image", imageFile);
            features.forEach(f => formData.append("features", f)); // send as array
            formData.append("status", "available");

            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cars/add`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                setCarName(""); setBrand(""); setPricePerDay(""); setCategory("Luxury");
                setFeatures([]); setImageFile(null);
            } else {
                toast.error(data.message || "Failed to add car");
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
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Car</h2>
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Top Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Car Name</label>
                            <input type="text" value={carName} onChange={(e) => setCarName(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. Tesla Model S" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. Tesla" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price per Day</label>
                            <input type="number" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. 150" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none">
                                <option>Luxury</option>
                                <option>SUV</option>
                                <option>Sedan</option>
                                <option>Sports</option>
                            </select>
                        </div>
                    </div>

                    {/* Features */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Features</h3>
                        <div className="flex gap-3">
                            <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter a feature" />
                            <button type="button" onClick={handleAddFeature} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                                Add
                            </button>
                        </div>
                        <ul className="mt-3 space-y-2">
                            {features.map((f, i) => (
                                <li key={i} className="px-4 py-2 bg-gray-100 rounded-lg border">{f}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Image Upload with previous UI */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Car Image</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag & drop</p>
                                    <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 800×400)</p>
                                </div>
                                <input type="file" className="hidden" onChange={(e) => setImageFile(e.target.files[0])} />
                            </label>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end">
                        <button type="button" className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg mr-4 hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={loading}
                            className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                            {loading ? "Adding..." : "Add Car"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCar;
