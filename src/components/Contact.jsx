import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-gray-900 text-white">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
                        <p className="text-gray-400 mb-8 text-lg">
                            Ready to start your journey? Contact us today to reserve your dream car or ask any questions about our fleet and services.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-600 p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Phone</h3>
                                    <p className="text-gray-400">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-600 p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Email</h3>
                                    <p className="text-gray-400">concierge@drivex.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-600 p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Location</h3>
                                    <p className="text-gray-400">123 Luxury Lane, Beverly Hills, CA 90210</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-8 rounded-2xl">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                                <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                <input type="email" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea rows="4" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="I'm interested in renting..."></textarea>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors duration-300">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
