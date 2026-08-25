"use client";

import {
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";

interface Filters {
  search: string;
  course: string;
  status: string;
  scoreRange: string;
}

interface StudentFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onApply: () => void;
  onReset: () => void;
}

export default function StudentFilters({
  filters,
  onFilterChange,
  onApply,
  onReset,
}: StudentFiltersProps) {
  const handleChange = (field: keyof Filters, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <Box
      sx={{
        border: "1px solid #eaeaea",
        borderRadius: 2,
        p: 3,
        mb: 3,
        backgroundColor: "#fff",
      }}
    >
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        {/* Search */}
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            size="small"
            label="Search by name or email"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </Grid>

        {/* Course */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Course"
            value={filters.course}
            onChange={(e) => handleChange("course", e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="Node.js">Node.js</MenuItem>
            <MenuItem value="Full Stack">Full Stack</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
          </TextField>
        </Grid>

        {/* Status */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Status"
            value={filters.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Grid>

        {/* Score Range */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Score"
            value={filters.scoreRange}
            onChange={(e) => handleChange("scoreRange", e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="0-50">0 – 50</MenuItem>
            <MenuItem value="51-75">51 – 75</MenuItem>
            <MenuItem value="76-100">76 – 100</MenuItem>
          </TextField>
        </Grid>

        {/* Buttons */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              variant="contained"
              onClick={onApply}
              sx={{
                backgroundColor: "#111",
                textTransform: "none",
                px: 3,
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Apply Filters
            </Button>
            <Button
              variant="outlined"
              onClick={onReset}
              sx={{
                textTransform: "none",
                borderColor: "#ddd",
                color: "#111",
              }}
            >
              Reset
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}