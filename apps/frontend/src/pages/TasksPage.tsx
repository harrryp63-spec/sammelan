import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Array<{ _id: string; title: string; status: string; priority: string }>>([]);
  useEffect(() => {
    api.get('/tasks').then((res) => setTasks(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task._id} className="bg-white p-3 rounded shadow flex justify-between">
            <span>{task.title}</span>
            <span>{task.priority} • {task.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
