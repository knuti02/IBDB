import React from "react";
import AddBook from "../../components/AddBook";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

export default function Admin() {
  const darkmode = useSelector((state) => state.darkmode.value);

  return (
    <Box sx={{ width: "60%", margin: "auto" }} height="1920px">
      <Typography color={darkmode ? "white" : "black"} variant="h3" gutterBottom>
        Legg til bok i databasen
      </Typography>
      <AddBook />
    </Box>
  );
}
