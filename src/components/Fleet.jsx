import React from 'react';

const cars = [
    {
        id: 1,
        name: 'Porsche 911 Carrera',
        category: 'Sports',
        price: '$450/day',
        image: 'https://images.unsplash.com/photo-1680530943583-9b0db80fac69?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        features: ['0-60 in 3.5s', 'Automatic', '2 Seats'],
    },
    {
        id: 2,
        name: 'Mercedes-Benz S-Class',
        category: 'Luxury',
        price: '$350/day',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
        features: ['Chauffeur option', 'Massage Seats', '4 Seats'],
    },
    {
        id: 3,
        name: 'Range Rover Sport',
        category: 'SUV',
        price: '$300/day',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop',
        features: ['All-Terrain', 'Panoramic Roof', '5 Seats'],
    },
    {
        id: 4,
        name: 'Tesla Model S Plaid',
        category: 'Electric',
        price: '$280/day',
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
        features: ['Autopilot', 'Electric', '5 Seats'],
    },
    {
        id: 5,
        name: 'BMW M4 Competition',
        category: 'Sports',
        price: '$380/day',
        image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop',
        features: ['503 HP', 'Convertible', '4 Seats'],
    },
    {
        id: 6,
        name: 'Audi RS e-tron GT',
        category: 'Electric',
        price: '$400/day',
        image: 'https://images.unsplash.com/photo-1655126275641-21e114342284?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        features: ['Electric', 'Quattro AWD', '4 Seats'],
    },
];

const Fleet = ({ onBookNow }) => {
    return (
        <section id="fleet" className="py-20 bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Fleet</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Choose from our exclusive collection of high-performance and luxury vehicles.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map((car) => (
                        <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                                    {car.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                                    <span className="text-blue-600 font-bold">{car.price}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {car.features.map((feature, index) => (
                                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
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
            </div>
        </section>
    );
};

export default Fleet;
