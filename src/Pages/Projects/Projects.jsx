import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FiGithub, FiExternalLink, FiEye } from 'react-icons/fi';
import { ProjectCardSkeleton } from '../../Components/Skeleton/Skeleton';

const API = import.meta.env.VITE_API_URL;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const Projects = () => {
    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API}/projects`)
            .then(r => r.json())
            .then(data => setProjectData(Array.isArray(data) ? data : []))
            .catch(() => setProjectData([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <section className="min-h-screen bg-base-100 pt-10">
            <div className="mb-12 max-w-7xl mx-auto">
                <div className="h-10 w-32 bg-base-200/60 rounded-lg animate-pulse" />
                <div className="w-16 h-1.5 bg-base-200/60 mt-2 rounded-full animate-pulse" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {[...Array(4)].map((_, i) => <ProjectCardSkeleton key={i} />)}
            </div>
        </section>
    );

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

            {projectData.length === 0 ? (
                <p className="text-center text-base-content/50 py-20">No projects yet.</p>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
                >
                    {projectData.map((project) => (
                        <motion.div
                            key={project._id}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="group bg-base-200/50 backdrop-blur-xl border border-base-300 rounded-[2.5rem] p-5 shadow-2xl hover:border-primary/30 transition-all duration-200 flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-video">
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                    src={project.imageURL}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Hover Overlay - Desktop */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200 hidden lg:flex items-end justify-center pb-6 px-6">
                                    <div className="flex gap-4">
                                        <Link
                                            to={`/project/${project._id}`}
                                            className="btn btn-circle btn-lg bg-primary border-2 border-primary hover:bg-primary/90 hover:scale-110 text-white transition-all"
                                        >
                                            <FiEye size={24} />
                                        </Link>
                                        <motion.a
                                            whileHover={{ scale: 1.15, rotate: 5 }}
                                            href={project.githubLink} target="_blank" rel="noreferrer"
                                            className="btn btn-circle btn-lg btn-outline border-2 border-white/80 bg-white/10 backdrop-blur-sm hover:bg-white hover:border-white text-white hover:text-black transition-all"
                                        >
                                            <FiGithub size={24} />
                                        </motion.a>
                                        <motion.a
                                            whileHover={{ scale: 1.15, rotate: -5 }}
                                            href={project.liveLink} target="_blank" rel="noreferrer"
                                            className="btn btn-circle btn-lg bg-white border-2 border-white hover:bg-white/90 text-black transition-all"
                                        >
                                            <FiExternalLink size={24} />
                                        </motion.a>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-2 flex flex-col flex-grow">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.techStack.map((tag, idx) => (
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
                                <p className="text-sm text-base-content/70 line-clamp-3 mb-6 leading-relaxed">{project.description}</p>

                                {/* Mobile Buttons */}
                                <div className="mt-auto flex lg:hidden flex-col gap-4 border-t border-base-300 pt-4">
                                    <Link
                                        to={`/project/${project._id}`}
                                        className="btn btn-primary rounded-full font-bold gap-2 w-full"
                                    >
                                        <FiEye size={18} /> View Details
                                    </Link>
                                    <div className="flex gap-3 w-full">
                                        <motion.a whileTap={{ scale: 0.95 }} href={project.githubLink} target="_blank" rel="noreferrer"
                                            className="btn btn-outline btn-primary rounded-full flex-1 gap-2">
                                            <FiGithub size={18} /> GitHub
                                        </motion.a>
                                        <motion.a whileTap={{ scale: 0.95 }} href={project.liveLink} target="_blank" rel="noreferrer"
                                            className="btn btn-primary rounded-full flex-1 gap-2">
                                            <FiExternalLink size={18} /> Live
                                        </motion.a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </section>
    );
};

export default Projects;
