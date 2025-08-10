import React, { useEffect, useState } from 'react';
import { AuthContext } from '../../FirebaseAuth/AuthContext';
import axios from 'axios';
import BookedServiceCard from '../../Components/BookedServiceCard/BookedServiceCard';
import { Helmet } from 'react-helmet';

const ServiceTodo = () => {
  const [changeStat, setChangeStat] = useState(true);
  const { loggedInUser, loading } = React.useContext(AuthContext);
  const [allServices, setAllServices] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loggedInUser?.email) return;
    setFetching(true);
    axios
      .get(`https://learnxyz-server.onrender.com/servicestodo/${loggedInUser.email}`)
      .then((result) => {
        setAllServices(result.data);
        setFetching(false);
      })
      .catch((error) => {
        console.error(error);
        setFetching(false);
      });
  }, [loggedInUser?.email]);

  if (loading || fetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <span className="loading loading-spinner text-purple-600 w-12 h-12"></span>
        <p className="text-lg font-semibold text-purple-700 dark:text-purple-300">
          Loading your services to do...
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Services To Do | LearnXYZ</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-tr from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-purple-700 dark:text-purple-300">
          🛠️ Services Provided By You
        </h1>

        {allServices.length === 0 ? (
          <p className="text-center text-lg text-gray-700 dark:text-gray-300">
            No services to show at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allServices.map((service) => (
              <BookedServiceCard key={service._id} service={service} changeStat={changeStat} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ServiceTodo;
