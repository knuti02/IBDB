import { useState, useEffect } from "react";
import * as React from "react";

import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/Logo_ibdb.png";

import { Button, Box, Icon, Switch, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { Stack } from "@mui/system";
import Search from "./components/Search";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userData";
import { setDarkmode } from "../redux/darkmode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import WbSunny from "@mui/icons-material/WbSunny";

function Navbar(props) {
  const { theme, settheme } = props;

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkmode = useSelector((state) => state.darkmode.value);

  function logOut(auth) {
    signOut(auth);
    setAdmin(false);
    navigate("/login");
  }
  const handleChange = (event) => {
    dispatch(setDarkmode(theme ? false : true));
    settheme(event.target.checked);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (auth.currentUser?.uid == "kdoILYYTDuWy1izQOTauJxP2rDw1") {
        //check if its the admins user id
        setAdmin(true);
        dispatch(setUserData({ ...user, isAdmin: true }));
      } else {
        dispatch(setUserData({ ...user, isAdmin: false }));
      }
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AppBar
      sx={{
        color: "palette.background.default",
        backgroundColor: "palette.background.default",
      }}
      position="sticky"
    >
      <Stack
        bgcolor="palette.background.default"
        marginLeft="10px"
        alignItems="center"
        justifyContent="space-between"
        direction={"row"}
        height="70px"
        spacing={3}
        sx={{
          display: "flex",
          flex: "1",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link
            to=""
            style={{
              textDecoration: "none",
            }}
          >
            <img src={logo} alt="error under lasting av logo" width="100px" />
          </Link>
          <Search />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button variant="contained" onClick={() => navigate("/toplists")}>
            Topplister
          </Button>
          <Stack direction="row" alignItems="center">
            {darkmode ? <NightlightIcon /> : <WbSunny />}
            <Switch checked={theme} color="success" onChange={handleChange} />
          </Stack>
          {user ? (
            <Button onClick={() => logOut(auth)}>Sign out</Button>
          ) : (
            <>
              <Button onClick={() => navigate("/login")}>Sign in</Button>
              <Button onClick={() => navigate("/signup")}>Sign up</Button>
            </>
          )}
          {admin ? <Button onClick={() => navigate("/admin")}>Admin page</Button> : null}
        </Box>
      </Stack>
    </AppBar>
  );
}
export default Navbar;
