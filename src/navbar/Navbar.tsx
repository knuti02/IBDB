import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Stack } from "@mui/system";
import NavElement from "./components/NavElement";

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
        <NavElement path={""} title="IBDB" />
      </Stack>
    </AppBar>
  );
}
export default Navbar;
