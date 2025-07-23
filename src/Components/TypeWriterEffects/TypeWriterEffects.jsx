import React from "react";
import { Typewriter } from "react-simple-typewriter";

const TypeWriterEffects = () => {
  return (
    <section className="relative text-center mt-20 mb-10">
      <h1 className="text-3xl md:text-5xl font-extrabold leading-snug">
        <span className="block text-gray-800 dark:text-gray-200">
          Learn <span className="text-purple-600">IT Skills</span> for today,
        </span>
        <span className="block mt-2">
          and{" "}
          <span className="text-purple-600 dark:text-yellow-400">
            <Typewriter
              words={[
                "build your future!",
                "start your journey today!",
                "unlock endless opportunities!",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </span>
      </h1>

      <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
        Learn from top instructors. Gain real-world IT knowledge.
        <span className="font-semibold text-purple-600">
          {" "}
          Anytime, Anywhere.
        </span>
      </p>

      <div className="mt-6 flex justify-center gap-4">
        <a
          href="/allservices"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold shadow-md transition-all"
        >
          🚀 Explore Courses
        </a>
        <a
          href="/signup"
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg font-semibold shadow-md transition-all"
        >
          Become an Instructor
        </a>
      </div>
    </section>
  );
};

export default TypeWriterEffects;
