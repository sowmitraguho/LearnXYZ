import React from 'react';

const ServiceCard = ({ service }) => {
    const { imageUrl, description, price, providerImage, providerName, serviceArea, serviceName } = service;
    return (
        <div>
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm lg:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ">
                <img className="md:w-full lg:w-100 h-full rounded-t-lg lg:rounded-t-none" src={imageUrl} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{serviceName}</h5>
                    <p className='text-purple-700 font-semibold mb-1'>{serviceArea}</p>
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
                            <h2 className='font-semibold text-violet-800 text-lg mb-1'>Course Fee: ${price}</h2>
                            <button type="button" class="w-50 text-white font-bold bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 rounded-lg px-5 py-2.5 text-center me-2 mb-2">View Details</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ServiceCard;