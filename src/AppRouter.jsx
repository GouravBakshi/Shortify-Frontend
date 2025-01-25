import React from 'react'
import {Route, Routes } from 'react-router-dom'
import ShortenUrlPage from './components/ShortenUrlPage';
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import RegisterPage from './components/RegisterPage'
import { Toaster } from 'react-hot-toast'
import LoginPage from './components/LoginPage'
import DashboardLayout from './components/dashboard/DashboardLayout'
import PrivateRoute from './PrivateRoute';
import ErrorPage from './components/ErrorPage';

const AppRouter = () => {
    return (
        <>
            <NavBar />
            <Toaster position='bottom-center' />
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/about' element={<AboutPage />} />

                <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterPage /></PrivateRoute>} />
                <Route path="/login" element={<PrivateRoute publicPage={true}><LoginPage /></PrivateRoute>} />

                <Route path='/dashboard' element={<PrivateRoute publicPage={false}><DashboardLayout /></PrivateRoute>} />
                
                <Route path='/error' element={<ErrorPage />} />
                <Route path='*' element={<ErrorPage message="We can't seem to find the page you're looking for" />} />
            </Routes>
            <Footer />
        </>
    );
}

export default AppRouter;

export const subDomainRouter = () => {
    return (
        <Routes>
            <Route path='/:url' element={<ShortenUrlPage />} />
        </Routes>
    );
}
