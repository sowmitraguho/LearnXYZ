import React, { use, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../FirebaseAuth/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const ServiceDetails = () => {
    const { loggedInUser } = use(AuthContext);
    const serviceData = useLoaderData().data;
    const [booked, setBooked] = useState(false);
    const handleEnrollment = () => {
        console.log('Enrolled by', loggedInUser);
        const bookedServiceData = {
            studentName: loggedInUser.displayName,
            studenEmail: loggedInUser.email,
            studentId: loggedInUser.uid,
            serviceName: serviceData.serviceName,
            serviceId: serviceData._id,
            serviceImage: serviceData.imageurl
        }
        console.log(bookedServiceData);
        axios.post('https://learnxyz-server.onrender.com/bookedServices', bookedServiceData)
        .then(res => {
                        console.log('after adding in mogodb', res);
                        setBooked(true);
                        Swal.fire({
                            title: "Service Published Sucessfully!",
                            icon: "success",
                            timer: 2000,
                            draggable: true
                        });
                        
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
    }
    return (
        <div className='p-24'>
            <section className='flex gap-6 items-center justify-between shadow-2xl border border-gray-300 dark:border-gray-900 p-12  bg-gray-300 dark:bg-gray-900'>
                <div className="left-section">
                    <h1 className="text-5xl font-bold dark:text-white">{serviceData.serviceName}</h1>
                    <h2 className="text-2xl my-2 flex items-center gap-2">Course Fee: <span className='text-blue-600 font-extrabold text-4xl'>${serviceData.price}</span> </h2>
                    <p className="text-xl mb-2">Course Category: <span className='font-semibold'>{serviceData.serviceArea}</span> </p>
                    <p className="text-xl mb-2">Course Duration: <span className='text-purple-600 font-semibold'>125 hours</span></p>
                    <p className='mb-2 text-lg font-semibold' >Ratings: <span className='text-green-600 dark:text-yellow-200'>4.5</span> </p>
                    <button onClick={handleEnrollment} disabled={booked} type="button" className='w-50 text-white font-bold bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 rounded-lg px-5 py-2.5 text-center me-2 mb-2 disabled:cursor-not-allowed'>Enroll Now</button>
                </div>
                <div className="right-section">
                    <img className='rounded-lg max-w-120 ' src={serviceData.imageUrl} alt="" />
                </div>
            </section>
            <section className='my-6 bg-gray-200 p-8  text-xl shadow-2xl border border-gray-300 dark:border-gray-900 dark:bg-gray-900'>
                <h2 className="text-3xl font-bold">Course Details</h2>
                <p className="text-xl my-2">Course Instructor: <span className='text-green-400 font-semibold'>{serviceData.providerName}</span></p>
                <h2 className="text-xl my-2 flex items-center gap-2">Course Fee: <span className='text-blue-600 font-bold text-2xl'>${serviceData.price}</span> </h2>
                <p className="text-xl mb-2">Course Category: <span className='font-semibold'>{serviceData.serviceArea}</span> </p>
                <p className="text-xl mb-2">Course Duration: <span className=' font-semibold'>125 hours</span></p>
                <p className="text-xl mb-2">Course Expire: <span className=' font-semibold'>12/12/2026</span></p>
                <p className="text-xl mb-2">Students: <span className=' font-semibold'>2000+</span></p>
                <p className="text-xl mb-2">Language: <span className=' font-semibold'>English</span></p>
                
            </section>
            <section className='my-6 bg-gray-200 p-8  shadow-2xl border border-gray-300 dark:border-gray-900 dark:bg-gray-900'>
                <h2 className="text-3xl font-bold m-4">Course Description</h2>
                <p className="text-xl text-gray-800 px-8 text-justify dark:text-white">{serviceData.description}</p>
            </section>

        </div>
    );
};

export default ServiceDetails;