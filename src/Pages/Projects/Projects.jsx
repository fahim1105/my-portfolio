import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Projects = () => {
    // প্রজেক্ট ডেটা (সহজে ম্যানেজ করার জন্য)
    const projectData = [
        {
            title: "Scholarship Management",
            image: "https://i.ibb.co.com/qMdPKDP5/Screenshot-2025-12-31-at-5-48-31-AM.png",
            tags: ['React', 'Node.js', "Firebase", 'MongoDB', 'Tailwind'],
            desc: "ScholarStream is a smart scholarship management platform that connects students with the right opportunities effortlessly. It streamlines scholarship discovery, applications, and reviews through a secure and user-friendly system.",
            github: "https://github.com/fahim1105/Scholar-Stream-Client",
            live: "https://scholar-stream.pages.dev/"
        },
        {
            title: "Money Map",
            image: "https://i.ibb.co.com/HpGDW7yj/Screenshot-2025-12-31-at-6-05-59-AM.png",
            tags: ['React', 'Node.js', "Firebase", 'MongoDB', 'Tailwind'],
            desc: "Money Map is a simple and smart finance tracking platform that helps users manage income, expenses, and savings in one place. It provides clear insights to plan budgets and make better financial decisions.",
            github: "https://github.com/fahim1105/Money-Map-Client",
            live: "https://money-map-ee9.pages.dev/"
        },
        {
            title: "Warm Paws",
            image: "https://i.ibb.co.com/Y7K7xsm7/Screenshot-2025-12-31-at-6-14-24-AM.png",
            tags: ['React', "Firebase", 'Tailwind'],
            desc: "Warm Paws is a caring platform dedicated to supporting and protecting stray and rescued animals. It connects people with adoption, donation, and care opportunities to give every paw a warmer, safer life.",
            github: "#", // Add GitHub if available
            live: "https://warm-paws.pages.dev/"
        },
        {
            title: "App Zone",
            image: "https://i.ibb.co.com/whgKMS5n/Screenshot-2025-12-31-at-6-21-01-AM.png",
            tags: ['React', 'Tailwind'],
            desc: "App Zone is a modern platform for discovering, managing, and showcasing innovative apps in one place. It helps users explore new tools easily while giving developers a space to highlight their creations.",
            github: "https://github.com/fahim1105/app-zone",
            live: "https://app-zone.pages.dev/"
        },
        {
            title: "Support Zone",
            image: "https://i.ibb.co.com/Xks8JfMX/Screenshot-2025-12-31-at-6-26-35-AM.png",
            tags: ['HTML', 'JavaScript', 'Tailwind'],
            desc: "Support Zone is a customer ticket system designed to manage support requests efficiently and smoothly. It helps teams track, respond, and resolve customer issues faster through an organized workflow.",
            github: "#",
            live: "https://customer-support-zone-4hc.pages.dev/"
        },
        {
            title: "Emergency Service",
            image: "https://i.ibb.co.com/HLFZnGsr/Screenshot-2025-12-31-at-6-30-50-AM.png",
            tags: ['HTML', 'JavaScript', 'Tailwind'],
            desc: "Emergency Service App is a secure platform where users can use coins to instantly call emergency services. It ensures quick access to help through a simple, reliable, and efficient system during critical moments.",
            github: "https://github.com/fahim1105/emergency-hotline",
            live: "https://fahim1105.github.io/emergency-hotline/"
        },
        {
            title: "Faugei",
            image: "https://i.ibb.co.com/4ZtkHp0G/Screenshot-2025-12-31-at-6-35-34-AM.png",
            tags: ['HTML', 'CSS'],
            desc: "Faugei is a beautifully designed flower shop web app focused purely on UI/UX. It showcases elegant layouts, smooth interactions, and a visually pleasing experience for browsing and selecting flowers. 🌸",
            github: "https://github.com/fahim1105/assignment-two",
            live: "https://fahim1105.github.io/assignment-two/"
        }
    ];

    return (
        <section className="min-h-screen bg-base-100 px-3 transition-all duration-500 pb-16">
            {/* --- Header Section --- */}
            <div className="mb-12">
                <h2 className="text-4xl font-extrabold tracking-tight">
                    <span className="text-primary italic mr-1">W</span>orks
                </h2>
                <div className="w-16 h-1.5 bg-primary mt-2 rounded-full shadow-[0_0_10px_#10b981]"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-7">
                {projectData.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group bg-base-200/50 backdrop-blur-xl border border-base-300 rounded-[2.5rem] p-5 md:p-8 lg:p-5 shadow-2xl hover:border-primary/30 transition-all duration-500 relative overflow-hidden h-full flex flex-col"
                    >
                        {/* Image Section */}
                        <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-video">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-neutral/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='btn btn-circle btn-primary btn-sm md:btn-md'>
                                        <FiGithub size={20} />
                                    </a>
                                )}
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='btn btn-circle btn-primary btn-sm md:btn-md'>
                                    <FiExternalLink size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="px-2 flex flex-col flex-grow">
                            {/* Technology Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title & Description */}
                            <div className="mb-4">
                                <h3 className="text-xl md:text-2xl lg:text-xl font-bold group-hover:text-primary transition-colors leading-tight mb-3">
                                    {project.title}
                                </h3>
                                <p className="text-sm md:text-base lg:text-sm text-base-content/70 leading-relaxed line-clamp-4">
                                    {project.desc}
                                </p>
                            </div>
                        </div>

                        {/* Decorative Bottom Glow */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;