import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Page from "@/app/coffee-store/page";

describe("Page Component", () => {
  it("renders the Coffee Store text", () => {
    render(<Page />);
    const textElement = screen.getByText(/Coffee Store/i);
    expect(textElement).toBeInTheDocument();
  });
});
