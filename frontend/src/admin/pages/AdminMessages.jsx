import { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () =>
    api.get('/api/messages')
      .then(r => setMessages(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await api.patch(`/api/messages/${id}/read`);
    setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await api.delete(`/api/messages/${id}`);
    setMessages(prev => prev.filter(m => m._id !== id));
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <div>
      <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">Inbox</p>
      <div className="flex items-center gap-3 mb-10">
        <h1 className="admin-page-title mb-0">Messages</h1>
        {unread > 0 && (
          <span className="font-mono text-xs bg-accent text-surface px-2 py-0.5">{unread} new</span>
        )}
      </div>

      {loading ? (
        <p className="text-text-muted text-sm">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-text-muted text-sm border-t border-border pt-8">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map(m => (
            <div key={m._id} className={`border p-5 ${m.read ? 'border-border' : 'border-accent/40 bg-accent/5'}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-text-primary text-sm">{m.name}</p>
                    {!m.read && <span className="font-mono text-xs text-accent">unread</span>}
                  </div>
                  <p className="font-mono text-xs text-text-muted">{m.email}</p>
                  <p className="font-mono text-xs text-text-muted mt-0.5">{new Date(m.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  {!m.read && (
                    <button onClick={() => markRead(m._id)} className="admin-btn-ghost text-xs">
                      Mark Read
                    </button>
                  )}
                  <button onClick={() => remove(m._id)} className="admin-btn-danger text-xs">
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-text-secondary mt-4 whitespace-pre-wrap leading-relaxed">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
