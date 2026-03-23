import { useEffect, useState } from 'react';
import { MdSave, MdLanguage } from 'react-icons/md';

const API = import.meta.env.VITE_API_URL;

const PAGES = [
    { slug: 'home', label: 'Home' },
    { slug: 'projects', label: 'Projects' },
    { slug: 'project-details', label: 'Project Details' },
    { slug: 'education', label: 'Education & Certificates' },
    { slug: 'social', label: 'Social Links' },
    { slug: 'contact', label: 'Contact' },
];

const AdminSeo = () => {
    const [seoData, setSeoData] = useState({});
    const [activePage, setActivePage] = useState('home');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const token = localStorage.getItem('admin_token');
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    useEffect(() => {
        fetch(`${API}/seo`)
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const map = {};
                    data.forEach(d => { map[d.page] = d; });
                    setSeoData(map);
                }
            });
    }, []);

    const current = seoData[activePage] || { title: '', description: '', ogImage: '' };

    const update = (field, val) => {
        setSeoData(prev => ({
            ...prev,
            [activePage]: { ...current, [field]: val },
        }));
    };

    const save = async () => {
        setSaving(true);
        await fetch(`${API}/seo/${activePage}`, {
            method: 'PUT', headers,
            body: JSON.stringify(current),
        });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const inputCls = "w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all";

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">SEO Settings</h2>
                    <p className="text-gray-400 text-sm mt-0.5">Meta title, description & OG image per page</p>
                </div>
                <button onClick={save} disabled={saving}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                    <MdSave size={18} />
                    {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save'}
                </button>
            </div>

            {/* Page tabs */}
            <div className="flex flex-wrap gap-2">
                {PAGES.map(p => (
                    <button key={p.slug} onClick={() => setActivePage(p.slug)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border
                            ${activePage === p.slug
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                : 'text-gray-400 border-white/10 hover:text-white hover:border-white/20'}`}>
                        {p.label}
                    </button>
                ))}
            </div>

            {/* Fields */}
            <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-2 mb-2">
                    <MdLanguage className="text-emerald-400" size={20} />
                    <span className="text-white font-semibold">
                        {PAGES.find(p => p.slug === activePage)?.label}
                    </span>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Meta Title</label>
                    <input value={current.title} onChange={e => update('title', e.target.value)}
                        placeholder="Page title shown in browser tab & search results"
                        className={inputCls} />
                    <p className="text-xs text-gray-600 mt-1">{current.title?.length || 0} / 60 chars recommended</p>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Meta Description</label>
                    <textarea rows={3} value={current.description} onChange={e => update('description', e.target.value)}
                        placeholder="Short description shown in search engine results"
                        className={`${inputCls} resize-none`} />
                    <p className="text-xs text-gray-600 mt-1">{current.description?.length || 0} / 160 chars recommended</p>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">OG Image URL</label>
                    <input value={current.ogImage} onChange={e => update('ogImage', e.target.value)}
                        placeholder="https://i.ibb.co/... (shown when shared on social media)"
                        className={inputCls} />
                    {current.ogImage && (
                        <img src={current.ogImage} alt="OG preview"
                            className="mt-3 rounded-xl border border-white/10 w-full max-h-40 object-cover" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSeo;
