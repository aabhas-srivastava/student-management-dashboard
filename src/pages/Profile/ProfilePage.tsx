"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  LinearProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import Loading from "@/src/components/Loading/Loading";
import { getStudentById } from "@/src/services/studentService";
import { Student } from "@/src/types/student";
import { useAuth } from "@/src/context/AuthContext";

export default function ProfilePage() {
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
  if (!student) return <Typography>Student not found</Typography>;

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, letterSpacing: -0.4, mb: 3 }}
      >
        My Profile
      </Typography>

      <Paper
        elevation={0}
        sx={{ border: "1px solid #eaeaea", borderRadius: 2, p: 4, mb: 3 }}
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Full Name
            </Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>
              {student.firstName} {student.lastName}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Email
            </Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>
              {student.email}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Phone
            </Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>
              {student.phone}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Date of Birth
            </Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>
              {student.dateOfBirth}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Course
            </Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>
              {student.course}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Batch
            </Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>
              {student.batch}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Trainer
            </Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>
              {student.trainer}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Experience
            </Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>
              {student.experience}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            <Box sx={{ mt: 0.5 }}>
              <Chip
                label={student.status}
                size="small"
                sx={{ backgroundColor: "#f4f4f4", fontWeight: 500 }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Score
            </Typography>
            <Typography sx={{ fontWeight: 500, mt: 0.5 }}>
              {student.score}
            </Typography>
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
              <Typography sx={{ fontWeight: 500 }}>{student.score}%</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Button
        startIcon={<EditIcon />}
        variant="contained"
        onClick={() => router.push("/profile/edit")}
        sx={{
          backgroundColor: "#111",
          textTransform: "none",
          px: 3,
          py: 1.2,
          "&:hover": { backgroundColor: "#333" },
        }}
      >
        Edit Profile
      </Button>
    </Box>
  );
}