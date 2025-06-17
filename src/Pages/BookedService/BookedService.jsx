import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../FirebaseAuth/AuthContext';
import axios from 'axios';
import MyServiceCard from '../../Components/MyServiceCard/MyServiceCard';
import BookedServiceCard from '../../Components/BookedServiceCard/BookedServiceCard';
import { div } from 'motion/react-client';
import { Link } from 'react-router';

const BookedService = () => {

    const { loggedInUser, loading } = use(AuthContext);
    // console.log('from booked servicd', loggedInUser.accessToken)
    const [allServices, setAllServices] = useState([]);
    useEffect(() => {
        if (!loggedInUser?.email) return;
        axios.get(`https://learnxyz-server.onrender.com/bookedServices/${loggedInUser.email}`, {
            headers: {
                Authorization: `Bearer ${loggedInUser.accessToken}`
            }
        })
            .then((result) => {
                // handle success
                //console.log(result.data);
                setAllServices(result.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [loggedInUser?.email])
    if (loading) {
        return <>
            <span className="loading loading-spinner text-primary"></span>
            <span className="loading loading-spinner text-secondary"></span>
            <span className="loading loading-spinner text-accent"></span>
            <span className="loading loading-spinner text-neutral"></span>
            <span className="loading loading-spinner text-info"></span>
            <span className="loading loading-spinner text-success"></span>
            <span className="loading loading-spinner text-warning"></span>
            <span className="loading loading-spinner text-error"></span>
        </>
    }


    return (
        <div>
            <div className='px-6 md:px-16 lg:px-24 py-12 lg:py-20'>
                <h2 className="text-3xl font-semibold text-blue-600 mb-10 dark:text-white">Services Purchased By You</h2>
                {
                    allServices.length ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {
                            allServices.map(service => <BookedServiceCard key={service._id} service={service} />)
                        }
                    </div> :
                        <div className='mx-auto text-center'>
                            <div
                                className="hero min-h-screen"
                                style={{
                                    backgroundImage:
                                        "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                                }}
                            >
                                <div className="hero-overlay"></div>
                                <div className="hero-content text-neutral-content text-center">
                                    <div className="max-w-lg">
                                        <h1 className="mb-5 text-7xl font-bold">No Bookings</h1>
                                        
                                        <Link to="/allservices" className="inline-flex items-center justify-center px-5 py-3 text-base font-semibold text-center text-white bg-[#3747ff] rounded-lg hover:bg-[#ffcc33] hover:text-gray-950 focus:ring-4 focus:ring-gray-100 ">
                                Explore Courses
                            </Link>
                                    </div>
                                </div>
                            </div>
                            {/* <h1 className="text-3xl font-semibold text-red-300 my-20"></h1>
                            <Link to="/allcourses" className="inline-flex items-center justify-center px-5 py-3 text-base font-semibold text-center text-white bg-[#3747ff] rounded-lg hover:bg-[#ffcc33] hover:text-gray-950 focus:ring-4 focus:ring-gray-100 ">
                                Explore Courses
                            </Link> */}
                        </div>
                }

            </div>
        </div>
    );
};

export default BookedService;