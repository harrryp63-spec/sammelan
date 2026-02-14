import { Link, Outlet } from 'react-router-dom';

export const Layout = () => (
  <div className="min-h-screen bg-saffron-50 text-slate-800">
    <header className="bg-saffron-700 text-white p-4 font-semibold">Virat Hindu Sammelan</header>
    <div className="flex">
      <aside className="w-56 p-4 bg-white shadow">
        <nav className="space-y-2">
          <Link className="block hover:text-saffron-700" to="/dashboard">Dashboard</Link>
          <Link className="block hover:text-saffron-700" to="/samitis">Samitis</Link>
          <Link className="block hover:text-saffron-700" to="/tasks">Tasks</Link>
          <Link className="block hover:text-saffron-700" to="/attendance">Attendance</Link>
          <Link className="block hover:text-saffron-700" to="/announcements">Announcements</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  </div>
);
