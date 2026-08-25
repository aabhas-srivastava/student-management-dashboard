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
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { usePathname, useRouter } from "next/navigation";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon fontSize="small" /> },
  { text: "Students", path: "/students", icon: <PeopleIcon fontSize="small" /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

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
            const isActive = pathname.startsWith(item.path);

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
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    },
                    "&:hover": {
                      backgroundColor: "#f7f7f7",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: isActive ? "#111111" : "#888888",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        component="span"
                        sx={{
                          fontSize: "0.9rem",
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? "#111111" : "#444444",
                        }}
                      >
                        {item.text}
                      </Typography>
                    }
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