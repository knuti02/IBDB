import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function Root() {
  const [theme, settheme] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: theme ? "dark" : "light",
      primary: {
        main: theme ? "#3e3e42" : "#FFFFFF",
      },
    },
  });
  // const handleChange = (event) => {
  //   settheme(event.target.checked);
  // };

  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={theme ? "#3e3e42" : "#fffff"} width="100%" top={0} margin={0} height="100%">
          <Navbar theme={theme} settheme={settheme} />
          <Outlet />
        </Box>
      </ThemeProvider>
    </Provider>
  );
}
