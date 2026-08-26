"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import StatCard from "@/src/components/StatCard/StatCard";
import Loading from "@/src/components/Loading/Loading";
import { getStudents } from "@/src/services/studentService";
import { Student } from "@/src/types/student";

export default function DashboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Loading dashboard..." />;

  const total = students.length;
  const active = students.filter((s) => s.status === "Active").length;
  const completed = students.filter((s) => s.status === "Completed").length;
  const avgScore =
    total > 0 ? Math.round(students.reduce((sum, s) => sum + s.score, 0) / total) : 0;
  const pending = students.reduce((sum, s) => sum + s.pendingAssignments, 0);

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, color: "#111111", mb: 4, letterSpacing: -0.4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <StatCard title="Total Students" value={total} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <StatCard title="Active" value={active} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <StatCard title="Completed" value={completed} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <StatCard title="Average Score" value={`${avgScore}%`} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <StatCard title="Pending Assignments" value={pending} />
        </Grid>
      </Grid>
    </Box>
  );
}