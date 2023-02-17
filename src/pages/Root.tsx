import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../navbar/Navbar";

export default function Root() {
  return (
    <Box width="100%" top={0} margin={0} height="100%">
      <Navbar />
      <Outlet />
    </Box>
  );
}
