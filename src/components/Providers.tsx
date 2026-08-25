"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "@/src/context/AppContext";
import { AuthProvider } from "@/src/context/AuthContext";
import Header from "@/src/components/Header/Header";
import Sidebar from "@/src/components/Sidebar/Sidebar";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#111111" },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#fafafa" }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          pt: 11,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppProvider>
          <AppLayout>{children}</AppLayout>
          <ToastContainer position="top-right" autoClose={3000} theme="light" />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}