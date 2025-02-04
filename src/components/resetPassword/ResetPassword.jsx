import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '../TextField';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';
import { useStoreContext } from '../../contextApi/ContextApi';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const {setToken} = useStoreContext();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            password: "",
            repeatPassword: "",
        },
        mode: 'onTouched',
    });

    const passwordHandler = async (data) => {

        const { password, repeatPassword } = data;

        // Check if both passwords match
        if (password !== repeatPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setLoader(true);
        try {
            const response = await api.post(
                "/api/users/resetPassword/changePassword", 
                {
                    password: password.trim(),
                    repeatPassword: repeatPassword.trim()
                }
            );

            reset();
            toast.success("Password changed successfully!");
            localStorage.removeItem('JWT_TOKEN');
            setToken(null);
            navigate("/login");

        } catch (error) {
            console.log(error)
            if (error.response && error.response.data) {
                const errorData = error.response.data;


                if (typeof errorData === 'string') {

                    if (errorData.includes("OTP has been expired.")) {
                        toast.error("Time limit exceeded. Please try again.");
                        navigate("/profile");
                    }

                    else if (errorData.includes("No OTP request found for email")) {
                        toast.error("No OTP request found. Please verify your OTP request first.");
                        navigate("/profile");
                    } else {
                        toast.error(errorData); 
                    }
                } else if (errorData.detail && typeof errorData.detail === 'string' && errorData.detail.includes("No OTP request found for email") || errorData.detail.includes("Email does not exist!")) {
                    toast.error("No OTP request found for this email. Please verify your OTP request first.");
                    navigate("/profile");
                }
                else {
                    toast.error(errorData.detail || "An unexpected error occurred. Please try again later.");
                }
            } else {
                toast.error("An unexpected error occurred. Please try again later.");
            }
        } finally {
            setLoader(false); 
        }
    };


    return (
        <div className='min-h-[calc(100vh-64px)] flex justify-center items-center mt-5 mb-5'>
            <form
                onSubmit={handleSubmit(passwordHandler)}
                className='sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md'
            >
                <h1 className='text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl'>
                    Reset Password
                </h1>

                <hr className='mt-2 mb-5 text-black' />

                <div className='flex flex-col gap-3'>
                    <TextField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        message="Password is required"
                        placeholder="Enter your Password"
                        register={register}
                        min={6}
                        errors={errors}
                    />
                    <TextField
                        label="Repeat Password"
                        required
                        id="repeatPassword"
                        type="password"
                        message="Repeat Password is required"
                        placeholder="Repeat your Password"
                        register={register}
                        min={6}
                        errors={errors}
                    />
                </div>
                <button
                    disabled={loader}
                    type='submit'
                    className='bg-customRed font-semibold text-white  bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3'>
                    {loader ? (<span>Loading <PulseLoader size={6} color="#d3d3d3" /></span>) : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
