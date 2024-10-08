import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import CoffeeStores from "@/components/coffee-stores";
import { CoffeeStoreType } from "@/types";

describe("CoffeeStores Component", () => {
  const mockStores: Array<CoffeeStoreType> = [
    {
      id: "1",
      name: "Store 1",
      address: "123 Main St",
      imgUrl: "/store1.jpg",
      voting: 0,
    },
    {
      id: "2",
      name: "Store 2",
      address: "456 Elm St",
      imgUrl: "/store2.jpg",
      voting: 0,
    },
  ];

  it("renders the title", () => {
    render(<CoffeeStores title="Test Title" stores={mockStores} />);
    const titleElement = screen.getByRole("heading", { level: 2 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe("Test Title");
  });

  it("renders the Cards component with stores", () => {
    render(<CoffeeStores title="Test Title" stores={mockStores} />);
    const cardElements = screen.getAllByRole("link");
    expect(cardElements.length).toBe(mockStores.length);
    cardElements.forEach((card, index) => {
      expect(card).toHaveAttribute(
        "href",
        `/coffee-store/${mockStores[index].id}`
      );
    });
  });
});
