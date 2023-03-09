import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/Logo_ibdb.png"
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Stack } from "@mui/system";
import Search from "./components/Search"

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
          <button onClick={() => signOut(auth)}>Sign out</button>
        ) : (
          <button onClick={() => navigate('/login')}>Sign in</button>
        )
      }
        <Search />
      </Stack>
    </AppBar>
  );
}
export default Navbar;

