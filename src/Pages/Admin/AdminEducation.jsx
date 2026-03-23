import { useEffect, useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdClose, MdSchool } from 'react-icons/md';
import { confirmDelete } from '../../utils/confirm';

const API = import.meta.env.VITE_API_URL;

const emptyForm = { institution: '', degree: '', duration: '', result: '', logo: '', status: 'Completed' };

const AdminEducation = () => {
    const [records, setRecords] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const token = localStorage.getItem('admin_token');
    const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    const fetchRecords = async () => {
        const res = await fetch(`${API}/education`);
        const data = await res.json();
        setRecords(Array.isArray(data) ? data : []);
    };

    useEffect(() => { fetchRecords(); }, []);

    const openAdd = () => { setForm(emptyForm); setEditId(null); setError(''); setShowModal(true); };
    const openEdit = (r) => {
        setForm({ institution: r.institution, degree: r.degree, duration: r.duration, result: r.result || '', logo: r.logo || '', status: r.status });
        setEditId(r._id); setError(''); setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true); setError('');
        try {
            const url = editId ? `${API}/education/${editId}` : `${API}/education`;
            const method = editId ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: authHeaders, body: JSON.stringify(form) });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setShowModal(false);
            fetchRecords();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id, institution) => {
        const result = await confirmDelete(institution);
        if (!result.isConfirmed) return;
        await fetch(`${API}/education/${id}`, { method: 'DELETE', headers: authHeaders });
        fetchRecords();
    };

    const field = (label, key, required = false, type = 'text') => (
        <div key={key}>
            <label className="block text-sm text-gray-400 mb-1">{label}</label>
            <input
                type={type} required={required} value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
            />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Education</h2>
                    <p className="text-gray-400 text-sm mt-0.5">{records.length} records</p>
                </div>
                <button onClick={openAdd}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all">
                    <MdAdd size={20} /> Add Record
                </button>
            </div>

            <div className="space-y-3">
                {records.map(r => (
                    <div key={r._id} className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex items-start gap-4">
                        {r.logo
                            ? <img src={r.logo} alt={r.institution} className="w-12 h-12 rounded-xl object-contain bg-white/5 p-1 shrink-0" />
                            : <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center shrink-0"><MdSchool size={22} className="text-blue-400" /></div>
                        }
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-white font-semibold">{r.institution}</h3>
                                <span className={`text-xs px-2 py-0.5 rounded-full border ${r.status === 'Ongoing' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                                    {r.status}
                                </span>
                            </div>
                            <p className="text-gray-300 text-sm mt-0.5">{r.degree}</p>
                            <p className="text-gray-500 text-xs mt-0.5">{r.duration}{r.result ? ` · ${r.result}` : ''}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <button onClick={() => openEdit(r)} className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-all"><MdEdit size={16} /></button>
                            <button onClick={() => handleDelete(r._id, r.institution)} className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"><MdDelete size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gray-900 border border-white/10 rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h3 className="text-white font-bold text-lg">{editId ? 'Edit Record' : 'Add Education'}</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><MdClose size={22} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-xl">{error}</p>}
                            {field('Institution', 'institution', true)}
                            {field('Degree / Certificate', 'degree', true)}
                            {field('Duration (e.g. 2022 - 2024)', 'duration', true)}
                            {field('Result / GPA', 'result')}
                            {field('Logo URL', 'logo')}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Status</label>
                                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                                    className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all">
                                    <option value="Completed">Completed</option>
                                    <option value="Ongoing">Ongoing</option>
                                </select>
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

export default AdminEducation;
