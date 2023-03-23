import { Typography, Button } from "@mui/material";
import { borderRadius, Box } from "@mui/system";
import React from "react";
import Search from "../navbar/components/Search";
import logo from "../assets/Logo_ibdb.png";
import { useSelector } from "react-redux";

export default function LandingPageHeader() {
  const darkmode = useSelector((state) => state.darkmode.value);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography
        variant="h1"
        align="center"
        color={darkmode ? "white" : "black"}
        style={{
          marginBottom: "30px",
        }}
      >
        <img src={logo} alt="error under lasting av logo" width="700px" />
      </Typography>
      <Typography
        color={darkmode ? "white" : "black"}
        variant="h4"
        align="center"
        style={{
          marginBottom: "40px",
        }}
      >
        Discover and review the best books in every genre
      </Typography>
      <Search />
    </Box>
  );
}
