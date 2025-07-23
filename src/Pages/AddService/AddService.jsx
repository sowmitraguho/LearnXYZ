import React, { use } from "react";
import { AuthContext } from "../../FirebaseAuth/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const AddService = () => {
  const { loggedInUser } = use(AuthContext);

  const handleAddService = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const serviceData = Object.fromEntries(data.entries());
    serviceData.providerImage = loggedInUser.photoURL;

    axios
      .post("https://learnxyz-server.onrender.com/services", serviceData)
      .then((res) => {
        Swal.fire({
          title: "✅ Service Published Successfully!",
          text: "Your course is now live!",
          icon: "success",
          timer: 2000,
        });
        form.reset();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "❌ Error!",
          text: "Something went wrong. Try again later.",
          icon: "error",
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Add Service | LearnX</title>
      </Helmet>

      {/* ✅ Gradient Background */}
      <div className="py-24 min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        {/* ✅ Card Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 sm:p-10"
        >
          {/* ✅ Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              🚀 Add a New Course
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Fill out the details below to publish your course
            </p>
          </div>

          {/* ✅ Form */}
          <form onSubmit={handleAddService} className="space-y-6">
            {/* ✅ Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Service Name" name="serviceName" placeholder="e.g. Advanced React" required />
              <FormField label="Service Area" name="serviceArea" placeholder="e.g. Web Development" required />
              <FormField label="Service Type" name="serviceType" placeholder="e.g. Online Bootcamp" required />
              <FormField label="Service Language" name="serviceLanguage" placeholder="e.g. English" required />
              <FormField label="Service Image URL" name="imageUrl" placeholder="https://example.com/image.jpg" required />
              <FormField label="Course Duration" name="courseDuration" placeholder="e.g. 40 hours" required />
              <FormField label="Price" name="price" type="number" placeholder="e.g. 299" required />

              {/* Provider Name & Email (Readonly) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Provider Name
                </label>
                <input
                  name="providerName"
                  type="text"
                  value={loggedInUser?.displayName || ""}
                  readOnly
                  className="mt-2 w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Provider Email
                </label>
                <input
                  name="providerEmail"
                  type="email"
                  value={loggedInUser?.email || ""}
                  readOnly
                  className="mt-2 w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-400 outline-none"
                />
              </div>
            </div>

            {/* ✅ Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Course Description
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="Write a brief description about the course..."
                required
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-pink-400 outline-none"
              ></textarea>
            </div>

            {/* ✅ Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                className="w-5 h-5 rounded-md text-purple-500 focus:ring-purple-300 dark:bg-gray-800"
                required
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                I agree with the{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  terms and conditions
                </a>
              </label>
            </div>

            {/* ✅ Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full py-3 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg hover:shadow-xl transition-all"
            >
              ✅ Publish Course
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

/* ✅ Reusable Input Field Component */
const FormField = ({ label, name, type = "text", placeholder, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      className="mt-2 w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-400 outline-none"
    />
  </div>
);

export default AddService;
