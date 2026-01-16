import React from 'react';
import { motion } from 'framer-motion';
// প্রয়োজনীয় নতুন আইকন ইমপোর্ট করা হয়েছে
import { FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3Alt, FaServer, FaCode, FaGitAlt, FaCloudflare } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiMongodb, SiExpress, SiCplusplus, SiFirebase, SiPython, SiNetlify, SiVercel } from 'react-icons/si';
import { MdOutlineAppSettingsAlt, MdWeb, MdOutlineBuildCircle } from 'react-icons/md';

const About = () => {
    // Categorized Skills Data - নতুন Tools সেকশন অ্যাড করা হয়েছে
    const skillCategories = [
        {
            title: "Frontend",
            icon: <MdWeb className="text-primary" />,
            skills: [
                { icon: <FaHtml5 />, name: "HTML5" },
                { icon: <FaCss3Alt />, name: "CSS3" },
                { icon: <SiTailwindcss />, name: "Tailwind" },
                { icon: <SiJavascript />, name: "JavaScript" },
                { icon: <FaReact />, name: "React" },
            ]
        },
        {
            title: "Backend & DB",
            icon: <FaServer className="text-primary" />,
            skills: [
                { icon: <FaNodeJs />, name: "Node.js" },
                { icon: <SiExpress />, name: "Express" },
                { icon: <SiMongodb />, name: "MongoDB" },
                { icon: <SiFirebase />, name: "Firebase" },
            ]
        },
        {
            title: "Tools & Deployment", // তোমার রিকোয়েস্ট অনুযায়ী নতুন সেকশন
            icon: <MdOutlineBuildCircle className="text-primary" />,
            skills: [
                { icon: <FaGitAlt />, name: "Git" },
                { icon: <SiNetlify />, name: "Netlify" },
                { icon: <SiVercel />, name: "Vercel" },
                { icon: <FaCloudflare />, name: "Cloudflare" },
            ]
        },
        {
            title: "Programming",
            icon: <FaCode className="text-primary" />,
            skills: [
                { icon: <FaCode />, name: "C" },
                { icon: <SiCplusplus />, name: "C++" },
                { icon: <SiPython />, name: "Python" },
            ]
        }
    ];

    const services = [
        {
            title: "Web Development",
            desc: "Creating high-performance MERN stack applications with focus on scalability and clean architecture.",
            icon: <MdWeb />
        },
        {
            title: "App Development",
            desc: "Designing intuitive mobile-first experiences with modern UI/UX principles and robust maintenance.",
            icon: <MdOutlineAppSettingsAlt />
        }
    ];

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-base-100 transition-all duration-500 py-10"
        >
            {/* --- Header Section --- */}
            <div className="mb-12">
                <h2 className="text-4xl font-extrabold tracking-tight">
                    <span className="text-primary italic mr-1">A</span>bout Me
                </h2>
                <div className="w-20 h-1.5 bg-primary mt-2 rounded-full shadow-[0_0_10px_#10b981]"></div>
            </div>

            {/* --- Main Info Card --- */}
            <div className="bg-base-200/50 backdrop-blur-xl border border-base-300 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 ">

                    {/* Left Side: Bio Text */}
                    <div className="lg:col-span-7 space-y-6">
                        <p className="text-xl font-medium leading-relaxed">
                            Hey, there <br /> I'm <span className="text-primary font-bold">Asif Al Fattha Fahim</span>.
                        </p>
                        <p className="text-lg text-base-content/80 leading-relaxed text-start">
                            I am a MERN Stack Developer building scalable web applications with React, Node.js, and MongoDB. My foundation in C++, Python, and JavaScript drives my problem-solving approach, from architecture to UI polish. Currently mastering Next.js to deliver high-performance full-stack solutions, I am committed to clean code and creating digital tools that make a real impact.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            <div className="flex flex-col gap-1 border-l-2 border-primary/20 pl-4">
                                <span className="text-xs font-black uppercase tracking-widest text-primary/70">Location</span>
                                <span className="text-md font-bold tracking-wide">Dhaka, Bangladesh</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l-2 border-primary/20 pl-4">
                                <span className="text-xs font-black uppercase tracking-widest text-primary/70">Languages</span>
                                <span className="text-md font-bold tracking-wide">Bangla, English, Hindi</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Categorized Skills */}
                    <div className="lg:col-span-5 space-y-6">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-primary/70 block border-b border-primary/10 pb-2">Core Expertise & Tools</span>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                            {skillCategories.map((cat, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-bold opacity-80 uppercase tracking-tighter">
                                        {cat.icon} {cat.title}
                                    </div>
                                    <div className="flex flex-wrap gap-3 bg-base-300/30 p-3 rounded-2xl border border-base-300">
                                        {
                                            cat.skills.map((skill, sIdx) => (
                                                <div
                                                    key={sIdx}
                                                    className="tooltip tooltip-top hover:tooltip-primary"
                                                    data-tip={skill.name}
                                                >
                                                    <motion.div
                                                        whileHover={{ scale: 1.2, color: "#10b981" }}
                                                        className="text-xl cursor-pointer transition-colors p-1"
                                                    >
                                                        {skill.icon}
                                                    </motion.div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Services Section --- */}
            <div className="mt-20">
                <div className="mb-10">
                    <h3 className="text-3xl font-bold tracking-tight">
                        <span className="text-primary italic">M</span>y Services
                    </h3>
                    <div className="w-12 h-1 bg-primary/40 mt-1 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className="bg-gradient-to-br from-base-200 to-base-100 border border-base-300 p-8 rounded-[2rem] flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-lg transition-all group"
                        >
                            <div className="p-5 rounded-2xl bg-primary/5 text-5xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                {service.icon}
                            </div>
                            <div className="text-center sm:text-left">
                                <h4 className="text-2xl font-bold mb-3 tracking-tight">{service.title}</h4>
                                <p className="text-base text-base-content/70 leading-relaxed font-medium">
                                    {service.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default About;