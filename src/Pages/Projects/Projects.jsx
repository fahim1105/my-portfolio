import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FiGithub, FiExternalLink, FiEye } from 'react-icons/fi';

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="projects" className="min-h-screen bg-base-100 pt-10">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12 max-w-7xl mx-auto"
            >
                <h2 className="text-4xl font-extrabold tracking-tight">
                    <span className="text-primary italic mr-1">W</span>orks
                </h2>
                <div className="w-16 h-1.5 bg-primary mt-2 rounded-full"></div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
            >
                {projectData.map((project) => (
                    <motion.div
                        key={project.id}
                        variants={itemVariants}
                        whileHover={{ y: -10 }}
                        className="group bg-base-200/50 backdrop-blur-xl border border-base-300 rounded-[2.5rem] p-5 shadow-2xl hover:border-primary/30 transition-all duration-500 flex flex-col"
                    >
                        {/* Image Section with Hover Overlay */}
                        <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-video image-hover project-image">
                            <motion.img
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Hover Overlay - Only on Desktop - Buttons at Bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 hidden lg:flex items-end justify-center pb-6 px-6">
                                {/* Icon Buttons - View Details, GitHub, Live Link */}
                                <div className="flex gap-4">
                                    <Link
                                        to={`/project/${project.id}`}
                                        className="btn btn-circle btn-lg bg-primary border-2 border-primary hover:bg-primary/90 hover:scale-110 text-white transition-all"
                                    >
                                        <FiEye size={24} />
                                    </Link>
                                    <motion.a
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className='btn btn-circle btn-lg btn-outline border-2 border-white/80 bg-white/10 backdrop-blur-sm hover:bg-white hover:border-white text-white hover:text-black transition-all'
                                    >
                                        <FiGithub size={24} />
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ scale: 1.15, rotate: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={project.live}
                                        target="_blank"
                                        rel="noreferrer"
                                        className='btn btn-circle btn-lg bg-white border-2 border-white hover:bg-white/90 text-black transition-all'
                                    >
                                        <FiExternalLink size={24} />
                                    </motion.a>
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="px-2 flex flex-col flex-grow">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag, idx) => (
                                    <motion.span
                                        key={tag}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase rounded-full tracking-wider"
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                            <p className="text-sm text-base-content/70 line-clamp-3 mb-6 leading-relaxed">{project.desc}</p>

                            {/* Mobile Buttons - Always Visible on Small Devices */}
                            <div className="mt-auto flex lg:hidden flex-col gap-4 border-t border-base-300 pt-4">
                                {/* View Details Button */}
                                <Link
                                    to={`/project/${project.id}`}
                                    className="btn btn-primary rounded-full font-bold gap-2 w-full"
                                >
                                    <FiEye size={18} />
                                    View Details
                                </Link>
                                
                                {/* GitHub and Live Link */}
                                <div className="flex gap-3 w-full">
                                    <motion.a
                                        whileTap={{ scale: 0.95 }}
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-outline btn-primary rounded-full flex-1 gap-2"
                                    >
                                        <FiGithub size={18} />
                                        GitHub
                                    </motion.a>
                                    <motion.a
                                        whileTap={{ scale: 0.95 }}
                                        href={project.live}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-primary rounded-full flex-1 gap-2"
                                    >
                                        <FiExternalLink size={18} />
                                        Live
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Projects;