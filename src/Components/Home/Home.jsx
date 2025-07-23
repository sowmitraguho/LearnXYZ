import { Helmet } from "react-helmet";

import Banner from "../Banner/Banner";
import PopularServices from "../PopularServices/PopularServices";
import FeaturedCategories from "../FeaturedCategories/FeaturedCategories";
import Testimonials from "../Testimonial/Testimonials";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import BecomeInstructorCTA from "../BecomeInstructorCTA/BecomeInstructorCTA";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>LearnXYZ - Learn IT Skills Anytime</title>
      </Helmet>

      {/* Container for all sections */}
      <main className="flex flex-col">
        

        {/* Banner Slider */}
        <section className="mt-10">
          <Banner />
        </section>
       
        {/*  Popular Services */}
        <section className="mt-16 px-4">
          <PopularServices />
        </section>

        {/*  Featured Categories */}
        <section className="mt-16 bg-gray-50 dark:bg-gray-900 py-10">
          <FeaturedCategories />
        </section>

        {/*  Why Choose Us */}
        <section className="mt-16 px-4">
          <WhyChooseUs />
        </section>

        {/*  Testimonials */}
        <section className="mt-16 bg-gray-50 dark:bg-gray-900 py-10">
          <Testimonials />
        </section>

        {/* Become Instructor CTA */}
        <section className="mt-20 px-4">
          <BecomeInstructorCTA />
        </section>
      </main>
    </>
  );
};

export default Home;
