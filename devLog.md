# Development Log - The Seven Pillars

## 2025-12-02: Initial Implementation Complete

### Overview
Built a full-stack tutoring platform targeting the Australian curriculum with role-based access for Admins, Parents, and Students.

### Frontend (Next.js 16 + Tailwind + Shadcn/UI)

**Public Pages:**
- Landing page with hero section, feature cards, and year level programs
- FAQ page with English/Chinese language toggle
- Class timetable with sortable table view and mobile-friendly card view
- Login and registration forms

**Admin Portal:**
- Dashboard with stats (students, classes, parents, pending tests)
- User management with role filtering and CRUD dialogs
- Class management with scheduling and enrollment tracking

**Parent Portal:**
- Child selector dropdown to switch between children
- Upcoming classes and recent resources overview
- Test results display with grading status

**Student Portal:**
- Dashboard with enrolled classes and join links
- Resources section with download buttons
- Pending entrance tests notification

**Shared Components:**
- Reusable portal header with role-based navigation
- Mobile-responsive sheet menu for navigation

### Backend (FastAPI + Python)

**API Endpoints:**
- `/users` - Profile management, parent-child relationships
- `/classes` - Subject and class CRUD operations
- `/enrollments` - Student enrollment with capacity checks
- `/resources` - File management with access control
- `/tests` - Entrance test system with auto-grading for objective questions

**Features:**
- JWT authentication via Supabase
- Role-based authorization (admin, parent, student)
- Automatic grading for multiple choice and short answer questions

### Database (Supabase/PostgreSQL)

**Tables Created:**
- profiles, relationships (parent-child links)
- subjects, classes, enrollments
- resources
- entrance_tests, test_questions, test_submissions, test_answers
- faq_entries (with i18n support)

**Security:**
- Row Level Security policies for all tables
- Storage buckets for resources and avatars

### Deployment Infrastructure

- Docker Compose configuration for frontend, backend, and Nginx
- Nginx reverse proxy with SSL/TLS support
- Let's Encrypt certbot integration for certificate management
- Production-ready Dockerfiles with multi-stage builds

### Tech Stack
- Frontend: Next.js 16, React 19, Tailwind CSS 4, Shadcn/UI, TanStack Table
- Backend: FastAPI, Pydantic, Supabase Python Client
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth with JWT
- Deployment: Docker, Nginx, Let's Encrypt
