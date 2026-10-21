# Student Management Dashboard

A full-stack style Student Management System built with **Next.js (App Router)**, **TypeScript**, and **Material UI**.  
It supports role-based access for **Admin** and **Student**, with localStorage-based data persistence (no backend required).

---

## Features

### Admin
- Secure login
- Dashboard with live stats (Total, Active, Completed, Average Score, Pending Assignments)
- View all students in a DataGrid (sort + pagination)
- Search students (debounced) by name or email
- Filter by Course, Status, and Score range
- Add student (multi-step form with Formik + Yup + Stepper)
- Edit student details, score, and status
- Delete student (with confirmation dialog)
- View student details with progress bar
- Post and delete events
- Calendar with holidays

### Student
- Login with email + common password
- View own profile only
- Edit own profile (except score and status)
- View events
- View calendar
- Cannot access other students’ data or admin routes

---

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Material UI (MUI)** + **MUI X DataGrid**
- **Formik** + **Yup**
- **React Toastify**
- **localStorage** (data layer)

---

## Project Structure

```text
src/
├── app/                    # Next.js routes (thin wrappers)
│   ├── login/
│   ├── dashboard/
│   ├── students/
│   │   ├── add/
│   │   ├── [id]/
│   │   └── [id]/edit/
│   ├── profile/
│   │   └── edit/
│   ├── events/
│   └── calendar/
├── pages/                  # Page logic components
│   ├── Login/
│   ├── Dashboard/
│   ├── Students/
│   ├── AddStudent/
│   ├── StudentDetails/
│   ├── EditStudent/
│   ├── Profile/
│   ├── Events/
│   └── Calendar/
├── components/
│   ├── Header/
│   ├── Sidebar/
│   ├── StatCard/
│   ├── StudentTable/
│   ├── StudentForm/
│   ├── StudentFilters/
│   ├── ConfirmDialog/
│   ├── Loading/
│   └── Providers.tsx
├── context/
│   ├── AppContext.tsx
│   └── AuthContext.tsx
├── services/
│   ├── studentService.ts
│   └── eventService.ts
├── types/
│   ├── student.ts
│   └── event.ts
└── hooks/
