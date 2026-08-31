"use client";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import EventIcon from "@mui/icons-material/Event";

const drawerWidth = 240;

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { role } = useAuth();

  const adminMenu = [
    { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon fontSize="small" /> },
    { text: "Students", path: "/students", icon: <PeopleIcon fontSize="small" /> },
    { text: "Events", path: "/events", icon: <EventIcon fontSize="small" /> },
    { text: "Calendar", path: "/calendar", icon: <CalendarMonthIcon fontSize="small" /> },
  ];

  const studentMenu = [
    { text: "My Profile", path: "/profile", icon: <PersonIcon fontSize="small" /> },
    { text: "Events", path: "/events", icon: <EventIcon fontSize="small" /> },
    { text: "Calendar", path: "/calendar", icon: <CalendarMonthIcon fontSize="small" /> },
  ];

  const menuItems = role === "student" ? studentMenu : adminMenu;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #eaeaea",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", py: 3, px: 1.5 }}>
        <List disablePadding>
          {menuItems.map((item) => {
            const isActive = pathname?.startsWith(item.path) ?? false;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={isActive}
                  onClick={() => router.push(item.path)}
                  sx={{
                    borderRadius: 1.5,
                    py: 1.1,
                    px: 1.5,
                    "&.Mui-selected": {
                      backgroundColor: "#f4f4f4",
                      color: "#111111",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    },
                    "&:hover": { backgroundColor: "#f7f7f7" },
                  }}
                >
                  <ListItemIcon
                    sx={{ minWidth: 36, color: isActive ? "#111111" : "#888888" }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: "0.9rem",
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? "#111111" : "#444444",
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}