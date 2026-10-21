# Student Management Dashboard

A student management application built with **Next.js (App Router), React and TypeScript**. It supports role-based access for **Admin** and **Student**.

An admin (or trainer) can add, edit, view, search, filter and delete students, manage scores and activity status, post/delete events, and use a live summary dashboard with a multi-step form and per-step validation.

A student can log in with their email, view only their own profile, edit their own details (except score and status), and view events and the calendar. Students cannot access other students’ data or admin-only routes.

The app has **no backend**. All data is stored in the browser’s `localStorage` through a dedicated async-style service layer, so a real API could be swapped in later without changing any component code.

---

## Features

### Authentication & Roles
- Single login page with **Admin / Student** radio selection
- Email + password login
- Role stored in `localStorage` via `AuthContext`
- Route protection:
  - Unauthenticated users are redirected to `/login`
  - Students are restricted to allowed routes only
- Header label shows **Admin** or **Student** based on role
- Logout clears auth state and returns to login

### Admin Features
- **Dashboard:** Reusable Stat Cards for:
  - Total Students
  - Active Students
  - Completed Students
  - Average Score
  - Pending Assignments  
  All values are calculated live from stored data.
- **Student data table:** MUI DataGrid with:
  - Pagination
  - Column sorting
  - View / Edit / Delete row actions
- **Search and filters:**
  - Debounced search by name or email
  - Filters by Course, Status and Score range (0–50, 51–75, 76–100)
  - Apply Filters and Reset actions
  - All filtering runs client-side against data loaded from `localStorage`
- **Multi-step Add Student form:**
  - Three-step Stepper: Personal Information → Course Information → Confirmation
  - Built with **Formik + Yup**
  - Each step validates its own fields before continuing
  - Last step shows a read-only summary before submit
- **Validation:**
  - Required fields
  - Valid email format
  - Email uniqueness across existing students
  - 10-digit numeric phone validation
  - Score range 0–100 (admin)
- **Student details page:**
  - Personal and course information
  - Status and score
  - Progress bar tied to score
  - Edit and Back buttons
- **Edit student:**
  - Reuses the same multi-step form and Yup schema
  - Pre-filled with existing data
  - Admin can update **score** and **status** (Active / Completed / Inactive)
  - Returns to the student list after saving
- **Delete with confirmation:**
  - Confirmation dialog before deletion
  - React Toastify success/error notifications
  - List refreshes after delete
- **Events management:**
  - Admin can post new events
  - Admin can delete existing events
  - Students can only view events
- **Calendar:**
  - Current month calendar with prev/next navigation
  - Today highlighted
  - Holidays displayed on the calendar and listed for the month

### Student Features
- Login with student email + common password `student123`
- Newly created students can log in immediately after admin creates them
- Deleted students cannot log in anymore
- **My Profile:**
  - First screen is a normal read-only profile card
  - Separate **Edit Profile** button below the card
- **Edit Profile:**
  - Can edit personal and course details
  - **Cannot** edit score
  - **Cannot** edit status
  - After update, redirects back to My Profile
- Can view **Events** and **Calendar**
- Cannot open `/students`, other students’ detail/edit pages, or admin-only actions

### Shared UX
- Loading indicator while data resolves
- Empty states (e.g. “No students found.” / “No events found.”)
- Toast notifications for success and error actions
- Minimal light theme UI
- Fixed header + role-based sidebar

---

## Tech Stack

| Area                 | Technology |
| -------------------- | ---------- |
| Framework            | Next.js (App Router) |
| Language             | TypeScript |
| UI and icons         | Material UI, MUI Icons |
| Data table           | MUI DataGrid |
| Forms and validation | Formik, Yup |
| Notifications        | React Toastify |
| State and data       | React Hooks (`useState`, `useEffect`, `useContext`, `useRouter`, `useParams`) |
| Auth                 | Custom `AuthContext` (role-based: `admin` / `student`) |
| Storage              | Browser `localStorage` via service layer |

---

## Login Credentials

### Admin
| Field    | Value            |
|----------|------------------|
| Email    | `admin@test.com` |
| Password | `admin123`       |

### Student
| Field    | Value                        |
|----------|------------------------------|
| Email    | Any existing student’s email |
| Password | `student123`                 |

