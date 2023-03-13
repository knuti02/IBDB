import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function Root() {
  return (
    <Provider store={store}>
      <Box width="100%" top={0} margin={0} height="100%">
        <Navbar />
        <Outlet />
      </Box>
    </Provider>
  );
}
