import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Sarah K.",
    role: "Web Developer",
    photo:
      "https://randomuser.me/api/portraits/women/65.jpg",
    comment:
      "This platform helped me level up my skills quickly. The courses are well-structured and the instructors are knowledgeable!",
  },
  {
    id: 2,
    name: "James L.",
    role: "Data Scientist",
    photo:
      "https://randomuser.me/api/portraits/men/44.jpg",
    comment:
      "Amazing course selection and the learning community is very supportive. Highly recommend to anyone serious about their career.",
  },
  {
    id: 3,
    name: "Priya M.",
    role: "AI Enthusiast",
    photo:
      "https://randomuser.me/api/portraits/women/21.jpg",
    comment:
      "The practical examples and hands-on projects helped me understand complex AI concepts with ease. Great platform!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-base-100 py-16 px-6 md:px-12 lg:px-24">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
          What Our Students Say
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-3">
          Hear directly from our learners about their experiences and success stories.
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop={true}
        className="max-w-4xl mx-auto"
      >
        {testimonials.map(({ id, name, role, photo, comment }) => (
          <SwiperSlide key={id}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg flex flex-col items-center text-center">
              <img
                src={photo}
                alt={name}
                className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-purple-500"
              />
              <p className="text-gray-700 dark:text-gray-300 italic mb-6 max-w-xl">
                “{comment}”
              </p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {name}
              </h3>
              <p className="text-sm text-purple-600 dark:text-pink-400">{role}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
