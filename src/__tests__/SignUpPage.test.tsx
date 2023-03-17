import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import SignUpPage from "../components/SignUpPage";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";

describe("SignUpPage", () => {
  it("Should add user", async () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );
    const emailInput = getByTestId("emailInputField");
    fireEvent.change(emailInput, { target: { value: "armand@gmail.com" } });
    const passwordInput = getByTestId("passwordInputField");
    fireEvent.change(passwordInput, { target: { value: "123456789" } });
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    await waitFor(
      () => {
        expect(getByText("Bruker lagt til")).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    screen.debug();

    // check if App components renders headline
  });

  it("Shouldnt add user because of no input", async () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );
    const emailInput = getByTestId("emailInputField");
    fireEvent.change(emailInput, { target: { value: "" } });
    const passwordInput = getByTestId("passwordInputField");
    fireEvent.change(passwordInput, { target: { value: "" } });
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    await waitFor(
      () => {
        expect(getByText("Invalid email format")).toBeInTheDocument();
        expect(getByText("Password must be at least 8 characters")).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
    screen.debug();
  });

  it("Shouldnt add user because of wrong email", async () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );
    const emailInput = getByTestId("emailInputField");
    fireEvent.change(emailInput, { target: { value: "iamcool" } });
    const passwordInput = getByTestId("passwordInputField");
    fireEvent.change(passwordInput, { target: { value: "Password1234" } });
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    await waitFor(
      () => {
        expect(getByText("Invalid email format")).toBeInTheDocument();
        expect(getByText("Password must be at least 8 characters")).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
    screen.debug();
  });

  it("Shouldnt add user because of wrong password", async () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );
    const emailInput = getByTestId("emailInputField");
    fireEvent.change(emailInput, { target: { value: "thisIsValid@email.com" } });
    const passwordInput = getByTestId("passwordInputField");
    fireEvent.change(passwordInput, { target: { value: "!v" } });
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    await waitFor(
      () => {
        expect(getByText("Invalid email format")).toBeInTheDocument();
        expect(getByText("Password must be at least 8 characters")).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
    screen.debug();
  });
}, 20000);
