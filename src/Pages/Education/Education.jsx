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
            logo: "https://i.ibb.co.com/Fbskm1zw/southeast-logo.png",
            status: "Ongoing"
        },
        {
            id: 2,
            institution: "Notre Dame College, Mymensingh",
            degree: "Higher Secondary Certificate (HSC)",
            duration: "Completed: 2023",
            details: "Group: Science. Developed a strong foundation in physics, mathematics, and chemistry.",
            logo: "https://i.ibb.co.com/zd9qhVb/notre-dame-logo.png",
            status: "Completed"
        }
    ];

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

                <div className="relative border-l-2 border-primary/20 ml-4 md:ml-8 space-y-12">
                    {educationData.map((edu, index) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline dot with pulse animation */}
                            <motion.span
                                animate={{
                                    scale: [1, 1.2, 1],
                                    boxShadow: [
                                        "0 0 0 0 rgba(16, 185, 129, 0.7)",
                                        "0 0 0 10px rgba(16, 185, 129, 0)",
                                        "0 0 0 0 rgba(16, 185, 129, 0)"
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                                className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"
                            />

                            <motion.div
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ duration: 0.3 }}
                                className="bg-base-200 p-6 md:p-8 rounded-[24px] border border-white/5 shadow-xl hover:border-primary/30 transition-all duration-300 group"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div className="flex items-center gap-4">
                                        {/* Institution Logo */}
                                        <motion.div
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                            className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center overflow-hidden"
                                        >
                                            <img
                                                src={edu.logo}
                                                alt={edu.institution}
                                                className="w-full h-full object-contain"
                                            />
                                        </motion.div>
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
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ delay: 0.3, type: "spring" }}
                                        className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit h-fit ${
                                            edu.status === 'Ongoing'
                                                ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                                : 'bg-primary/10 text-primary border border-primary/20'
                                        }`}
                                    >
                                        {edu.status}
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-sm md:text-base opacity-70 mb-2 font-semibold"
                                >
                                    {edu.duration}
                                </motion.div>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-secondary-content/60 leading-relaxed max-w-2xl"
                                >
                                    {edu.details}
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
