import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyServiceCard = ({ service }) => {
  const {
    cardImage,
    imageUrl,
    description,
    price,
    providerImage,
    providerName,
    serviceArea,
    serviceName,
    _id,
  } = service;

  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/updateservice/${id}`);
  };

  const handleDeleteService = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://learnxyz-server.onrender.com/services/${id}`)
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your course has been deleted.",
              icon: "success",
            });
          });
      }
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 max-w-full mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:flex-shrink-0 w-full md:w-64 h-44 md:h-auto overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
          <img
            src={cardImage || imageUrl}
            alt={serviceName}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white truncate">{serviceName}</h3>
            <p className="text-sm text-purple-600 dark:text-green-400 font-semibold mt-1">{serviceArea}</p>
            <p className="text-gray-700 dark:text-gray-300 mt-3 line-clamp-4">
              {description.length > 200 ? description.slice(0, 200) + "..." : description}
            </p>
          </div>

          {/* Provider & Price */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm max-w-xs sm:max-w-none">
              <img
                src={providerImage}
                alt={providerName}
                className="w-12 h-12 rounded-full object-cover border-2 border-purple-600"
                loading="lazy"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Mentored by</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">{providerName}</p>
              </div>
            </div>

            <div className="text-right sm:text-left">
              <p className="text-lg font-bold text-violet-800 dark:text-green-400 mb-2">Course Fee: ${price}</p>
              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  onClick={() => handleUpdate(_id)}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-purple-800 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteService(_id)}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-red-800 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyServiceCard;
