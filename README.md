# Student Management Dashboard

A student management admin application built with **Next.js (App Router), React and TypeScript**. It lets an admin or trainer add, edit, view, search, filter and delete students, with a live summary dashboard and a multi-step form with per-step validation.

The app has no backend. All data is stored in the browser's `localStorage` through a dedicated async-style service layer, so a real API could be swapped in later without changing any component code.

## Features

- **Dashboard:** Reusable Stat Cards for Total Students, Active Students, Completed Students, Average Score and Pending Assignments, all calculated live from stored data.
- **Student data table:** Pagination, column sorting, and View / Edit / Delete row actions.
- **Search and filters:** Debounced search by name or email, filters by course, status and score range (0-50, 51-75, 76-100), with Apply Filters and Reset actions. All filtering runs client-side.
- **Multi-step Add Student form:** A three-step Stepper (Personal Information, Course Information, Confirmation) built with Formik and Yup. Each step validates its own fields before the user can continue, and the last step shows a read-only summary before submitting.
- **Validation:** Required fields, valid email format, email uniqueness across existing students, and numeric phone validation.
- **Student details page:** Personal and course information, status, score, and a progress bar tied to the score, with Edit and Back buttons.
- **Edit student:** Reuses the same form structure and Yup schema, pre-filled with existing data, and returns to the student list after saving.
- **Delete with confirmation:** A confirmation dialog before deletion and a React Toastify success notification afterwards.
- **Loading, error and empty states:** A loading indicator while data resolves, an "Unable to load students." message with a Retry button on failure, and a "No students found." message with an Add Student button when the list is empty.

## Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI and icons | Material UI, MUI Icons |
| Data table | MUI DataGrid |
| Forms and validation | Formik, Yup |
| Notifications | React Toastify |
| State and data | React Hooks (`useState`, `useEffect`, `useContext`, `useRouter`, `useParams`), custom `useStudents()` hook |
| Storage | Browser `localStorage` via a service layer |

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/dashboard` | Dashboard with summary stats |
| `/students` | Student list with search, filters and table |
| `/students/add` | Add student (multi-step form) |
| `/students/:id` | Student details |
| `/students/:id/edit` | Edit student |

## Architecture

Components never access `localStorage` directly. All data operations go through `services/studentService.ts`, which exposes async functions:

- `getStudents()`
- `getStudentById(id)`
- `createStudent(data)`
- `updateStudent(id, data)`
- `deleteStudent(id)`

A `useStudents()` hook wraps the service for components and exposes `students`, `loading`, `error`, `addStudent`, `updateStudent` and `deleteStudent`. An `AppContext` shares the current admin info (shown in the header) without prop drilling.

## Project Structure

```
src/
├── components/
│   ├── Header/
│   ├── Sidebar/
│   ├── StatCard/
│   ├── StudentTable/
│   ├── StudentForm/
│   ├── StudentFilters/
│   ├── ConfirmDialog/
│   └── Loading/
├── pages/ (or app/ routes)
│   ├── Dashboard/
│   ├── Students/
│   ├── AddStudent/
│   ├── StudentDetails/
│   └── EditStudent/
├── services/
│   └── studentService.ts
├── hooks/
│   └── useStudents.ts
├── types/
│   └── student.ts
└── context/
    └── AppContext.tsx
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
git clone <your-repo-url>
cd <your-project-folder>
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
