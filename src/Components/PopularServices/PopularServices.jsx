import axios from "axios";
import React, { useEffect, useState } from "react";
import ServiceCard from "../ServiceCard/ServiceCard";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const PopularServices = () => {
  const [allServices, setAllServices] = useState([]);

  useEffect(() => {
    axios
      .get("https://learnxyz-server.onrender.com/allservices")
      .then((result) => {
        setAllServices(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const popularServices = allServices.filter(
    (service) => service.rating >= 4.5
  );

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible" className="bg-base-100 px-6 md:px-12 lg:px-24 py-12 md:py-20">
      {/* ✅ Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Popular Services
        </h2>
        <p className="text-gray-500 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
          Explore our top-rated services trusted by thousands of learners.
        </p>
      </div>

      {/* ✅ Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {popularServices.length > 0 ? (
          popularServices.map((service) => (
            <motion.div
              key={service._id} variants={cardVariants}
              className="transition-transform duration-300 hover:-translate-y-2"
            >
              <ServiceCard service={service} />
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            Loading popular services...
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default PopularServices;
