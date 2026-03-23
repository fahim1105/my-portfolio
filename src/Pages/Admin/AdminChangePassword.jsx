import { useState } from 'react';
import { MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';

const API = import.meta.env.VITE_API_URL;

// Defined outside to prevent focus loss on re-render
const PasswordField = ({ label, name, value, onChange, placeholder, show, onToggle }) => (
    <div>
        <label className="block text-sm text-gray-400 mb-2">{label}</label>
        <div className="relative">
            <input
                type={show ? 'text' : 'password'}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
            <button type="button" onClick={onToggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {show ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
            </button>
        </div>
    </div>
);

const AdminChangePassword = () => {
    const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [show, setShow] = useState({ currentPassword: false, newPassword: false, confirmPassword: false });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const token = localStorage.getItem('admin_token');
    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    const toggleShow = (field) => setShow(s => ({ ...s, [field]: !s[field] }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (form.newPassword !== form.confirmPassword) return setError('New passwords do not match');
        if (form.newPassword.length < 6) return setError('New password must be at least 6 characters');
        setLoading(true);
        try {
            const res = await fetch(`${API}/auth/change-password`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword }),
            });
            const data = await res.json();
            if (!res.ok) return setError(data.message || 'Failed to update password');
            setSuccess('Password updated successfully');
            setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch {
            setError('Server error. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white">Change Password</h2>
                <p className="text-gray-400 text-sm mt-1">Update your admin login password.</p>
            </div>
            <form onSubmit={handleSubmit} className="bg-gray-900/60 border border-white/10 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/15 mx-auto mb-2">
                    <MdLock size={28} className="text-emerald-400" />
                </div>
                <PasswordField label="Current Password" name="currentPassword" value={form.currentPassword}
                    onChange={handleChange} placeholder="Enter current password"
                    show={show.currentPassword} onToggle={() => toggleShow('currentPassword')} />
                <PasswordField label="New Password" name="newPassword" value={form.newPassword}
                    onChange={handleChange} placeholder="Min 6 characters"
                    show={show.newPassword} onToggle={() => toggleShow('newPassword')} />
                <PasswordField label="Confirm New Password" name="confirmPassword" value={form.confirmPassword}
                    onChange={handleChange} placeholder="Repeat new password"
                    show={show.confirmPassword} onToggle={() => toggleShow('confirmPassword')} />
                {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}
                {success && <p className="text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">{success}</p>}
                <button type="submit" disabled={loading}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">
                    {loading ? 'Updating...' : 'Update Password'}
                </button>
            </form>
        </div>
    );
};

export default AdminChangePassword;
