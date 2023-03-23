import { Button, Rating, Typography } from "@mui/material";
import { Box, Stack, shadows } from "@mui/system";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
type Props = {
  userName: String;
  rating: number;
  text: string;
  reviewId: string;
  //date: Date;
};

export default function ReviewBox(props: Props) {
  const onClick = async () => {
    await deleteDoc(doc(db, "reviews", reviewId));
    setDeleted(true);
  };

  const [deleted, setDeleted] = useState(false);

  const { userName, rating, text, reviewId } = props;
  const userData = useSelector((state) => state.userData.value);

  const darkmode = useSelector((state) => state.darkmode.value);

  if (deleted) return <></>;

  return (
    <Box width={500} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"} padding={2} borderRadius={1} marginTop={3}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography color={darkmode ? "white" : "black"}>{userName}</Typography>
        {userData.isAdmin && (
          <Button onClick={onClick} style={{ backgroundColor: "red" }}>
            Slett
          </Button>
        )}
      </Stack>
      <Rating value={rating} readOnly />
      <Typography color={darkmode ? "white" : "black"}>{text}</Typography>
    </Box>
  );
}
