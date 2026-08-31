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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "@/src/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"admin" | "student">("admin");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const success = login(email.trim(), password, role);

      if (success) {
        toast.success(`${role === "admin" ? "Admin" : "Student"} login successful!`);
        router.push(role === "student" ? "/profile" : "/dashboard");
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
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h5"
            color="#111"
            sx={{ fontWeight: 700, letterSpacing: -0.5 }}
          >
            Student Management
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Sign in to your account
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Role Selection */}
          <FormControl sx={{ mb: 3, width: "100%" }}>
            <FormLabel sx={{ mb: 1, color: "#333", fontWeight: 500 }}>
              Login as
            </FormLabel>
            <RadioGroup
              row
              value={role}
              onChange={(e) => setRole(e.target.value as "admin" | "student")}
            >
              <FormControlLabel value="admin" control={<Radio />} label="Admin" />
              <FormControlLabel value="student" control={<Radio />} label="Student" />
            </RadioGroup>
          </FormControl>

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            slotProps={{
              input: {
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
              },
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
              "&:hover": { backgroundColor: "#333333" },
              "&.Mui-disabled": { backgroundColor: "#ccc", color: "#fff" },
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <Box sx={{ mt: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                <strong>Admin:</strong> admin@test.com / admin123
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                <strong>Student:</strong> aman@test.com / student123
            </Typography>
        </Box>
      </Paper>
    </Box>
  );
}