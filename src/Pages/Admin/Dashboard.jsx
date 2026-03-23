import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
    MdWork, MdSchool, MdShare, MdArrowForward, MdWorkspacePremium,
    MdVisibility, MdOutlineToday, MdBarChart
} from 'react-icons/md';
import {
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';

const API = import.meta.env.VITE_API_URL;

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'];

const StatCard = ({ icon, label, count, to, color }) => (
    <Link to={to}
        className="group bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center gap-5 hover:border-white/20 transition-all duration-200">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>{icon}</div>
        <div className="flex-1">
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-3xl font-bold text-white mt-0.5">{count ?? '—'}</p>
        </div>
        <MdArrowForward className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
    </Link>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-900 border border-white/10 rounded-xl px-4 py-2 text-sm shadow-xl">
                <p className="text-gray-400 mb-1">{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color }} className="font-bold">{p.value} views</p>
                ))}
            </div>
        );
    }
    return null;
};

const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-900 border border-white/10 rounded-xl px-4 py-2 text-sm shadow-xl">
                <p className="text-white font-bold">{payload[0].name}</p>
                <p style={{ color: payload[0].payload.fill }} className="font-bold">{payload[0].value} views</p>
            </div>
        );
    }
    return null;
};

const DEVICE_COLORS = { Mobile: '#10b981', Desktop: '#3b82f6', Tablet: '#f59e0b' };

const DeviceTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-900 border border-white/10 rounded-xl px-4 py-2 text-sm shadow-xl">
                <p className="text-white font-bold">{payload[0].name}</p>
                <p style={{ color: payload[0].payload.fill }} className="font-bold">{payload[0].value} visits</p>
            </div>
        );
    }
    return null;
};

