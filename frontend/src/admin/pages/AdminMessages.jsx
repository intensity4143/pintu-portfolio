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
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        {unread > 0 && (
          <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {unread} new
          </span>
        )}
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-400 text-sm">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map(m => (
            <div
              key={m._id}
              className={`bg-gray-900 border rounded-xl p-5 ${m.read ? 'border-gray-800' : 'border-blue-500/50'}`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-white">{m.name}</p>
                    {!m.read && <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded">Unread</span>}
                  </div>
                  <p className="text-xs text-gray-400">{m.email}</p>
                  <p className="text-xs text-gray-600 mt-1">{new Date(m.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  {!m.read && (
                    <button
                      onClick={() => markRead(m._id)}
                      className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => remove(m._id)}
                    className="text-xs bg-red-600/20 hover:bg-red-600/40 text-red-400 px-3 py-1.5 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-300 mt-4 whitespace-pre-wrap">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
