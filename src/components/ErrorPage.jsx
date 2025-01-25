import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ message }) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-6 sm:px-8">
            <FaExclamationTriangle className='text-6xl sm:text-7xl text-red-500 mb-4' />
            <h1 className='text-3xl sm:text-4xl font-bold mb-2 text-gray-800 text-center'>
                Oops! Something Went Wrong.
            </h1>
            <p className='text-gray-600 mb-6 text-center text-sm sm:text-base'>
                {message ? message : "An unexpected error has occurred"}
            </p>
            <button
                onClick={() => {
                    navigate("/");
                }}
                className='px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all text-sm sm:text-base'
            >
                Go back to home
            </button>
        </div>
    );
};

export default ErrorPage;
