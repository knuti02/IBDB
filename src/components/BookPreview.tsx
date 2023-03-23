import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Box, fontSize, Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
type Props = {
  title: string;
  imageSource: string;
  author: string;
  description: string;
  ISBN: string;
};

export default function BookPreview(props: Props) {
  const { title, imageSource, author, ISBN, description } = props;

  const darkmode = useSelector((state) => state.darkmode.value);

  return (
    <Link
      to={`/books/"${ISBN}`}
      style={{
        textDecoration: "none",
        textDecorationColor: "none",
        color: "black",
      }}
      state={props}
    >
      <Stack
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        direction={"column"}
        alignItems="center"
        border={1}
        width={300}
      >
        <img src={imageSource} alt={`Book cover for ${title}`} width={300} height={480}></img>
        <Stack direction="column" width="100%" alignItems="center">
          <Typography
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxWidth="200px"
            color={darkmode ? "white" : "black"}
          >
            {title}
          </Typography>
          <Typography color={darkmode ? "white" : "black"} sx={{ fontStyle: "oblique", fontSize: 10 }}>
            {author}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
}
