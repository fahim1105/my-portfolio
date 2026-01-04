import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaGithub, FaDownload, FaPhoneAlt, FaFacebook } from 'react-icons/fa';
import { GrInstagram } from 'react-icons/gr';
import { Link } from 'react-router';
import { saveAs } from 'file-saver';
import { Typewriter } from 'react-simple-typewriter';
import myCV from '/asif_cv.pdf';

const HeroCard = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsTablet(width >= 768 && width < 1024);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleDownload = () => {
        const fileName = "Asif_Al_Fattha_Fahim_CV.pdf";
        saveAs(myCV, fileName);
    };

    return (
        <div className="h-full w-full lg:[perspective:2000px]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    rotateY: (isMobile || isTablet) ? 0 : 15,
                }}
                whileHover={{ rotateY: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`relative bg-[#1e1e1f] text-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col h-full border border-white/5 ${(isMobile || isTablet) ? 'origin-center' : 'origin-right'}`}
            >

                {/* --- Top Image Section --- */}
                <div className={`relative w-full overflow-hidden transition-all duration-500 ${isMobile ? 'h-[420px]' : isTablet ? 'h-[550px]' : 'h-[500px]'
                    }`}>
                    <img
                        src="https://i.ibb.co.com/99WGTgKm/241d449b744ebd4910d1ecfdbde1a1be.jpg"
                        alt="Asif Al Fattha Fahim"
                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary-content to-transparent"></div>
                </div>

                {/* --- Content Area --- */}
                <div className="relative -mt-16 pt-20 bg-primary-content text-center px-6 z-10 flex-grow">
                    <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold tracking-tight text-secondary-content mb-2">
                        Asif Al Fattha Fahim
                    </h1>

                    {/* --- Video Style Typewriter Animation --- */}
                    <div className="flex justify-center items-center mb-6 lg:mb-8 h-6 text-primary font-mono text-xs md:text-sm lg:text-sm tracking-[3px] uppercase font-bold">
                        <Typewriter
                            words={[
                                'Junior Web Developer',
                                'Frontend Developer',
                                'MERN Stack Developer'
                            ]}
                            loop={0} // আনলিমিটেড লুপ
                            cursor
                            cursorStyle='_' // ভিডিওর মতো কার্সর স্টাইল চাইলে '_' বা '|' দিতে পারেন
                            typeSpeed={80} // টাইপ হওয়ার গতি
                            deleteSpeed={50} // মোছার গতি
                            delaySpeed={1500} // এক টেক্সট থেকে আরেক টেক্সটের বিরতি
                        />
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-5 text-secondary-content text-lg md:text-xl mb-8 lg:mb-10">
                        <a href="https://www.linkedin.com/in/aaff115/" target="_blank" rel="noreferrer" className="hover:text-green-500 transition-colors duration-300"><FaLinkedinIn /></a>
                        <a href="https://github.com/fahim1105" target="_blank" rel="noreferrer" className="hover:text-green-500 transition-colors duration-300"><FaGithub /></a>
                        <a href="https://www.instagram.com/aaff.115" target="_blank" rel="noreferrer" className="hover:text-green-500 transition-colors duration-300"><GrInstagram /></a>
                        <a href="https://www.facebook.com/aaff.115" target="_blank" rel="noreferrer" className="hover:text-green-500 transition-colors duration-300"><FaFacebook /></a>
                    </div>
                </div>

                {/* --- Bottom Buttons --- */}
                <div className="mt-auto flex border-t border-secondary-content/50 h-16 md:h-20 lg:h-16">
                    <button
                        onClick={handleDownload}
                        className="flex-1 bg-primary-content text-secondary-content flex items-center justify-center gap-2 text-[10px] md:text-xs lg:text-[10px] font-bold uppercase tracking-[2px] hover:text-green-500 transition-all border-r border-white/5 group">
                        Download CV
                        <FaDownload className="text-xs group-hover:animate-bounce" />
                    </button>
                    <Link to="/contact" className="flex-1 bg-primary-content text-secondary-content flex items-center justify-center gap-2 text-[10px] md:text-xs lg:text-[10px] font-bold uppercase tracking-[2px] hover:text-green-500 transition-all">
                        Contact Me
                        <FaPhoneAlt className="text-xs" />
                    </Link>
                </div>

                {!isMobile && !isTablet && <div className="absolute top-0 left-0 w-[1px] h-full bg-white/5"></div>}
            </motion.div>
        </div>
    );
};

export default HeroCard;