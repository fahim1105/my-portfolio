import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';
import {
    MdWeb, MdOutlineAppSettingsAlt, MdOutlineBuildCircle,
    MdCode, MdDesignServices, MdStorage
} from 'react-icons/md';
import { AboutSkeleton } from '../../Components/Skeleton/Skeleton';

const API = import.meta.env.VITE_API_URL;

const ICON_MAP = {
    MdWeb: <MdWeb />,
    MdOutlineAppSettingsAlt: <MdOutlineAppSettingsAlt />,
    MdOutlineBuildCircle: <MdOutlineBuildCircle />,
    MdCode: <MdCode />,
    MdDesignServices: <MdDesignServices />,
    MdStorage: <MdStorage />,
};

const FALLBACK = {
    name: 'Asif Al Fattha Fahim',
    tagline: 'MERN Stack Developer',
    bio: 'I am a MERN Stack Developer building scalable web applications with React, Node.js, and MongoDB. My foundation in C++, Python, and JavaScript drives my problem-solving approach, from architecture to UI polish. Currently mastering Next.js to deliver high-performance full-stack solutions, I am committed to clean code and creating digital tools that make a real impact.',
    location: 'Dhaka, Bangladesh',
    languages: 'Bangla, English, Hindi',
    focus: 'Full-Stack Development',
    skillCategories: [
        {
            title: 'Frontend',
            skills: [
                { name: 'HTML5', percentage: 95 },
                { name: 'CSS3', percentage: 90 },
                { name: 'Tailwind', percentage: 88 },
                { name: 'JavaScript', percentage: 85 },
                { name: 'React', percentage: 82 },
            ],
        },
        {
            title: 'Backend & DB',
            skills: [
                { name: 'Node.js', percentage: 80 },
                { name: 'Express', percentage: 78 },
                { name: 'MongoDB', percentage: 75 },
                { name: 'Firebase', percentage: 70 },
            ],
        },
        {
            title: 'Tools & Deployment',
            skills: [
                { name: 'Git', percentage: 85 },
                { name: 'Netlify', percentage: 80 },
                { name: 'Vercel', percentage: 78 },
                { name: 'Cloudflare', percentage: 65 },
            ],
        },
        {
            title: 'Programming',
            skills: [
                { name: 'C', percentage: 75 },
                { name: 'C++', percentage: 72 },
                { name: 'Python', percentage: 68 },
            ],
        },
    ],
    services: [
        {
            title: 'Web Development',
            desc: 'Creating high-performance MERN stack applications with focus on scalability and clean architecture.',
            icon: 'MdWeb',
        },
        {
            title: 'App Development',
            desc: 'Designing intuitive mobile-first experiences with modern UI/UX principles and robust maintenance.',
            icon: 'MdOutlineAppSettingsAlt',
        },
    ],
};

const progressVariants = {
    hidden: { width: 0 },
    visible: (pct) => ({
        width: `${pct}%`,
        transition: { duration: 1.5, ease: 'easeOut', delay: 0.2 },
    }),
};

const About = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${API}/profile`)
            .then((r) => r.json())
            .then((d) => setData(d && d._id ? d : FALLBACK))
            .catch(() => setData(FALLBACK));
    }, []);

    const d = data || FALLBACK;

    if (!data) return (
        <section className="min-h-screen bg-base-100 py-10 space-y-20">
            <AboutSkeleton />
            <AboutSkeleton />
        </section>
    );

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-base-100 py-10 space-y-20"
        >
            {/* ABOUT ME */}
            <div id="about-me">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-extrabold tracking-tight">
                        <span className="text-primary italic mr-1">A</span>bout Me
                    </h2>
                    <div className="w-20 h-1.5 bg-primary mt-2 rounded-full shadow-[0_0_10px_#10b981]" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="bg-base-200/50 border border-base-300 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <p className="text-xl font-medium leading-relaxed">
                                Hey, there <br />
                                I&apos;m <span className="text-primary font-bold">{d.name}</span>.
                            </p>
                            {d.tagline && (
                                <p className="text-primary/70 font-semibold text-sm uppercase tracking-widest">
                                    {d.tagline}
                                </p>
                            )}
                            <p className="text-lg text-base-content/80 leading-relaxed">{d.bio}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { label: 'Location', value: d.location },
                                { label: 'Languages', value: d.languages },
                                { label: 'Focus', value: d.focus },
                            ]
                                .filter((x) => x.value)
                                .map(({ label, value }) => (
                                    <div
                                        key={label}
                                        className="flex flex-col gap-2 border-l-4 border-primary/30 pl-6 bg-base-300/20 p-4 rounded-r-2xl"
                                    >
                                        <span className="text-xs font-black uppercase tracking-widest text-primary/70">
                                            {label}
                                        </span>
                                        <span className="text-lg font-bold tracking-wide">{value}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* SKILLS */}
            {d.skillCategories && d.skillCategories.length > 0 && (
                <div id="skills">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-4xl font-extrabold tracking-tight">
                            <span className="text-primary italic mr-1">S</span>kills &amp; Expertise
                        </h2>
                        <div className="w-20 h-1.5 bg-primary mt-2 rounded-full shadow-[0_0_10px_#10b981]" />
                        <p className="text-base-content/60 mt-4 text-lg">
                            My technical proficiency across different technologies and tools
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {d.skillCategories.map((cat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="bg-base-200/50 border border-base-300 rounded-[2rem] p-6 shadow-xl"
                            >
                                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-base-300/50">
                                    <div className="text-2xl text-primary">
                                        {ICON_MAP[cat.icon] || <FaCode />}
                                    </div>
                                    <h3 className="text-xl font-bold">{cat.title}</h3>
                                </div>

                                <div className="space-y-4">
                                    {cat.skills.map((skill, si) => (
                                        <motion.div
                                            key={si}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 + si * 0.05, duration: 0.4 }}
                                            viewport={{ once: true }}
                                            className="space-y-2"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{skill.name}</span>
                                                <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                                                    {skill.percentage}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-base-300/50 rounded-full h-2.5 overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                                                    variants={progressVariants}
                                                    initial="hidden"
                                                    whileInView="visible"
                                                    custom={skill.percentage}
                                                    viewport={{ once: true }}
                                                    style={{ willChange: 'width' }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* SERVICES */}
            {d.services && d.services.length > 0 && (
                <div id="services">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-4xl font-extrabold tracking-tight">
                            <span className="text-primary italic mr-1">M</span>y Services
                        </h2>
                        <div className="w-20 h-1.5 bg-primary mt-2 rounded-full shadow-[0_0_10px_#10b981]" />
                        <p className="text-base-content/60 mt-4 text-lg">
                            What I can help you build and achieve
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {d.services.map((svc, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2, duration: 0.6 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="bg-gradient-to-br from-base-200 to-base-100 border border-base-300 p-8 rounded-[2rem] flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-lg group cursor-pointer"
                            >
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className="p-6 rounded-2xl bg-primary/5 text-5xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500"
                                >
                                    {ICON_MAP[svc.icon] || <MdWeb />}
                                </motion.div>
                                <div className="text-center sm:text-left">
                                    <h4 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        {svc.title}
                                    </h4>
                                    <p className="text-base text-base-content/70 leading-relaxed">{svc.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </motion.section>
    );
};

export default About;
