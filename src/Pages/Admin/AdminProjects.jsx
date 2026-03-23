import { useEffect, useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdClose, MdImage, MdDragIndicator } from 'react-icons/md';
import { confirmDelete } from '../../utils/confirm';
import {
    DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors
} from '@dnd-kit/core';
import {
    SortableContext, useSortable, arrayMove, rectSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const API = import.meta.env.VITE_API_URL;
const IMGBB_KEY = import.meta.env.VITE_IMGBB_API_KEY;

// All available tech options
const TECH_OPTIONS = [
    'HTML', 'CSS', 'JavaScript', 'TypeScript',
    'React', 'Next.js', 'Vue.js', 'Angular',
    'Tailwind CSS', 'Bootstrap', 'DaisyUI', 'Framer Motion',
    'Node.js', 'Express js',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase',
    'Redux', 'Zustand', 'React Query',
    'JWT', 'REST API', 'GraphQL',
    'Cloudinary', 'imgBB', 'Stripe',
    'Vercel', 'Netlify', 'Railway',
];

const emptyForm = {
    title: '', description: '', imageURL: '',
    techStack: [],          // array now
    liveLink: '', githubLink: '',
    challenges: '', futurePlans: '',
    features: '',
    durationFrom: '', durationTo: '',
};

// Toggle a tech tag in/out of the array
const toggleTech = (tech, current) =>
    current.includes(tech)
        ? current.filter(t => t !== tech)
        : [...current, tech];

// Sortable project card
const SortableCard = ({ p, onEdit, onDelete }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: p._id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 50 : 'auto',
    };

    return (
        <div ref={setNodeRef} style={style}
            className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            {/* Drag handle */}
            <div className="relative h-44 bg-gray-800">
                {p.imageURL
                    ? <img src={p.imageURL} alt={p.title} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-gray-600"><MdImage size={40} /></div>
                }
                <div {...attributes} {...listeners}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-lg cursor-grab active:cursor-grabbing text-gray-300 transition-all"
                    title="Drag to reorder">
                    <MdDragIndicator size={18} />
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-white font-semibold truncate">{p.title}</h3>
                <p className="text-gray-400 text-xs mt-1 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                    {p.techStack.slice(0, 3).map(t => (
                        <span key={t} className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                    {p.techStack.length > 3 && <span className="text-xs text-gray-500">+{p.techStack.length - 3}</span>}
                </div>
                <div className="flex gap-2 mt-4">
                    <button onClick={() => onEdit(p)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 py-2 rounded-xl text-xs font-medium transition-all">
                        <MdEdit size={15} /> Edit
                    </button>
                    <button onClick={() => onDelete(p._id, p.title)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-2 rounded-xl text-xs font-medium transition-all">
                        <MdDelete size={15} /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const token = localStorage.getItem('admin_token');
    const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
    );

    const fetchProjects = async () => {
        const res = await fetch(`${API}/projects`);
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
    };

    useEffect(() => { fetchProjects(); }, []);

    const uploadImage = async (file) => {
        setUploading(true);
        const fd = new FormData();
        fd.append('image', file);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, { method: 'POST', body: fd });
        const data = await res.json();
        setUploading(false);
        if (!data.success) throw new Error('Image upload failed');
        return data.data.url;
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadImage(file);
            setForm(f => ({ ...f, imageURL: url }));
        } catch { setError('Image upload failed. Check your imgBB API key.'); }
    };

    // Parse stored duration string "Jan 2024 – Mar 2024" back to from/to
    const parseDuration = (dur = '') => {
        const parts = dur.split('–').map(s => s.trim());
        return { durationFrom: parts[0] || '', durationTo: parts[1] || '' };
    };

    const openAdd = () => { setForm(emptyForm); setEditId(null); setError(''); setShowModal(true); };
    const openEdit = (p) => {
        setForm({
            title: p.title,
            description: p.description,
            imageURL: p.imageURL,
            techStack: Array.isArray(p.techStack) ? p.techStack : [],
            liveLink: p.liveLink || '',
            githubLink: p.githubLink || '',
            challenges: p.challenges || '',
            futurePlans: p.futurePlans || '',
            features: (p.features || []).join(', '),
            ...parseDuration(p.duration || ''),
        });
        setEditId(p._id); setError(''); setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true); setError('');

        // Build duration string from range
        const duration = form.durationFrom
            ? `${form.durationFrom}${form.durationTo ? ' – ' + form.durationTo : ''}`
            : '';

        const payload = {
            title: form.title,
            description: form.description,
            imageURL: form.imageURL,
            techStack: form.techStack,
            liveLink: form.liveLink,
            githubLink: form.githubLink,
            challenges: form.challenges,
            futurePlans: form.futurePlans,
            features: form.features.split(',').map(f => f.trim()).filter(Boolean),
            duration,
        };

        try {
            const url = editId ? `${API}/projects/${editId}` : `${API}/projects`;
            const method = editId ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: authHeaders, body: JSON.stringify(payload) });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setShowModal(false);
            fetchProjects();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id, title) => {
        const result = await confirmDelete(title);
        if (!result.isConfirmed) return;
        await fetch(`${API}/projects/${id}`, { method: 'DELETE', headers: authHeaders });
        fetchProjects();
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = projects.findIndex(p => p._id === active.id);
        const newIndex = projects.findIndex(p => p._id === over.id);
        const reordered = arrayMove(projects, oldIndex, newIndex);

        setProjects(reordered);

        // Persist new order to backend
        await fetch(`${API}/projects/reorder`, {
            method: 'PATCH',
            headers: authHeaders,
            body: JSON.stringify(reordered.map((p, i) => ({ _id: p._id, order: i }))),
        });
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Projects</h2>
                    <p className="text-gray-400 text-sm mt-0.5">{projects.length} total</p>
                </div>
                <button onClick={openAdd}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all">
                    <MdAdd size={20} /> Add Project
                </button>
            </div>

            {/* Sortable Grid */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={projects.map(p => p._id)} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {projects.map(p => (
                            <SortableCard key={p._id} p={p} onEdit={openEdit} onDelete={handleDelete} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gray-900 border border-white/10 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h3 className="text-white font-bold text-lg">{editId ? 'Edit Project' : 'Add Project'}</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><MdClose size={22} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-xl">{error}</p>}

                            {/* Title */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Title *</label>
                                <input type="text" required value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all" />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Description *</label>
                                <textarea required rows={3} value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all resize-none" />
                            </div>

                            {/* Tech Stack — tag selector */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Tech Stack
                                    {form.techStack.length > 0 && (
                                        <span className="ml-2 text-emerald-400">({form.techStack.length} selected)</span>
                                    )}
                                </label>
                                <div className="flex flex-wrap gap-2 p-3 bg-gray-800 border border-white/10 rounded-xl max-h-40 overflow-y-auto">
                                    {TECH_OPTIONS.map(tech => (
                                        <button
                                            key={tech}
                                            type="button"
                                            onClick={() => setForm(f => ({ ...f, techStack: toggleTech(tech, f.techStack) }))}
                                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                                                form.techStack.includes(tech)
                                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                                    : 'bg-gray-700/50 text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
                                            }`}
                                        >
                                            {form.techStack.includes(tech) ? '✓ ' : ''}{tech}
                                        </button>
                                    ))}
                                </div>
                                {form.techStack.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {form.techStack.map(t => (
                                            <span key={t} className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                {t}
                                                <button type="button" onClick={() => setForm(f => ({ ...f, techStack: f.techStack.filter(x => x !== t) }))}
                                                    className="hover:text-red-400 transition-colors">×</button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Duration — date range */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Duration</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">From</label>
                                        <input type="month" value={form.durationFrom}
                                            onChange={e => setForm(f => ({ ...f, durationFrom: e.target.value }))}
                                            className="w-full bg-gray-800 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all [color-scheme:dark]" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">To (leave empty if ongoing)</label>
                                        <input type="month" value={form.durationTo}
                                            onChange={e => setForm(f => ({ ...f, durationTo: e.target.value }))}
                                            className="w-full bg-gray-800 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all [color-scheme:dark]" />
                                    </div>
                                </div>
                            </div>

                            {/* Links */}
                            {[
                                { label: 'Live Link', key: 'liveLink', placeholder: 'https://...' },
                                { label: 'GitHub Link', key: 'githubLink', placeholder: 'https://github.com/...' },
                            ].map(({ label, key, placeholder }) => (
                                <div key={key}>
                                    <label className="block text-sm text-gray-400 mb-1">{label}</label>
                                    <input type="text" value={form[key]} placeholder={placeholder}
                                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                        className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all" />
                                </div>
                            ))}

                            {/* Key Features */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Key Features <span className="text-gray-600 text-xs">(comma separated)</span></label>
                                <input type="text" value={form.features} placeholder="e.g. Real-time updates, Role-based access"
                                    onChange={e => setForm(f => ({ ...f, features: e.target.value }))}
                                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all" />
                            </div>

                            {/* Challenges */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Challenges Faced</label>
                                <textarea rows={3} value={form.challenges}
                                    placeholder="What technical challenges did you face?"
                                    onChange={e => setForm(f => ({ ...f, challenges: e.target.value }))}
                                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all resize-none" />
                            </div>

                            {/* Future Plans */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Future Plans</label>
                                <textarea rows={3} value={form.futurePlans}
                                    placeholder="What improvements are planned?"
                                    onChange={e => setForm(f => ({ ...f, futurePlans: e.target.value }))}
                                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all resize-none" />
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Project Image</label>
                                <input type="file" accept="image/*" onChange={handleImageChange}
                                    className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-500/20 file:text-emerald-400 file:text-sm file:cursor-pointer" />
                                {uploading && <p className="text-xs text-emerald-400 mt-1 animate-pulse">Uploading to imgBB...</p>}
                                {form.imageURL && <img src={form.imageURL} alt="preview" className="mt-2 h-28 w-full object-cover rounded-xl" />}
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white text-sm transition-all">Cancel</button>
                                <button type="submit" disabled={saving || uploading}
                                    className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-semibold text-sm transition-all">
                                    {saving ? 'Saving...' : editId ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProjects;
