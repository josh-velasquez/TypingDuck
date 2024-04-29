import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();
  return (
    <AppBar
      position="static"
      sx={{ background: "transparent", boxShadow: "none" }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
            <Link
              to="/typing-speed"
              style={{
                textDecoration: "none",
                color:
                  location.pathname === "/typing-speed" ? "#e1b2b2" : "inherit",
              }}
            >
              Typing Speed
            </Link>
          </Typography>
          <Typography variant="h6" component="div">
            <Link
              to="/typing-test"
              style={{
                textDecoration: "none",
                color:
                  location.pathname === "/typing-test" ? "#e1b2b2" : "inherit",
              }}
            >
              Typing Test
            </Link>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