Example seed students:
- `aman@test.com` / `student123`
- `riya@test.com` / `student123`
- `vikram@test.com` / `student123`
- `sneha@test.com` / `student123`
- `arjun@test.com` / `student123`

**Notes:**
- When admin creates a new student, that student can log in right away with their email and password `student123`.
- When admin deletes a student, that account can no longer log in.

---

## Routes

| Route                 | Access  | Page |
| --------------------- | ------- | ---- |
| `/`                   | Public  | Redirects based on auth |
| `/login`              | Public  | Login page (Admin / Student radio) |
| `/dashboard`          | Admin   | Dashboard with summary stats |
| `/students`           | Admin   | Student list with search, filters and table |
| `/students/add`       | Admin   | Add student (multi-step form) |
| `/students/[id]`      | Admin   | Student details |
| `/students/[id]/edit` | Admin   | Edit student |
| `/profile`            | Student | Own profile (read-only card first) |
| `/profile/edit`       | Student | Edit own profile |
| `/events`             | Both    | Events (admin can create/delete) |
| `/calendar`           | Both    | Monthly calendar with holidays |

---

## Architecture

Components never access `localStorage` directly. All data operations go through service files.

### Student service (`services/studentService.ts`)
- `getStudents()`
- `getStudentById(id)`
- `createStudent(data)`
- `updateStudent(id, data)`
- `deleteStudent(id)`

### Event service (`services/eventService.ts`)
- `getEvents()`
- `createEvent(data)`
- `deleteEvent(id)`

### Auth (`context/AuthContext.tsx`)
- Stores `isLoggedIn`, `role`, `studentId`
- Handles login / logout
- Protects routes by role
- On student login, verifies the student still exists in `localStorage` (blocks deleted students)

### App context (`context/AppContext.tsx`)
- Shares shared UI/app info where needed

### Page organization
- `src/app/` contains **thin route files** (import only)
- `src/pages/` contains the actual page logic components
- This keeps route files clean and matches a scalable structure

The service layer is async-style (with a short simulated delay) so the UI handles loading states the same way it would with a real API.

---

## Project Structure

```text
src/
├── app/                              # Thin Next.js App Router routes
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── login/page.tsx
│   ├── dashboard/page.tsx
│   ├── students/
│   │   ├── page.tsx
│   │   ├── add/page.tsx
│   │   ├── [id]/page.tsx
│   │   └── [id]/edit/page.tsx
│   ├── profile/
│   │   ├── page.tsx
│   │   └── edit/page.tsx
│   ├── events/page.tsx
│   └── calendar/page.tsx
│
├── pages/                            # Actual page logic
│   ├── Login/LoginPage.tsx
│   ├── Dashboard/DashboardPage.tsx
│   ├── Students/StudentsPage.tsx
│   ├── AddStudent/AddStudentPage.tsx
│   ├── StudentDetails/StudentDetailsPage.tsx
│   ├── EditStudent/EditStudentPage.tsx
│   ├── Profile/
│   │   ├── ProfilePage.tsx
│   │   └── EditProfilePage.tsx
│   ├── Events/EventsPage.tsx
│   └── Calendar/CalendarPage.tsx
│
├── components/
│   ├── Header/Header.tsx
│   ├── Sidebar/Sidebar.tsx
│   ├── StatCard/StatCard.tsx
│   ├── StudentTable/StudentTable.tsx
│   ├── StudentForm/StudentForm.tsx
│   ├── StudentFilters/StudentFilters.tsx
│   ├── ConfirmDialog/ConfirmDialog.tsx
│   ├── Loading/Loading.tsx
│   └── Providers.tsx
│
├── services/
│   ├── studentService.ts
│   └── eventService.ts
│
├── context/
│   ├── AuthContext.tsx
│   └── AppContext.tsx
│
├── types/
│   ├── student.ts
│   └── event.ts
│
└── hooks/
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
git clone https://github.com/aabhas-srivastava/student-management-dashboard.git
cd student-management-dashboard
npm install
```

### Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

## Assumptions

- There is no backend. `localStorage` is the only data source, and data is stored per browser.
- Clearing browser storage removes all student records.
- The service layer is async-style (with a short simulated delay) so the UI handles loading and error states as it would with a real API.
- The sidebar only links to routes that exist (Dashboard and Students).
- Score filter buckets are fixed at 0-50, 51-75 and 76-100.

## License

This project was built as part of a React and TypeScript assessment.
