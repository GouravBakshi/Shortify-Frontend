import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

const ShortenUrlPage = () => {
    const { url } = useParams();

    useEffect(() => {
        if (url) {
            window.location.href = import.meta.env.VITE_BACKEND_URL + `/${url}`;
        }
    }, [url]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm">
                <p className="text-base sm:text-lg md:text-xl font-medium text-gray-800 mb-4">
                    Redirecting to the original URL
                </p>
                <PulseLoader size={10} color="#3498db" />
            </div>
        </div>
    );
};

export default ShortenUrlPage;
