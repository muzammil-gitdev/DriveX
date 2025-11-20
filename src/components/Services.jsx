import React from 'react';

const services = [
    {
        title: 'Premium Quality',
        description: 'Every vehicle in our fleet is meticulously maintained and detailed to ensure a showroom-fresh experience every time you drive.',
        icon: (
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        title: '24/7 Concierge',
        description: 'Our dedicated support team is available around the clock to assist you with bookings, roadside assistance, or special requests.',
        icon: (
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
    },
    {
        title: 'Doorstep Delivery',
        description: 'We value your time. Choose our premium delivery service to have your chosen vehicle brought directly to your home, office, or hotel.',
        icon: (
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
];

const Services = () => {
    return (
        <section id="services" className="py-20 bg-white">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose DriveX?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We don't just rent cars; we provide an unparalleled driving experience tailored to your lifestyle.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {services.map((service, index) => (
                        <div key={index} className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
                            <div className="flex justify-center mb-6 bg-blue-50 w-24 h-24 rounded-full items-center mx-auto">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
