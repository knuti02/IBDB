import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Box, fontSize, Stack } from "@mui/system";
import React from "react";
type Props = {
  title: string;
  imageSource: string;
  author: string;
  ISBN: string;
};

export default function BookPreview(props: Props) {
  const { title, imageSource, author, ISBN } = props;
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
      <Stack direction={"column"} alignItems="center" border={1} width={300}>
        <img
          src={imageSource}
          alt={`Book cover for ${title}`}
          width={300}
          height={480}
        ></img>
        <Typography>{title}</Typography>
        <Typography sx={{ fontStyle: "oblique", fontSize: 10 }}>
          {author}
        </Typography>
      </Stack>
    </Link>
  );
}
