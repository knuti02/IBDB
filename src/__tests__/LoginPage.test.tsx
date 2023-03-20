import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import LoginPage from "../components/LoginPage";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";

describe("LoginPage", () => {
  it("Should should log in", async () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = getByTestId("emailInputField");
    fireEvent.change(emailInput, { target: { value: "test1@gmail.com" } });
    const passwordInput = getByTestId("passwordInputField");
    fireEvent.change(passwordInput, { target: { value: "Passord123" } });
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    await waitFor(
      () => {
        expect(getByText("Signed in successfully!")).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    screen.debug();
  });

  it("Should should not log in", async () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = getByTestId("emailInputField");
    fireEvent.change(emailInput, { target: { value: "test1@gmail.com" } });
    const passwordInput = getByTestId("passwordInputField");
    fireEvent.change(passwordInput, { target: { value: "" } });
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    await waitFor(
      () => {
        expect(getByText("Failed to sign in. Please try again.")).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    screen.debug();
  });
}, 20000);
