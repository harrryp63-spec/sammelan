import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../lib/api';
import type { RootState } from '../store';

export const DashboardPage = () => {
  const role = useSelector((s: RootState) => s.auth.user?.role);
  const [summary, setSummary] = useState<Record<string, number>>({});

  useEffect(() => {
    api.get('/reports/summary').then((res) => setSummary(res.data)).catch(() => undefined);
  }, []);

  const cards = [
    { label: 'Total Samitis', value: summary.samitis ?? '-' },
    { label: 'Total Volunteers', value: summary.volunteers ?? '-' },
    { label: 'Total Tasks', value: summary.tasks ?? '-' },
    { label: 'Completed Tasks', value: summary.completedTasks ?? '-' }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">{role} Dashboard</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <article key={card.label} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm text-slate-500">{card.label}</h3>
            <p className="text-3xl font-bold text-saffron-700">{card.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
