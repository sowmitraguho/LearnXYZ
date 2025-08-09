import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../FirebaseAuth/AuthContext";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const DashboardHome = () => {
  const { loggedInUser } = useContext(AuthContext);
  const [instructorData, setInstructorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace URL with your API endpoint
    // axios
    //   .get(`https://learnxyz-server.onrender.com/instructor/${loggedInUser?.uid}/dashboard`)
    //   .then((res) => {
    //     setInstructorData(res.data);
    //   })
    //   .catch((err) => {
    //     console.error("Error fetching dashboard data:", err);
        
    //   })
    //   .finally(() => setLoading(false));
    setInstructorData(loggedInUser);
    setLoading(false);
  }, [loggedInUser]);

  if (loading) return <p className="text-center">Loading dashboard data...</p>;
  if (!instructorData)
    return <p className="text-center text-red-500">Failed to load dashboard data.</p>;

  const {
    name,
    photoURL,
    expertise,
    skills,
    education,
    currentPosition,
    experiences,
    address,
    email,
    phone,
    linkedin,
    instagram,
    coursesCount,
    pendingServices,
    studentsCount,
    earnings,
    reviewsCount,
  } = instructorData;

  // Chart Data example (adjust according to your API data)
  const barData = {
    labels: ["Courses", "Pending Services", "Students", "Reviews"],
    datasets: [
      {
        label: "Count",
        data: [coursesCount, pendingServices, studentsCount, reviewsCount],
        backgroundColor: "rgba(128, 90, 213, 0.7)", // purple-ish
      },
    ],
  };

  const pieData = {
    labels: ["Earnings", "Other"],
    datasets: [
      {
        data: [earnings, 10000 - earnings], // example
        backgroundColor: ["#7c3aed", "#a78bfa"],
      },
    ],
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Profile Summary */}
      <section className="flex flex-col md:flex-row items-center gap-6 bg-purple-50 dark:bg-gray-700 rounded-lg p-6 shadow-md">
        <img
          src={photoURL}
          alt={name}
          className="w-32 h-32 rounded-full object-cover border-4 border-purple-600"
        />
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="italic text-purple-600">{expertise ? expertise : "Expertise not provided"}</p>
          <p><strong>Skills:</strong> {skills?.length > 0 ? skills.join(", ") : "No skills provided"}</p>
          <p><strong>Education:</strong> {education ? education : "No education information provided"}</p>
          <p><strong>Current Position:</strong> {currentPosition ? currentPosition : "No current position provided"}</p>
          <p><strong>Experiences:</strong> {experiences?.length > 0 ? experiences.join(", ") : "No experiences provided"}</p>
          <p><strong>Address:</strong> {address ? address : "No address provided"}</p>
          <p><strong>Email:</strong> <a href={`mailto:${email}`} className="underline text-purple-700">{email}</a></p>
          <p><strong>Phone:</strong> <a href={`tel:${phone ? phone : ""}`} className="underline text-purple-700">{phone}</a></p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="underline text-purple-700">
              {linkedin}
            </a>
          </p>
          <p>
            <strong>Instagram:</strong>{" "}
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="underline text-purple-700">
              {instagram}
            </a>
          </p>
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Activity Overview</h2>
          <Bar data={barData} />
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Earnings Distribution</h2>
          <Pie data={pieData} />
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;
