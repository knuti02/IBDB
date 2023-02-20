import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function BookDetail() {
  const location = useLocation();

  const { title, author, imageSource, description } = location.state;

  return (
    <Box boxShadow={4}>
      <Stack
        width="100%"
        height="720px"
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          justifyContent="content"
        >
          <img height="500px" src={imageSource} alt="ops" />
          <Stack
            justifyContent="space-evenly"
            alignItems="center"
            width="600px"
            direction="column"
            height="500px"
          >
            <Stack justifyContent="center">
              <Typography fontWeight="bold" variant="h3">
                {title}
              </Typography>
              <Typography variant="h4">{author}</Typography>
              <Typography variant="body1">{description}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
