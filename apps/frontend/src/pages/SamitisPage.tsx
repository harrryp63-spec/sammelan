import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export const SamitisPage = () => {
  const [samitis, setSamitis] = useState<Array<{ _id: string; name: string; description: string }>>([]);
  useEffect(() => {
    api.get('/samitis').then((res) => setSamitis(res.data));
  }, []);

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Samitis</h2>
      {samitis.map((samiti) => (
        <div key={samiti._id} className="bg-white rounded p-4 shadow">
          <h3 className="font-semibold">{samiti.name}</h3>
          <p>{samiti.description}</p>
        </div>
      ))}
    </div>
  );
};
