import React, { use, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../FirebaseAuth/AuthContext";
import Swal from "sweetalert2";
import { FaDiscord, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import BookingModals from "../../Components/BookingModal/BookingModals";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const enrollmentData = [
  { month: "Jan", students: 120 },
  { month: "Feb", students: 180 },
  { month: "Mar", students: 250 },
  { month: "Apr", students: 300 },
  { month: "May", students: 400 },
  { month: "Jun", students: 550 },
];

const reviews = [
  {
    id: 1,
    name: "Sophia Turner",
    comment:
      "This course transformed my career! The instructor explains everything clearly with real-life examples.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "David Lee",
    comment:
      "I learned so much and gained practical skills. The community support was amazing too!",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4,
  },
  {
    id: 3,
    name: "Emily Davis",
    comment:
      "Engaging lessons, well-structured content, and a helpful instructor. Totally worth it!",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
  },
];

const ServiceDetails = () => {
  const { loggedInUser } = use(AuthContext);
  const serviceData = useLoaderData().data;

  const [booked, setBooked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const bookedServiceData = {
    studentName: loggedInUser.displayName,
    studentEmail: loggedInUser.email,
    studentId: loggedInUser.uid,
    serviceName: serviceData.serviceName,
    serviceArea: serviceData.serviceArea,
    serviceId: serviceData._id,
    serviceImage: serviceData.imageUrl,
    price: serviceData.price,
    providerName: serviceData.providerName,
    providerEmail: serviceData.providerEmail,
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleEnrollment = () => {
    handleOpenModal();
    setBooked(true);
    
    
    
  };

  return (
    <div className="py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-screen">
      <Helmet>
        <title>{serviceData.serviceName} | LearnX</title>
      </Helmet>

      {/* HERO SECTION */}
      <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src={serviceData.imageUrl}
          alt={serviceData.serviceName}
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white px-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg leading-snug">
            {serviceData.serviceName}
          </h1>
          <p className="mt-3 text-base sm:text-lg opacity-90">
            Master {serviceData.serviceArea} with this comprehensive course.
          </p>
        </motion.div>
      </div>

      {showModal && (
        <BookingModals
          serviceData={bookedServiceData}
          handleCloseModal={handleCloseModal}
        />
      )}

      {/* COURSE HIGHLIGHTS CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto -mt-14 sm:-mt-20 md:-mt-24 bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 text-center"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-20">
          <div>
            <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
              Duration
            </p>
            <h3 className="text-lg sm:text-xl font-bold">
              {serviceData.courseDuration || "110 Hours"}
            </h3>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
              Students
            </p>
            <h3 className="text-lg sm:text-xl font-bold">2000+</h3>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
              Language
            </p>
            <h3 className="text-lg sm:text-xl font-bold">English</h3>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
              Rating
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-yellow-500">
              ⭐ {serviceData.rating || "4.5"}
            </h3>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleEnrollment}
          disabled={booked}
          className="mt-6 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-base sm:text-lg text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          {booked ? "✅ Enrolled" : `Enroll Now - $${serviceData.price}`}
        </motion.button>
      </motion.div>

      {/*COURSE DETAILS & INSTRUCTOR */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="card max-w-6xl mx-auto mt-10 sm:mt-12 dark:bg-gray-900 rounded-3xl shadow-sm p-5 sm:p-8 md:p-10 bg-gray-200"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-4 text-center">
          About this Course
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg text-center leading-relaxed">
          {serviceData.description}
        </p>

        {/* Instructor Section */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Instructor */}
          <div className="flex items-center justify-center sm:justify-start gap-4">
            <img
              src={serviceData.providerImage}
              alt={serviceData.providerName}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-purple-400"
            />
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Instructor
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-indigo-700 dark:text-indigo-300">
                {serviceData.providerName}
              </h3>
            </div>
          </div>
          {/* Social Links */}
          <div className="flex justify-center gap-4 text-xl sm:text-2xl text-purple-600 dark:text-purple-300">
            <FaFacebook className="hover:text-blue-600 cursor-pointer" />
            <FaDiscord className="hover:text-indigo-600 cursor-pointer" />
            <FaXTwitter className="hover:text-black cursor-pointer" />
            <FaWhatsapp className="hover:text-green-600 cursor-pointer" />
          </div>
        </div>
      </motion.div>

      {/* ENROLLMENT TREND GRAPH */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto mt-10 sm:mt-12 bg-blue-100 dark:bg-gray-900 rounded-3xl shadow-xl p-5 sm:p-8 md:p-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700 dark:text-green-300 mb-4">
          Enrollment Growth
        </h2>
        <div className="w-full h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={enrollmentData}>
              <defs>
                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#6B46C1" />
              <YAxis stroke="#6B46C1" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="students"
                stroke="#7F56D9"
                fillOpacity={1}
                fill="url(#colorStudents)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* STUDENT REVIEWS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto mt-10 sm:mt-12 pb-14 sm:mb-20 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-3xl shadow-xl p-5 sm:p-8 md:p-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-pink-700 dark:text-pink-300 mb-6">
          What Students Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white dark:bg-gray-900 p-5 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-purple-300"
                />
                <div>
                  <h4 className="font-semibold text-base sm:text-lg text-purple-700 dark:text-purple-300">
                    {r.name}
                  </h4>
                  <p className="text-yellow-500 text-sm">
                    {"⭐".repeat(r.rating)}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                {r.comment}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceDetails;
