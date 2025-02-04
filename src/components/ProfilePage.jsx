import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // Adjust path if needed
import toast from 'react-hot-toast';
import Loader from './Loader';
import { FaUser } from 'react-icons/fa';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { PulseLoader, ScaleLoader } from 'react-spinners';

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingChangePassword, setLoadingChangePassword] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();


    const fetchUserDetails = async () => {
        try {
            const response = await api.get('/api/users/details'); // Adjust the API URL if needed
            setUserDetails(response.data); // Assuming response.data contains user details
        } catch (error) {
            toast.error('Failed to fetch user details.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch user details when the component mounts
    useEffect(() => {
        fetchUserDetails();
    }, []);

    const handleRetry = () => {
        setLoading(true);
        fetchUserDetails();
    };

    const handleChangePassword = async () => {
        setLoadingChangePassword(true); 
        try {
            await api.post('/api/users/resetPassword/verifyMail'); 
            toast.success('Verification email sent! Please check your inbox.');
            navigate('/profile/verifyResetOtp');
        } catch (error) {
            toast.error('Failed to send verification email. Please try again.');
        } finally {
            setLoadingChangePassword(false); 
        }
    };

    const handleOpenModal = () => setOpenModal(true); // Open the modal
    const handleCloseModal = () => setOpenModal(false); // Close the modal

    const handleConfirmDelete = async () => {
        setLoadingDelete(true);
        try {
            await api.delete('/api/users/delete'); // Adjust the API URL if needed
            toast.success('Account deleted successfully');
            navigate('/login');
        } catch (error) {
            toast.error('Failed to delete account.');
        } finally {
            handleCloseModal();
            setLoadingDelete(false);
        }
    };

    if (loading) {
        return (<Loader />);
    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center mt-5 mb-5">
            <div className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">

                <h1 className="text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl">Profile</h1>
                <hr className="mt-2 mb-5 text-black" />

                <div className="flex justify-center mb-5">
                    <FaUser size={100} className="text-btnColor" />
                </div>

                {userDetails ? (
                    <div className="flex flex-col gap-3">
                        <div>
                            <strong>Username:</strong> {userDetails.username}
                        </div>
                        <div>
                            <strong>Email:</strong> {userDetails.email}
                        </div>

                        {/* Buttons */}
                        <div className="mt-5 flex flex-col sm:flex-row sm:justify-between gap-4">
                            <button
                                disabled={loadingChangePassword}
                                onClick={handleChangePassword}
                                className="bg-customRed font-semibold text-white bg-custom-gradient py-2 px-4 rounded-sm hover:text-slate-400 transition-colors duration-100 w-full sm:w-auto"
                            >
                                {loadingChangePassword ? (<span>Sending Email <PulseLoader size={6} color="#d3d3d3" /></span>) : 'Change Password'}
                            </button>
                            <button
                                onClick={handleOpenModal}
                                className="bg-red-500 font-semibold text-white py-2 px-4 rounded-sm hover:text-slate-400 transition-colors duration-100 w-full sm:w-auto"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>

                ) : (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <p className="text-gray-500 text-lg text-center">
                            There was an issue fetching your details.
                        </p>
                        <button
                            onClick={handleRetry}
                            className="bg-customRed text-blue-500 hover:text-blue-600 font-semibold py-2 px-6 rounded-md transition-all duration-300"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>

            <Dialog
                open={openModal} // Modal visibility controlled by state
                onClose={handleCloseModal} // Close modal when clicked outside or on close button
            >
                <DialogTitle>Confirm Account Deletion</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete your account? This action is irreversible.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">Cancel</Button>
                    <Button
                        disabled={loadingDelete}
                        onClick={handleConfirmDelete}
                        color='error'
                    >
                        {loadingDelete ? (<span><ScaleLoader size={6} color="#d3d3d3" /></span>) : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default ProfilePage;
