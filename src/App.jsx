import './App.css'
import React from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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
// import { getApps } from './utils/helper'

function App() {
  // const CurrentApp = getApps();
  const hideHeaderFooter = location.pathname.startsWith("/s");
  return (
    <>
      <Router>
      {!hideHeaderFooter && <NavBar />}
            <Toaster position='bottom-center' />
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/about' element={<AboutPage />} />

                <Route path='/s/:url' element={<ShortenUrlPage />} />

                <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterPage /></PrivateRoute>} />
                <Route path="/login" element={<PrivateRoute publicPage={true}><LoginPage /></PrivateRoute>} />

                <Route path='/dashboard' element={<PrivateRoute publicPage={false}><DashboardLayout /></PrivateRoute>} />
                
                <Route path='/error' element={<ErrorPage />} />
                <Route path='*' element={<ErrorPage message="We can't seem to find the page you're looking for" />} />
            </Routes>
            {!hideHeaderFooter && <Footer />}
      </Router>
    </>
  )
}

export default App
