import React from 'react';

const BookedServiceCard = ({ service }) => {
    const { imageUrl, price, providerImage, providerName, serviceArea, serviceName } = service;
    return (
        <div>
            <div className="flex flex-col  items-center bg-white border border-gray-200 rounded-lg shadow-sm lg:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ">
                <img className="md:w-full lg:w-40 lg:h-40 rounded-t-lg lg:rounded-t-none lg:rounded-l-lg" src={imageUrl} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{serviceName}</h5>
                    <div className="flex items-center justify-between">
                        <div>
                        <p className='text-purple-700 font-semibold mb-1 dark:text-green-400'>{serviceArea}</p>
                        <h2 className='font-semibold text-violet-800 dark:text-green-400 text-lg mb-1'>Course Fee: ${price}</h2>
                        <p className="text-xl">Status: {service.status}</p>
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