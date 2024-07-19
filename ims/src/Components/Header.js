import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Header() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="navbar">
          {auth ? <Sidebar /> : null}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink className="link" to="/">
              Learning Inventery
            </NavLink>
          </Typography>
          {auth ? (
            <NavLink onClick={logout} className="link" to="signup">
              Logout
            </NavLink>
          ) : (
            <NavLink className="link" to="login">
              LOGIN/SIGN-UP
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
      {/* {state ? <Sidebar /> : null} */}
    </Box>
  );
}
