import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Page from "@/app/page";

// Mock useFormState and useFormStatus
vi.mock("react-dom", () => ({
  useFormState: vi.fn(() => [
    { id: "testID", data: "" }, // Mocked state
    vi.fn(), // Mocked dispatch function
  ]),
  useFormStatus: vi.fn(() => ({
    isSubmitting: false,
    isValid: true,
  })),
}));

describe("Home Page", () => {
  beforeEach(() => {
    render(<Page />);
  });

  it('renders "Coffee Connoisseur" within H1 banner', () => {
    const h1 = screen.getByRole("heading", { level: 1 });
    const spans = h1.querySelectorAll("span");
    expect(spans.length).toBeGreaterThan(0);
    spans.forEach((span) => {
      expect(span).toBeInTheDocument();
      expect(span.textContent).toMatch(/Coffee|Connoisseur/i);
    });
  });

  it('renders "hero image" within Image component', () => {
    const image = screen.getByRole("img", { name: /hero image/i });
    expect(image).toBeInTheDocument();
  });

  it('renders "Discover your local coffee shops!" within P banner', () => {
    const p = screen.getByRole("paragraph");
    expect(p).toBeInTheDocument();
    expect(p.textContent).toMatch(/Discover your local coffee shops!/i);
  });

  it('renders "Stores Nearby" button', () => {
    const button = screen.getByRole("button", { name: /Stores Nearby/i });
    expect(button).toBeInTheDocument();
  });
});
