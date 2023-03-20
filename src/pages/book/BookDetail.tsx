import { Button, FormControl, Rating, Tab, Tabs, TextareaAutosize, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { TabPanel, TabContext, TabList, TabPanelClassKey } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReviewBox from "../../components/ReviewBox";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { collection, addDoc, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Margin } from "@mui/icons-material";
import { getAuth } from "firebase/auth";
import { Review } from "../../types/Review";
import StarIcon from "@mui/icons-material/Star";

export default function BookDetail() {
  const { userData } = useAuth();
  const location = useLocation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [verifiedReviews, setVerifiedReviews] = useState<Review[]>([]);
  const [verifiedAverage, setVerifiedAverage] = useState(0);
  const [average, setAverage] = useState(0);
  const auth = getAuth();

  useEffect(() => {
    const getInitialData = async () => {
      let reviewData: Review[] = [];
      let verifiedReviewData: Review[] = [];
      const q = query(collection(db, "reviews"), where("book", "==", location.state.ISBN));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (docParam) => {
        // Ref to the reviewers user document
        const userRef = doc(db, "users", docParam.data().user);
        let isVerified = false;
        // Get the reviewers users document
        await getDoc(userRef).then((userDoc) => {
          if (userDoc.exists()) {
            // Is the user verified?
            isVerified = userDoc.data().verified;
          }
        });
        // Add the review to verified list if user is verified
        if (isVerified) {
          verifiedReviewData.push(docParam.data() as Review);
          setVerifiedReviews(verifiedReviewData);
        } else {
          reviewData.push(docParam.data() as Review);
          setReviews(reviewData);
        }
      });
    };
    getInitialData();
  }, []);
  // Dette er veldig stygt, men det funker tror jeg
  useEffect(() => {
    var verifiedReviewTotal = 0;
    for (let i = 0; i < verifiedReviews.length; i++) {
      verifiedReviewTotal += verifiedReviews[i].rating;
    }
    setVerifiedAverage(Math.round((verifiedReviewTotal / verifiedReviews.length) * 10) / 10);
    var reviewTotal = 0;
    for (let i = 0; i < reviews.length; i++) {
      reviewTotal += reviews[i].rating;
    }
    setAverage(Math.round((reviewTotal / reviews.length) * 10) / 10);
  }, [reviews, verifiedReviews]);

  const { title, author, imageSource, description } = location.state;
  let [tabValue, setTabValue] = useState("0");
  let [ratingValue, setRatingValue] = useState<number | null>(null);
  let [buttonValue, setButtonValue] = useState(true);

  const darkmode = useSelector((state) => state.darkmode.value);
  let [review, setReview] = useState("");

  const handleTabChange = () => {
    if (tabValue == "0") {
      setTabValue("1");
    } else {
      setTabValue("0");
    }
  };

  const handleRatingChange = (_: Event, value: number) => {
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
        email: userData.email,
        rating: ratingValue,
        reviewText: review,
        book: location.state.ISBN,
      });
      setReview("");
      setRatingValue(null);
      setButtonValue(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box boxShadow={4} p="16px" bgcolor={darkmode ? "#3e3e42" : "#fffff"}>
      <Stack width="100%" height="1920px" alignItems="center" bgcolor={darkmode ? "#3e3e42" : "#fffff"}>
        <Stack direction="row" alignItems="center" spacing={2} justifyContent="content">
          <img height="500px" src={imageSource} alt="ops" />
          <Stack justifyContent="space-evenly" alignItems="center" width="600px" direction="column" height="500px">
            <Stack justifyContent="center">
              <Typography color={darkmode ? "white" : "black"} fontWeight="bold" variant="h3">
                {title}
              </Typography>
              <Typography color={darkmode ? "white" : "black"} variant="h4">
                {author}
              </Typography>
              <Typography color={darkmode ? "white" : "black"} variant="body1">
                {description}
              </Typography>
              <Typography color={darkmode ? "white" : "black"} variant="h4">
                Profesjonelle reviews: {verifiedAverage}, normie reviews: {average}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <FormControl>
          <Rating
            size="large"
            name="bookRating"
            value={ratingValue}
            onChange={handleRatingChange}
            disabled={auth.currentUser == null}
          />
          <TextareaAutosize
            minRows={4}
            style={{ width: 550 }}
            aria-label="Book review"
            placeholder="Review..."
            value={review}
            onChange={(e) => setReview(e.currentTarget.value)}
          />
          <Button
            disabled={buttonValue}
            variant="outlined"
            sx={{ marginTop: "10px", width: "30%", marginLeft: "auto", marginRight: "auto" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </FormControl>
        <TabContext value={String(tabValue)}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange} indicatorColor="primary" textColor={"secondary"}>
              <Tab label="Verified reviews" value="0" />
              <Tab label="User reviews" value="1" />
            </TabList>
          </Box>
          <TabPanel value="0">
            {verifiedReviews &&
              verifiedReviews.map((rev: Review) => {
                return <ReviewBox userName={rev.email} rating={rev.rating} text={rev.reviewText} />;
              })}
          </TabPanel>
          <TabPanel value="1">
            {reviews &&
              reviews.map((rev: Review) => {
                return <ReviewBox userName={rev.email} rating={rev.rating} text={rev.reviewText} />;
              })}
          </TabPanel>
        </TabContext>
      </Stack>
    </Box>
  );
}
function floor(b: number): React.SetStateAction<number> {
  throw new Error("Function not implemented.");
}
