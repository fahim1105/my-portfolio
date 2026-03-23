import { useEffect, useState } from 'react';
import { MdAdd, MdDelete, MdSave, MdPerson, MdBuild, MdMiscellaneousServices, MdWeb, MdOutlineAppSettingsAlt, MdOutlineBuildCircle, MdCode, MdDesignServices, MdStorage, MdPictureAsPdf, MdOpenInNew } from 'react-icons/md';

const API = import.meta.env.VITE_API_URL;

const SERVICE_ICONS = [
    { key: 'MdWeb',                    label: 'Web Developer',         icon: <MdWeb /> },
    { key: 'MdOutlineAppSettingsAlt',  label: 'App Developer',         icon: <MdOutlineAppSettingsAlt /> },
    { key: 'MdOutlineBuildCircle',     label: 'DevOps Engineer',       icon: <MdOutlineBuildCircle /> },
    { key: 'MdCode',                   label: 'Software Engineer',     icon: <MdCode /> },
    { key: 'MdDesignServices',         label: 'UI/UX Designer',        icon: <MdDesignServices /> },
    { key: 'MdStorage',                label: 'Backend / DB Engineer', icon: <MdStorage /> },
];

const defaultProfile = {
    name: '', tagline: '', bio: '', location: '', languages: '', focus: '',
    skillCategories: [],
    services: [],
    cvUrl: '',
};

