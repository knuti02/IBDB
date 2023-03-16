import { Button, FormControl, Rating, Tab, Tabs, TextareaAutosize, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { TabPanel, TabContext, TabList, TabPanelClassKey } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReviewBox from "../../components/ReviewBox";
import useAuth from "../../hooks/useAuth";
import { collection, addDoc, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { Margin } from "@mui/icons-material";

export default function BookDetail() {
  const { userData } = useAuth();
  console.log(userData)
  const location = useLocation();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "reviews"), where("book", "==", location.state.ISBN));
    
  }, []);

  const { title, author, imageSource, description } = location.state;
  let [tabValue, setTabValue] = useState("0");
  let [ratingValue, setRatingValue] = useState<number | null>(null);
  let [buttonValue, setButtonValue] = useState(true);
  let [review, setReview] = useState("");


  console.log(userData);

  const handleTabChange = () => {
    if (tabValue == "0") {
      setTabValue("1");
    } else {
      setTabValue("0");
    }
  };

  const handleRatingChange = (_: Event, value: number) => {
    console.log(ratingValue);
    setRatingValue(value);
    if (value == null) {
      setButtonValue(true);
    } else {
      setButtonValue(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "reviews"), {
        user: userData.uid,
        rating: ratingValue,
        reviewText: review,
        book: location.state.ISBN
      });
      setReview("");
      setRatingValue(null);
      setButtonValue(true);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Box boxShadow={4} p="16px">
      <Stack width="100%" height="720px" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2} justifyContent="content">
          <img height="500px" src={imageSource} alt="ops" />
          <Stack justifyContent="space-evenly" alignItems="center" width="600px" direction="column" height="500px">
            <Stack justifyContent="center">
              <Typography fontWeight="bold" variant="h3">
                {title}
              </Typography>
              <Typography variant="h4">{author}</Typography>
              <Typography variant="body1">{description}</Typography>
            </Stack>
          </Stack>
        </Stack>

        <FormControl>
          <Rating size="large" name="bookRating" value={ratingValue} onChange={handleRatingChange} />
          <TextareaAutosize 
            minRows={4} 
            style={{ width: 550 }} 
            aria-label="Book review" 
            placeholder="Review..." 
            value={review}
            onChange={(e) => setReview(e.currentTarget.value)}
            />
          <Button disabled={buttonValue} variant="outlined" sx={{marginTop:"10px", width:"30%", marginLeft:"auto", marginRight:"auto"}} onClick={handleSubmit}>Submit</Button>
        </FormControl>

        <TabContext value={String(tabValue)}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange}>
              <Tab label="Verified reviews" value="0" />
              <Tab label="User reviews" value="1" />
            </TabList>
          </Box>
          <TabPanel value="0">
            <ReviewBox userName={"Amalie"} rating={5} text="Jeg likte boken" />
            <ReviewBox userName={"Erik"} rating={4} text="Fakker lowkey med boka as" />
            <ReviewBox userName={"Kjetil"} rating={3} text="Jeg likte boken" />
          </TabPanel>
          <TabPanel value="1">
            <ReviewBox userName={"Armands"} rating={1} text="Jeg hater boken" />
            <ReviewBox userName={"Tirza"} rating={2} text="Jeg likte ikke boken" />
            <ReviewBox userName={"Lukas"} rating={5} text="Grov bok as" />
            <ReviewBox userName={"Knut"} rating={5} text="Fin bok" />
          </TabPanel>
        </TabContext>
      </Stack>
    </Box>
  );
}
