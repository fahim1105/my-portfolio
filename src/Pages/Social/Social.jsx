import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import { SocialSkeleton } from '../../Components/Skeleton/Skeleton';

const API = import.meta.env.VITE_API_URL;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// Dynamically resolve icon name string → react-icons component
const getIcon = (iconName) => {
    const Icon = FaIcons[iconName];
    return Icon ? <Icon /> : <FaIcons.FaLink />;
};

const Social = () => {
    const [socials, setSocials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API}/socials`)
            .then(r => r.json())
            .then(data => setSocials(Array.isArray(data) ? data : []))
            .catch(() => setSocials([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="py-10 px-3">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10"
            >
                <h2 className="text-4xl font-extrabold tracking-tight">
                    <span className="text-primary italic mr-1">S</span>ocial Media
                </h2>
                <div className="w-16 h-1.5 bg-primary mt-2 rounded-full shadow-[0_0_10px_#10b981]"></div>
            </motion.div>

            {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
                    {[...Array(4)].map((_, i) => <SocialSkeleton key={i} />)}
                </div>
            ) : socials.length === 0 ? (
                <p className="text-center text-base-content/50 py-10">No social links yet.</p>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6"
                >
                    {socials.map((social, index) => (
                        <motion.a
                            key={social._id || index}
                            variants={itemVariants}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-center justify-between p-5 bg-base-200/50 backdrop-blur-xl border border-base-300 rounded-3xl transition-all duration-300 group ${social.color || ''}`}
                        >
                            <div className="flex items-center gap-5">
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className="p-4 bg-base-300 rounded-2xl text-2xl group-hover:text-white group-hover:bg-white/10 transition-all"
                                >
                                    {getIcon(social.icon)}
                                </motion.div>
                                <div>
                                    <h3 className="font-bold text-lg group-hover:text-white transition-colors">{social.platform}</h3>
                                    <p className="text-sm text-base-content/60 group-hover:text-white/80 transition-colors">{social.username}</p>
                                </div>
                            </div>
                            <motion.div
                                initial={{ x: 0 }}
                                whileHover={{ x: 5 }}
                                className="hidden sm:block opacity-0 group-hover:opacity-100 transition-all text-white text-xl"
                            >
                                →
                            </motion.div>
                        </motion.a>
                    ))}
                </motion.div>
            )}

            {/* Footer note */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-12 p-8 bg-primary/5 border border-primary/10 rounded-[2.5rem] text-center"
            >
                <p className="text-base-content/70 font-medium">
                    I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>
            </motion.div>
        </section>
    );
};

export default Social;
