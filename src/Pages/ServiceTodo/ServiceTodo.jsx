import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../FirebaseAuth/AuthContext';
import axios from 'axios';
import BookedServiceCard from '../../Components/BookedServiceCard/BookedServiceCard';
import { Helmet } from 'react-helmet';

const ServiceTodo = () => {
    const [changeStat, setChangeStat] = useState(true);
    const { loggedInUser, loading } = use(AuthContext);
    const [allServices, setAllServices] = useState([]);
    useEffect(() => {
        if (!loggedInUser?.email) return;
        axios.get(`https://learnxyz-server.onrender.com/servicestodo/${loggedInUser.email}`)
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
            <Helmet>
                <title>Service To do</title>
            </Helmet>
            <div className='px-6 md:px-16 lg:px-24 py-12 lg:py-20'>
                <h2 className="text-3xl font-semibold text-blue-600 mb-10 dark:text-white">Services Provided By You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {
                        allServices.map(service => <BookedServiceCard key={service._id} service={service} changeStat={changeStat} />)
                    }
                </div>

            </div>
        </div>
    );
};

export default ServiceTodo;