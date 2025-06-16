import axios from 'axios';
import React, { use, useEffect, useState } from 'react';

import MyServiceCard from '../../Components/MyServiceCard/MyServiceCard';
import { AuthContext } from '../../FirebaseAuth/AuthContext';

const ManageServices = () => {
    const { loggedInUser, loading } = use(AuthContext);
    

    const [allServices, setAllServices] = useState([]);
    useEffect(() => {
        if (!loggedInUser?.email) return;
        axios.get(`https://learnxyz-server.onrender.com/myservices/${loggedInUser.email}`)
            .then((result) => {
                // handle success
                console.log(result.data);
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
        <div className='px-6 md:px-16 lg:px-24 py-12 lg:py-20'>
            <h2 className="text-3xl font-semibold text-blue-600 mb-10 dark:text-white">Services Provided By You</h2>
            <div className="grid grid-cols-1 gap-4">
                {
                    allServices.map(service => <MyServiceCard key={service._id} service={service} />)
                }
            </div>

        </div>
    );
};

export default ManageServices;