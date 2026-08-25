"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { Student } from "@/src/types/student";

interface StudentTableProps {
  students: Student[];
}

export default function StudentTable({ students }: StudentTableProps) {
  const router = useRouter();

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid #eaeaea",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#fafafa" }}>
            <TableCell sx={{ fontWeight: 600, color: "#444", py: 2 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#444" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#444" }}>Course</TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#444" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600, color: "#444" }}>Score</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, color: "#444" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.id}
              hover
              sx={{
                "&:last-child td": { borderBottom: 0 },
                "&:hover": { backgroundColor: "#fafafa" },
              }}
            >
              <TableCell sx={{ py: 2 }}>
                <Typography sx={{ fontWeight: 500 }}>
                  {student.firstName} {student.lastName}
                </Typography>
              </TableCell>
              <TableCell sx={{ color: "#555" }}>{student.email}</TableCell>
              <TableCell>{student.course}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "inline-block",
                    px: 1.5,
                    py: 0.4,
                    borderRadius: 1,
                    backgroundColor: "#f4f4f4",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: "#333",
                  }}
                >
                  {student.status}
                </Box>
              </TableCell>
              <TableCell>{student.score}</TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={() => router.push(`/students/${student.id}`)}
                  sx={{ color: "#555" }}
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => router.push(`/students/${student.id}/edit`)}
                  sx={{ color: "#555" }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => alert(`Delete ${student.firstName} 404`)}
                  sx={{ color: "#555" }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}