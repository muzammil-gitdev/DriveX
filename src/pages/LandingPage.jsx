import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Fleet from '../components/Fleet';
import Services from '../components/Services';
import Contact from '../components/Contact';
import BookingModal from '../components/BookingModal';

const LandingPage = () => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    const openBooking = (car = null) => {
        setSelectedCar(car);
        setIsBookingOpen(true);
    };

    const closeBooking = () => {
        setIsBookingOpen(false);
        setSelectedCar(null);
    };

    return (
        <div className="font-sans antialiased text-gray-900">
            <Navbar onBookClick={() => openBooking(null)} />

            <main>
                <section id="home">
                    <Home onBookNow={() => openBooking(null)} />
                </section>
                <section id="fleet">
                    <Fleet onBookNow={openBooking} />
                </section>
                <section id="services">
                    <Services />
                </section>
                <section id="contact">
                    <Contact />
                </section>
            </main>

            <footer className="bg-gray-900 text-gray-400 py-8 text-center border-t border-gray-800">
                <p>&copy; 2024 DriveX. All rights reserved.</p>
            </footer>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={closeBooking}
                selectedCar={selectedCar}
            />
        </div>
    );
};

export default LandingPage;
