# Virat Hindu Sammelan PWA

Production-oriented full-stack PWA scaffold for event operations across Samitis.

## Tech Stack
- Frontend: React + Vite + Tailwind + Redux Toolkit + PWA (Workbox)
- Backend: Node.js + Express + TypeScript + MongoDB (Mongoose)
- Security: Helmet, CORS policy, rate limiting, JWT auth, bcrypt hashing, request validation (zod), audit log records

## Monorepo Structure
- `apps/backend`: REST API with RBAC, modules for samiti/task/attendance/announcements/reports
- `apps/frontend`: mobile-first saffron themed PWA dashboard and management screens

## Key Features Implemented
- Role-based access for Sayojak, Samiti Head, Team Member
- Secure auth (`/api/auth/register`, `/api/auth/login`)
- Dynamic Samiti management
- Task lifecycle management with priority/status/comments
- Attendance APIs + percentage report aggregation
- Announcement feed (global + samiti-scoped)
- Summary analytics endpoint for dashboard cards
- Audit logging for key actions
- PWA installability, offline caching, runtime API cache

## Getting Started
```bash
npm install
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
npm run dev
```

## API Endpoints
- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Samitis: `GET /api/samitis`, `POST /api/samitis`
- Tasks: `GET /api/tasks`, `POST /api/tasks`, `PATCH /api/tasks/:id/status`
- Attendance: `POST /api/attendance`, `GET /api/attendance/report`
- Announcements: `GET /api/announcements`, `POST /api/announcements`
- Reports: `GET /api/reports/summary`

## Scaling Notes
- Move files to S3/Cloudinary using signed uploads and role-aware access rules
- Add Redis + queue workers for notifications/background sync
- Add websocket events for live updates per samiti channel
- Add CSV/PDF export module and scheduled backups
- Add OTP, password reset emails, and MFA
