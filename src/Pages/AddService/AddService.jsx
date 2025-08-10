import React, { useContext, useState } from "react";
import { AuthContext } from "../../FirebaseAuth/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const imgbbKey = import.meta.env.VITE_imgbbApiKey; 

const AddService = () => {
  const { loggedInUser, getUser } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);

  // Helper to upload image to imgbb and return url
  const uploadToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
      formData
    );
    return res.data.data.url;
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    setUploading(true);
    const form = e.target;
    const formData = new FormData(form);
    let serviceData = Object.fromEntries(formData.entries());

    try {
      // Upload images first
      const coverFile = form.coverImage.files[0];
      const cardFile = form.cardImage.files[0];

      if (coverFile) {
        serviceData.coverImage = await uploadToImgbb(coverFile);
      }
      if (cardFile) {
        serviceData.cardImage = await uploadToImgbb(cardFile);
      }

      // Provider image from logged in user
      serviceData.providerImage = loggedInUser.photoURL;

      // Post to backend
      await axios.post(`${import.meta.env.VITE_SERVER_URL}services`, serviceData);

      await axios.put(`${import.meta.env.VITE_SERVER_URL}user/${loggedInUser.email}`, { $inc: { coursesCount: 1 } });

      await getUser(loggedInUser.email);

      // Show success message

      Swal.fire({
        title: "Service Published Successfully!",
        text: "Your course is now live!",
        icon: "success",
        timer: 2000,
      });
      form.reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Try again later.",
        icon: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Your Course | LearnX</title>
      </Helmet>

      <div className="py-10 min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 sm:p-10"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Add a New Course
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Fill out the details below to publish your course
            </p>
          </div>

          <form onSubmit={handleAddService} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Course Name" name="serviceName" placeholder="e.g. Advanced React" required />
              <FormField label="Course Area" name="serviceArea" placeholder="e.g. Web Development" required />
              <FormField label="Course Type" name="serviceType" placeholder="e.g. Online Bootcamp" required />
              <FormField label="Course Language" name="serviceLanguage" placeholder="e.g. English" required />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cover Image
                </label>
                <input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  className="mt-2 w-full text-gray-800 dark:text-gray-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Card Image
                </label>
                <input
                  type="file"
                  name="cardImage"
                  accept="image/*"
                  className="mt-2 w-full text-gray-800 dark:text-gray-200"
                  required
                />
              </div>

              <FormField label="Course Duration" name="courseDuration" placeholder="e.g. 40 hours" required />
              <FormField label="Course Modules" name="courseModules" placeholder="e.g. 10 modules" required />
              <FormField label="Course Level" name="courseLevel" placeholder="e.g. Beginner" required />
              <FormField label="Course Assignments" name="courseAssignments" placeholder="No of assignments" required />
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
            <FormField label="Skills Provided" name="skills" placeholder="e.g. JavaScript, React" required />
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                className="w-5 h-5 rounded-md text-purple-500 focus:ring-purple-300 dark:bg-gray-800"
                required
                disabled={uploading}
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

            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              disabled={uploading}
              className={`w-full py-3 rounded-xl text-lg font-bold text-white shadow-lg hover:shadow-xl transition-all ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
              }`}
            >
              {uploading ? "Uploading..." : "Publish Course"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

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
