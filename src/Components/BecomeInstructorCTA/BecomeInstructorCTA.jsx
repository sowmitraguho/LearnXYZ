import React from "react";
import { motion } from "framer-motion";

export default function BecomeInstructorCTA() {
  return (
    <motion.section
      className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white py-20 px-6 md:px-12 lg:px-24 rounded-lg mx-6 md:mx-12 lg:mx-24 my-16 shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          Share Your Expertise <br className="hidden md:block" />  
          & Inspire the Next Generation
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mb-8 drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          Join our community of passionate educators and reach thousands of learners worldwide.
          Build your brand, earn income, and make a real impact.
        </motion.p>

        <motion.button
          className="inline-block px-8 py-3 text-lg font-semibold rounded-full bg-white text-purple-700 hover:bg-yellow-400 hover:text-gray-900 transition duration-500 ease-in-out shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(255, 223, 71, 0.8)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => alert("Redirect to instructor signup")}
        >
          Become an Instructor
        </motion.button>
      </div>
    </motion.section>
  );
}
