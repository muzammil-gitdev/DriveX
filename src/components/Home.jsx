import React from 'react';

const Home = ({ onBookNow }) => {
    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2800&auto=format&fit=crop"
                    alt="Luxury Car Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                    Drive the <span className="text-blue-500">Extraordinary</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light">
                    Experience the thrill of the open road with our premium fleet of luxury and sports cars. Unmatched performance, unforgettable journeys.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={onBookNow}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
                    >
                        Book Your Ride
                    </button>
                    <a
                        href="#fleet"
                        className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300"
                    >
                        View Fleet
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Home;
