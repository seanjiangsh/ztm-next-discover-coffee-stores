import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Loading from "@/app/coffee-store/[id]/loading";

describe("Loading Component", () => {
  it("renders loading spinner image", () => {
    render(<Loading />);
    const loadingImage = screen.getByAltText("Loading...");
    expect(loadingImage).toBeInTheDocument();
    expect(loadingImage).toHaveAttribute(
      "src",
      "/static/icons/loading-spinner.svg"
    );
  });

  it("renders loading text", () => {
    render(<Loading />);
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });

  it("applies correct classes to elements", () => {
    render(<Loading />);
    const container = screen.getByRole("img").parentElement;
    expect(container).toHaveClass(
      "min-h-screen flex justify-center items-center relative"
    );
    const loadingImage = screen.getByAltText("Loading...");
    expect(loadingImage).toHaveClass("animate-spin");
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toHaveClass("ml-4 text-lg");
  });
});
