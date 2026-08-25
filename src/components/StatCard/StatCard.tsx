"use client";

import { Card, CardContent, Typography} from "@mui/material";

interface StatCardProps {
  title: string;
  value: string | number;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #eaeaea",
        borderRadius: 2,
        backgroundColor: "#ffffff",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="body2"
          sx={{ color: "#666666", fontWeight: 500, mb: 1 }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: "#111111", letterSpacing: -0.5 }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}