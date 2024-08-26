// src/pages/About.js

import React from 'react';

const About = () => {
    return (
        <div className="bg-gradient-to-r from-red-100 to-orange-100 min-h-screen flex items-center justify-center py-16 px-6">
            <div className="bg-white shadow-2xl rounded-3xl max-w-5xl mx-auto p-12">
                <h1 className="text-5xl font-extrabold text-red-600 mb-8 text-center">
                    About Us
                </h1>
                <p className="text-xl text-gray-800 mb-10 text-center leading-relaxed">
                    Welcome to Amith Shop, your premier destination for fresh, high-quality food delivered straight to your doorstep. We are dedicated to making your online food shopping experience as convenient and enjoyable as possible.
                </p>
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-orange-600 mb-4 text-center">
                        Our Vision
                    </h2>
                    <p className="text-lg text-gray-700 leading-loose text-center">
                        To be the leading online food store, trusted for delivering premium quality products and exceptional service, ensuring every customer enjoys a delightful shopping experience.
                    </p>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-orange-600 mb-4 text-center">
                        Our Mission
                    </h2>
                    <p className="text-lg text-gray-700 leading-loose text-center">
                        Our mission at Amith Shop is to provide a seamless shopping experience with a wide variety of top-notch food products. We are committed to customer satisfaction by delivering on our promises, building a sustainable community, and fostering trust and reliability.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
