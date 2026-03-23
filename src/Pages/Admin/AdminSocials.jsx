import { useEffect, useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdClose, MdLink } from 'react-icons/md';
import { confirmDelete } from '../../utils/confirm';

const API = import.meta.env.VITE_API_URL;

// Platform presets — select করলে icon ও color auto-fill হবে
const PLATFORM_PRESETS = {
    GitHub:       { icon: 'FaGithub',      color: 'hover:bg-[#333]' },
    LinkedIn:     { icon: 'FaLinkedinIn',  color: 'hover:bg-[#0077b5]' },
    Facebook:     { icon: 'FaFacebookF',   color: 'hover:bg-[#1877f2]' },
    WhatsApp:     { icon: 'FaWhatsapp',    color: 'hover:bg-[#25d366]' },
    Twitter:      { icon: 'FaTwitter',     color: 'hover:bg-[#1da1f2]' },
    Instagram:    { icon: 'FaInstagram',   color: 'hover:bg-[#e1306c]' },
    YouTube:      { icon: 'FaYoutube',     color: 'hover:bg-[#ff0000]' },
    Telegram:     { icon: 'FaTelegram',    color: 'hover:bg-[#0088cc]' },
    Discord:      { icon: 'FaDiscord',     color: 'hover:bg-[#5865f2]' },
    Dev:          { icon: 'FaDev',         color: 'hover:bg-[#0a0a0a]' },
    Medium:       { icon: 'FaMedium',      color: 'hover:bg-[#00ab6c]' },
    StackOverflow:{ icon: 'FaStackOverflow', color: 'hover:bg-[#f48024]' },
};

const emptyForm = { platform: '', icon: '', url: '', username: '', color: '' };

const AdminSocials = () => {
    const [links, setLinks] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const token = localStorage.getItem('admin_token');
    const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    const fetchLinks = async () => {
        const res = await fetch(`${API}/socials`);
        const data = await res.json();
        setLinks(Array.isArray(data) ? data : []);
    };

    useEffect(() => { fetchLinks(); }, []);

    // Platform dropdown change হলে icon ও color auto-set
    const handlePlatformChange = (platform) => {
        const preset = PLATFORM_PRESETS[platform] || { icon: 'FaLink', color: '' };
        setForm(f => ({ ...f, platform, icon: preset.icon, color: preset.color }));
    };

    const openAdd = () => { setForm(emptyForm); setEditId(null); setError(''); setShowModal(true); };
    const openEdit = (l) => {
        setForm({ platform: l.platform, icon: l.icon, url: l.url, username: l.username || '', color: l.color || '' });
        setEditId(l._id); setError(''); setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true); setError('');
        try {
            const url = editId ? `${API}/socials/${editId}` : `${API}/socials`;
            const method = editId ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: authHeaders, body: JSON.stringify(form) });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setShowModal(false);
            fetchLinks();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id, platform) => {
        const result = await confirmDelete(platform);
        if (!result.isConfirmed) return;
        await fetch(`${API}/socials/${id}`, { method: 'DELETE', headers: authHeaders });
        fetchLinks();
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Social Links</h2>
                    <p className="text-gray-400 text-sm mt-0.5">{links.length} platforms</p>
                </div>
                <button onClick={openAdd}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all">
                    <MdAdd size={20} /> Add Link
                </button>
            </div>

            {/* List */}
            <div className="space-y-3">
                {links.map(l => (
                    <div key={l._id} className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center shrink-0">
                            <MdLink size={20} className="text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-white font-semibold">{l.platform}</span>
                                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{l.icon}</span>
                            </div>
                            <p className="text-gray-400 text-xs mt-0.5 truncate">{l.url}</p>
                            {l.username && <p className="text-gray-500 text-xs">{l.username}</p>}
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <button onClick={() => openEdit(l)} className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-all"><MdEdit size={16} /></button>
                            <button onClick={() => handleDelete(l._id, l.platform)} className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"><MdDelete size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gray-900 border border-white/10 rounded-3xl w-full max-w-md">
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h3 className="text-white font-bold text-lg">{editId ? 'Edit Link' : 'Add Social Link'}</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><MdClose size={22} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-xl">{error}</p>}

                            {/* Platform Dropdown */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Platform</label>
                                <select
                                    required
                                    value={form.platform}
                                    onChange={e => handlePlatformChange(e.target.value)}
                                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                                >
                                    <option value="">— Select Platform —</option>
                                    {Object.keys(PLATFORM_PRESETS).map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Auto-filled read-only fields */}
                            {form.platform && (
                                <div className="flex gap-3 p-3 bg-gray-800/50 rounded-xl border border-white/5 text-xs text-gray-400">
                                    <span>Icon: <span className="text-emerald-400">{form.icon}</span></span>
                                    <span>·</span>
                                    <span>Color: <span className="text-emerald-400">{form.color || 'none'}</span></span>
                                </div>
                            )}

                            {/* URL */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">URL</label>
                                <input
                                    type="text" required value={form.url}
                                    onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                                    placeholder="https://..."
                                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                                />
                            </div>

                            {/* Username */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Username / Handle</label>
                                <input
                                    type="text" value={form.username}
                                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                                    placeholder="@yourhandle"
                                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white text-sm transition-all">Cancel</button>
                                <button type="submit" disabled={saving}
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

export default AdminSocials;