const AdminProfile = () => {
    const [profile, setProfile] = useState(defaultProfile);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState('about');

    const token = localStorage.getItem('admin_token');
    const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    useEffect(() => {
        fetch(`${API}/profile`)
            .then(r => r.json())
            .then(data => { if (data._id) setProfile(data); })
            .catch(() => { });
    }, []);

    const save = async () => {
        setSaving(true);
        await fetch(`${API}/profile`, { method: 'PUT', headers: authHeaders, body: JSON.stringify(profile) });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };



    // ── Skill helpers ──
    const addCategory = () =>
        setProfile(p => ({ ...p, skillCategories: [...p.skillCategories, { title: '', skills: [] }] }));

    const removeCategory = (ci) =>
        setProfile(p => ({ ...p, skillCategories: p.skillCategories.filter((_, i) => i !== ci) }));

    const updateCategory = (ci, val) =>
        setProfile(p => {
            const cats = [...p.skillCategories];
            cats[ci] = { ...cats[ci], title: val };
            return { ...p, skillCategories: cats };
        });

    const addSkill = (ci) =>
        setProfile(p => {
            const cats = [...p.skillCategories];
            cats[ci] = { ...cats[ci], skills: [...cats[ci].skills, { name: '', percentage: 80 }] };
            return { ...p, skillCategories: cats };
        });

    const removeSkill = (ci, si) =>
        setProfile(p => {
            const cats = [...p.skillCategories];
            cats[ci] = { ...cats[ci], skills: cats[ci].skills.filter((_, i) => i !== si) };
            return { ...p, skillCategories: cats };
        });

    const updateSkill = (ci, si, field, val) =>
        setProfile(p => {
            const cats = [...p.skillCategories];
            const skills = [...cats[ci].skills];
            skills[si] = { ...skills[si], [field]: field === 'percentage' ? Number(val) : val };
            cats[ci] = { ...cats[ci], skills };
            return { ...p, skillCategories: cats };
        });

    // ── Service helpers ──
    const addService = () =>
        setProfile(p => ({ ...p, services: [...p.services, { title: '', desc: '', icon: 'MdWeb' }] }));

    const removeService = (i) =>
        setProfile(p => ({ ...p, services: p.services.filter((_, idx) => idx !== i) }));

    const updateService = (i, field, val) =>
        setProfile(p => {
            const services = [...p.services];
            services[i] = { ...services[i], [field]: val };
            return { ...p, services };
        });

    const inputCls = "w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all";
    const labelCls = "block text-sm text-gray-400 mb-1";

    const tabs = [
        { id: 'about', label: 'About Me', icon: <MdPerson size={16} /> },
        { id: 'skills', label: 'Skills', icon: <MdBuild size={16} /> },
        { id: 'services', label: 'Services', icon: <MdMiscellaneousServices size={16} /> },
        { id: 'cv', label: 'CV / Resume', icon: <MdPictureAsPdf size={16} /> },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Profile</h2>
                    <p className="text-gray-400 text-sm mt-0.5">About Me, Skills & Services</p>
                </div>
                <button onClick={save} disabled={saving}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                    <MdSave size={18} />
                    {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Changes'}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-gray-900/60 border border-white/10 rounded-2xl p-1.5">
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === t.id
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'text-gray-400 hover:text-white'}`}>
                        {t.icon} {t.label}
                    </button>
                ))}
            </div>

            {/* ── ABOUT ME ── */}
            {activeTab === 'about' && (
                <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>Full Name</label>
                            <input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                                placeholder="Asif Al Fattha Fahim" className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Tagline</label>
                            <input value={profile.tagline} onChange={e => setProfile(p => ({ ...p, tagline: e.target.value }))}
                                placeholder="MERN Stack Developer" className={inputCls} />
                        </div>
                    </div>
                    <div>
                        <label className={labelCls}>Bio</label>
                        <textarea rows={5} value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                            placeholder="Write about yourself..."
                            className={`${inputCls} resize-none`} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { label: 'Location', key: 'location', placeholder: 'Dhaka, Bangladesh' },
                            { label: 'Languages', key: 'languages', placeholder: 'Bangla, English' },
                            { label: 'Focus', key: 'focus', placeholder: 'Full-Stack Development' },
                        ].map(({ label, key, placeholder }) => (
                            <div key={key}>
                                <label className={labelCls}>{label}</label>
                                <input value={profile[key]} placeholder={placeholder}
                                    onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))}
                                    className={inputCls} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── SKILLS ── */}
            {activeTab === 'skills' && (
                <div className="space-y-4">
                    {profile.skillCategories.map((cat, ci) => (
                        <div key={ci} className="bg-gray-900/60 border border-white/10 rounded-2xl p-5 space-y-4">
                            <div className="flex items-center gap-3">
                                <input value={cat.title} placeholder="Category (e.g. Frontend)"
                                    onChange={e => updateCategory(ci, e.target.value)}
                                    className="flex-1 bg-gray-800 border border-white/10 rounded-xl px-4 py-2 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500/50 transition-all" />
                                <button onClick={() => removeCategory(ci)}
                                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all">
                                    <MdDelete size={16} />
                                </button>
                            </div>

                            {/* Skills list */}
                            <div className="space-y-3">
                                {cat.skills.map((skill, si) => (
                                    <div key={si} className="flex items-center gap-3">
                                        <input value={skill.name} placeholder="Skill name"
                                            onChange={e => updateSkill(ci, si, 'name', e.target.value)}
                                            className="flex-1 bg-gray-800 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all" />
                                        <div className="flex items-center gap-2 shrink-0">
                                            <input type="range" min="0" max="100" value={skill.percentage}
                                                onChange={e => updateSkill(ci, si, 'percentage', e.target.value)}
                                                className="w-24 accent-emerald-500" />
                                            <span className="text-emerald-400 text-xs font-bold w-8 text-right">{skill.percentage}%</span>
                                        </div>
                                        <button onClick={() => removeSkill(ci, si)}
                                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all">
                                            <MdDelete size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button onClick={() => addSkill(ci)}
                                className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                                <MdAdd size={16} /> Add Skill
                            </button>
                        </div>
                    ))}

                    <button onClick={addCategory}
                        className="w-full py-3 border border-dashed border-white/20 hover:border-emerald-500/40 text-gray-400 hover:text-emerald-400 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all">
                        <MdAdd size={18} /> Add Category
                    </button>
                </div>
            )}

            {/* ── SERVICES ── */}
            {activeTab === 'services' && (
                <div className="space-y-4">
                    {profile.services.map((svc, i) => (
                        <div key={i} className="bg-gray-900/60 border border-white/10 rounded-2xl p-5 space-y-3">
                            <div className="flex items-center gap-3">
                                <input value={svc.title} placeholder="Service title"
                                    onChange={e => updateService(i, 'title', e.target.value)}
                                    className="flex-1 bg-gray-800 border border-white/10 rounded-xl px-4 py-2 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500/50 transition-all" />
                                <div className="flex items-center gap-2 bg-gray-800 border border-white/10 rounded-xl px-3 py-2">
                                    <span className="text-emerald-400 text-xl">
                                        {SERVICE_ICONS.find(ic => ic.key === svc.icon)?.icon || <MdWeb />}
                                    </span>
                                    <select value={svc.icon} onChange={e => updateService(i, 'icon', e.target.value)}
                                        className="bg-transparent text-white text-sm focus:outline-none flex-1">
                                        {SERVICE_ICONS.map(ic => (
                                            <option key={ic.key} value={ic.key}>{ic.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <button onClick={() => removeService(i)}
                                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all">
                                    <MdDelete size={16} />
                                </button>
                            </div>
                            <textarea rows={2} value={svc.desc} placeholder="Service description"
                                onChange={e => updateService(i, 'desc', e.target.value)}
                                className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all resize-none" />
                        </div>
                    ))}

                    <button onClick={addService}
                        className="w-full py-3 border border-dashed border-white/20 hover:border-emerald-500/40 text-gray-400 hover:text-emerald-400 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all">
                        <MdAdd size={18} /> Add Service
                    </button>
                </div>
            )}

            {/* ── CV / RESUME ── */}
            {activeTab === 'cv' && (
                <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6 space-y-5">
                    <div>
                        <p className="text-white font-semibold mb-1">CV / Resume Link</p>
                        <p className="text-gray-400 text-sm mb-4">
                            Upload your PDF to Google Drive or Dropbox, make it publicly accessible, then paste the direct download link below.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Direct Download URL</label>
                        <input
                            value={profile.cvUrl}
                            onChange={e => setProfile(p => ({ ...p, cvUrl: e.target.value }))}
                            placeholder="https://drive.google.com/uc?export=download&id=..."
                            className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                        />
                    </div>

                    {profile.cvUrl && (
                        <div className="flex items-center gap-3 bg-gray-800/60 border border-white/10 rounded-xl px-4 py-3">
                            <MdPictureAsPdf size={22} className="text-red-400 shrink-0" />
                            <span className="text-sm text-gray-300 truncate flex-1">{profile.cvUrl}</span>
                            <a href={profile.cvUrl} target="_blank" rel="noreferrer"
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                                title="Test link">
                                <MdOpenInNew size={16} />
                            </a>
                        </div>
                    )}

                    <div className="bg-gray-800/40 rounded-xl p-4 space-y-2 text-xs text-gray-500">
                        <p className="text-gray-400 font-semibold text-sm">Google Drive steps:</p>
                        <p>1. Upload PDF → Right click → "Share" → "Anyone with the link"</p>
                        <p>2. Copy the file ID from the share URL</p>
                        <p>3. Use: <code className="text-emerald-400">https://drive.google.com/uc?export=download&id=FILE_ID</code></p>
                    </div>

                    <p className="text-xs text-gray-600">After pasting the link, click "Save Changes" to persist.</p>
                </div>
            )}
        </div>
    );
};

export default AdminProfile;
