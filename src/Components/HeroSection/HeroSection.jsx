import React from 'react';

const HeroSection = () => {
    return (
        <div>
            {/* HERO SECTION */}
      <section className="hero min-h-[70vh] bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://via.placeholder.com/500x400"
            alt="hero"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-4xl font-bold">
              Learn IT & Higher Education from the Best Instructors
            </h1>
            <p className="py-6">
              Access high-quality online courses on programming, AI, data
              science, and more. Learn anytime, anywhere.
            </p>
            <button className="btn btn-primary">Browse Courses</button>
          </div>
        </div>
      </section>
        </div>
    );
};

export default HeroSection;