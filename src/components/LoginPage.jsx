import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useStoreContext } from '../contextApi/ContextApi';
import { PulseLoader } from 'react-spinners';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const {setToken} = useStoreContext();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: 'onTouched',
    });

    const loginHandler = async (data) => {
        setLoader(true);
        try {
            const { data: response } = await api.post(
                "/api/auth/public/login",
                data
            );
            // console.log(response.token);
            setToken(response.token);
            localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));
            toast.success("Login Successful!")

            reset();
            navigate("/dashboard");
            // console.log(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                const errorMessage = error.response.data.detail || error.response.data.message || '';
                if (errorMessage.includes("Invalid login credentials")) {
                    toast.error("Invalid username or password");
                } else {
                    toast.error("Unauthorized access");
                }
            }
        }
        finally {
            setLoader(false);
        }
    }

    return (
        <div className='min-h-[calc(100vh-64px)] flex justify-center items-center mt-5 mb-5'>
            <form onSubmit={handleSubmit(loginHandler)}
                className='sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md'>
                <h1 className='text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl'>
                    Login Here
                </h1>

                <hr className='mt-2 mb-5 text-black' />

                <div className='flex flex-col gap-3'>
                    <TextField
                        label="UserName"
                        required
                        id="username"
                        type="text"
                        message="Username is required"
                        placeholder="Enter your Username"
                        register={register}
                        errors={errors}
                    />

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
                </div>

                <p className=' text-sm mt-2 mb-3'>
                    <Link className='font-semibold text-base hover:underline hover:text-blue-500'
                        to="/forgot-password">
                        <span className='text-btnColor'>Forgot Password?</span>
                    </Link>
                </p>

                <button
                    disabled={loader}
                    type='submit'
                    className='bg-customRed font-semibold text-white  bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3'>
                    {loader ? (<span>Loading <PulseLoader size={6} color="#d3d3d3" /></span>) : "Login"}
                </button>

                <p className='text-center text-sm text-slate-700 mt-6'>
                    Don't have an account?{" "}
                    <Link className='font-semibold hover:underline text-blue-500 hover:text-blue-500'
                        to="/register">
                        <span className='text-btnColor'>Sign Up</span>
                    </Link>
                </p>

            </form>
        </div>
    )
}

export default LoginPage;
