
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createActivity } from '../api/createActivity.js';
import './ActivityFeed.css';
import myLogo from '../assets/logo.png'; 


export default function ActivityFeed({ tenantId }) {
  const [items, setItems] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('ALL');
  const observerRef = useRef(null);

  const mergeUnique = (prev, next) => {
    const map = new Map();
    [...prev, ...next].forEach(item => {
      map.set(item.id, item);
    });
    return Array.from(map.values());
  };

  const fetchActivities = async ({ cursor, limit = 20 }) => {
    const params = new URLSearchParams();
    if (cursor) params.append('cursor', cursor);
    params.append('limit', String(limit));

    const res = await fetch(`http://localhost:3000/activities?${params.toString()}`, {
      headers: { 'x-tenant-id': tenantId },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  };

  const load = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await fetchActivities({ cursor: nextCursor, limit: 10 });
      setItems(prev => mergeUnique(prev, data.items));
      setNextCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, nextCursor]);

  useEffect(() => {
    load();
  }, [tenantId]);

  // Mock real-time updates: poll every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      fetchActivities({ cursor: null, limit: 5 }).then(data => {
        if (data.items.length) {
          setItems(prev => mergeUnique(data.items, prev));
        }
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [tenantId]);

  const sentinelRef = useCallback(node => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) load();
    });
    if (node) observerRef.current.observe(node);
  }, [load]);

  const addActivityOptimistic = async () => {
    const tempId = `temp-${Date.now()}-${Math.random()}`;
    const optimisticItem = {
      id: tempId,
      actorId: 'me',
      actorName: 'You',
      type: 'COMMENT_ADDED',
      entityId: 'E1',
      metadata: { text: 'Hello world (optimistic)' },
      createdAt: new Date().toISOString(),
      _optimistic: true,
    };
    setItems(prev => [optimisticItem, ...prev]);

    try {
      const saved = await createActivity({
        tenantId,
        payload: {
          actorId: optimisticItem.actorId,
          actorName: optimisticItem.actorName,
          type: optimisticItem.type,
          entityId: optimisticItem.entityId,
          metadata: optimisticItem.metadata,
        },
      });
      setItems(prev => prev.map(i => (i.id === tempId ? saved : i)));
    } catch {
      setItems(prev => prev.filter(i => i.id !== tempId));
    }
  };

  const getClassName = (type) => {
    if (type === 'COMMENT_ADDED') return 'comment';
    if (type === 'STATUS_CHANGED') return 'status';
    if (type === 'FILE_UPLOADED') return 'file';
    return '';
  };

  return (
    <div className="feed-container">
     <div className="feed-header">
  <h2>Activity Feed</h2>
  <div className="feed-actions">
    <button onClick={addActivityOptimistic}>➕ Add Activity</button>
    <img src={myLogo} alt="My Logo" className="logo" />
  </div>
</div>


      {/* Filter buttons */}
      <div className="filters">
        <button onClick={() => setFilter('ALL')}>All</button>
        <button onClick={() => setFilter('COMMENT_ADDED')}>Comments</button>
        <button onClick={() => setFilter('STATUS_CHANGED')}>Status</button>
        <button onClick={() => setFilter('FILE_UPLOADED')}>Files</button>
      </div>

      <ul className="feed-list">
        {items.length === 0 && !loading && <div>No activities yet</div>}
        {items
          .filter(i => filter === 'ALL' || i.type === filter)
          .map(item => (
            <li
              key={item.id}
              className={`${getClassName(item.type)} ${item._optimistic ? 'optimistic' : ''}`}
            >
              <div>
                <strong>{item.actorName}</strong> performed <b>{item.type}</b> on <em>{item.entityId}</em>
                {item.metadata?.text && <p>{item.metadata.text}</p>}
              </div>
              <div className="feed-meta">
                {new Date(item.createdAt).toLocaleString()}
                {item._optimistic && <span className="optimistic"> (pending)</span>}
              </div>
            </li>
          ))}
      </ul>

      {loading && <div>Loading...</div>}
      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
    </div>
  );
}
