import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import LandingPageBookList from "../components/LandingPageBookList";
import LandingPage from "../pages/home/LandingPage";
import { Provider } from "react-redux";
import { store } from "../redux/store";

describe("Test LandingPageList component", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    </Provider>
  );

  it("Should activate darkmode when switch is switched", () => {
    const checkbox = screen.getAllByRole("checkbox");
    expect(checkbox).toNotBeChecked();
    screen.debug();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    screen.debug();
  });
});
