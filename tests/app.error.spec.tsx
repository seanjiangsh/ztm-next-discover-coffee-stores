import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import ErrorComponent from "@/app/error";

describe("Error Component", () => {
  const mockError = new Error("Test error");
  const mockReset = vi.fn();

  beforeEach(() => {
    render(<ErrorComponent error={mockError} reset={mockReset} />);
  });

  it('renders "Oops, something went wrong!" message', () => {
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe("Oops, something went wrong!");
  });

  it('renders "Try again" button', () => {
    const button = screen.getByRole("button", { name: /Try again/i });
    expect(button).toBeInTheDocument();
  });

  it('calls reset function when "Try again" button is clicked', () => {
    const button = screen.getByRole("button", { name: /Try again/i });
    fireEvent.click(button);
    expect(mockReset).toHaveBeenCalled();
  });

  it("logs the error to the console", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    render(<ErrorComponent error={mockError} reset={mockReset} />);
    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
  });
});
