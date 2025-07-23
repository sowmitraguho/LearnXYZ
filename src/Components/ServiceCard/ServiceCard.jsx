import React from "react";
import { useNavigate } from "react-router";

const ServiceCard = ({ service }) => {
  const {
    _id,
    imageUrl,
    description,
    price,
    providerImage,
    providerName,
    serviceArea,
    serviceName,
    rating,
  } = service;

  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/servicedetails/${id}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* ✅ Course Image */}
      <div className="relative w-full h-48">
        <img
          src={imageUrl}
          alt={serviceName}
          className="w-full h-full object-cover"
        />
        {/* ✅ Rating Badge (optional) */}
        {rating && (
          <span className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full shadow">
            ⭐ {rating.toFixed(1)}
          </span>
        )}
      </div>

      {/* ✅ Card Content */}
      <div className="flex flex-col flex-grow p-4">
        {/* Title & Area */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
          {serviceName}
        </h3>
        <p className="text-purple-600 dark:text-green-400 text-sm font-semibold mt-1">
          {serviceArea}
        </p>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-3">
          {description.split(" ").slice(0, 30).join(" ")}...
        </p>

        {/* ✅ Mentor Info */}
        <div className="flex items-center gap-3 mt-4">
          <img
            src={providerImage}
            alt={providerName}
            className="w-10 h-10 rounded-full border"
          />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Mentored by</p>
            <p className="font-medium text-gray-800 dark:text-white">
              {providerName}
            </p>
          </div>
        </div>

        {/* ✅ Price & Button */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-lg font-bold text-violet-700 dark:text-green-400">
            ${price}
          </span>

          <button
            onClick={() => handleViewDetails(_id)}
            className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-yellow-400 hover:to-orange-500 transition-all duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
