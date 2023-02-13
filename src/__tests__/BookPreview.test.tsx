import { describe, it, expect } from "vitest";
import { getByAltText, render, screen } from "@testing-library/react";

import BookPreview from "../components/BookPreview";

describe("Test BookPreview component", () => {
  it("Should render BookPreview with passed props", () => {
    const {getByText} = render(<BookPreview title="Bok1" author="Forfatter1" imageSource="https://cdn.vox-cdn.com/thumbor/p-gGrwlaU4rLikEAgYhupMUhIJc=/0x0:1650x2475/1200x0/filters:focal(0x0:1650x2475):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/13757614/817BsplxI9L.jpg" />);

    expect(getByText("Bok1")).toBeInTheDocument()
        expect(getByText("Forfatter1")).toBeInTheDocument()
        const testImage = document.querySelector("img") as HTMLImageElement;
        expect(testImage.alt).toContain("Noe feil skjedde")

  });

});
