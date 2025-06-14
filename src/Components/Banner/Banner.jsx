import React from 'react';
import { Link } from 'react-router';
import { motion } from "motion/react"

const Banner = () => {
    return (
        <div className='carousel w-full'>
            <div className="carousel-item w-full relative" id="slide1">
                <section className="w-full hero min-h-[50vh]" style={{
                backgroundImage:
                    "url(https://t3.ftcdn.net/jpg/04/00/77/64/360_F_400776431_5JxdDYRr1mn9yISiUFMPcLtLp3zt6NA1.jpg)",
            }}> <div className="hero-overlay"></div>
                <div className="grid max-w-screen-sm md:max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white uppercase">The <motion.span animate={{ color: ["#3C65F5", "#3B25C5", "#ffcc33"], transition: { duration: 8, repeat: Infinity } }} >World's #1 Online</motion.span> Education Platform</h1>
                        <p className="max-w-2xl mb-6 font-normal text-white lg:mb-8 md:text-lg lg:text-xl "> Learn from Experts. Teach with Passion. Education, Anywhere. Anytime.</p>

                        <Link to="/allcourses" className="inline-flex items-center justify-center px-5 py-3 text-base font-semibold text-center text-white bg-[#3747ff] rounded-lg hover:bg-[#ffcc33] hover:text-gray-950 focus:ring-4 focus:ring-gray-100 ">
                            Explore Courses
                        </Link>
                    </div>

                </div>
            </section>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" className="btn btn-circle">❮</a>
                <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
            </div>
            
            <div className="carousel-item w-full relative" id="slide2">
                <section className="w-full hero min-h-[50vh]" style={{
                backgroundImage:
                    "url(https://images.collegexpress.com/blog/how-build-better-relationships-with-teachers.jpg)",
            }}> <div className="hero-overlay"></div>
                <div className="grid max-w-screen-sm md:max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white uppercase"><motion.span animate={{ color: ["#3C65F5", "#3B25C5", "#ffcc33"], transition: { duration: 8, repeat: Infinity } }} >Skills </motion.span> that drive you forward</h1>
                        <p className="max-w-2xl mb-6 font-normal text-white lg:mb-8 md:text-lg lg:text-xl "> Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.</p>

                        <Link to="/allcourses" className="inline-flex items-center justify-center px-5 py-3 text-base font-semibold text-center text-white bg-[#3747ff] rounded-lg hover:bg-[#ffcc33] hover:text-gray-950 focus:ring-4 focus:ring-gray-100 ">
                            Explore Courses
                        </Link>
                    </div>

                </div>
            </section>
             <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" className="btn btn-circle">❮</a>
                <a href="#slide1" className="btn btn-circle">❯</a>
            </div>
            </div>
           
            
        </div>
    );
};

export default Banner;