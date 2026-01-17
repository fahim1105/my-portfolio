import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaServer, FaCode, FaGitAlt, FaCloudflare } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiMongodb, SiExpress, SiCplusplus, SiFirebase, SiPython, SiNetlify, SiVercel } from 'react-icons/si';
import { MdOutlineAppSettingsAlt, MdWeb, MdOutlineBuildCircle } from 'react-icons/md';

const About = () => {
    // Skills Data with Progress Bars
    const skillCategories = [
        {
            title: "Frontend",
            icon: <MdWeb className="text-primary" />,
            skills: [
                { icon: <FaHtml5 />, name: "HTML5", percentage: 95 },
                { icon: <FaCss3Alt />, name: "CSS3", percentage: 90 },
                { icon: <SiTailwindcss />, name: "Tailwind", percentage: 88 },
                { icon: <SiJavascript />, name: "JavaScript", percentage: 85 },
                { icon: <FaReact />, name: "React", percentage: 82 },
            ]
        },
        {
            title: "Backend & DB",
            icon: <FaServer className="text-primary" />,
            skills: [
                { icon: <FaNodeJs />, name: "Node.js", percentage: 80 },
                { icon: <SiExpress />, name: "Express", percentage: 78 },
                { icon: <SiMongodb />, name: "MongoDB", percentage: 75 },
                { icon: <SiFirebase />, name: "Firebase", percentage: 70 },
            ]
        },
        {
            title: "Tools & Deployment",
            icon: <MdOutlineBuildCircle className="text-primary" />,
            skills: [
                { icon: <FaGitAlt />, name: "Git", percentage: 85 },
                { icon: <SiNetlify />, name: "Netlify", percentage: 80 },
                { icon: <SiVercel />, name: "Vercel", percentage: 78 },
                { icon: <FaCloudflare />, name: "Cloudflare", percentage: 65 },
            ]
        },
        {
            title: "Programming",
            icon: <FaCode className="text-primary" />,
            skills: [
                { icon: <FaCode />, name: "C", percentage: 75 },
                { icon: <SiCplusplus />, name: "C++", percentage: 72 },
                { icon: <SiPython />, name: "Python", percentage: 68 },
            ]
        }
    ];

    const services = [
        {
            title: "Web Development",
            desc: "Creating high-performance MERN stack applications with focus on scalability and clean architecture.",
            icon: <MdWeb />
        },
        {
            title: "App Development",
            desc: "Designing intuitive mobile-first experiences with modern UI/UX principles and robust maintenance.",
            icon: <MdOutlineAppSettingsAlt />
        }
    ];

    // Animation variants for progress bars
    const progressVariants = {
        hidden: { width: 0 },
        visible: (percentage) => ({
            width: `${percentage}%`,
            transition: {
                duration: 1.5,
                ease: "easeOut",
                delay: 0.2
            }
        })
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-base-100 transition-all duration-500 py-10 space-y-20"
        >
            {/* =================== ABOUT ME SECTION =================== */}
            <div id="about-me" data-section="about-me">
                {/* About Me Header */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-extrabold tracking-tight">
                        <span className="text-primary italic mr-1">A</span>bout Me
                    </h2>
                    <div className="w-20 h-1.5 bg-primary mt-2 rounded-full shadow-[0_0_10px_#10b981]"></div>
                </motion.div>

                {/* About Me Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="bg-base-200/50 backdrop-blur-xl border border-base-300 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Bio Text */}
                        <div className="space-y-6">
                            <p className="text-xl font-medium leading-relaxed">
                                Hey, there <br /> I'm <span className="text-primary font-bold">Asif Al Fattha Fahim</span>.
                            </p>
                            <p className="text-lg text-base-content/80 leading-relaxed">
                                I am a MERN Stack Developer building scalable web applications with React, Node.js, and MongoDB. My foundation in C++, Python, and JavaScript drives my problem-solving approach, from architecture to UI polish. Currently mastering Next.js to deliver high-performance full-stack solutions, I am committed to clean code and creating digital tools that make a real impact.
                            </p>
                        </div>

                        {/* Personal Info */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="flex flex-col gap-2 border-l-4 border-primary/30 pl-6 bg-base-300/20 p-4 rounded-r-2xl">
                                    <span className="text-xs font-black uppercase tracking-widest text-primary/70">Location</span>
                                    <span className="text-lg font-bold tracking-wide">Dhaka, Bangladesh</span>
                                </div>
                                <div className="flex flex-col gap-2 border-l-4 border-primary/30 pl-6 bg-base-300/20 p-4 rounded-r-2xl">
                                    <span className="text-xs font-black uppercase tracking-widest text-primary/70">Languages</span>
                                    <span className="text-lg font-bold tracking-wide">Bangla, English, Hindi</span>
                                </div>
                                <div className="flex flex-col gap-2 border-l-4 border-primary/30 pl-6 bg-base-300/20 p-4 rounded-r-2xl">
                                    <span className="text-xs font-black uppercase tracking-widest text-primary/70">Focus</span>
                                    <span className="text-lg font-bold tracking-wide">Full-Stack Development</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* =================== SKILLS SECTION =================== */}
            <div id="skills" data-section="skills">
                {/* Skills Header */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-extrabold tracking-tight">
                        <span className="text-primary italic mr-1">S</span>kills & Expertise
                    </h2>
                    <div className="w-20 h-1.5 bg-primary mt-2 rounded-full shadow-[0_0_10px_#10b981]"></div>
                    <p className="text-base-content/60 mt-4 text-lg">
                        My technical proficiency across different technologies and tools
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {skillCategories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-base-200/50 backdrop-blur-xl border border-base-300 rounded-[2rem] p-6 shadow-xl"
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-base-300/50">
                                <div className="text-2xl">{cat.icon}</div>
                                <h3 className="text-xl font-bold">{cat.title}</h3>
                            </div>

                            {/* Skills List */}
                            <div className="space-y-4">
                                {cat.skills.map((skill, sIdx) => (
                                    <motion.div
                                        key={sIdx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (idx * 0.1) + (sIdx * 0.05), duration: 0.4 }}
                                        viewport={{ once: true }}
                                        className="space-y-2"
                                    >
                                        {/* Skill Name and Percentage */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">{skill.icon}</span>
                                                <span className="font-medium">{skill.name}</span>
                                            </div>
                                            <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                                                {skill.percentage}%
                                            </span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full bg-base-300/50 rounded-full h-2.5 overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full shadow-sm"
                                                variants={progressVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                custom={skill.percentage}
                                                viewport={{ once: true }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* =================== SERVICES SECTION =================== */}
            <div id="services" data-section="services">
                {/* Services Header */}
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
                    <div className="w-20 h-1.5 bg-primary mt-2 rounded-full shadow-[0_0_10px_#10b981]"></div>
                    <p className="text-base-content/60 mt-4 text-lg">
                        What I can help you build and achieve
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="bg-gradient-to-br from-base-200 to-base-100 border border-base-300 p-8 rounded-[2rem] flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-lg transition-all group cursor-pointer"
                        >
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className="p-6 rounded-2xl bg-primary/5 text-5xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm"
                            >
                                {service.icon}
                            </motion.div>
                            <div className="text-center sm:text-left">
                                <h4 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">
                                    {service.title}
                                </h4>
                                <p className="text-base text-base-content/70 leading-relaxed font-medium">
                                    {service.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default About;