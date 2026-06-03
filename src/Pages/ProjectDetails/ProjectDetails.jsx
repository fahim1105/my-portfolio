import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { FiGithub, FiExternalLink, FiArrowLeft, FiLayers, FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi';
import { AiFillRocket } from 'react-icons/ai';
import PageSeo from '../../Components/PageSeo/PageSeo';

const API = import.meta.env.VITE_API_URL;

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API}/projects/${id}`)
            .then(r => r.json())
            .then(data => setProject(data._id ? data : null))
            .catch(() => setProject(null))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    if (!project) return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <h1 className="text-3xl font-bold">Project Not Found</h1>
            <Link to="/projects" className="btn btn-primary">Back to Projects</Link>
        </div>
    );

    return (
        <section className="min-h-screen bg-base-100 py-8">
            {/* Dynamic SEO — uses project's own title, description and image */}
            <PageSeo
                slug="project-details"
                defaultTitle={`${project.title} | Asif Al Fattha Fahim`}
                defaultDescription={project.description}
                defaultOgImage={project.imageURL}
            />
            <div className="max-w-6xl mx-auto">
                <Link to="/projects" className="btn btn-ghost mb-8 group hover:bg-primary/10">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform mr-2" />
                    Back to Projects
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left — main content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image */}
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-base-300">
                            <img src={project.imageURL} alt={project.title} className="w-full h-auto object-cover" />
                        </div>

                        {/* Title + Description */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black mb-4">{project.title}</h1>
                            <p className="text-lg text-base-content/70 leading-relaxed italic border-l-4 border-primary pl-6">
                                {project.description}
                            </p>
                        </div>

                        {/* Key Features */}
                        {project.features?.length > 0 && (
                            <div className="p-6 bg-primary/5 border border-primary/15 rounded-[2rem]">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2 mb-4">
                                    <FiCheckCircle /> Key Features
                                </h3>
                                <ul className="space-y-2">
                                    {project.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2 text-base-content/80 text-sm leading-relaxed">
                                            <span className="text-primary mt-0.5 shrink-0">✦</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Challenges */}
                        {project.challenges && (
                            <div className="p-6 bg-error/5 border border-error/20 rounded-[2rem]">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-error flex items-center gap-2 mb-4">
                                    <FiAlertCircle /> Challenges Faced
                                </h3>
                                <p className="text-base-content/80 leading-relaxed">{project.challenges}</p>
                            </div>
                        )}

                        {/* Future Plans */}
                        {project.futurePlans && (
                            <div className="p-6 bg-success/5 border border-success/20 rounded-[2rem]">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-success flex items-center gap-2 mb-4">
                                    <AiFillRocket /> Future Improvements
                                </h3>
                                <p className="text-base-content/80 leading-relaxed">{project.futurePlans}</p>
                            </div>
                        )}
                    </div>

                    {/* Right — sidebar */}
                    <div>
                        <div className="bg-base-200/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-base-300 shadow-xl sticky top-24 space-y-8">

                            {/* Duration */}
                            {project.duration && (
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                                        <FiClock className="text-primary" /> Duration
                                    </h3>
                                    <p className="text-base-content/70 text-sm">{project.duration}</p>
                                </div>
                            )}

                            {/* Tech Stack */}
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
                                    <FiLayers className="text-primary" /> Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map(tech => (
                                        <span key={tech} className="px-3 py-1.5 bg-base-100 border border-base-300 rounded-xl text-xs font-bold uppercase tracking-tight shadow-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Links */}
                            <div className="space-y-3">
                                {project.liveLink && (
                                    <a href={project.liveLink} target="_blank" rel="noreferrer"
                                        className="btn btn-primary w-full rounded-2xl shadow-lg shadow-primary/20 gap-2 font-bold">
                                        <FiExternalLink /> Live Preview
                                    </a>
                                )}
                                {project.githubLink && project.githubLink !== '#' && (
                                    <a href={project.githubLink} target="_blank" rel="noreferrer"
                                        className="btn btn-outline w-full rounded-2xl gap-2 text-primary transition-all">
                                        <FiGithub /> Source Code
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
