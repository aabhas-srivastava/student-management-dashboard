"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Chip,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const holidays: Record<string, string> = {
  "2026-01-01": "New Year's Day",
  "2026-01-26": "Republic Day",
  "2026-03-14": "Holi",
  "2026-03-31": "Id-ul-Fitr",
  "2026-04-03": "Good Friday",
  "2026-04-14": "Ambedkar Jayanti",
  "2026-05-01": "Labour Day",
  "2026-08-15": "Independence Day",
  "2026-08-19": "Raksha Bandhan",
  "2026-09-05": "Teachers' Day",
  "2026-10-02": "Gandhi Jayanti",
  "2026-10-20": "Dussehra",
  "2026-11-08": "Diwali",
  "2026-12-25": "Christmas",
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const getHoliday = (day: number) => {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return holidays[key];
  };

  // Build calendar cells
  const cells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(<Box key={`empty-${i}`} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const holiday = getHoliday(day);
    const todayFlag = isToday(day);

    cells.push(
      <Box
        key={day}
        sx={{
          border: "1px solid #eee",
          borderRadius: 2,
          minHeight: 90,
          p: 1.2,
          backgroundColor: todayFlag ? "#f0f0f0" : "#fff",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            fontWeight: todayFlag ? 700 : 500,
            fontSize: "0.95rem",
            color: todayFlag ? "#111" : "#333",
          }}
        >
          {day}
        </Typography>

        {holiday && (
          <Chip
            label={holiday}
            size="small"
            sx={{
              mt: 1,
              fontSize: "0.7rem",
              height: 22,
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              maxWidth: "100%",
            }}
          />
        )}
      </Box>
    );
  }

  // Holidays in current month
  const monthHolidays = Object.entries(holidays)
    .filter(([date]) => {
      const [y, m] = date.split("-").map(Number);
      return y === year && m === month + 1;
    })
    .map(([date, name]) => ({
      date: Number(date.split("-")[2]),
      name,
    }));

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, letterSpacing: -0.4, mb: 3 }}
      >
        Calendar
      </Typography>

      <Paper
        elevation={0}
        sx={{ border: "1px solid #eaeaea", borderRadius: 2, p: 3 }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <IconButton onClick={prevMonth}>
            <ChevronLeftIcon />
          </IconButton>

          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {monthName} {year}
          </Typography>

          <IconButton onClick={nextMonth}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* Week days */}
        <Grid container spacing={1} sx={{ mb: 1 }}>
          {weekDays.map((day) => (
            <Grid size={{ xs: 12 / 7 }} key={day}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "text.secondary",
                }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* Days */}
        <Grid container spacing={1}>
          {cells.map((cell, index) => (
            <Grid size={{ xs: 12 / 7 }} key={index}>
              {cell}
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Holiday list for current month */}
      {monthHolidays.length > 0 && (
        <Paper
          elevation={0}
          sx={{ border: "1px solid #eaeaea", borderRadius: 2, p: 3, mt: 3 }}
        >
          <Typography sx={{ fontWeight: 600, mb: 2 }}>
            Holidays in {monthName}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {monthHolidays.map((h) => (
              <Box
                key={h.date}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Chip
                  label={h.date}
                  size="small"
                  sx={{ backgroundColor: "#f4f4f4", fontWeight: 600, minWidth: 40 }}
                />
                <Typography>{h.name}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
}