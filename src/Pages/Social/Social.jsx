import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const Social = () => {
    const socials = [
        {
            name: "GitHub",
            icon: <FaGithub />,
            link: "https://github.com/fahim1105",
            color: "hover:bg-[#333]",
            username: "@fahim1105"
        },
        {
            name: "LinkedIn",
            icon: <FaLinkedinIn />,
            link: "https://www.linkedin.com/in/aaff115/",
            color: "hover:bg-[#0077b5]",
            username: "@aaff115"
        },
        {
            name: "Facebook",
            icon: <FaFacebookF />,
            link: "https://m.me/aaff.115?text=Hi%20Asif,%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20project.",
            color: "hover:bg-[#1877f2]",
            username: "@aaff.115"
        },
        {
            name: "WhatsApp",
            icon: <FaWhatsapp />,
            link: "https://wa.me/8801624283085?text=Hi%20Asif,%20I%20saw%20your%20portfolio%20and%20I'd%20like%20to%20talk%20about%20a%20project!",
            color: "hover:bg-[#25d366]",
            username: "+8801624283085"
        }
    ];

    return (
        <section className="py-10 px-3">
            {/* --- Header --- */}
            <div className="mb-10">
                <h2 className="text-4xl font-extrabold tracking-tight">
                    <span className="text-primary italic mr-1">C</span>onnect
                </h2>
                <div className="w-16 h-1.5 bg-primary mt-2 rounded-full shadow-[0_0_10px_#10b981]"></div>
            </div>

            {/* --- Social Grid --- 
                ট্যাবলেট এবং মোবাইলে একই রকম রাখার জন্য: grid-cols-1
                ডেস্কটপে: lg:grid-cols-2
            */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
                {socials.map((social, index) => (
                    <motion.a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5 }}
                        className={`flex items-center justify-between p-5 bg-base-200/50 backdrop-blur-xl border border-base-300 rounded-3xl transition-all duration-300 group ${social.color}`}
                    >
                        <div className="flex items-center gap-5">
                            {/* Icon Box */}
                            <div className="p-4 bg-base-300 rounded-2xl text-2xl group-hover:text-white group-hover:bg-white/10 transition-all">
                                {social.icon}
                            </div>

                            {/* Text Info */}
                            <div>
                                <h3 className="font-bold text-lg group-hover:text-white transition-colors">{social.name}</h3>
                                <p className="text-sm text-base-content/60 group-hover:text-white/80 transition-colors">
                                    {social.username}
                                </p>
                            </div>
                        </div>

                        {/* Arrow Icon */}
                        <div className="hidden sm:block opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-white text-xl">
                            →
                        </div>
                    </motion.a>
                ))}
            </div>

            {/* --- Additional Info (Optional) --- */}
            <div className="mt-12 p-8 bg-primary/5 border border-primary/10 rounded-[2.5rem] text-center">
                <p className="text-base-content/70 font-medium">
                    I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>
            </div>
        </section>
    );
};

export default Social;