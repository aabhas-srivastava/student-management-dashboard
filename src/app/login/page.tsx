"use client";

import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "@/src/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Small delay for better UX
    setTimeout(() => {
      const success = login(username.trim(), password);

      if (success) {
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        toast.error("Invalid username or password");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafafa",
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 3, sm: 5 },
          border: "1px solid #eaeaea",
          borderRadius: 3,
          backgroundColor: "#ffffff",
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h5"
            fontWeight={700}
            letterSpacing={-0.5}
            color="#111"
          >
            Student Management
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Sign in to your account
          </Typography>
        </Box>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2.5 }}
            required
            autoFocus
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3.5 }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: "#111111",
              py: 1.5,
              fontWeight: 600,
              fontSize: "1rem",
              textTransform: "none",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#333333",
              },
              "&.Mui-disabled": {
                backgroundColor: "#ccc",
                color: "#fff",
              },
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Hint */}
        <Typography
          variant="caption"
          display="block"
          textAlign="center"
          color="text.secondary"
          mt={3}
        >
          Use username: <strong>aabhas</strong> / password: <strong>aabhas0305</strong>
        </Typography>
      </Paper>
    </Box>
  );
}