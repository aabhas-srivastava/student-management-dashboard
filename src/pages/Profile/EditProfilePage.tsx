"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/src/components/Loading/Loading";
import StudentForm from "@/src/components/StudentForm/StudentForm";
import { getStudentById } from "@/src/services/studentService";
import { Student } from "@/src/types/student";
import { useAuth } from "@/src/context/AuthContext";

export default function EditProfilePage() {
  const { studentId, role } = useAuth();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "student" || !studentId) {
      router.push("/login");
      return;
    }

    getStudentById(studentId)
      .then((data) => setStudent(data || null))
      .finally(() => setLoading(false));
  }, [studentId, role, router]);

  if (loading) return <Loading message="Loading your profile..." />;
  if (!student) return <div>Student not found</div>;

  return <StudentForm initialData={student} isEdit={true} />;
}