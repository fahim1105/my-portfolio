import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import { motion } from 'framer-motion';
import { HiMoon, HiSun, HiMenuAlt3, HiX, HiUser, HiBriefcase, HiAcademicCap } from 'react-icons/hi'; // HiAcademicCap যোগ করা হয়েছে
import { MdConnectWithoutContact } from 'react-icons/md';
import { IoShareSocial } from 'react-icons/io5';
import { Typewriter } from 'react-simple-typewriter';

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const getIcon = (name) => {
        switch (name.toLowerCase()) {
            case 'about': return <HiUser />;
            case 'education': return <HiAcademicCap />; // Education আইকন সেট করা হয়েছে
            case 'projects': return <HiBriefcase />;
            case 'social': return <IoShareSocial />;
            case 'contact': return <MdConnectWithoutContact />;
            default: return <HiUser />;
        }
    };

    const navLinks = [
        { name: 'About', path: '/' },
        { name: 'Education', path: '/education' }, // নতুন Education লিঙ্ক যোগ করা হয়েছে
        { name: 'Projects', path: '/projects' },
        { name: 'Social', path: '/social' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <div className="md:relative z-50 lg:left-35 sticky flex justify-center ">

            {/* স্থির আউটলাইন বর্ডার */}
            <div className="hidden md:block absolute -left-4 top-2 -bottom-1 w-23 border-l-2 border-b-2 border-primary/40 rounded-[42px] pointer-events-none">
            </div>

            <div className="lg:[perspective:2000px] w-full lg:w-fit">
                <motion.nav
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        rotateY: typeof window !== 'undefined' && window.innerWidth >= 1024 ? 15 : 0
                    }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full lg:w-16 bg-gradient-to-r from-primary-content/90 to-transparent backdrop-blur-lg text-base-content shadow-xl border border-base-300 md:rounded-[30px] lg:rounded-[40px] transition-all duration-300 origin-left lg:px-12 lg:py-12"
                >
                    {/* --- Mobile & Tablet Header --- */}
                    <div className="flex lg:hidden items-center justify-between px-6 py-4 md:px-10 md:py-6">
                        <div className="flex flex-col text-left">
                            <span className="font-bold text-lg md:text-xl leading-tight text-secondary-content">Asif Al Fattha</span>

                            <span className="text-[10px] md:text-xs text-primary font-bold uppercase tracking-widest min-h-[15px]">
                                <Typewriter
                                    words={[
                                        'Junior Web Developer',
                                        'Frontend Developer',
                                        'MERN Stack Developer'
                                    ]}
                                    loop={0}
                                    cursor
                                    cursorStyle='|'
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={2000}
                                />
                            </span>
                        </div>
                        <div className="flex items-center gap-4 md:gap-6">
                            <button onClick={toggleTheme} className="btn btn-ghost btn-circle btn-sm md:btn-md text-xl md:text-2xl">
                                {theme === 'light' ? <HiMoon /> : <HiSun className="text-yellow-400" />}
                            </button>
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-ghost btn-circle btn-sm md:btn-md text-2xl md:text-3xl">
                                {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
                            </button>
                        </div>
                    </div>

                    {/* --- Navigation Links --- */}
                    <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
                        {/* md:gap-6 এবং lg:gap-8 অ্যাডজাস্ট করা হয়েছে যাতে নতুন আইটেমটি সুন্দরভাবে ফিট করে */}
                        <ul className="flex flex-row lg:flex-col items-center justify-around lg:justify-center lg:py-10 py-4 md:py-6 lg:gap-8 md:gap-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <NavLink
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 group ${isActive ? 'text-primary scale-110 opacity-100' : 'opacity-80 text-secondary-content hover:opacity-100'
                                            }`
                                        }
                                    >
                                        <span className="text-xl md:text-2xl lg:text-2xl group-hover:scale-110 transition-transform">
                                            {getIcon(link.name)}
                                        </span>
                                        <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-tighter">
                                            {link.name}
                                        </span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        <div className="hidden lg:flex flex-col items-center gap-6 pb-10">
                            <div className="w-10 h-[1px] bg-base-300 opacity-20"></div>
                            <button
                                onClick={toggleTheme}
                                className="btn btn-ghost btn-circle hover:bg-base-200 transition-colors"
                            >
                                {theme === 'light' ? <HiMoon className="text-xl" /> : <HiSun className="text-xl text-yellow-400" />}
                            </button>
                        </div>
                    </div>
                </motion.nav>
            </div>
        </div>
    );
};

export default Navbar;