import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../FirebaseAuth/AuthContext";
import Lottie from "lottie-react";
import signInLottie from "../../assets/Lotties/signIn.json";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { googleSignIn, signIn } = React.useContext(AuthContext);

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                navigate(location?.state || "/");
                console.log(result);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());
        const { email, password } = userData;

        signIn(email, password)
            .then((result) => {
                if (result.user.uid) {
                    Swal.fire({
                        title: "Login Successful!",
                        icon: "success",
                        draggable: true,
                    });
                }
                navigate(location?.state || "/");
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    title: "Wrong Email or Password!",
                    icon: "warning",
                    draggable: true,
                });
            });
    };

    return (
        <div className="pt-12">
            <Helmet>
                <title>Login | LearnXYZ</title>
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors">
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-10 p-6">
                    {/* ✅ Left Side: Text + Animation */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left space-y-6"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                            Welcome Back to{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600">
                                LearnXYZ
                            </span>
                        </h1>

                        <p className="text-gray-700 dark:text-gray-300 max-w-md mx-auto lg:mx-0">
                            Sign in to continue learning, track your progress, and explore
                            hundreds of tech & higher education courses curated just for you.
                        </p>

                        {/* Lottie Animation */}
                        <div className="flex justify-center lg:justify-start">
                            <Lottie
                                style={{ width: "320px", height: "320px" }}
                                animationData={signInLottie}
                                loop={true}
                            />
                        </div>
                    </motion.div>

                    {/* ✅ Right Side: Login Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-md mx-auto border border-gray-200 dark:border-gray-700"
                    >
                        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                            Sign In to Your Account
                        </h2>

                        <form onSubmit={handleSignIn} className="mt-6 space-y-4">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="you@example.com"
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
                                    required
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="********"
                                />
                            </div>

                            <div className="text-sm text-center">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-purple-600 hover:underline dark:text-green-400"
                                >
                                    Register Now
                                </Link>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-500 via-purple-600 to-blue-600 hover:from-yellow-400 hover:via-orange-400 hover:to-orange-600 transition-all duration-300"
                            >
                                Sign In
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-4">
                            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                            <span className="px-2 text-gray-500 dark:text-gray-400 text-sm">
                                OR
                            </span>
                            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                        </div>

                        {/* Google Sign In */}

                        <button onClick={handleGoogleSignIn} className="w-full flex items-center font-semibold justify-center gap-3 py-3 bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg border border-gray-300 hover:shadow-md hover:bg-blue-400 transition-all">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Extra Section: Benefits */}
            <section className="relative py-16 text-center bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/dots.png')] dark:opacity-5"></div>

                {/* Content */}
                <div className="relative max-w-2xl mx-auto px-6">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white drop-shadow-md">
                        Why Join{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                            LearnXYZ?
                        </span>
                    </h3>

                    <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Unlock <span className="font-semibold">personalized learning</span>, gain{" "}
                        <span className="font-semibold">lifetime access</span> to high-quality courses,
                        earn{" "}
                        <span className="font-semibold text-purple-700 dark:text-green-400">
                            certificates
                        </span>{" "}
                        to boost your career, and connect with a{" "}
                        <span className="italic">global learning community</span>.
                    </p>

                    {/* Add 3 Quick Benefits */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="p-4 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur shadow-md">
                            <h4 className="text-lg font-bold text-purple-700 dark:text-green-400">
                                Learn Anytime
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                24/7 access to all courses from any device.
                            </p>
                        </div>

                        <div className="p-4 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur shadow-md">
                            <h4 className="text-lg font-bold text-purple-700 dark:text-green-400">
                                Certified Courses
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                Earn valuable certificates for your career.
                            </p>
                        </div>

                        <div className="p-4 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur shadow-md">
                            <h4 className="text-lg font-bold text-purple-700 dark:text-green-400">
                                Expert Mentors
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                Learn directly from industry professionals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Login;
