import React from "react";

const CarSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse border border-gray-100">
            {/* Image Placeholder */}
            <div className="h-64 bg-gray-300" />

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    {/* Title Placeholder */}
                    <div className="h-7 bg-gray-200 rounded-md w-1/2" />
                    {/* Price Placeholder */}
                    <div className="h-6 bg-gray-200 rounded-md w-1/4" />
                </div>

                {/* Features Badges Placeholders */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <div className="h-5 bg-gray-100 rounded w-16" />
                    <div className="h-5 bg-gray-100 rounded w-12" />
                    <div className="h-5 bg-gray-100 rounded w-20" />
                </div>

                {/* Button Placeholder */}
                <div className="h-12 bg-gray-200 rounded-xl w-full" />
            </div>
        </div>
    );
};

export default CarSkeleton;