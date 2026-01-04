import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FiGithub, FiExternalLink, FiInfo } from 'react-icons/fi';

const Projects = () => {
    const projectData = [
        {
            id: "scholarship-management",
            title: "Scholarship Management",
            image: "https://i.ibb.co.com/qMdPKDP5/Screenshot-2025-12-31-at-5-48-31-AM.png",
            tags: ["React", "Node.js", "Express js", "MongoDB", "Firebase", "Tailwind CSS"],
            desc: "ScholarStream is a smart scholarship management platform that connects students with the right opportunities effortlessly.",
            github: "https://github.com/fahim1105/Scholar-Stream-Client",
            live: "https://scholar-stream.pages.dev/"
        },
        {
            id: "money-map",
            title: "Money Map",
            image: "https://i.ibb.co.com/HpGDW7yj/Screenshot-2025-12-31-at-6-05-59-AM.png",
            tags: ["React", "Node.js", "Express js", "MongoDB", "Firebase", "Tailwind"],
            desc: "Money Map is a simple and smart finance tracking platform that helps users manage income, expenses, and savings.",
            github: "https://github.com/fahim1105/Money-Map-Client",
            live: "https://money-map-ee9.pages.dev/"
        },
        {
            id: "warm-paws",
            title: "Warm Paws",
            image: "https://i.ibb.co.com/Y7K7xsm7/Screenshot-2025-12-31-at-6-14-24-AM.png",
            tags: ['React', 'Firebase', 'Tailwind'],
            desc: "Warm Paws is a platform dedicated to supporting stray animals, connecting people with adoption and donation opportunities.",
            github: "#",
            live: "https://warm-paws.pages.dev/"
        },
        {
            id: "app-zone",
            title: "App Zone",
            image: "https://i.ibb.co.com/whgKMS5n/Screenshot-2025-12-31-at-6-21-01-AM.png",
            tags: ['HTML', 'JavaScript', 'Tailwind CSS'],
            desc: "App Zone is a modern platform for discovering, managing, and showcasing innovative apps in one place.",
            github: "https://github.com/fahim1105/app-zone",
            live: "https://app-zone.pages.dev/"
        },
        {
            id: "support-zone",
            title: "Support Zone",
            image: "https://i.ibb.co.com/Xks8JfMX/Screenshot-2025-12-31-at-6-26-35-AM.png",
            tags: ['HTML', 'JavaScript', 'Tailwind CSS'],
            desc: "Support Zone is a customer ticket system designed to manage support requests efficiently and smoothly.",
            github: "#",
            live: "https://customer-support-zone-4hc.pages.dev/"
        },
        {
            id: "emergency-service",
            title: "Emergency Service",
            image: "https://i.ibb.co.com/HLFZnGsr/Screenshot-2025-12-31-at-6-30-50-AM.png",
            tags: ['HTML', 'JavaScript', 'Tailwind CSS'],
            desc: "A secure platform where users can use coins to instantly call emergency services during critical moments.",
            github: "https://github.com/fahim1105/emergency-hotline",
            live: "https://fahim1105.github.io/emergency-hotline/"
        },
        {
            id: "faugei",
            title: "Faugei",
            image: "https://i.ibb.co.com/4ZtkHp0G/Screenshot-2025-12-31-at-6-35-34-AM.png",
            tags: ['HTML', 'CSS'],
            desc: "Faugei is a beautifully designed flower shop web app focused on elegant layouts and smooth interactions.",
            github: "https://github.com/fahim1105/assignment-two",
            live: "https://fahim1105.github.io/assignment-two/"
        }
    ];

    return (
        <section id="projects" className="min-h-screen bg-base-100 pt-10">
            <div className="mb-12 max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold tracking-tight">
                    <span className="text-primary italic mr-1">W</span>orks
                </h2>
                <div className="w-16 h-1.5 bg-primary mt-2 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {projectData.map((project) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group bg-base-200/50 backdrop-blur-xl border border-base-300 rounded-[2.5rem] p-5 shadow-2xl hover:border-primary/30 transition-all duration-500 flex flex-col"
                    >
                        {/* Image Section */}
                        <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-video">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />

                            {/* Desktop Overlay */}
                            <div className="absolute inset-0 bg-black/70 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 hidden lg:flex flex-col items-center justify-center gap-4">
                                <Link
                                    to={`/project/${project.id}`}
                                    className="btn btn-primary rounded-full px-8 font-bold"
                                >
                                    View Details
                                </Link>
                                <div className="flex gap-4">
                                    <a href={project.github} target="_blank" rel="noreferrer" className='btn btn-circle btn-outline btn-primary bg-base-100'><FiGithub size={20} /></a>
                                    <a href={project.live} target="_blank" rel="noreferrer" className='btn btn-circle btn-outline btn-primary bg-base-100'><FiExternalLink size={20} /></a>
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="px-2 flex flex-col flex-grow">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase rounded-full tracking-wider">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                            <p className="text-sm text-base-content/70 line-clamp-3 mb-6 leading-relaxed">{project.desc}</p>

                            {/* Mobile Link Footer */}
                            <div className="mt-auto flex lg:hidden items-center justify-between border-t border-base-300 pt-4">
                                <Link to={`/project/${project.id}`} className="text-primary font-bold text-sm flex items-center gap-2">
                                    <FiInfo /> View Details
                                </Link>
                                <div className="flex gap-3">
                                    <a href={project.github} target="_blank" rel="noreferrer" className="p-2 bg-base-300 rounded-full"><FiGithub size={18} /></a>
                                    <a href={project.live} target="_blank" rel="noreferrer" className="p-2 bg-primary text-white rounded-full"><FiExternalLink size={18} /></a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;