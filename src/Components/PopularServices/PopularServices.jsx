import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';

const PopularServices = () => {
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
    const popularServices = allServices.filter(service => service.rating >= 4.5);
    return (
      
            <div className='px-6 md:px-16 lg:px-24 py-12 lg:py-20'>
                <h2 className="text-3xl font-semibold text-blue-600 mb-10 dark:text-white">Popular Services</h2>
                <div className="grid grid-cols-1 gap-4">
                    {
                        popularServices.map(service => <ServiceCard key={service._id} service={service} />)
                    }
                </div>

            </div>
       
    );
};

export default PopularServices;