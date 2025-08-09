import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../FirebaseAuth/AuthContext";
import axios from "axios";
import BookedServiceCard from "../../Components/BookedServiceCard/BookedServiceCard";
import { Link } from "react-router";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import FeaturedCategories from "../../Components/FeaturedCategories/FeaturedCategories";

const BookedService = () => {
    const { loggedInUser, loading } = use(AuthContext);
    const [allServices, setAllServices] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!loggedInUser?.email) return;

        axios
            .get(
                `https://learnxyz-server.onrender.com/bookedServices/${loggedInUser.email}`,
                {
                    headers: {
                        Authorization: `Bearer ${loggedInUser.accessToken}`,
                    },
                }
            )
            .then((result) => {
                setAllServices(result.data);
                setFetching(false);
            })
            .catch((error) => {
                console.log(error);
                setFetching(false);
            });
    }, [loggedInUser?.email, loggedInUser?.accessToken]);

    if (loading || fetching) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gradient-to-br from-purple-100 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <span className="loading loading-spinner text-purple-500 w-10 h-10"></span>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
                    Fetching your booked services...
                </p>
            </div>
        );
    }


    return (
        <div>
            <Helmet>
                <title>Booked Services | LearnXYZ</title>
            </Helmet>
            <div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-32 px-6 md:px-12 lg:px-20'>
                {/* ✅ Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        🎓 Your Purchased Courses
                    </h1>
                    <p className="mt-3 text-gray-700 dark:text-gray-300">
                        Manage and revisit the courses you’ve enrolled in
                    </p>
                </motion.div>
                {/* ✅ Booked Services List */}
                {allServices.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, scale: 0.95 },
                            visible: {
                                opacity: 1,
                                scale: 1,
                                transition: { staggerChildren: 0.1 },
                            },
                        }}
                        className="grid grid-cols-1 md:grid-cols-2  gap-6"
                    >
                        {allServices.map((service) => (
                            <motion.div
                                key={service._id}
                                whileHover={{ scale: 1.03 }}
                                className="transition-transform"
                            >
                                <BookedServiceCard service={service} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    /* ✅ Empty State */
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center justify-center mt-16 text-center"
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                            alt="No Bookings"
                            className="w-36 h-36 mb-6 opacity-90"
                        />
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                            No Booked Courses Yet
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Explore our course library and start your learning journey today!
                        </p>
                        <Link
                            to="/allservices"
                            className="inline-block px-6 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg transition-all"
                        >
                            🔍 Explore Courses
                        </Link>
                    </motion.div>
                )}


            </div>
            {/* ✅ Learning Progress Section */}
            <section className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                    📈 Your Learning Progress
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-purple-200 to-purple-100 dark:from-purple-700 dark:to-purple-600">
                        <h3 className="text-3xl font-extrabold text-purple-700 dark:text-purple-100">
                            {allServices.length}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mt-1">Enrolled Courses</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-r from-pink-200 to-pink-100 dark:from-pink-700 dark:to-pink-600">
                        <h3 className="text-3xl font-extrabold text-pink-700 dark:text-pink-100">
                            45%
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mt-1">Average Completion</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-700 dark:to-blue-600">
                        <h3 className="text-3xl font-extrabold text-blue-700 dark:text-blue-100">
                            120+
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mt-1">Lessons Completed</p>
                    </div>
                </div>
            </section>
            
           
            {/* ✅ Motivational Banner */}
            <section className="mt-16 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-xl p-8 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    🚀 Keep Learning, Keep Growing!
                </h2>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                    Completing your courses unlocks more opportunities. Don't stop now!
                </p>
                <Link
                    to="/allservices"
                    className="mt-5 inline-block px-6 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg transition-all mb-12"
                >
                    Explore More Courses
                </Link>
                <FeaturedCategories/>
            </section>


        </div>
    );
};

export default BookedService;