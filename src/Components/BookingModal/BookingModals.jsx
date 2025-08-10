import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

const BookingModals = ({ serviceData, handleCloseModal }) => {
    //console.log(serviceData);

    const handleconfirmBooking = (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const confirmedData = Object.fromEntries(data.entries());
        confirmedData.status = 'pending';
        console.log('form submitted', confirmedData);
        axios.post('https://learnxyz-server.onrender.com/bookedServices', confirmedData)
            .then(res => {
                console.log('after adding in mogodb', res);

                Swal.fire({
                    title: "Enrollment Successful!",
                    text: `You have enrolled in ${serviceData.serviceName}`,
                    icon: "success",
                    timer: 2000,
                });
                handleCloseModal();
            })
            .catch(function (error) {
                console.log(error);
            });

    }




    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
                <div className="bg-gray-200 m-12 w-11/12 p-6 rounded shadow-md max-w-full max-h-[90vh] overflow-y-auto">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Admission Confirmation</h2>
                    <form onSubmit={handleconfirmBooking}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service ID</label>
                                <input name='serviceId' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={serviceData.serviceId} placeholder="Service ID" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service name</label>
                                <input name='serviceName' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={serviceData.serviceName} placeholder="Service Name" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service Provider name</label>
                                <input name='providerName' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={serviceData.providerName} placeholder="Service Provider Name" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service Provider Email</label>
                                <input name='providerEmail' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={serviceData.providerEmail} placeholder="Service Provider Email" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service Area</label>
                                <input name='serviceArea' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={serviceData.serviceArea} placeholder="Service Field" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service Image URL</label>
                                <input name='imageUrl' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Service Image URL" defaultValue={serviceData.serviceImage} />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input name='price' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="$000" defaultValue={serviceData.price} />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student name</label>
                                <input name='studentName' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={serviceData.studentName} placeholder="Student Name" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Email</label>
                                <input name='studentEmail' type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={serviceData.studentEmail} placeholder="Student Email" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Starting Date</label>
                                <input name='date' type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                        </div>
                        <div className="mb-6">
                            <label htmlFor="instructions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instruction for the course</label>
                            <textarea name='instructions' id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Any Special Instruction for the course" />
                        </div>
                        <div className="flex justify-center gap-4">
                            <button type='submit'
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BookingModals;