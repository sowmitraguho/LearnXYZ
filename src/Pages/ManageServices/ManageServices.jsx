import axios from "axios";
import React, { use, useEffect, useState } from "react";
import MyServiceCard from "../../Components/MyServiceCard/MyServiceCard";
import { AuthContext } from "../../FirebaseAuth/AuthContext";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const ManageServices = () => {
    const { loggedInUser, loading } = use(AuthContext);
    const [allServices, setAllServices] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!loggedInUser?.email) return;
        axios
            .get(`https://learnxyz-server.onrender.com/myservices/${loggedInUser.email}`)
            .then((result) => {
                setAllServices(result.data);
                setFetching(false);
            })
            .catch((error) => {
                console.log(error);
                setFetching(false);
            });
    }, [loggedInUser?.email]);

    if (loading || fetching) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <span className="loading loading-spinner text-purple-500 w-10 h-10"></span>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Fetching your services...</p>
            </div>
        );
    }
    return (
        <>
            <Helmet>
                <title>Manage Services | LearnXYZ</title>
            </Helmet>
            <div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-24 px-6 md:px-12 lg:px-20'>
                {/* ✅ Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        ✨ Services You've Published
                    </h1>
                    <p className="mt-3 text-gray-700 dark:text-gray-300">
                        Manage all your published courses & services in one place
                    </p>
                </motion.div>

                <motion.div initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, scale: 0.95 },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            transition: { staggerChildren: 0.1 },
                        },
                    }} className="grid grid-cols-1 gap-4">
                    {
                        allServices.map(service => <MyServiceCard key={service._id} service={service} />)
                    }
                </motion.div>
                {/* ✅ Quick Stats Section */}
                <section className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                        📊 Your Course Insights
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="p-4 bg-gradient-to-r from-purple-200 to-purple-100 dark:from-purple-700 dark:to-purple-600 rounded-xl shadow">
                            <h3 className="text-3xl font-extrabold text-purple-700 dark:text-purple-100">
                                {allServices.length}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">Total Courses</p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-pink-200 to-pink-100 dark:from-pink-700 dark:to-pink-600 rounded-xl shadow">
                            <h3 className="text-3xl font-extrabold text-pink-700 dark:text-pink-100">
                                1,240+
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">Enrolled Students</p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-700 dark:to-blue-600 rounded-xl shadow">
                            <h3 className="text-3xl font-extrabold text-blue-700 dark:text-blue-100">
                                4.8★
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">Average Rating</p>
                        </div>
                    </div>
                </section>
                {/* ✅ Tips Section */}
                <section className="mt-16 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
                        💡 Tips to Make Your Courses Stand Out
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Use <b>high-quality cover images</b> to attract more learners</li>
                        <li>Write <b>clear and engaging course descriptions</b></li>
                        <li>Set a <b>competitive yet reasonable price</b></li>
                        <li>Keep course content <b>updated with the latest trends</b></li>
                        <li>Encourage students to <b>leave reviews</b> after completion</li>
                    </ul>
                </section>


            </div>
        </>
    );
};

export default ManageServices;