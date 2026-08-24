import { useEffect, useCallback } from 'react';

const CHANNEL = 'portfolio_sync';

// Call this in admin pages after a successful save/delete
export const broadcastSync = (section) => {
  try {
    const ch = new BroadcastChannel(CHANNEL);
    ch.postMessage({ section });
    ch.close();
  } catch {}
};

// Call this in frontend components to re-fetch when admin saves
const useSync = (section, callback) => {
  const cb = useCallback(callback, []);
  useEffect(() => {
    let ch;
    try {
      ch = new BroadcastChannel(CHANNEL);
      ch.onmessage = (e) => {
        if (e.data?.section === section || e.data?.section === 'all') cb();
      };
    } catch {}
    return () => ch?.close();
  }, [section, cb]);
};

export default useSync;
