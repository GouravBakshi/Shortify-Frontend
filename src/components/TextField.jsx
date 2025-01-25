import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const TextField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder,
}) => {
    // State to toggle password visibility
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleTogglePassword = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={id}
                className={`${className ? className : ''} font-semibold text-md`}
            >
                {label}
            </label>

            <div className="relative">
                <input
                    type={type === 'password' && !isPasswordVisible ? 'password' : 'text'} // Toggle between password and text
                    id={id}
                    placeholder={placeholder}
                    className={`${className ? className : ''
                        } px-2 py-2 border outline-none bg-transparent text-slate-700 rounded-md ${errors[id]?.message ? 'border-red-500' : 'border-slate-600'
                        } w-full`}
                    {...register(id, {
                        required: { value: required, message },
                        minLength: min
                            ? { value: min, message: 'Minimum 6 characters are required' }
                            : null,
                        pattern:
                            type === 'email'
                                ? {
                                    value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                                    message: 'Invalid email address',
                                }
                                : type === 'url'
                                    ? {
                                        value:
                                            /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                                        message: 'Please enter a valid URL',
                                    }
                                    : null,
                    })}
                />

                {type === 'password' && (
                    <button
                        type="button"
                        onClick={handleTogglePassword}
                        className="absolute right-2 top-2"
                    >
                        {isPasswordVisible ? (
                            <FaEyeSlash className="text-slate-700" size={22} />
                        ) : (
                            <FaEye className="text-slate-700" size={22} />
                        )}
                    </button>
                )}
            </div>

            {errors[id]?.message && (
                <p className="text-sm font-semibold text-red-600 mt-0">
                    {errors[id]?.message}*
                </p>
            )}
        </div>
    );
};

export default TextField;
