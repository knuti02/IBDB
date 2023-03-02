import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import logo from "../assets/Logo_ibdb.png";
import Search from "./components/Search"

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
        justifyContent="space-between"
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
        <Search />
      </Stack>
    </AppBar>
  );
}
export default Navbar;
