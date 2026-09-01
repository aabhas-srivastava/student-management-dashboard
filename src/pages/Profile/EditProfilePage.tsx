"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/src/components/Loading/Loading";
import StudentForm from "@/src/components/StudentForm/StudentForm";
import { getStudentById } from "@/src/services/studentService";
import { Student } from "@/src/types/student";
import { useAuth } from "@/src/context/AuthContext";
import { Typography, Box, Button } from "@mui/material";

export default function EditProfilePage() {
  const { studentId, role, isLoggedIn } = useAuth();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) return;

    if (role !== "student" || !studentId) {
      router.replace("/login");
      return;
    }

    let active = true;

    getStudentById(studentId)
      .then((data) => {
        if (!active) return;
        if (!data) {
          setError("Student not found");
        } else {
          setStudent(data);
        }
      })
      .catch(() => {
        if (active) setError("Failed to load profile");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [studentId, role, isLoggedIn, router]);

  if (loading) return <Loading message="Loading your profile..." />;

  if (error) {
    return (
      <Box>
        <Typography sx = {{mb : 2}}>{error}</Typography>
        <Button onClick={() => router.push("/profile")}>Back to Profile</Button>
      </Box>
    );
  }

  if (!student) {
    return (
      <Box>
        <Typography sx = {{mb : 2}}>Student not found</Typography>
        <Button onClick={() => router.push("/profile")}>Back to Profile</Button>
      </Box>
    );
  }

  return <StudentForm initialData={student} isEdit={true} />;
}