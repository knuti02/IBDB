import { Rating, Typography } from "@mui/material";
import { Box, Stack, shadows } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
type Props = {
  userName: String;
  rating: number;
  text: string;
  //date: Date;
};

export default function ReviewBox(props: Props) {
  const { userName, rating, text } = props;

  const darkmode = useSelector((state) => state.darkmode.value);

  return (
    <Box width={500} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"} padding={2} borderRadius={1} marginTop={3}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography color={darkmode ? "white" : "black"}>{userName}</Typography>
        <Typography color={darkmode ? "white" : "black"}>23.10.02</Typography>
      </Stack>
      <Rating value={rating} readOnly />
      <Typography color={darkmode ? "white" : "black"}>{text}</Typography>
    </Box>
  );
}