const Dashboard = () => {
    const [counts, setCounts] = useState({ projects: null, education: null, socials: null, certificates: null });
    const [analytics, setAnalytics] = useState(null);
    const [analyticsLoading, setAnalyticsLoading] = useState(true);

    const token = localStorage.getItem('admin_token');
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        Promise.all([
            fetch(`${API}/projects`, { headers }).then(r => r.json()),
            fetch(`${API}/education`, { headers }).then(r => r.json()),
            fetch(`${API}/socials`, { headers }).then(r => r.json()),
            fetch(`${API}/certificates`, { headers }).then(r => r.json()),
        ]).then(([p, e, s, c]) => {
            setCounts({
                projects: Array.isArray(p) ? p.length : 0,
                education: Array.isArray(e) ? e.length : 0,
                socials: Array.isArray(s) ? s.length : 0,
                certificates: Array.isArray(c) ? c.length : 0,
            });
        }).catch(() => { });

        fetch(`${API}/analytics/stats`, { headers })
            .then(r => r.json())
            .then(data => setAnalytics(data))
            .catch(() => { })
            .finally(() => setAnalyticsLoading(false));
    }, []);

    const pageLabel = (p) => {
        if (p.startsWith('Project: ')) return p;
        const map = {
            '/': 'Home', '/projects': 'Projects', '/contact': 'Contact',
            '/social': 'Social', '/edu-certificates': 'Education',
        };
        return map[p] || p;
    };

    // Pie chart data from topPages
    const pieData = analytics?.topPages?.map((p, i) => ({
        name: pageLabel(p._id),
        value: p.count,
        fill: COLORS[i % COLORS.length],
    })) || [];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
                <p className="text-gray-400 text-sm mt-1">Manage your portfolio content from here.</p>
            </div>

            {/* Content stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={<MdWork size={26} className="text-emerald-400" />} label="Total Projects" count={counts.projects} to="/admin/projects" color="bg-emerald-500/15" />
                <StatCard icon={<MdSchool size={26} className="text-blue-400" />} label="Education Records" count={counts.education} to="/admin/education" color="bg-blue-500/15" />
                <StatCard icon={<MdWorkspacePremium size={26} className="text-yellow-400" />} label="Certificates" count={counts.certificates} to="/admin/certificates" color="bg-yellow-500/15" />
                <StatCard icon={<MdShare size={26} className="text-purple-400" />} label="Social Links" count={counts.socials} to="/admin/socials" color="bg-purple-500/15" />
            </div>

            {/* Analytics loading skeletons */}
            {analyticsLoading ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-gray-900/60 rounded-2xl animate-pulse" />)}
                    </div>
                    <div className="h-64 bg-gray-900/60 rounded-2xl animate-pulse" />
                </div>
            ) : analytics && (
                <>
                    {/* Analytics summary cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
                                <MdVisibility size={24} className="text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total Views</p>
                                <p className="text-3xl font-bold text-white">{analytics.total.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 flex items-center justify-center">
                                <MdOutlineToday size={24} className="text-blue-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Today</p>
                                <p className="text-3xl font-bold text-white">{analytics.todayCount.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-orange-500/15 flex items-center justify-center">
                                <MdBarChart size={24} className="text-orange-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">This Week</p>
                                <p className="text-3xl font-bold text-white">
                                    {analytics.daily.reduce((s, d) => s + d.views, 0).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Area chart — last 7 days */}
                    <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-white font-semibold mb-6">Views Trend — Last 7 Days</h3>
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={analytics.daily}>
                                <defs>
                                    <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                                <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="views" stroke="#10b981" strokeWidth={2.5} fill="url(#viewsGrad)" dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Device type + Pie chart side by side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Device type donut */}
                        <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-white font-semibold mb-1">Device Breakdown</h3>
                            <p className="text-gray-500 text-xs mb-4">Mobile vs Desktop vs Tablet</p>
                            {analytics.devices?.every(d => d.value === 0) ? (
                                <div className="flex items-center justify-center h-48 text-gray-500 text-sm">No data yet</div>
                            ) : (
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie data={analytics.devices} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
                                            paddingAngle={3} dataKey="value">
                                            {analytics.devices?.map((entry, i) => (
                                                <Cell key={i} fill={DEVICE_COLORS[entry.name] || '#6b7280'} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<DeviceTooltip />} />
                                        <Legend
                                            formatter={(value, entry) => (
                                                <span style={{ color: DEVICE_COLORS[value] || '#9ca3af', fontSize: 12 }}>
                                                    {value} ({entry.payload.value})
                                                </span>
                                            )}
                                            iconSize={8}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </div>

                        {/* Pie chart — page distribution */}
                        <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-white font-semibold mb-4">Page Distribution</h3>
                            {pieData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                                            paddingAngle={3} dataKey="value">
                                            {pieData.map((entry, i) => (
                                                <Cell key={i} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<PieTooltip />} />
                                        <Legend
                                            formatter={(value) => <span style={{ color: '#9ca3af', fontSize: 11 }}>{value}</span>}
                                            iconSize={8}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-48 text-gray-500 text-sm">No data yet</div>
                            )}
                        </div>
                    </div>

                    {/* Top pages full width */}
                    <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-white font-semibold mb-5">Top Pages</h3>
                        <div className="space-y-4">
                            {analytics.topPages.length === 0 ? (
                                <p className="text-gray-500 text-sm">No data yet</p>
                            ) : analytics.topPages.map((p, i) => {
                                const pct = analytics.total > 0 ? Math.round((p.count / analytics.total) * 100) : 0;
                                return (
                                    <div key={i} className="flex items-center gap-4">
                                        <span className="text-xs font-bold text-gray-500 w-4">{i + 1}</span>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-sm text-gray-300 truncate max-w-[70%]">{pageLabel(p._id)}</span>
                                                <span className="text-xs font-bold" style={{ color: COLORS[i % COLORS.length] }}>
                                                    {p.count} views · {pct}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-800 rounded-full h-2">
                                                <div className="h-2 rounded-full transition-all duration-700"
                                                    style={{ width: `${pct}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}


        </div>
    );
};

export default Dashboard;
