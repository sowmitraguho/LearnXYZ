import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import { Helmet } from "react-helmet";
import TypeWriterEffects from "../../Components/TypeWriterEffects/TypeWriterEffects";

const AllServices = () => {
    const [allServices, setAllServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch services
    useEffect(() => {
        axios
            .get("https://learnxyz-server.onrender.com/allservices")
            .then((result) => {
                setAllServices(result.data);
                setFilteredServices(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Filter services based on search
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = allServices.filter(
            (service) =>
                service.serviceName.toLowerCase().includes(query) ||
                service.description.toLowerCase().includes(query) ||
                service.serviceArea.toLowerCase().includes(query)
        );
        setFilteredServices(filtered);
    };

    return (
        <>
            <Helmet>
                <title>All Services | LearnXYZ</title>
            </Helmet>

            {/* Hero intro */}
            <section className="pt-24 text-center">
                <TypeWriterEffects />
            </section>

            <section className="px-6 md:px-16 lg:px-24 py-12 lg:py-20">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200">
                        Explore <span className="text-purple-600">All Services</span>
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Browse all available IT & higher education services. Search for what
                        fits your needs and start learning today.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="flex justify-center mb-8">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="🔍 Search for a course..."
                        className="w-full md:w-1/2 px-4 py-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                    />
                </div>

                {/* Services Grid */}
                {filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredServices.map((service, index) => (
                            <div
                                key={service._id}
                                className="animate-fadeIn"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animationFillMode: "both",
                                }}
                            >
                                <ServiceCard service={service} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        No services found matching "{searchQuery}"
                    </p>
                )}
            </section>
            {/* ✅ Extra Info Section */}
            <section className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-md p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Can’t Find the Right Course?
                </h2>
                <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-6">
                    We’re constantly adding new courses and learning paths tailored for tech
                    enthusiasts, students, and professionals. Whether you’re upgrading your
                    skills or starting your learning journey, there’s always something new
                    here.
                </p>
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-yellow-400 hover:via-orange-400 hover:to-orange-600 transition-all duration-300"
                >
                    Back to Top ↑
                </button>
            </section>

            {/* ✅ Another CTA Section */}
            <section className="my-12 text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                    Want to Become an Instructor?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                    Share your knowledge with thousands of learners worldwide. Create and
                    publish your own IT & higher education courses easily on LearnXYZ.
                </p>
                <button className="mt-4 px-5 py-3 text-white rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 transition-all duration-300">
                    Become an Instructor
                </button>
            </section>

        </>
    );
};

export default AllServices;
