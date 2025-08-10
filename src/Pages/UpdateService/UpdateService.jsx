import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const IMGBB_API_KEY = import.meta.env.VITE_imgbbApiKey 


const UpdateService = () => {
  const serviceData = useLoaderData().data;
  const navigate = useNavigate();

  // Local state for image previews & files
  const [coverPreview, setCoverPreview] = useState(serviceData.coverImage || '');
  const [cardPreview, setCardPreview] = useState(serviceData.cardImage || '');
  const [coverFile, setCoverFile] = useState(null);
  const [cardFile, setCardFile] = useState(null);

  useEffect(() => {
    setCoverPreview(serviceData.coverImage || '');
    setCardPreview(serviceData.cardImage || '');
  }, [serviceData]);

  // Handle image file changes + preview
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCoverFile(file);
    if (file) setCoverPreview(URL.createObjectURL(file));
  };
  const handleCardChange = (e) => {
    const file = e.target.files[0];
    setCardFile(file);
    if (file) setCardPreview(URL.createObjectURL(file));
  };

  const uploadToImgbb = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  try {
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
    return response.data.data.url;
  } catch (error) {
    console.error('Image upload failed:', error);
    Swal.fire({
      icon: 'error',
      title: 'Image Upload Failed',
      text: 'Please try uploading the image again.',
    });
    return null;
  }
};

