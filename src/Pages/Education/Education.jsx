import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap } from 'react-icons/hi';
import { FaCertificate } from 'react-icons/fa';
import { EducationCardSkeleton, CertificateSkeleton } from '../../Components/Skeleton/Skeleton';

const API = import.meta.env.VITE_API_URL;

const Education = () => {
    const [educationData, setEducationData] = useState([]);
    const [certificatesData, setCertificatesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch(`${API}/education`).then(r => r.json()),
            fetch(`${API}/certificates`).then(r => r.json()),
        ])
            .then(([edu, certs]) => {
                setEducationData(Array.isArray(edu) ? edu : []);
                setCertificatesData(Array.isArray(certs) ? certs : []);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="bg-base-100 text-base-content py-10 px-4 md:px-10 lg:py-20 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3"
                >
                    Education
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                        <HiAcademicCap className="text-primary" />
                    </motion.div>
                </motion.h2>

                {/* Loading */}
                {loading ? (
                    <div className="space-y-6 mb-20">
                        {[...Array(2)].map((_, i) => <EducationCardSkeleton key={i} />)}
                    </div>
                ) : educationData.length === 0 ? (
                    <p className="text-center text-base-content/50 py-10">No education records yet.</p>
                ) : (
                    <div className="relative border-l-2 border-primary/20 ml-4 md:ml-8 space-y-12 mb-20">
                        {educationData.map((edu, index) => (
                            <motion.div
                                key={edu._id}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                viewport={{ once: true, amount: 0.3 }}
                                className="relative pl-8 md:pl-12"
                            >
                                <motion.span
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        boxShadow: ["0 0 0 0 rgba(16,185,129,0.7)", "0 0 0 10px rgba(16,185,129,0)", "0 0 0 0 rgba(16,185,129,0)"]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                    className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"
                                />
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-base-200 p-6 md:p-8 rounded-[24px] border border-white/5 shadow-xl hover:border-primary/30 transition-all duration-300"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-4">
                                            {edu.logo && (
                                                <motion.div
                                                    whileHover={{ rotate: 360 }}
                                                    transition={{ duration: 0.6 }}
                                                    className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center overflow-hidden"
                                                >
                                                    <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain" />
                                                </motion.div>
                                            )}
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-bold text-secondary-content">{edu.institution}</h3>
                                                <span className="text-primary font-mono text-sm tracking-wide">{edu.degree}</span>
                                            </div>
                                        </div>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            transition={{ delay: 0.3, type: "spring" }}
                                            className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit h-fit ${edu.status === 'Ongoing'
                                                ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                                : 'bg-primary/10 text-primary border border-primary/20'
                                                }`}
                                        >
                                            {edu.status}
                                        </motion.div>
                                    </div>
                                    <p className="text-sm md:text-base opacity-70 mb-2 font-semibold">{edu.duration}</p>
                                    {edu.result && <p className="text-secondary-content/60 text-sm">{edu.result}</p>}
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Certificates Section */}
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3 mt-16"
                >
                    Certificates
                    <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                        <FaCertificate className="text-primary" />
                    </motion.div>
                </motion.h2>

                <div className="relative border-l-2 border-primary/20 ml-4 md:ml-8 space-y-12">
                    {loading ? (
                        [...Array(3)].map((_, i) => <CertificateSkeleton key={i} />)
                    ) : certificatesData.map((cert, index) => (
                        <motion.div
                            key={cert._id || cert.id}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="relative pl-8 md:pl-12"
                        >
                            <motion.span
                                animate={{
                                    scale: [1, 1.2, 1],
                                    boxShadow: ["0 0 0 0 rgba(16,185,129,0.7)", "0 0 0 10px rgba(16,185,129,0)", "0 0 0 0 rgba(16,185,129,0)"]
                                }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"
                            />
                            <motion.div
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ duration: 0.3 }}
                                className="bg-base-200 rounded-[24px] border border-white/5 shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden"
                            >
                                <div className="p-6 md:p-8">
                                    <h3 className="text-xl md:text-2xl font-bold text-secondary-content text-center mb-4">{cert.title}</h3>
                                    <p className="text-sm text-secondary-content/70 text-center leading-relaxed mb-6">{cert.description}</p>
                                    {cert.imageURL && (
                                        <div className="rounded-xl overflow-hidden bg-base-300 flex items-center justify-center p-4">
                                            <img src={cert.imageURL} alt={cert.title} className="w-full h-auto object-contain" />
                                        </div>
                                    )}
                                    <div className="mt-6 text-center">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-xs font-bold">
                                            <FaCertificate /> {cert.issuer}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
