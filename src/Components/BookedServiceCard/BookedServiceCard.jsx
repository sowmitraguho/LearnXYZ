import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../FirebaseAuth/AuthContext";

const BookedServiceCard = ({ service, changeStat }) => {
    const { loggedInUser } = React.useContext(AuthContext);
    const {
        cardImage,
        imageUrl,
        price,
        providerImage,
        providerName,
        serviceArea,
        serviceName,
        status,
    } = service;

    const handleChangeStatus = async () => {
        const { value: newStatus } = await Swal.fire({
            title: "Change Course Status",
            input: "select",
            inputOptions: {
                Pending: "Pending",
                Completed: "Completed",
                Ongoing: "Ongoing",
            },
            inputPlaceholder: "Select new status",
            showCancelButton: true,
        });

        if (newStatus) {
            try {
                await axios.put(
                    `https://learnxyz-server.onrender.com/bookedServices/${loggedInUser?.email}`,
                    { status: newStatus, serviceId: service._id }
                );
                Swal.fire({
                    title: "Status Updated",
                    text: `You selected: ${newStatus}`,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: "Update Failed",
                    text: "Please try again later.",
                    icon: "error",
                });
            }
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 max-w-md mx-auto">
            {/* Image on top */}
            <div className="w-full h-56 overflow-hidden rounded-t-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <img
                    src={cardImage || imageUrl}
                    alt={serviceName}
                    className="object-cover w-full h-full"
                    loading="lazy"
                />
            </div>


            {/* Content below image */}
            <div className="p-5 flex flex-col justify-between min-h-[240px]">
                <div>
                    <h3
                        className="text-2xl font-semibold text-gray-900 dark:text-white"
                        title={serviceName}  
                    >
                        {serviceName}
                    </h3>
                    <p className="text-sm text-purple-600 dark:text-green-400 font-semibold mt-1">
                        {serviceArea}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-3">
                        <span className="font-semibold">Status:</span> {status}
                    </p>
                    <p className="text-lg font-bold text-violet-800 dark:text-green-400 mt-2">
                        Course Fee: ${price}
                    </p>
                </div>

                {/* Provider & Button */}
                <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm max-w-xs sm:max-w-none">
                        <img
                            src={providerImage}
                            alt={providerName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-purple-600"
                            loading="lazy"
                        />
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                Mentored by
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
                                {providerName}
                            </p>
                        </div>
                    </div>

                    {changeStat && (
                        <button
                            onClick={handleChangeStatus}
                            className="px-5 py-2.5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-purple-800 transition"
                        >
                            Change Status
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookedServiceCard;
