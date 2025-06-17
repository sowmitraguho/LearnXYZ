import axios from 'axios';
import React, { use } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../FirebaseAuth/AuthContext';

const BookedServiceCard = ({ service }) => {
    const { loggedInUser } = use(AuthContext);
    const { imageUrl, price, providerImage, providerName, serviceArea, serviceName } = service;
    const handleChangeStatus = async () => {
        const { value: status } = await Swal.fire({
            title: "Change Course Status",
            input: "select",
            inputOptions: {
                Pending: "Pending",
                Completed: "Completed",
                Ongoing: "On going",
            },
            inputPlaceholder: "Change the status",
            showCancelButton: true,
        });
        if (status) {
            axios.put(`https://learnxyz-server.onrender.com/bookedServices/${loggedInUser?.email}`, {status})
            .then((result) => {
                // handle success
                console.log(result.data);
                Swal.fire(`You selected: ${status}`);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            
        }
    }
    return (
        <div>
            <div className="flex flex-col  items-center bg-white border border-gray-200 rounded-lg shadow-sm lg:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ">
                <img className="md:w-full lg:w-40 lg:h-60 rounded-t-lg lg:rounded-t-none lg:rounded-l-lg" src={imageUrl} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{serviceName}</h5>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className='text-purple-700 font-semibold mb-1 dark:text-green-400'>{serviceArea}</p>
                            <h2 className='font-semibold text-violet-800 dark:text-green-400 mb-1'>Course Fee: ${price}</h2>
                            <p className="mb-2">Status: {service.status}</p>
                            <button onClick={handleChangeStatus} type="button" className='text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Change Status</button>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between md:items-center">
                            <div className="service-provider my-4 shadow-sm border border-gray-300 w-40 p-2 rounded-md">
                                <h4 className='font-semibold mb-1'>Mentored by:</h4>
                                <div className="profile flex items-center gap-2">
                                    <img className='rounded-full w-10 h-10' src={providerImage} alt="" />
                                    <p className='font-semibold'>{providerName}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BookedServiceCard;