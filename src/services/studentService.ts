import { Student, StudentInput } from "@/src/types/student";

const STORAGE_KEY = "students";
const DELAY = 400;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const seedData: Student[] = [
  {
    id: 1,
    firstName: "Aizen",
    lastName: "Sosuke",
    email: "aizen@hogyoku.com",
    phone: "9876543210",
    dateOfBirth: "1998-05-12",
    course: "React",
    batch: "Batch 1",
    startDate: "2025-01-15",
    trainer: "Urahara Kisuke",
    experience: "100 years",
    status: "Active",
    score: 100,
    pendingAssignments: 3,
  },
  {
    id: 2,
    firstName: "Ichigo",
    lastName: "Kurosaki",
    email: "tensa@zangetsu.com",
    phone: "9123456780",
    dateOfBirth: "1999-08-22",
    course: "React",
    batch: "Batch 1",
    startDate: "2025-01-15",
    trainer: "Urahara Kisuke",
    experience: "1 year",
    status: "Completed",
    score: 84,
    pendingAssignments: 2,
  },
  {
    id: 3,
    firstName: "Yhwach",
    lastName: "",
    email: "the@almighty.com",
    phone: "9988776655",
    dateOfBirth: "1997-03-10",
    course: "Node.js",
    batch: "Batch 2",
    startDate: "2025-02-01",
    trainer: "Priya Verma",
    experience: "3 years",
    status: "Active",
    score: 89,
    pendingAssignments: 2,
  },
  {
    id: 4,
    firstName: "Shunsui",
    lastName: "Kyoraku",
    email: "katen@kyokotsu.com",
    phone: "9876501234",
    dateOfBirth: "2000-11-05",
    course: "Full Stack",
    batch: "Batch 3",
    startDate: "2025-03-10",
    trainer: "Yamamoto",
    experience: "Fresher",
    status: "Inactive",
    score: 74,
    pendingAssignments: 0,
  },
  {
    id: 5,
    firstName: "Kenpachi",
    lastName: "Zaraki",
    email: "yachiru@nozarashi.com",
    phone: "9012345678",
    dateOfBirth: "1996-07-18",
    course: "React",
    batch: "Batch 2",
    startDate: "2025-02-01",
    trainer: "Unohana",
    experience: "4 years",
    status: "Active",
    score: 46,
    pendingAssignments: 3,
  },
  {
    id: 6,
    firstName: "Hirako",
    lastName: "Shinji",
    email: "dance@sakanade.com",
    phone: "9765432109",
    dateOfBirth: "1999-01-30",
    course: "Node.js",
    batch: "Batch 1",
    startDate: "2025-01-15",
    trainer: "None",
    experience: "2 years",
    status: "Completed",
    score: 69,
    pendingAssignments: 5,
  },
];

function getStoredStudents(): Student[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return seedData;
  }
  return JSON.parse(raw) as Student[];
}

function saveStudents(students: Student[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

export async function getStudents(): Promise<Student[]> {
  await delay(DELAY);
  return getStoredStudents();
}

export async function getStudentById(id: number): Promise<Student | undefined> {
  await delay(DELAY);
  const students = getStoredStudents();
  return students.find((s) => s.id === id);
}

export async function createStudent(data: StudentInput): Promise<Student> {
  await delay(DELAY);
  const students = getStoredStudents();
  const newStudent: Student = {
    ...data,
    id: students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1,
  };
  students.push(newStudent);
  saveStudents(students);
  return newStudent;
}

export async function updateStudent(
  id: number,
  data: StudentInput
): Promise<Student> {
  await delay(DELAY);
  const students = getStoredStudents();
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) throw new Error("Student not found");
  const updated = { ...data, id };
  students[index] = updated;
  saveStudents(students);
  return updated;
}

export async function deleteStudent(id: number): Promise<void> {
  await delay(DELAY);
  const students = getStoredStudents();
  const filtered = students.filter((s) => s.id !== id);
  saveStudents(filtered);
}