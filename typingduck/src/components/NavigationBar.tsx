import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import duckImage from "../assets/new-duck.png";

const NavigationBar = () => {
  const location = useLocation();
  return (
    <AppBar
      position="static"
      sx={{ 
        background: "var(--primary-surface)", 
        borderBottom: "1px solid var(--neutral-700)"
      }}
    >
      <Toolbar>
        <Link to="/">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img
              src={duckImage}
              alt="Menu"
              style={{ width: "36px", height: "36px" }}
            />
          </IconButton>
        </Link>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
            <Link
              to="/typing-speed"
              style={{
                textDecoration: "none",
                color: location.pathname === "/typing-speed" ? "var(--accent-primary)" : "var(--neutral-100)",
                fontWeight: location.pathname === "/typing-speed" ? 500 : 400,
                padding: "8px 16px",
                borderRadius: "var(--radius-md)",
                transition: "var(--transition-fast)",
                background: location.pathname === "/typing-speed" ? "var(--primary-elevated)" : "transparent",
              }}
            >
              typing speed
            </Link>
          </Typography>
          <Typography variant="h6" component="div">
            <Link
              to="/typing-test"
              style={{
                textDecoration: "none",
                color: location.pathname === "/typing-test" ? "var(--accent-primary)" : "var(--neutral-100)",
                fontWeight: location.pathname === "/typing-test" ? 500 : 400,
                padding: "8px 16px",
                borderRadius: "var(--radius-md)",
                transition: "var(--transition-fast)",
                background: location.pathname === "/typing-test" ? "var(--primary-elevated)" : "transparent",
              }}
            >
              typing test
            </Link>
          </Typography>
        </Box>
        
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
