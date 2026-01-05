import React from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap } from 'react-icons/hi';

const Education = () => {
    const educationData = [
        {
            id: 1,
            institution: "Southeast University",
            degree: "B.Sc. in Computer Science & Engineering",
            duration: "Admitted: Fall 2024 - Present",
            details: "Currently pursuing a degree in CSE with a focus on core computer science fundamentals and software engineering.",
            logo: "https://i.ibb.co.com/Fbskm1zw/southeast-logo.png", // আপনার দেওয়া লিঙ্কের ইমেজ পাথ
            status: "Ongoing"
        },
        {
            id: 2,
            institution: "Notre Dame College, Mymensingh",
            degree: "Higher Secondary Certificate (HSC)",
            duration: "Completed: 2023",
            details: "Group: Science. Developed a strong foundation in physics, mathematics, and chemistry.",
            logo: "https://i.ibb.co.com/zd9qhVb/notre-dame-logo.png", // আপনার দেওয়া লিঙ্কের ইমেজ পাথ
            status: "Completed"
        }
    ];

    return (
        <section className="bg-base-100 text-base-content py-10 px-4 md:px-10 lg:py-20 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3"
                >
                    Education
                    <HiAcademicCap className="text-primary" />
                </motion.h2>

                <div className="relative border-l-2 border-primary/20 ml-4 md:ml-8 space-y-12">
                    {educationData.map((edu, index) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline dot */}
                            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--p),0.5)]"></span>

                            <div className="bg-base-200 p-6 md:p-8 rounded-[24px] border border-white/5 shadow-xl hover:border-primary/30 transition-all duration-300 group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div className="flex items-center gap-4">
                                        {/* Institution Logo */}
                                        <div className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={edu.logo}
                                                alt={edu.institution}
                                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-bold text-secondary-content">
                                                {edu.institution}
                                            </h3>
                                            <span className="text-primary font-mono text-sm tracking-wide">
                                                {edu.degree}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit h-fit ${edu.status === 'Ongoing' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-primary/10 text-primary border border-primary/20'
                                        }`}>
                                        {edu.status}
                                    </div>
                                </div>

                                <div className="text-sm md:text-base opacity-70 mb-2 font-semibold">
                                    {edu.duration}
                                </div>
                                <p className="text-secondary-content/60 leading-relaxed max-w-2xl">
                                    {edu.details}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;