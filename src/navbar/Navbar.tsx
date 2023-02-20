import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Stack } from "@mui/system";
import NavElement from "./components/NavElement";
import { Link } from "react-router-dom";
import logo from "../assets/Logo_ibdb.png";

function Navbar() {
  return (
    <AppBar
      sx={{
        color: "#FFFFFF",
        backgroundColor: "#FFFFFF",
      }}
      position="sticky"
    >
      <Stack
        marginLeft="10px"
        alignItems="center"
        justifyContent="start"
        direction={"row"}
        height="70px"
        spacing={3}
      >
        <Link
          to=""
          style={{
            textDecoration: "none",
          }}
        >
          <img src={logo} alt="error under lasting av logo" width="100px" />
        </Link>
      </Stack>
    </AppBar>
  );
}
export default Navbar;
