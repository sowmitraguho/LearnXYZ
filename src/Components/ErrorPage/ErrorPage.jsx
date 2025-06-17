import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <>

            <div className='flex flex-col md:justify-center items-center h-screen'>
                <img className='max-w-screen w-150' src='https://seocom.agency/wp-content/uploads/2024/05/Errores-Web-404-403-503-502-401.-Significado-y-soluciones-1.jpg' alt="" />
                <h2 className="text-red-300 text-4xl font-bold mb-8">404 Page Not Found</h2>
                <Link to={'/'} className='btn btn-info bg-blue-500 px-5 py-2 text-white font-bold rounded'>Back To Home</Link>
            </div>
        </>

    );
};

export default ErrorPage;