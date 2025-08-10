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
import { useRef } from "react";
import { FaBook, FaUserGraduate, FaStar, FaDollarSign } from "react-icons/fa";





ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const DashboardHome = () => {
    const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
    const [instructorData, setInstructorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const modalRef = useRef(null);


    // helper to safely open/close
    const openDialog = () => modalRef.current?.showModal && modalRef.current.showModal();
    const closeDialog = () => modalRef.current?.close && modalRef.current.close();



    useEffect(() => {
        if (!loggedInUser) return;
        const normalized = {
            ...loggedInUser,
            skills: Array.isArray(loggedInUser.skills) ? loggedInUser.skills.join(", ") : (loggedInUser.skills || ""),
            experiences: Array.isArray(loggedInUser.experiences) ? loggedInUser.experiences.join(", ") : (loggedInUser.experiences || ""),
            // ensure numeric fields exist
            coursesCount: loggedInUser.coursesCount ?? 0,
            pendingServices: loggedInUser.pendingServices ?? 0,
            studentsCount: loggedInUser.studentsCount ?? 0,
            earnings: loggedInUser.earnings ?? 0,
            reviewsCount: loggedInUser.reviewsCount ?? 0,
        };
        console.log('Normalized instructor data:', normalized);
        setInstructorData(normalized);
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

    // --- handlers ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInstructorData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            // convert editable strings back to arrays
            const { _id, ...rest } = instructorData;
            const payload = {
                ...rest,
                skills: typeof rest.skills === "string"
                    ? rest.skills.split(",").map(s => s.trim()).filter(Boolean)
                    : rest.skills,
                experiences: typeof rest.experiences === "string"
                    ? rest.experiences.split("\n").map(s => s.trim()).filter(Boolean)
                    : rest.experiences,
            };


            const url = `${import.meta.env.VITE_SERVER_URL}user/${email}`;
            console.log("Updating profile with payload:", payload);
            await axios.put(url, payload /*, { headers: { Authorization: `Bearer ${token}` } } if needed */);

            // update context
            setLoggedInUser((prev) => ({
                ...prev,
                ...instructorData,
            }));
            // show success feedback (toast / inline message)
            console.log("Profile updated successfully!");

            // close the dialog
            closeDialog();
        } catch (err) {
            console.error("Error updating profile:", err);
            // keep modal open and show feedback (toast / inline error)
        }
    };

    const stats = [
  { title: "Courses", value: coursesCount ?? 0, bgColor: "bg-purple-600", icon: <FaBook size={36} /> },
  { title: "Students", value: studentsCount ?? 0, bgColor: "bg-pink-600", icon: <FaUserGraduate size={36} /> },
  { title: "Reviews", value: reviewsCount ?? 0, bgColor: "bg-yellow-400", icon: <FaStar size={36} /> },
  { title: "Earnings", value: `$${earnings?.toLocaleString() ?? 0}`, bgColor: "bg-green-600", icon: <FaDollarSign size={36} /> },
];


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
                    <p><strong>Skills:</strong> {skills ? skills : "No skills provided"}</p>
                    <p><strong>Education:</strong> {education ? education : "No education information provided"}</p>
                    <p><strong>Current Position:</strong> {currentPosition ? currentPosition : "No current position provided"}</p>
                    <p>

                        <strong>Experiences:</strong>{" "}
                        {experiences ? experiences : "No experiences provided"}
                    </p>
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
                    {/* Edit button */}
                    <button
                        onClick={openDialog}
                        className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-yellow-400 hover:to-orange-500 transition-all duration-300"
                    >
                        Edit Profile
                    </button>
                </div>

                <div>


                    <dialog
                        ref={modalRef}
                        id="edit_profile_modal"
                        aria-labelledby="editProfileLabel"
                        className="modal modal-bottom sm:modal-middle"
                    >
                        <div className="modal-box max-w-2xl">
                            <h3 id="editProfileLabel" className="font-bold text-lg mb-4 text-purple-700">Edit Profile</h3>

                            <form onSubmit={handleUpdate} className="space-y-3">
                                <input
                                    type="text"
                                    name="name"
                                    value={instructorData.name ?? ""}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="input input-bordered w-full"
                                    required
                                />

                                <input
                                    type="text"
                                    name="expertise"
                                    value={instructorData.expertise ?? ""}
                                    onChange={handleChange}
                                    placeholder="Expertise"
                                    className="input input-bordered w-full"
                                />

                                <input
                                    type="text"
                                    name="skills"
                                    value={instructorData.skills ?? ""}
                                    onChange={handleChange}
                                    placeholder="Skills (comma separated)"
                                    className="input input-bordered w-full"
                                />

                                <input
                                    type="text"
                                    name="education"
                                    value={instructorData.education ?? ""}
                                    onChange={handleChange}
                                    placeholder="Education"
                                    className="input input-bordered w-full"
                                />

                                <input
                                    type="text"
                                    name="currentPosition"
                                    value={instructorData.currentPosition ?? ""}
                                    onChange={handleChange}
                                    placeholder="Current Position"
                                    className="input input-bordered w-full"
                                />

                                <textarea
                                    name="experiences"
                                    value={instructorData.experiences ?? ""}
                                    onChange={handleChange}
                                    placeholder="Experiences (one per line)"
                                    className="textarea textarea-bordered w-full"
                                />

                                <input
                                    type="text"
                                    name="address"
                                    value={instructorData.address ?? ""}
                                    onChange={handleChange}
                                    placeholder="Address"
                                    className="input input-bordered w-full"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={instructorData.email ?? ""}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="input input-bordered w-full"
                                />

                                <input
                                    type="tel"
                                    name="phone"
                                    value={instructorData.phone ?? ""}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                    className="input input-bordered w-full"
                                />

                                <input
                                    type="url"
                                    name="linkedin"
                                    value={instructorData.linkedin ?? ""}
                                    onChange={handleChange}
                                    placeholder="LinkedIn URL"
                                    className="input input-bordered w-full"
                                />

                                <input
                                    type="url"
                                    name="instagram"
                                    value={instructorData.instagram ?? ""}
                                    onChange={handleChange}
                                    placeholder="Instagram URL"
                                    className="input input-bordered w-full"
                                />

                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                    <button type="button" className="btn btn-outline" onClick={closeDialog}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </dialog>
                </div>





            </section>
            <section>
           

                    <div className="max-w-5xl mx-auto my-6">
                        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 justify-between">
                            {stats.map(({ title, value, bgColor, icon }) => (
                                <div
                                    key={title}
                                    className={`${bgColor} text-white rounded-xl shadow-lg flex items-center p-6 flex-1 min-w-[140px]`}
                                >
                                    <div className="text-4xl mr-4">{icon}</div>
                                    <div>
                                        <p className="text-lg font-semibold">{title}</p>
                                        <p className="text-3xl font-bold">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
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
