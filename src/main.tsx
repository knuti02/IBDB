import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import LandingPage from "./pages/home/LandingPage";
import Admin from "./pages/admin/Admin";
import BookDetail from "./pages/book/BookDetail";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import SearchResult from "./pages/search/SearchResult";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index path="" element={<LandingPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element= {<LoginPage />} />
      <Route path="/search/:result" element={<SearchResult />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
