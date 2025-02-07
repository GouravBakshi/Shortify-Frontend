import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/api';
import { PulseLoader } from 'react-spinners';

const VerifyOtp = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { email } = location.state || {}; // Access the email passed as state
    const [otp, setOtp] = useState(Array(6).fill('')); // Array to hold OTP input
    const [timer, setTimer] = useState(180); // 3 minutes timer in seconds
    const [canResend, setCanResend] = useState(false); // Flag to enable resend OTP

    const [loadingVerifyOtp, setLoadingVerifyOtp] = useState(false); // Loading state for OTP verification
    const [loadingResendOtp, setLoadingResendOtp] = useState(false);

    // Handle OTP input change
    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/[^0-9]/.test(value)) return; // Only allow digits

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input or focus previous if the current input is deleted
        if (value !== '' && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        } else if (value === '' && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    // Timer functionality
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setCanResend(true); // Allow resend OTP after timer ends
        }
    }, [timer]);

    // Resend OTP functionality
    const resendOtp = async () => {
        setLoadingResendOtp(true);
        try {
            const response = await api.post(`/forgotPassword/verifyMail/${email}`);
            toast.success("OTP has been sent again to your email!");
            setTimer(180); // Reset the timer
            setCanResend(false); // Disable resend OTP until timer is done
        } catch (error) {
            toast.error("Failed to resend OTP. Please try again.");
        } finally {
            setLoadingResendOtp(false); // Reset loading state after resend
        }
    };

    // Verify OTP
    const verifyOtp = async () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            toast.error("Please enter a complete OTP.");
            return;
        }

        setLoadingVerifyOtp(true);

        try {
            const response = await api.post(`/forgotPassword/verify-otp/${otpCode}/${email}`);
            toast.success("OTP verified successfully!");
            // Redirect to change password page
            navigate("/forgot-password/changePassword", {
                state: { email: email }
            });
        } catch (error) {
            toast.error("Invalid OTP. Please try again.");
            // console.log(error);
        } finally {
            setLoadingVerifyOtp(false); // Reset loading state after verification
        }
    };

    // Format timer to MM:SS
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center mt-5 mb-5">
            <div className="sm:w-[450px] w-[360px] max-w-full shadow-custom py-8 sm:px-8 px-4 rounded-md">
                <h1 className="text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl">
                    OTP Verification
                </h1>
                <hr className="mt-2 mb-5 text-black" />

                <div className="flex justify-between gap-2 mb-4">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            id={`otp-input-${index}`}
                            type="tel"
                            value={value}
                            onChange={(e) => handleOtpChange(e, index)}
                            maxLength="1"
                            className="w-[12%] sm:w-[50px] h-[50px] text-center text-lg font-semibold border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    ))}
                </div>


                {/* Verify OTP Button */}
                <div className="flex justify-between items-center mt-4">
                    <button disabled={loadingVerifyOtp}
                        onClick={verifyOtp}
                        className="bg-customRed font-semibold text-white bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
                    >
                        {loadingVerifyOtp ? (<span>Loading <PulseLoader size={6} color="#d3d3d3" /></span>) : 'Verify & Proceed'}
                    </button>
                </div>

                {/* Timer and Resend Section */}
                <div className="flex flex-col items-center">
                    {!canResend ? (<p className="text-sm text-gray-600">Resend OTP in {formatTime(timer)}</p>)
                        : ((<span className='text-md select-none text-slate-500 mt-2'>Didn't receive OTP code ?</span>))}
                    {canResend &&
                        (
                            <button disabled={loadingResendOtp}
                                onClick={resendOtp}
                                className="text-sm text-blue-500 hover:underline mt-2"
                            >
                                {loadingResendOtp ? (<span>Loading <PulseLoader size={6} color="#d3d3d3" /></span>) : 'Resend Code '}
                            </button>
                        )}
                </div>

            </div>
        </div>
    );
};

export default VerifyOtp;