const handleUpdateService = async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

  // Upload new cover image if changed
  if (coverFile) {
    const coverUrl = await uploadToImgbb(coverFile);
    if (!coverUrl) return; // Stop if upload fails
    data.set('coverImage', coverUrl);
  } else {
    data.set('coverImage', coverPreview); // keep old url if no change
  }

  // Upload new card image if changed
  if (cardFile) {
    const cardUrl = await uploadToImgbb(cardFile);
    if (!cardUrl) return; // Stop if upload fails
    data.set('cardImage', cardUrl);
  } else {
    data.set('cardImage', cardPreview); // keep old url if no change
  }

  const updatedData = Object.fromEntries(data.entries());

  try {
    await axios.put(`https://learnxyz-server.onrender.com/services/${serviceData._id}`, updatedData);
    Swal.fire({
      title: 'Service Updated Successfully!',
      icon: 'success',
      timer: 2000,
      draggable: true,
    });
    navigate(-1);
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: 'Update Failed',
      text: 'Please try again later.',
      icon: 'error',
    });
  }
};


  return (
    <>
      <Helmet>
        <title>Update Course</title>
      </Helmet>
      <div className="mx-4 my-6 lg:mx-20 md:my-20 border border-gray-300 shadow-md p-6 lg:p-10 rounded-2xl bg-gradient-to-tr from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <h1 className="text-4xl font-bold mb-8 text-purple-700 dark:text-purple-300 text-center">Update Your Service</h1>
        <form onSubmit={handleUpdateService} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Text fields */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-purple-800 dark:text-purple-300">Service Name</label>
              <input name="serviceName" type="text" defaultValue={serviceData.serviceName} required
                className="input-field" placeholder="Service Name" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-purple-800 dark:text-purple-300">Service Area</label>
              <input name="serviceArea" type="text" defaultValue={serviceData.serviceArea} required
                className="input-field" placeholder="Service Area" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-purple-800 dark:text-purple-300">Service Type</label>
              <input name="serviceType" type="text" defaultValue={serviceData.serviceType} required
                className="input-field" placeholder="Service Type (e.g. Online)" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-purple-800 dark:text-purple-300">Service Language</label>
              <input name="serviceLanguage" type="text" defaultValue={serviceData.serviceLanguage} required
                className="input-field" placeholder="Language (e.g. English)" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-purple-800 dark:text-purple-300">Course Duration (hours)</label>
              <input name="courseDuration" type="number" min="1" defaultValue={serviceData.courseDuration}
                className="input-field" placeholder="Course Duration" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-purple-800 dark:text-purple-300">Course Modules</label>
              <input name="courseModules" type="number" min="1" defaultValue={serviceData.courseModules}
                className="input-field" placeholder="Number of Modules" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-purple-800 dark:text-purple-300">Course Level</label>
              <select name="courseLevel" defaultValue={serviceData.courseLevel}
                className="input-field" required>
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-purple-800 dark:text-purple-300">Course Assignments</label>
              <input name="courseAssignments" type="number" min="0" defaultValue={serviceData.courseAssignments}
                className="input-field" placeholder="Number of Assignments" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-purple-800 dark:text-purple-300">Price ($)</label>
              <input name="price" type="number" min="0" defaultValue={serviceData.price} required
                className="input-field" placeholder="Course Price" />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-semibold text-purple-800 dark:text-purple-300">Skills (comma separated)</label>
              <input name="skills" type="text" defaultValue={serviceData.skills}
                className="input-field" placeholder="e.g. React, JavaScript" />
            </div>

            

          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-semibold text-purple-800 dark:text-purple-300">Description</label>
            <textarea
              name="description"
              id="description"
              rows="6"
              defaultValue={serviceData.description}
              placeholder="Detailed description about the course"
              className="textarea-field"
              required
            ></textarea>
          </div>
          {/* Image upload */}
            <div className="md:col-span-2 flex flex-col items-center gap-2">
              <label className="block mb-2 text-sm font-semibold text-purple-800 dark:text-purple-300">Cover Image</label>
              {coverPreview && (
                <img src={coverPreview} alt="Cover Preview" className="w-full max-w-xs rounded-lg shadow-md mb-2" />
              )}
              <input
                name="coverImage"
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="file-input"
              />
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Upload new cover image (optional)</p>
            </div>

            <div className="md:col-span-2 flex flex-col items-center gap-2">
              <label className="block mb-2 text-sm font-semibold text-purple-800 dark:text-purple-300">Card Image</label>
              {cardPreview && (
                <img src={cardPreview} alt="Card Preview" className="w-full max-w-xs rounded-lg shadow-md mb-2" />
              )}
              <input
                name="cardImage"
                type="file"
                accept="image/*"
                onChange={handleCardChange}
                className="file-input"
              />
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Upload new card image (optional)</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:from-purple-700 hover:to-blue-600 transition"
          >
            Update Service
          </button>
        </form>
      </div>

      <style jsx>{`
        .input-field {
          background-color: var(--tw-bg-opacity, 1) #f9fafb;
          border: 1px solid #d1d5db;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          border-radius: 0.5rem;
          width: 100%;
          color: #5b21b6; /* purple-700 */
          transition: all 0.3s ease;
        }
        .input-field:focus {
          outline: none;
          border-color: #4338ca; /* indigo-700 */
          box-shadow: 0 0 0 3px rgba(67, 56, 202, 0.5);
          background-color: #fff;
          color: #4c1d95;
        }
        .textarea-field {
          background-color: var(--tw-bg-opacity, 1) #f9fafb;
          border: 1px solid #d1d5db;
          padding: 0.75rem;
          font-size: 1rem;
          border-radius: 0.5rem;
          width: 100%;
          color: #5b21b6;
          resize: vertical;
          transition: all 0.3s ease;
        }
        .textarea-field:focus {
          outline: none;
          border-color: #4338ca;
          box-shadow: 0 0 0 3px rgba(67, 56, 202, 0.5);
          background-color: #fff;
          color: #4c1d95;
        }
        .file-input {
          width: 100%;
          padding: 0.375rem 0.5rem;
          border-radius: 0.375rem;
          border: 1px solid #c4b5fd;
          background-color: #ede9fe;
          color: #5b21b6;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .file-input:hover {
          background-color: #d8b4fe;
          border-color: #a78bfa;
          color: #6b21a8;
        }
      `}</style>
    </>
  );
};

export default UpdateService;
