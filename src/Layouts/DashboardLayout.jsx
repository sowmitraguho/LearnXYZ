import React, { useContext } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";

import Lottie from "lottie-react";
import dashboardLottie from "../assets/Lotties/admin.json"; 
import { FiLogOut, FiHome, FiPlus, FiTool, FiCheckSquare } from "react-icons/fi";
import { AuthContext } from "../FirebaseAuth/AuthContext";

const DashboardLayout = () => {
  const { loggedInUser, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut().then(() => {
      navigate("/");
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-900 shadow-lg flex flex-col justify-between">
        {/* Top: Logo & Profile */}
        <div>
          <Link
            to="/"
            className="block text-3xl font-extrabold text-purple-600 dark:text-purple-400 p-6 hover:opacity-80"
          >
            LearnXYZ
          </Link>

          <div className="flex flex-col items-center p-6 border-b border-gray-200 dark:border-gray-700">
            <img
              src={
                loggedInUser?.photoURL ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="User Profile"
              className="w-20 h-20 rounded-full border-2 border-purple-500 object-cover"
            />
            <h2 className="mt-3 text-xl font-semibold">{loggedInUser?.displayName || "Instructor"}</h2>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col mt-6">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 hover:bg-purple-100 dark:hover:bg-gray-700 transition ${
                  isActive ? "bg-purple-200 dark:bg-purple-800 font-semibold" : ""
                }`
              }
            >
              <FiHome size={20} /> Dashboard Home
            </NavLink>
            <NavLink
              to="/dashboard/addservice"
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 hover:bg-purple-100 dark:hover:bg-gray-700 transition ${
                  isActive ? "bg-purple-200 dark:bg-purple-800 font-semibold" : ""
                }`
              }
            >
              <FiPlus size={20} /> Add Service
            </NavLink>
            <NavLink
              to="/dashboard/myservices"
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 hover:bg-purple-100 dark:hover:bg-gray-700 transition ${
                  isActive ? "bg-purple-200 dark:bg-purple-800 font-semibold" : ""
                }`
              }
            >
              <FiTool size={20} /> Manage Services
            </NavLink>
            <NavLink
              to="/dashboard/servicestodo"
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 hover:bg-purple-100 dark:hover:bg-gray-700 transition ${
                  isActive ? "bg-purple-200 dark:bg-purple-800 font-semibold" : ""
                }`
              }
            >
              <FiCheckSquare size={20} /> Services To Do
            </NavLink>
          </nav>
        </div>

        {/* Bottom: Lottie + Logout */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <Lottie
            animationData={dashboardLottie}
            loop
            style={{ width: "100%", maxHeight: 150 }}
          />
          <button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-pink-500 hover:to-orange-400 text-white rounded-lg font-semibold transition"
          >
            <FiLogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Right Content */}
      <main className="flex-1 p-6 md:p-12 overflow-auto bg-white dark:bg-gray-800 rounded-tl-3xl">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
