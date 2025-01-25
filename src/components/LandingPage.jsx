import React from 'react'
import { motion } from 'framer-motion'
import Card from './Card'
import { useNavigate } from 'react-router-dom'
import { useStoreContext } from '../contextApi/ContextApi'

const LandingPage = () => {
    const navigate = useNavigate();
    const { token } = useStoreContext();
    // console.log("Token from landing page ", token);
    const dashBoardNavigateHandler = () => {

    };

    let desc = "Shortify is a fast and easy-to-use URL shortener that turns long links into short, shareable URLs in just a few clicks. Perfect for marketers and content creators, it also offers powerful analytics to track link performance, monitor clicks, and analyze referral sources. With strong security and reliable redirects, Shortify ensures your links are safe and always accessible. Start simplifying your URLs today!"

    return (
        <div className='min-h-[calc(100vh -64px)] lg:px-14 sm:px-8 px-4'>
            <div className='lg:flex-row flex-col lg:py-5 pt-16 lg:gap-10 gap-8 flex justify-between items-center'>
                <div className='flex-1'>
                    <motion.h1
                        initial={{ opacity: 0, y: -80 }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className='font-bold font-roboto text-slate-800 md:text-5xl text-3xl md:leading-[55px] sm:leading-[45px] leading-10 lg:w-full md:w-[70%] w-full'>
                        Shortify Simplifying Links, Amplifying Impact
                    </motion.h1>

                    <p className='text-slate-700 text-sm my-5'>
                        Shortify is a fast and easy-to-use URL shortener that turns long links into short, shareable URLs in just a few clicks. Perfect for marketers and content creators, it also offers powerful analytics to track link performance, monitor clicks, and analyze referral sources. With strong security and reliable redirects, Shortify ensures your links are safe and always accessible. Start simplifying your URLs today!
                    </p>

                    <div className="flex items-center gap-3">
                        <motion.button
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            onClick={dashBoardNavigateHandler}
                            className="bg-custom-gradient  w-40 text-white rounded-md  py-2"
                        >
                            Manage Links
                        </motion.button>
                        <motion.button
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            onClick={dashBoardNavigateHandler}
                            className="border-btnColor border w-40 text-btnColor rounded-md  py-2 "
                        >
                            Create Short Link
                        </motion.button>
                    </div>

                </div>

                <div className="   flex-1 flex   justify-center w-full">
                    <motion.img
                        initial={{ opacity: 0 }}
                        whileInView={{
                            opacity: 1,
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="sm:w-[480px] w-[400px] object-cover rounded-md"
                        src="/images/logo.png"
                        alt=""
                    />
                </div>
            </div>

            <div className="sm:pt-12 pt-7">
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-slate-800 font-roboto font-bold lg:w-[60%]  md:w-[70%] sm:w-[80%] mx-auto text-3xl text-center"
                >
                    Empowering individuals and businesses to share smarter, track better, and grow faster.{" "}
                </motion.p>
                <div className="pt-4 pb-7 grid lg:gap-7 gap-4 xl:grid-cols-4  lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-4">
                    <Card
                        title="Simple URL Shortening"
                        desc="Effortlessly transform long, messy links into clean, shareable URLs in just seconds. Shortify simplifies the process with an intuitive interface, so you can start shortening links without a second thought."
                    />
                    <Card
                        title="Powerful Analytics"
                        desc="Supercharge your link-sharing with Shortify's detailed analytics. Dive deep into click data, geographic insights, and referral sources to fine-tune your strategy and boost engagement."
                    />
                    <Card
                        title="Enhanced Security"
                        desc="Rest assured with Shortify's robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure."
                    />
                    <Card
                        title="Fast and Reliable"
                        desc="Experience seamless, lightning-speed redirects with Shortify. Our robust infrastructure guarantees your shortened URLs are always available, offering users a smooth and uninterrupted experience."
                    />
                </div>
            </div>

        </div>
    )
}

export default LandingPage;
