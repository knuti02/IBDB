import React from "react";
import LandingPageBookList from "../../components/LandingPageBookList";
import LandingPageHeader from "../../components/LandingPageHeader";
import SignUpPage from "../../components/SignUpPage";

export default function LandingPage() {
  return (
    <div>
      <LandingPageHeader />
      <LandingPageBookList />
    </div>
  );
}
