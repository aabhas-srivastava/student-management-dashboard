"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

type UserRole = "admin" | "student" | null;

interface AuthContextType {
  isLoggedIn: boolean;
  role: UserRole;
  studentId: number | null;
  login: (
    email: string,
    password: string,
    role: "admin" | "student"
  ) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const studentAccounts = [
  { email: "aman@test.com", password: "student123", studentId: 1 },
  { email: "riya@test.com", password: "student123", studentId: 2 },
  { email: "vikram@test.com", password: "student123", studentId: 3 },
  { email: "sneha@test.com", password: "student123", studentId: 4 },
  { email: "arjun@test.com", password: "student123", studentId: 5 },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole>(null);
  const [studentId, setStudentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const savedRole = localStorage.getItem("role") as UserRole;
    const savedStudentId = localStorage.getItem("studentId");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(loggedIn);
    setRole(savedRole);
    setStudentId(savedStudentId ? Number(savedStudentId) : null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading || !pathname) return;

    if (!isLoggedIn && pathname !== "/login") {
      router.push("/login");
      return;
    }

    if (isLoggedIn && pathname === "/login") {
      router.push(role === "student" ? "/profile" : "/dashboard");
      return;
    }

    if (isLoggedIn && role === "student") {
      const allowed = ["/profile", "/calendar", "/events"];
      const isAllowed = allowed.some((route) => pathname.startsWith(route));

      if (!isAllowed) {
        router.push("/profile");
      }
    }
  }, [isLoggedIn, role, pathname, loading, router]);

  const login = (
  email: string,
  password: string,
  selectedRole: "admin" | "student"
) => {
  const cleanedEmail = email.trim().toLowerCase();

  // Admin login
  if (selectedRole === "admin") {
    if (cleanedEmail === "admin@test.com" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");
      localStorage.removeItem("studentId");
      setIsLoggedIn(true);
      setRole("admin");
      setStudentId(null);
      return true;
    }
  }

  // Student login – any existing student can login with password "student123"
  if (selectedRole === "student") {
    if (password !== "student123") return false;

    try {
      const raw = localStorage.getItem("students");
      const students = raw ? JSON.parse(raw) : [];

      const student = students.find(
        (s: any) => s.email.toLowerCase() === cleanedEmail
      );

      if (!student) return false;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "student");
      localStorage.setItem("studentId", String(student.id));
      setIsLoggedIn(true);
      setRole("student");
      setStudentId(student.id);
      return true;
    } catch {
      return false;
    }
}

  return false;
};

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("studentId");
    setIsLoggedIn(false);
    setRole(null);
    setStudentId(null);
    router.push("/login");
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, studentId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}