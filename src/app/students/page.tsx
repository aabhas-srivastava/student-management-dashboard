"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import StudentTable from "@/src/components/StudentTable/StudentTable";
import Loading from "@/src/components/Loading/Loading";
import { getStudents } from "@/src/services/studentService";
import { Student } from "@/src/types/student";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Loading students..." />;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: "#111111", letterSpacing: -0.4 }}
        >
          Students
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push("/students/add")}
          sx={{
            backgroundColor: "#111111",
            color: "#fff",
            px: 3,
            py: 1,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#333333",
            },
          }}
        >
          Add Student
        </Button>
      </Box>

      {students.length === 0 ? (
        <Typography color="text.secondary">No students found.</Typography>
      ) : (
        <StudentTable students={students} />
      )}
    </Box>
  );
}