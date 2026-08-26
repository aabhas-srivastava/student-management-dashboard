"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  LinearProgress,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "@/src/components/Loading/Loading";
import { getStudentById } from "@/src/services/studentService";
import { Student } from "@/src/types/student";

export default function StudentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  const id = Number(params?.id);

  useEffect(() => {
    if (!id) return;
    getStudentById(id)
      .then((data) => setStudent(data || null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading message="Loading student details..." />;

  if (!student) {
    return (
      <Box>
        <Typography variant="h6">Student not found</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/students")}
          sx={{ mt: 2 }}
        >
          Back to Students
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: 600, letterSpacing: -0.4 }}
        >
          Student Details
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            onClick={() => router.push("/students")}
            sx={{ textTransform: "none", borderColor: "#ddd", color: "#111" }}
          >
            Back
          </Button>
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            onClick={() => router.push(`/students/${student.id}/edit`)}
            sx={{
              backgroundColor: "#111",
              textTransform: "none",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            Edit Student
          </Button>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ border: "1px solid #eaeaea", borderRadius: 2, p: 4 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">Full Name</Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>
              {student.firstName} {student.lastName}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">Email</Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>{student.email}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">Phone</Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>{student.phone}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>{student.dateOfBirth}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">Course</Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>{student.course}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">Batch</Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>{student.batch}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">Trainer</Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>{student.trainer}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">Experience</Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>{student.experience}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">Status</Typography>
            <Box sx={{ mt: 0.5 }}>
              <Chip
                label={student.status}
                size="small"
                sx={{ backgroundColor: "#f4f4f4", fontWeight: 500 }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">Score</Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>{student.score}</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Progress
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <LinearProgress
                variant="determinate"
                value={student.score}
                sx={{
                  flex: 1,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#f0f0f0",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#111" },
                }}
              />
              <Typography component="span" sx={{ fontWeight: 500 }}>
                {student.score}%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}