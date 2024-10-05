import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import RootLayout from "@/app/layout";

vi.mock("next/font/google", () => ({
  IBM_Plex_Sans: vi.fn(() => ({ className: "font-ibm-plex-sans" })),
}));

describe("RootLayout", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("applies the correct class name from IBM_Plex_Sans", () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    const body = container.querySelector("body");
    expect(body).toHaveClass("font-ibm-plex-sans");
  });
});
