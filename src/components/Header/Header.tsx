"use client";

import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useAuth } from "@/src/context/AuthContext";

export default function Header() {
  const { logout, role } = useAuth();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #eaeaea",
        color: "#111111",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: -0.4 }}>
          Student Management
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              fontSize: "0.875rem",
              color: "#666666",
              fontWeight: 500,
            }}
          >
            {role === "student" ? "Student" : "Admin"}
          </Box>

          <Button
            onClick={logout}
            size="small"
            sx={{
              color: "#111",
              textTransform: "none",
              fontWeight: 500,
              border: "1px solid #eaeaea",
              px: 2,
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}