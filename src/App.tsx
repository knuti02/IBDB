import Navbar from "./navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import { Stack } from "@mui/system";
import { createTheme, Switch, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";

function App() {
  const [theme, settheme] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: theme ? "dark" : "light",
    },
  });
  const handleChange = (event) => {
    settheme(event.target.checked);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar />
      <Stack
        spacing={4}
        direction="row"
        margin={0}
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="720px"
      >
        <Outlet />
        <label>Dark Mode</label>
        <Switch checked={theme} color="success" onChange={handleChange} />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
