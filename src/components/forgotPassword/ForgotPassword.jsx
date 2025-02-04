import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '../TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: "",
        },
        mode: 'onTouched',
    });

    const emailHandler = async (data) => {
        setLoader(true);
        try {
            const response = await api.post(`/forgotPassword/verifyMail/${data.email}`);

            toast.success("A verification email has been sent!");
            
            reset();
            
            navigate("/forgot-password/verifyOtp", {
                state: { email: data.email }
            });

        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.data.detail && error.response.data.detail.includes("Email is not found!")) {
                    toast.error("Email does not exist.");
                }
                else if(error.response.data && error.response.data.includes("OTP is already sent!"))
                    {
                        toast.error("Verification email is already sent.");
                        toast.error("Try again after 3 minutes");
                    } 
                else {
                    toast.error(error.response.data.message || "An error occurred while sending the verification email.");
                }
            } else {
                toast.error("Something went wrong, please try again.");
            }
        } finally {
            setLoader(false);  
        }
    };

    return (
        <div className='min-h-[calc(100vh-64px)] flex justify-center items-center mt-5 mb-5'>
            <form onSubmit={handleSubmit(emailHandler)}
                className='sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md'>
                <h1 className='text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl'>
                    Forgot Password
                </h1>

                <hr className='mt-2 mb-5 text-black' />

                <div className='flex flex-col gap-3'>
                    <TextField
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="Email is required"
                        placeholder="Enter your Email"
                        register={register}
                        errors={errors}
                    />
                </div>

                <button
                    disabled={loader}
                    type='submit'
                    className='bg-customRed font-semibold text-white bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3'>
                    {loader ? (
                        <span>Loading <PulseLoader size={6} color="#d3d3d3" /></span>
                    ) : "Send Verification Email"}
                </button>

                <p className='text-center text-sm text-slate-700 mt-6'>
                    Remembered your password?{" "}
                    <Link className='font-semibold hover:underline text-blue-500 hover:text-blue-500' to="/login">
                        <span className='text-btnColor'>Login</span>
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default ForgotPassword;
