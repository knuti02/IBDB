import { Typography, Button } from "@mui/material";
import { borderRadius, Box } from "@mui/system";
import React from "react";
import Search from "../navbar/components/Search"
import logo from "../assets/Logo_ibdb.png"


export default function LandingPageHeader() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      style={{
        backgroundColor: "#f2f2f2",
      }} //#bcdbdf
    >
      <Typography
        variant="h1"
        align="center"
        style={{
          color: "#3f51b5",
          marginBottom: "30px",
        }}
      >

      <img src={logo} alt="error under lasting av logo" width="700px" />

      </Typography>
      <Typography
        variant="h4"
        align="center"
        style={{
          color: "#5d5d5d",
          marginBottom: "40px",
        }}
      >
        Discover and review the best books in every genre
      </Typography>
      <Search />
    </Box>
  );
}
