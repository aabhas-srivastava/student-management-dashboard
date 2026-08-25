"use client";

import { useEffect, useState, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import StudentTable from "@/src/components/StudentTable/StudentTable";
import StudentFilters from "@/src/components/StudentFilters/StudentFilters";
import Loading from "@/src/components/Loading/Loading";
import { getStudents } from "@/src/services/studentService";
import { Student } from "@/src/types/student";

const defaultFilters = {
  search: "",
  course: "All",
  status: "All",
  scoreRange: "All",
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters that user is currently typing/selecting
  const [filters, setFilters] = useState(defaultFilters);

  // Filters that are actually applied
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);

  // Debounced search value
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const router = useRouter();

  // Load students
  useEffect(() => {
    getStudents()
      .then(setStudents)
      .finally(() => setLoading(false));
  }, []);

  // Debounce search (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Apply filtering
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      const email = student.email.toLowerCase();
      const search = debouncedSearch.toLowerCase();

      // Debounced Search
      if (search && !fullName.includes(search) && !email.includes(search)) {
        return false;
      }

      // Course
      if (appliedFilters.course !== "All" && student.course !== appliedFilters.course) {
        return false;
      }

      // Status
      if (appliedFilters.status !== "All" && student.status !== appliedFilters.status) {
        return false;
      }

      // Score Range
      if (appliedFilters.scoreRange !== "All") {
        const score = student.score;
        if (appliedFilters.scoreRange === "0-50" && (score < 0 || score > 50)) return false;
        if (appliedFilters.scoreRange === "51-75" && (score < 51 || score > 75)) return false;
        if (appliedFilters.scoreRange === "76-100" && (score < 76 || score > 100)) return false;
      }

      return true;
    });
  }, [students, debouncedSearch, appliedFilters]);

  const handleApply = () => {
    setAppliedFilters({
      ...filters,
      search: debouncedSearch, // keep current search
    });
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setDebouncedSearch("");
  };

  if (loading) return <Loading message="Loading students..." />;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
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
            "&:hover": { backgroundColor: "#333333" },
          }}
        >
          Add Student
        </Button>
      </Box>

      <StudentFilters
        filters={filters}
        onFilterChange={setFilters}
        onApply={handleApply}
        onReset={handleReset}
      />

      {filteredStudents.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 4 }}>
          No students found.
        </Typography>
      ) : (
        <StudentTable students={filteredStudents} />
      )}
    </Box>
  );
}