import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import AddBook from "../components/AddBook";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";

describe("AddBook", () => {
  it("Renders input field and button", async () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <AddBook />
        </MemoryRouter>
      </Provider>
    );
    const bookInput = getByTestId("addBookInputField");
    fireEvent.change(bookInput, { target: { value: "9780131103627" } });
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    await waitFor(() => {
      expect(getByText("Henter bokdata...")).toBeInTheDocument();
    });
    await waitFor(
      () => {
        expect(getByText("Bok lastet opp!")).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    screen.debug();

    // check if App components renders headline
  });
}, 20000);
