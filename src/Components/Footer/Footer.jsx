import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white">LearnXYZ</h2>
          <p className="mt-4 text-sm leading-relaxed">
            Your trusted platform for IT and higher education. Learn anytime, anywhere from top instructors.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition duration-500">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition duration-500">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition duration-500">
              <FaLinkedinIn />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition duration-500">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-purple-400 transition">Home</a></li>
            <li><a href="/allservices" className="hover:text-purple-400 transition">Courses</a></li>
            <li><a href="/about" className="hover:text-purple-400 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-purple-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Popular Categories</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-purple-400 transition">Web Development</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">AI & ML</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Data Science</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Cloud Computing</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
          <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-gray-900 focus:outline-none flex-1"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition text-white"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-8"></div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} LearnXYZ. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-purple-400">Privacy Policy</a>
          <a href="#" className="hover:text-purple-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
