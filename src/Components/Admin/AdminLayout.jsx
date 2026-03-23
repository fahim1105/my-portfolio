import { NavLink, Outlet, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import {
    MdDashboard, MdWork, MdSchool, MdShare, MdLogout, MdMenu, MdClose, MdWorkspacePremium, MdPerson, MdInbox, MdLanguage, MdLock
} from 'react-icons/md';

const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: <MdDashboard size={20} /> },
    { to: '/admin/profile', label: 'Profile', icon: <MdPerson size={20} /> },
    { to: '/admin/projects', label: 'Projects', icon: <MdWork size={20} /> },
    { to: '/admin/education', label: 'Education', icon: <MdSchool size={20} /> },
    { to: '/admin/certificates', label: 'Certificates', icon: <MdWorkspacePremium size={20} /> },
    { to: '/admin/socials', label: 'Social Links', icon: <MdShare size={20} /> },
    { to: '/admin/messages', label: 'Messages', icon: <MdInbox size={20} /> },
    { to: '/admin/seo', label: 'SEO Settings', icon: <MdLanguage size={20} /> },
    { to: '/admin/change-password', label: 'Change Password', icon: <MdLock size={20} /> },
];

const AdminLayout = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const token = localStorage.getItem('admin_token');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/messages`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) setUnreadCount(data.filter(m => !m.read).length);
            })
            .catch(() => { });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900/80 backdrop-blur-xl border-r border-white/10 flex flex-col transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold text-emerald-400 tracking-wide">⚡ Admin Panel</h1>
                    <p className="text-xs text-gray-400 mt-1">Portfolio Manager</p>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                                ${isActive
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`
                            }
                        >
                            {icon}
                            {label}
                            {label === 'Messages' && unreadCount > 0 && (
                                <span className="ml-auto bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-200"
                    >
                        <MdLogout size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="h-16 bg-gray-900/60 backdrop-blur-xl border-b border-white/10 flex items-center px-6 gap-4 sticky top-0 z-10">
                    <button
                        className="lg:hidden text-gray-400 hover:text-white"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <MdMenu size={24} />
                    </button>
                    <span className="text-sm text-gray-400">Welcome back, <span className="text-emerald-400 font-semibold">Admin</span></span>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
