import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import { HiArrowLeft } from 'react-icons/hi';
import animationData from '../../assets/404-animation.json'

const ErrorPage = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">

            {/* Background Decorative Glows */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-primary/10 blur-[120px] rounded-full"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 max-w-2xl w-full"
            >
                {/* Lottie Animation Container */}
                <div className="w-full max-w-md mx-auto mb-8 pointer-events-none">
                    <Lottie
                        options={defaultOptions}
                        height={350}
                        width={350}
                    />
                </div>

                {/* Error Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {/* Back to Home Button */}
                    <Link to="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-content font-bold rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] overflow-hidden"
                        >
                            <HiArrowLeft className="text-xl group-hover:-translate-x-2 transition-transform" />
                            <span>Back to Homepage</span>

                            {/* Button Shine Effect */}
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Bottom Footer Info */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-10 text-xs font-bold uppercase tracking-[0.3em]"
            >
                Asif Al Fattha Fahim • Portfolio 2025
            </motion.div>
        </div>
    );
};

export default ErrorPage;