import React from 'react';
import { useParams, Link } from 'react-router';
import { FiGithub, FiExternalLink, FiArrowLeft, FiAlertCircle, FiLayers } from 'react-icons/fi';
import { AiFillRocket } from 'react-icons/ai';

const ProjectDetails = () => {
    const { id } = useParams();

    // Full Project Data Object
    const projectDetails = {
        "scholarship-management": {
            title: "Scholarship Management",
            image: "https://i.ibb.co.com/qMdPKDP5/Screenshot-2025-12-31-at-5-48-31-AM.png",
            desc: "ScholarStream is a comprehensive scholarship management platform designed to automate the discovery and application process for students worldwide. It provides a seamless interface for both applicants and administrators.",
            stack: ["React", "Node.js", "Express js", "MongoDB", "Firebase", "Tailwind CSS"],
            github: "https://github.com/fahim1105/Scholar-Stream-Client",
            live: "https://scholar-stream.pages.dev/",
            challenges: "The primary challenge was implementing Role-Based Access Control (RBAC) to distinguish between Admin and User dashboards. Additionally, syncing real-time data from MongoDB while handling Firebase authentication required precise state management.",
            futurePlans: "I plan to implement a Real-Time Application Engine allowing students to apply for scholarships instantly with live status tracking. The system will be enhanced to support Multi-Application Management, enabling students to apply for and track several scholarships simultaneously. Furthermore, I will integrate an Advanced Curation Algorithm to source premium, high-impact educational opportunities for academic advancement."
        },
        "money-map": {
            title: "Money Map",
            image: "https://i.ibb.co.com/HpGDW7yj/Screenshot-2025-12-31-at-6-05-59-AM.png",
            desc: "Money Map is a personal finance tracker that helps users visualize their income, expenses, and savings through intuitive charts and clean data management.",
            stack: ["React", "Node.js", "Express js", "MongoDB", "Firebase", "Tailwind"],
            github: "https://github.com/fahim1105/Money-Map-Client",
            live: "https://money-map-ee9.pages.dev/",
            challenges: "Integrating Chart.js to render responsive and dynamic data visualizations was a significant hurdle. Ensuring that the graphs updated accurately based on various date filters required complex data manipulation.",
            futurePlans: "I plan to add automated expense tracking by integrating bank statement imports and implementing a multi-currency support system for international users."
        },
        "warm-paws": {
            title: "Warm Paws",
            image: "https://i.ibb.co.com/Y7K7xsm7/Screenshot-2025-12-31-at-6-14-24-AM.png",
            desc: "A dedicated platform for stray animal rescue and adoption, connecting compassionate individuals with animals in need of a home.",
            stack: ["React", "Firebase", "Tailwind CSS"],
            github: "#",
            live: "https://warm-paws.pages.dev/",
            challenges: "Balancing a professional UI with an emotional user experience was key. Implementing smooth animations with Framer Motion without compromising site performance was the main technical focus.",
            futurePlans: "Future improvements include a GPS-based alert system for animal rescue and a verified portal for veterinary doctor appointments."
        },
        "app-zone": {
            title: "App Zone",
            image: "https://i.ibb.co.com/whgKMS5n/Screenshot-2025-12-31-at-6-21-01-AM.png",
            desc: "App Zone is a modern catalog for software discovery, allowing developers to showcase their tools and users to find the best apps for their needs.",
            stack: ["HTML", "Java script", "Tailwind CSS"],
            github: "https://github.com/fahim1105/app-zone",
            live: "https://app-zone.pages.dev/",
            challenges: "Managing state across multiple categories while maintaining a fast loading speed for high-resolution images was a major focus during development.",
            futurePlans: "The next phase will include an analytics dashboard for developers to track app views and a comprehensive user rating/review system."
        },
        "support-zone": {
            title: "Support Zone",
            image: "https://i.ibb.co.com/Xks8JfMX/Screenshot-2025-12-31-at-6-26-35-AM.png",
            desc: "A streamlined ticket management system for customer support teams to track and resolve issues efficiently.",
            stack: ["HTML", "JavaScript", "Tailwind CSS"],
            github: "#",
            live: "https://customer-support-zone-4hc.pages.dev/",
            challenges: "Developing a full-functional ticketing logic using Vanilla JavaScript and DOM manipulation while ensuring data persistence via Local Storage was a great learning experience.",
            futurePlans: "I aim to rebuild this using the MERN stack to convert it into a scalable SaaS solution for multiple organizations."
        },
        "emergency-service": {
            title: "Emergency Service",
            image: "https://i.ibb.co.com/HLFZnGsr/Screenshot-2025-12-31-at-6-30-50-AM.png",
            desc: "A critical service app that uses a coin-based system to provide instant access to emergency contacts and hotlines.",
            stack: ["HTML", "JavaScript", "Tailwind CSS"],
            github: "https://github.com/fahim1105/emergency-hotline",
            live: "https://fahim1105.github.io/emergency-hotline/",
            challenges: "The challenge was creating a logic that prioritizes speed and reliability. The UI had to be extremely lightweight to ensure instant loading during emergencies.",
            futurePlans: "I plan to add live GPS sharing so that emergency responders can receive the user's exact coordinates upon call initiation."
        },
        "faugei": {
            title: "Faugei",
            image: "https://i.ibb.co.com/4ZtkHp0G/Screenshot-2025-12-31-at-6-35-34-AM.png",
            desc: "A high-fidelity UI/UX project for an online flower boutique, focusing on aesthetic layouts and smooth CSS interactions.",
            stack: ["HTML", "CSS"],
            github: "https://github.com/fahim1105/assignment-two",
            live: "https://fahim1105.github.io/assignment-two/",
            challenges: "Mastering CSS Grid and Flexbox to create a fully responsive gallery that maintains its beauty across all screen sizes was the primary goal.",
            futurePlans: "I intend to transform this into a full E-commerce application with a shopping cart, payment integration, and order tracking."
        }
    };

    const project = projectDetails[id];

    if (!project) return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <h1 className="text-3xl font-bold">Project Not Found</h1>
            <Link to="/projects" className="btn btn-primary">Back to Projects</Link>
        </div>
    );

    return (
        <section className="min-h-screen bg-base-100 py-8 ">
            <div className="max-w-6xl mx-auto">
                {/* Back Link */}
                <Link to="/projects" className="btn btn-ghost mb-8 group hover:bg-primary/10">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform mr-2" />
                    Back to Projects
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Side: Media & Content */}
                    <div className="lg:col-span-2">
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl mb-10 border border-base-300">
                            <img src={project.image} alt={project.title} className="w-full h-auto object-cover" />
                        </div>

                        <div className="space-y-12">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black mb-6">{project.title}</h1>
                                <p className="text-lg text-base-content/70 leading-relaxed italic border-l-4 border-primary pl-6">
                                    {project.desc}
                                </p>
                            </div>

                            {/* Challenges Section */}
                            <div className="p-8 bg-error/5 border border-error/20 rounded-[2rem]">
                                <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-error tracking-widest uppercase text-sm">
                                    <FiAlertCircle /> Challenges Faced
                                </h3>
                                <p className="text-base-content/80 leading-relaxed font-medium">
                                    {project.challenges}
                                </p>
                            </div>

                            {/* Future Plans Section */}
                            <div className="p-8 bg-success/5 border border-success/20 rounded-[2rem]">
                                <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-success tracking-widest uppercase text-sm">
                                    <AiFillRocket /> Future Improvements
                                </h3>
                                <p className="text-base-content/80 leading-relaxed font-medium">
                                    {project.futurePlans}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-base-200/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-base-300 shadow-xl sticky top-24">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 tracking-widest uppercase text-sm">
                                <FiLayers className="text-primary" /> Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-10">
                                {project.stack.map(tech => (
                                    <span key={tech} className="px-4 py-2 bg-base-100 border border-base-300 rounded-xl text-xs font-bold uppercase tracking-tight shadow-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <a href={project.live} target="_blank" rel="noreferrer"
                                    className="btn btn-primary w-full rounded-2xl shadow-lg shadow-primary/20 gap-2 font-bold">
                                    <FiExternalLink /> Preview
                                </a>
                                {project.github !== "#" && (
                                    <a href={project.github} target="_blank" rel="noreferrer"
                                        className="btn btn-outline w-full rounded-2xl gap-2 hover:bg-base-100 text-primary transition-all">
                                        <FiGithub /> Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetails;