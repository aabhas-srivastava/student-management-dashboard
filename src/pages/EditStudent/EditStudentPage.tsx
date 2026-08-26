"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/src/components/Loading/Loading";
import StudentForm from "@/src/components/StudentForm/StudentForm";
import { getStudentById } from "@/src/services/studentService";
import { Student } from "@/src/types/student";

export default function EditStudentPage() {
  const params = useParams();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  const id = Number(params?.id);

  useEffect(() => {
    if (!id) return;
    getStudentById(id)
      .then((data) => setStudent(data || null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading message="Loading student..." />;
  if (!student) return <div>Student not found</div>;

  return <StudentForm initialData={student} isEdit={true} />;
}