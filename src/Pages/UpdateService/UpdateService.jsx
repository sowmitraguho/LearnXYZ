import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const UpdateService = () => {

    const serviceData = useLoaderData().data;
    const navigate = useNavigate();
    const { imageUrl, description, price, serviceArea, serviceName } = serviceData;

    const handleUpdateService = (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const updatedData = Object.fromEntries(data.entries());
        
        console.log('form submitted', serviceData);
        axios.put(`https://learnxyz-server.onrender.com/services/${serviceData._id}`, updatedData)
            .then(res => {
                console.log('after adding in mogodb', res);
                Swal.fire({
                    title: "Service Published Sucessfully!",
                    icon: "success",
                    timer: 2000,
                    draggable: true
                });
                form.reset();
                navigate('/myservices')
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }
    return (
         <>
         <Helmet>
            <title>Update Course</title>
         </Helmet>
         <div className='mx-4 my-4 lg:mx-20 md:my-10 border border-gray-300 shadow-md p-4 lg:p-10 rounded-2xl'>
            <h1 className="text-4xl font-bold my-4 text-blue-500 text-center pb-4">Update Your Service</h1>
            <form onSubmit={handleUpdateService}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service name</label>
                        <input name='serviceName' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={serviceName} placeholder="Service Name" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service Area</label>
                        <input name='serviceArea' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={serviceArea} placeholder="Service Field" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service Image URL</label>
                        <input name='imageUrl' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Service Image URL" defaultValue={imageUrl} />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input name='price' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="$000" defaultValue={price}  />
                    </div>
                    
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea name='description' id="description" rows="14" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={description} placeholder="Details about Service"  />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-md font-semibold w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
         </>
    );
};

export default UpdateService;