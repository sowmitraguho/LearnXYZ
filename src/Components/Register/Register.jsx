import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../FirebaseAuth/AuthContext";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import registerLottie from "../../assets/Lotties/register.json";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());
    const { email, password, name, photoURL } = userData;

    createUser(email, password)
      .then((result) => {
        if (result?.user?.uid) {
          Swal.fire({
            title: "🎉 Registration Successful!",
            text: "Welcome to LearnXYZ! Let's start learning.",
            icon: "success",
            timer: 2000,
          });
        }
        updateUser({ displayName: name, photoURL: photoURL })
          .then(() => {
            console.log("Profile updated!");
          })
          .catch((error) => console.log(error.message));
      })
      .catch((error) => console.log(error.message));

    form.reset();
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>

      <div className="relative min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black flex items-center justify-center px-6 py-24">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/dots.png')]"></div>

        {/* Grid container */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl w-full items-center">
          {/* ✅ Left side with Lottie & intro */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Start Your <span className="text-purple-600">Learning</span>{" "}
              Journey <br /> With Us!
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg max-w-md">
              Join a global learning community and gain access to top-quality IT
              & higher education courses. Learn anytime, anywhere.
            </p>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6"
            >
              <Lottie
                style={{ width: "350px" }}
                loop={true}
                animationData={registerLottie}
              />
            </motion.div>
          </motion.div>

          {/* ✅ Right side Register Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 md:p-8 border border-purple-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
              Create Your Account
            </h2>

            <form onSubmit={handleRegister} className="mt-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
                />
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Profile Photo URL
                </label>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="https://your-photo-link"
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
                />
              </div>

              {/* ✅ Register Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-pink-500 hover:to-orange-400 text-white font-semibold transition-all duration-300"
              >
                Sign Up
              </button>
            </form>

            {/* ✅ Divider */}
            <div className="flex items-center my-4">
              <span className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></span>
              <span className="px-2 text-gray-500 text-sm dark:text-gray-400">
                OR
              </span>
              <span className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></span>
            </div>

            {/* ✅ Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium transition-all duration-300"
            >
              <svg
                aria-label="Google logo"
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
              </svg>
              Sign up with Google
            </button>

            {/* ✅ Already have an account? */}
            <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 dark:text-green-400 font-medium hover:underline"
              >
                Login here
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Register;
