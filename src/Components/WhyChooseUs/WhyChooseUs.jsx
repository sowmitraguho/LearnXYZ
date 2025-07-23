import React from "react";
import {
  FaShieldAlt,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaClock,
  FaUsers,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaShieldAlt size={28} />,
    title: "Trusted & Secure",
    desc: "Your data and payments are safe with industry-leading security protocols.",
  },
  {
    id: 2,
    icon: <FaChalkboardTeacher size={28} />,
    title: "Expert Instructors",
    desc: "Learn from experienced professionals passionate about teaching.",
  },
  {
    id: 3,
    icon: <FaLaptopCode size={28} />,
    title: "Cutting-Edge Content",
    desc: "Courses updated regularly to keep you ahead in technology trends.",
  },
  {
    id: 4,
    icon: <FaClock size={28} />,
    title: "Learn Anytime, Anywhere",
    desc: "Flexible schedules and mobile-friendly courses for your convenience.",
  },
  {
    id: 5,
    icon: <FaUsers size={28} />,
    title: "Community Support",
    desc: "Join a vibrant learner community for collaboration and growth.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-6 md:px-12 lg:px-24">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          Why Choose Us
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg">
          Discover what makes our platform the best choice for IT and higher
          education learners worldwide.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {features.map(({ id, icon, title, desc }) => (
          <div
            key={id}
            className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-110"
          >
            <div className="text-purple-600 dark:text-purple-400 mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
