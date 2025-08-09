import React, { useContext, useState } from "react";
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

  const [loading, setLoading] = useState(false);
  const imgbbAPIKey = import.meta.env.VITE_imgbbApiKey; 

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const imageFile = form.photoFile.files[0]; // file input

    try {
      // Upload image to ImgBB
      let photoURL = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.success) {
          photoURL = data.data.url;
        } else {
          Swal.fire("Image upload failed", data.error?.message || "", "error");
          setLoading(false);
          return;
        }
      }

      // Create user
      const result = await createUser(email, password);
      if (result?.user?.uid) {
        Swal.fire({
          title: "Registration Successful!",
          text: "Welcome to LearnXYZ! Let's start learning.",
          icon: "success",
          timer: 2000,
        });

        // Update user profile
        await updateUser({ displayName: name, photoURL });
      }

      navigate("/");
      form.reset();
    } catch (error) {
      console.log(error.message);
      Swal.fire("Error", error.message, "error");
    }

    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>

      <div className="relative min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black flex items-center justify-center px-6 py-24">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/dots.png')]"></div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl w-full items-center">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Start Your <span className="text-purple-600">Learning</span> Journey
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg max-w-md">
              Join a global learning community and gain access to top-quality IT & higher education courses.
            </p>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6"
            >
              <Lottie style={{ width: "350px" }} loop={true} animationData={registerLottie} />
            </motion.div>
          </motion.div>

          {/* Right Side */}
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
                  required
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Profile Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Profile Photo
                </label>
                <input
                  type="file"
                  name="photoFile"
                  accept="image/*"
                  required
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white"
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
                  required
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white"
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
                  required
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-4">
              <span className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></span>
              <span className="px-2 text-gray-500 text-sm dark:text-gray-400">OR</span>
              <span className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></span>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            >
              Sign up with Google
            </button>

            {/* Already have account */}
            <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 dark:text-green-400 hover:underline">
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
