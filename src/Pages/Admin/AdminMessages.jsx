import { useEffect, useState } from 'react';
import { MdDelete, MdMarkEmailRead, MdMarkEmailUnread, MdInbox } from 'react-icons/md';
import { confirmDelete } from '../../utils/confirm';

const API = import.meta.env.VITE_API_URL;

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);

    const token = localStorage.getItem('admin_token');
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    const fetchMessages = () => {
        setLoading(true);
        fetch(`${API}/messages`, { headers })
            .then(r => r.json())
            .then(data => { setMessages(Array.isArray(data) ? data : []); setLoading(false); })
            .catch(() => setLoading(false));
    };

    useEffect(() => { fetchMessages(); }, []);

    const toggleRead = async (msg) => {
        await fetch(`${API}/messages/${msg._id}/read`, {
            method: 'PATCH', headers,
            body: JSON.stringify({ read: !msg.read }),
        });
        fetchMessages();
        if (selected?._id === msg._id) setSelected(prev => ({ ...prev, read: !prev.read }));
    };

    const handleDelete = async (id) => {
        const ok = await confirmDelete('Delete this message?');
        if (!ok) return;
        await fetch(`${API}/messages/${id}`, { method: 'DELETE', headers });
        setMessages(prev => prev.filter(m => m._id !== id));
        if (selected?._id === id) setSelected(null);
    };

    const unreadCount = messages.filter(m => !m.read).length;

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Messages</h2>
                    <p className="text-gray-400 text-sm mt-0.5">
                        {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2">
                    <MdInbox className="text-emerald-400" size={18} />
                    <span className="text-emerald-400 font-semibold text-sm">{messages.length} total</span>
                </div>
            </div>

            {loading ? (
                <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-20 bg-gray-800/50 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : messages.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <MdInbox size={48} className="mx-auto mb-3 opacity-30" />
                    <p>No messages yet</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Message list */}
                    <div className="space-y-2">
                        {messages.map(msg => (
                            <div key={msg._id}
                                onClick={() => { setSelected(msg); if (!msg.read) toggleRead(msg); }}
                                className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200
                                    ${selected?._id === msg._id
                                        ? 'border-emerald-500/40 bg-emerald-500/10'
                                        : 'border-white/10 bg-gray-900/60 hover:border-white/20'}
                                    ${!msg.read ? 'border-l-4 border-l-emerald-500' : ''}`}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className={`text-sm font-semibold truncate ${!msg.read ? 'text-white' : 'text-gray-300'}`}>
                                            {msg.name}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">{msg.email}</p>
                                        <p className={`text-sm mt-1 truncate ${!msg.read ? 'text-gray-200' : 'text-gray-400'}`}>
                                            {msg.title}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                        <span className="text-xs text-gray-500">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </span>
                                        {!msg.read && (
                                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message detail */}
                    <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6 h-fit sticky top-6">
                        {selected ? (
                            <div className="space-y-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="text-white font-bold text-lg">{selected.title}</h3>
                                        <p className="text-gray-400 text-sm">{selected.name} &bull; {selected.email}</p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            {new Date(selected.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => toggleRead(selected)}
                                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                                            title={selected.read ? 'Mark unread' : 'Mark read'}>
                                            {selected.read ? <MdMarkEmailUnread size={18} /> : <MdMarkEmailRead size={18} />}
                                        </button>
                                        <button onClick={() => handleDelete(selected._id)}
                                            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all">
                                            <MdDelete size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="border-t border-white/10 pt-4">
                                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                                </div>
                                <a href={`mailto:${selected.email}`}
                                    className="inline-flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-sm font-medium transition-all">
                                    Reply via Email
                                </a>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <MdInbox size={36} className="mx-auto mb-2 opacity-30" />
                                <p className="text-sm">Select a message to read</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminMessages;
