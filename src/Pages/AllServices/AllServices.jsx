import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from '../../Components/ServiceCard/ServiceCard';
import { Helmet } from 'react-helmet';
import TypeWriterEffects from '../../Components/TypeWriterEffects/TypeWriterEffects';

const AllServices = () => {
    const [allServices, setAllServices] = useState([]);
    useEffect(() => {
        axios.get('https://learnxyz-server.onrender.com/allservices')
            .then((result) => {
                // handle success
               //console.log(result.data);
                setAllServices(result.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [])
    return (
        <>
         {/* 1️⃣ Typewriter Intro Section */}
        <section className="pt-20">
          <TypeWriterEffects />
        </section>

        <Helmet>
            <title>All Services</title>
        </Helmet>
        <div className='px-6 md:px-16 lg:px-24 py-12 lg:py-20'>
            
                <h2 className="text-3xl font-semibold text-blue-600 mb-10 dark:text-white">All Services</h2>
                <div className="grid grid-cols-1 gap-4">
                    {
                        allServices.map(service => <ServiceCard key={service._id} service={service} />)
                    }
                </div>

            </div>
        
        </>
    );
};

export default AllServices;