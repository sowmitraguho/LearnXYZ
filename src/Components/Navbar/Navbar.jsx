import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../FirebaseAuth/AuthContext";
import { Tooltip } from "react-tooltip";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "../toggleTheme/toggleTheme";

const Navbar = () => {
    const { loggedInUser, setLoggedInUser, logOut } = useContext(AuthContext);
    const { theme, setTheme } = useContext(ThemeContext);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Theme toggle
    // const handleToggle = (e) => {
    //     setTheme(e.target.checked ? "dark" : "light");
    // };

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);

        if (
            localStorage.getItem("color-theme") === "dark" ||
            (!("color-theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                setLoggedInUser(null);
            })
            .catch((error) => console.log(error));
    };

    const navItems = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `px-4 py-2 rounded-md transition hover:text-purple-500 ${isActive ? "text-purple-600 font-semibold" : "text-gray-700 dark:text-gray-200"
                    }`
                }
            >
                Home
            </NavLink>

            <NavLink
                to="/allservices"
                className={({ isActive }) =>
                    `px-4 py-2 rounded-md transition hover:text-purple-500 ${isActive ? "text-purple-600 font-semibold" : "text-gray-700 dark:text-gray-200"
                    }`
                }
            >
                Services
            </NavLink>

            {loggedInUser && (
                <div className="relative group">
                    <span className="px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:text-purple-500">
                        Dashboard ▾
                    </span>
                    <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-md mt-2 z-50">
                        <ul className="flex flex-col w-48 p-2 text-gray-700 dark:text-gray-200">
                            <NavLink to="/addservice" className="hover:text-purple-500 p-2">
                                ➕ Add Service
                            </NavLink>
                            <NavLink to="/myservices" className="hover:text-purple-500 p-2">
                                🛠 Manage Service
                            </NavLink>
                            <NavLink to="/bookedservices" className="hover:text-purple-500 p-2">
                                📘 Booked Service
                            </NavLink>
                            <NavLink to="/servicestodo" className="hover:text-purple-500 p-2">
                                ✅ Service To Do
                            </NavLink>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );

    return (
        <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    LearnXYZ
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex gap-4">{navItems}</div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Profile + Tooltip */}
                    <img
                        data-tooltip-id="user-tooltip"
                        data-tooltip-content={loggedInUser?.displayName || "Guest"}
                        className="w-10 h-10 rounded-full border-2 border-purple-500"
                        src={
                            loggedInUser?.photoURL ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt="Profile"
                    />
                    <Tooltip id="user-tooltip" />

                    {/* Login/Logout */}
                    {loggedInUser?.uid ? (
                        <button
                            onClick={handleLogOut}
                            className="hidden md:inline px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="hidden md:inline px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
                        >
                            Login
                        </button>
                    )}

                    {/* Theme Toggle */}

                    <ThemeToggle theme={theme} setTheme={setTheme}/>


                    {/* Theme Toggle */}
                  


                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden text-2xl text-gray-700 dark:text-gray-200"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-gray-900 shadow-md p-4 flex flex-col gap-3">
                    {navItems}
                    {loggedInUser?.uid ? (
                        <button
                            onClick={handleLogOut}
                            className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
                        >
                            Login
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
