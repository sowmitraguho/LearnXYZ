import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

const bannerSlides = [
  {
    id: 1,
    title: "The World's #1 Online Education Platform",
    subtitle: "Learn from Experts. Teach with Passion. Education, Anywhere. Anytime.",
    image:
      "https://t3.ftcdn.net/jpg/04/00/77/64/360_F_400776431_5JxdDYRr1mn9yISiUFMPcLtLp3zt6NA1.jpg",
  },
  {
    id: 2,
    title: "Skills That Drive You Forward",
    subtitle:
      "Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.",
    image:
      "https://images.collegexpress.com/blog/how-build-better-relationships-with-teachers.jpg",
  },
  {
    id: 3,
    title: "Learn Anytime, Anywhere",
    subtitle:
      "Flexible learning paths designed for your success. Join millions of learners today!",
    image:
      "https://i.ibb.co/x8jgjgTD/side-view-friends-traveling-by-train.jpg",
  },
];

export default function Banner() {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-[60vh] md:h-[80vh]"
      >
        {bannerSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-start max-w-screen-xl mx-auto px-6 h-full">
              <motion.h1
                className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl"
                animate={{
                  color: ["#ffffff", "#3C65F5", "#ffcc33", "#ffffff"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                }}
              >
                {slide.title}
              </motion.h1>

              <p className="text-base md:text-lg lg:text-xl text-gray-200 mt-4 max-w-2xl">
                {slide.subtitle}
              </p>

              <div className="mt-6">
                <Link
                  to="/allservices"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-yellow-400 hover:to-orange-500 transition-all duration-300"
                >
                  Explore Courses
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
