import React from "react";
import { FaLaptopCode, FaBrain, FaChartLine, FaCloud } from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Web Development",
    icon: <FaLaptopCode size={30} />,
    desc: "HTML, CSS, JavaScript, React, Node.js, and more.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 2,
    name: "AI & Machine Learning",
    icon: <FaBrain size={30} />,
    desc: "Deep learning, NLP, computer vision, and AI tools.",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "Data Science",
    icon: <FaChartLine size={30} />,
    desc: "Data analysis, Python, statistics, and visualization.",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    name: "Cloud Computing",
    icon: <FaCloud size={30} />,
    desc: "AWS, Azure, DevOps, and scalable infrastructure.",
    color: "from-orange-400 to-red-500",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="bg-base-200 px-6 md:px-12 lg:px-24 py-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Explore by Category
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
          Choose from a variety of IT & higher education fields and start
          learning your way.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="group p-6 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
          >
            {/* Gradient Icon */}
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r ${cat.color} text-white mb-4`}
            >
              {cat.icon}
            </div>

            {/* Category Name */}
            <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-purple-600 transition">
              {cat.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {cat.desc}
            </p>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-10">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-yellow-400 hover:to-orange-500 transition-all duration-300">
          View All Categories
        </button>
      </div>
    </section>
  );
}
