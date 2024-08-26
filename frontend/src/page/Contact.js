import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import toast from 'react-hot-toast';

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                toast.success("Message sent successfully!");
                setName("");
                setEmail("");
                setMessage("");
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            toast.error("An error occurred: " + error.message);
        }
    };

    return (
        <div className="bg-gradient-to-r from-red-100 to-orange-100 min-h-screen flex items-center justify-center py-16 px-6">
            <div className="bg-white shadow-2xl rounded-3xl max-w-5xl mx-auto p-12">
                <h1 className="text-5xl font-extrabold text-red-600 mb-8 text-center">
                    Contact Us
                </h1>
                <p className="text-xl text-gray-800 mb-10 text-center leading-relaxed">
                    We're here to help! Reach out to us for any queries, feedback, or support. Our team at Amith Shop is dedicated to ensuring your satisfaction.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-3xl font-bold text-orange-600 mb-4">
                            Get in Touch
                        </h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-lg font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700">Message</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                    placeholder="Your Message"
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-orange-600 mb-4">
                            Contact Information
                        </h2>
                        <p className="text-lg text-gray-700 leading-loose mb-6">
                            If you have any questions, feel free to reach out to us through any of the following methods:
                        </p>
                        <ul className="text-lg text-gray-700 space-y-4">
                            <li><strong>Phone:</strong> +94 704 012 820</li>
                            <li><strong>Email:</strong> support@amithshop.com</li>
                            <li><strong>Address:</strong> 123 Food Street, Colombo, Sri Lanka</li>
                        </ul>

                        <div className="mt-8 flex justify-start space-x-6">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                <i className="fab fa-facebook-f text-2xl"></i>
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                                <i className="fab fa-linkedin-in text-2xl"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                                <i className="fab fa-twitter text-2xl"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-orange-600 mb-4 text-center">
                        Find Us Here
                    </h2>
                    <div className="w-full h-64 rounded-lg overflow-hidden shadow-inner">
                        <iframe
                            className="w-full h-full border-0"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.6332562529895!2d79.8588252145749!3d6.912660920978033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25919f6a0df1b%3A0xf3d6129eec021555!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1624976292219!5m2!1sen!2sus"
                            allowFullScreen=""
                            loading="lazy"
                            title="Google Map"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
