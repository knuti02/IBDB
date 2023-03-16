import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo_ibdb.png";
import { Button, Switch } from "@mui/material";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Stack } from "@mui/system";
import Search from "./components/Search";

function Navbar(props) {
  const { theme, settheme } = props;

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  function logOut(auth) {
    signOut(auth);
    setAdmin(false);
    navigate("/login");
  }
  const handleChange = (event) => {
    settheme(event.target.checked);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (auth.currentUser?.uid == "kdoILYYTDuWy1izQOTauJxP2rDw1") {
        //check if its the admins user id
        setAdmin(true);
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
      >
        <Link
          to=""
          style={{
            textDecoration: "none",
          }}
        >
          <img src={logo} alt="error under lasting av logo" width="100px" />
        </Link>
        <Switch checked={theme} color="success" onChange={handleChange} />
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
