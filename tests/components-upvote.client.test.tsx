import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useFormState, useFormStatus } from "react-dom";

import Upvote, { SubmitButton } from "../components/upvote.client";

vi.mock("react-dom", () => ({
  useFormState: vi.fn(),
  useFormStatus: vi.fn(),
}));

vi.mock("@/actions", () => ({
  upvoteAction: () => console.log("upvoteAction has been called"),
}));

describe("Upvote Component", () => {
  const mockProps = { id: "1", voting: 10 };

  beforeEach(() => {
    (useFormState as Mock).mockReturnValue([
      { voting: mockProps.voting },
      vi.fn(),
    ]);
    (useFormStatus as Mock).mockReturnValue({ pending: false });
  });

  it("renders the voting count", () => {
    render(<Upvote {...mockProps} />);
    expect(screen.getByText(mockProps.voting)).toBeInTheDocument();
  });

  it("renders the star icon", () => {
    render(<Upvote {...mockProps} />);
    const starIcon = screen.getByAltText("star icon");
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute("src", "/static/icons/star.svg");
  });

  it('renders the submit button with "Up vote!" text when not pending', () => {
    render(<Upvote {...mockProps} />);
    const button = screen.getByRole("button", { name: /up vote!/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("renders the loading spinner when pending", () => {
    (useFormStatus as Mock).mockReturnValue({ pending: true });
    render(<SubmitButton />);
    const spinner = screen.getByAltText("Loading");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute("src", "/static/icons/loading-spinner.svg");
  });

  it("disables the submit button when pending", () => {
    (useFormStatus as Mock).mockReturnValue({ pending: true });
    render(<SubmitButton />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("renders the correct button content based on pending state", () => {
    (useFormStatus as Mock).mockReturnValueOnce({ pending: false });
    const { rerender } = render(<SubmitButton />);
    expect(screen.getByText(/up vote!/i)).toBeInTheDocument();

    (useFormStatus as Mock).mockReturnValueOnce({ pending: true });
    rerender(<SubmitButton />);
    expect(screen.getByAltText("Loading")).toBeInTheDocument();
  });
});
