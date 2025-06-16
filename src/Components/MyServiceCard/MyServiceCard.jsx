import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

const MyServiceCard = ({ service }) => {
    const {_id, imageUrl, description, price, providerImage, providerName, serviceArea, serviceName } = service;
    const handleDeleteService = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://learnxyz-server.onrender.com/services/${id}`)
                .then(res => {
                     console.log('after deleted',res);
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                })  
            }
        });
        
    }
    return (
        <div>
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm lg:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ">
                <img className="md:w-full lg:w-100 lg:h-82 rounded-t-lg lg:rounded-t-none lg:rounded-l-lg" src={imageUrl} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{serviceName}</h5>
                    <p className='text-purple-700 font-semibold mb-1 dark:text-green-400'>{serviceArea}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description.split(" ").slice(0, 50).join(" ")}...</p>

                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                        <div className="service-provider my-4 shadow-sm border border-gray-300 w-60 p-2 rounded-md">
                            <h4 className='font-semibold mb-1'>Mentored by:</h4>
                            <div className="profile flex items-center gap-2">
                                <img className='rounded-full w-10 h-10' src={providerImage} alt="" />
                                <p className='font-semibold'>{providerName}</p>
                            </div>
                        </div>
                        <div>
                            <h2 className='font-semibold text-violet-800 dark:text-green-400 text-lg mb-1 text-right'>Course Fee: ${price}</h2>
                            <button type="button" className="w-50 text-white font-bold bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 rounded-lg px-5 py-2.5 text-center me-2 mb-2">Update</button>
                            <button onClick={()=>handleDeleteService(_id)} type="button" className="w-50 text-white font-bold bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 rounded-lg px-5 py-2.5 text-center mb-2">Delete</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyServiceCard;