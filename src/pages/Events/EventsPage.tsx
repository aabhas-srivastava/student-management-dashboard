"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import { toast } from "react-toastify";
import Loading from "@/src/components/Loading/Loading";
import { useAuth } from "@/src/context/AuthContext";
import { getEvents, createEvent, deleteEvent } from "@/src/services/eventService";
import { EventItem, EventInput } from "@/src/types/event";

export default function EventsPage() {
  const { role } = useAuth();
  const isAdmin = role === "admin";

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<EventInput>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const loadEvents = () => {
    setLoading(true);
    getEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadEvents();
  }, []);

  const handleChange = (field: keyof EventInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = async () => {
    if (!form.title || !form.date || !form.time || !form.location) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      await createEvent(form);
      toast.success("Event created successfully");
      setOpen(false);
      setForm({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
      });
      loadEvents();
    } catch {
      toast.error("Failed to create event");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEvent(id);
      toast.success("Event deleted");
      loadEvents();
    } catch {
      toast.error("Failed to delete event");
    }
  };

  if (loading) return <Loading message="Loading events..." />;

  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, letterSpacing: -0.4 }}>
          Events
        </Typography>

        {/* Only Admin can see this button */}
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{
              backgroundColor: "#111",
              textTransform: "none",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            Post New Event
          </Button>
        )}
      </Box>

      {events.length === 0 ? (
        <Typography color="text.secondary">No events found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid size={{ xs: 12, md: 6 }} key={event.id}>
              <Paper
                elevation={0}
                sx={{
                  border: "1px solid #eaeaea",
                  borderRadius: 2,
                  p: 3,
                  height: "100%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1 }}>
                  <EventIcon sx={{ color: "#666", mt: 0.3 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {event.description || "No description"}
                    </Typography>
                  </Box>

                  {/* Only Admin can delete */}
                  {isAdmin && (
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(event.id)}
                      sx={{ color: "#999" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
                  <Chip label={event.date} size="small" sx={{ backgroundColor: "#f4f4f4" }} />
                  <Chip label={event.time} size="small" sx={{ backgroundColor: "#f4f4f4" }} />
                  <Chip label={event.location} size="small" sx={{ backgroundColor: "#f4f4f4" }} />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create Event Dialog – Admin only */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>Post New Event</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <TextField
              label="Date"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              required
            />
            <TextField
              label="Time"
              type="time"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              value={form.time}
              onChange={(e) => handleChange("time", e.target.value)}
              required
            />
            <TextField
              label="Location"
              fullWidth
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: "#666" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={submitting}
            sx={{
              backgroundColor: "#111",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            {submitting ? "Posting..." : "Post Event"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}