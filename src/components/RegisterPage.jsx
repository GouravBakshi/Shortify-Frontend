import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

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

    const registerHandler = async (data) => {
        setLoader(true);
        try{
            const {data: response} = await api.post(
                "/api/auth/public/register",
                data
            );
            reset();
            navigate("/login");
            toast.success("Registration Successful!")
            // console.log(response.data);
        }catch(error)
        {
            if (error.response && error.response.data) {
                toast.error(error.response.data);
              } else {
                toast.error('An unexpected error occurred');
              }
        }
        finally{
            setLoader(false);
        }
    }

    return (
        <div className='min-h-[calc(100vh-64px)] flex justify-center items-center mt-5 mb-5'>
            <form onSubmit={handleSubmit(registerHandler)}
                className='sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md'>
                <h1 className='text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl'>
                    Register Here
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
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="Email is required"
                        placeholder="Enter your Email"
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
                <button
                    disabled={loader}
                    type='submit'
                    className='bg-customRed font-semibold text-white  bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3'>
                    {loader ? (<span>Loading <PulseLoader size={6} color="#d3d3d3" /></span>) : "Register"}
                </button>

                <p className='text-center text-sm text-slate-700 mt-6'>
                    Already have an account?{" "}
                    <Link className='font-semibold hover:underline text-blue-500 hover:text-blue-500'
                        to="/login">
                        <span className='text-btnColor'>Login here</span>
                    </Link>
                </p>

            </form>
        </div>
    )
}

export default RegisterPage
