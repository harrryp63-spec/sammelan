import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export const AnnouncementsPage = () => {
  const [items, setItems] = useState<Array<{ _id: string; title: string; message: string }>>([]);
  useEffect(() => {
    api.get('/announcements').then((res) => setItems(res.data));
  }, []);

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Announcements</h2>
      {items.map((item) => (
        <article key={item._id} className="bg-white rounded p-4 shadow">
          <h3 className="font-semibold">{item.title}</h3>
          <p>{item.message}</p>
        </article>
      ))}
    </div>
  );
};
