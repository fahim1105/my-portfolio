import { useEffect, useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdClose, MdImage } from 'react-icons/md';
import { confirmDelete } from '../../utils/confirm';

const API = import.meta.env.VITE_API_URL;
const IMGBB_KEY = import.meta.env.VITE_IMGBB_API_KEY;

const emptyForm = { title: '', issuer: '', description: '', imageURL: '' };

const AdminCertificates = () => {
    const [certs, setCerts] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const token = localStorage.getItem('admin_token');
    const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    const fetchCerts = async () => {
        const res = await fetch(`${API}/certificates`);
        const data = await res.json();
        setCerts(Array.isArray(data) ? data : []);
    };

    useEffect(() => { fetchCerts(); }, []);

    const uploadImage = async (file) => {
        setUploading(true);
        const fd = new FormData();
        fd.append('image', file);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
            method: 'POST', body: fd,
        });
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
        } catch {
            setError('Image upload failed. Check your imgBB API key.');
        }
    };

    const openAdd = () => { setForm(emptyForm); setEditId(null); setError(''); setShowModal(true); };
    const openEdit = (c) => {
        setForm({ title: c.title, issuer: c.issuer, description: c.description, imageURL: c.imageURL });
        setEditId(c._id); setError(''); setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true); setError('');
        try {
            const url = editId ? `${API}/certificates/${editId}` : `${API}/certificates`;
            const method = editId ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: authHeaders, body: JSON.stringify(form) });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setShowModal(false);
            fetchCerts();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id, title) => {
        const result = await confirmDelete(title);
        if (!result.isConfirmed) return;
        await fetch(`${API}/certificates/${id}`, { method: 'DELETE', headers: authHeaders });
        fetchCerts();
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Certificates</h2>
                    <p className="text-gray-400 text-sm mt-0.5">{certs.length} total</p>
                </div>
                <button onClick={openAdd}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all">
                    <MdAdd size={20} /> Add Certificate
                </button>
            </div>

            {/* Certificate Cards — 5:4 image ratio, full visible */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certs.map(c => (
                    <div key={c._id}
                        className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 group">

                        {/* 5:4 Certificate Image — full image visible, no crop */}
                        <div className="relative w-full bg-gray-800/80"
                            style={{ aspectRatio: '5 / 4' }}>
                            {c.imageURL ? (
                                <img
                                    src={c.imageURL}
                                    alt={c.title}
                                    className="w-full h-full object-contain p-3"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-600">
                                    <MdImage size={48} />
                                    <span className="text-xs">No image</span>
                                </div>
                            )}

                            {/* Subtle top gradient overlay for depth */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/40 pointer-events-none" />
                        </div>

                        {/* Info + Actions */}
                        <div className="p-4 border-t border-white/5">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <h3 className="text-white font-semibold text-sm leading-snug truncate">{c.title}</h3>
                                    <span className="inline-block mt-1 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                                        {c.issuer}
                                    </span>
                                    {c.description && (
                                        <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">{c.description}</p>
                                    )}
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-1.5 shrink-0 mt-0.5">
                                    <button onClick={() => openEdit(c)}
                                        className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition-all"
                                        title="Edit">
                                        <MdEdit size={15} />
                                    </button>
                                    <button onClick={() => handleDelete(c._id, c.title)}
                                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all"
                                        title="Delete">
                                        <MdDelete size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gray-900 border border-white/10 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h3 className="text-white font-bold text-lg">{editId ? 'Edit Certificate' : 'Add Certificate'}</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><MdClose size={22} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-xl">{error}</p>}

                            {[
                                { label: 'Title', key: 'title', required: true },
                                { label: 'Issuer', key: 'issuer', required: true },
                            ].map(({ label, key, required }) => (
                                <div key={key}>
                                    <label className="block text-sm text-gray-400 mb-1">{label}</label>
                                    <input type="text" required={required} value={form[key]}
                                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                        className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Description</label>
                                <textarea rows={3} value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
                                />
                            </div>

                            {/* Image upload with 5:4 preview */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Certificate Image</label>
                                <input type="file" accept="image/*" onChange={handleImageChange}
                                    className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-500/20 file:text-emerald-400 file:text-sm file:cursor-pointer"
                                />
                                {uploading && <p className="text-xs text-emerald-400 mt-1 animate-pulse">Uploading to imgBB...</p>}
                                {form.imageURL && (
                                    <div className="mt-3 w-full bg-gray-800 rounded-xl overflow-hidden border border-white/10"
                                        style={{ aspectRatio: '5 / 4' }}>
                                        <img src={form.imageURL} alt="preview"
                                            className="w-full h-full object-contain p-2" />
                                    </div>
                                )}
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

export default AdminCertificates;
