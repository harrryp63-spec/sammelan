import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { AnnouncementsPage } from '../pages/AnnouncementsPage';
import { AttendancePage } from '../pages/AttendancePage';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { SamitisPage } from '../pages/SamitisPage';
import { TasksPage } from '../pages/TasksPage';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'samitis', element: <SamitisPage /> },
      { path: 'tasks', element: <TasksPage /> },
      { path: 'attendance', element: <AttendancePage /> },
      { path: 'announcements', element: <AnnouncementsPage /> }
    ]
  }
]);
