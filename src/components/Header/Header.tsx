"use client";

import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useAppContext } from "@/src/context/AppContext";

export default function Header() {
  const { adminName } = useAppContext();

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
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, letterSpacing: -0.4 }}
        >
          Student Management
        </Typography>

        <Box
          sx={{
            fontSize: "0.875rem",
            color: "#666666",
            fontWeight: 500,
          }}
        >
          {adminName}
        </Box>
      </Toolbar>
    </AppBar>
  );
}