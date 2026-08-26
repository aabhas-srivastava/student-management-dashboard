"use client";

import { useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, Chip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Student } from "@/src/types/student";
import { deleteStudent } from "@/src/services/studentService";
import ConfirmDialog from "@/src/components/ConfirmDialog/ConfirmDialog";

interface StudentTableProps {
  students: Student[];
  onRefresh: () => void;
}

export default function StudentTable({ students, onRefresh }: StudentTableProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteName, setDeleteName] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = (id: number, name: string) => {
    setDeleteId(id);
    setDeleteName(name);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteStudent(deleteId);
      toast.success("Student deleted successfully");
      onRefresh();
    } catch {
      toast.error("Failed to delete student");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 160,
      valueGetter: (value, row) => `${row.firstName} ${row.lastName}`,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
      minWidth: 180,
    },
    {
      field: "course",
      headerName: "Course",
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor: "#f4f4f4",
            fontWeight: 500,
            color: "#333",
          }}
        />
      ),
    },
    {
      field: "score",
      headerName: "Score",
      width: 100,
      type: "number",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 140,
      getActions: (params) => [
        <GridActionsCellItem
          key="view"
          icon={<VisibilityIcon />}
          label="View"
          onClick={() => router.push(`/students/${params.id}`)}
        />,
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => router.push(`/students/${params.id}/edit`)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() =>
            handleDeleteClick(
              Number(params.id),
              `${params.row.firstName} ${params.row.lastName}`
            )
          }
        />,
      ],
    },
  ];

  return (
    <>
      <Box
        sx={{
          border: "1px solid #eaeaea",
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        <DataGrid
          rows={students}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          autoHeight
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#fafafa",
              fontWeight: 600,
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f0f0f0",
            },
          }}
        />
      </Box>

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Student"
        message={`Are you sure you want to delete ${deleteName}?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </>
  );
}