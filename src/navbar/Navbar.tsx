import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo_ibdb.png";
import { Button } from "@mui/material";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Stack } from "@mui/system";
import Search from "./components/Search";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userData";

function Navbar() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logOut(auth) {
    signOut(auth);
    setAdmin(false);
    navigate("/login");
  }

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
        color: "#FFFFFF",
        backgroundColor: "#FFFFFF",
      }}
      position="sticky"
    >
      <Stack
        marginLeft="10px"
        alignItems="center"
        justifyContent="space-between"
        direction={"row"}
        height="70px"
        spacing={3}
      >
        <Link
          to=""
          style={{
            textDecoration: "none",
          }}
        >
          <img src={logo} alt="error under lasting av logo" width="100px" />
        </Link>
        {user ? (
          <Button variant="outlined" onClick={() => logOut(auth)}>
            Sign out
          </Button>
        ) : (
          <>
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Sign in
            </Button>
            <Button variant="outlined" onClick={() => navigate("/signup")}>
              Sign up
            </Button>
          </>
        )}
        {admin ? (
          <Button variant="outlined" onClick={() => navigate("/admin")}>
            Admin page
          </Button>
        ) : null}

        <Search />
      </Stack>
    </AppBar>
  );
}
export default Navbar;
