import { beforeEach, describe, expect, it, vi, Mock } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import LocationCoffeeStores from "@/components/location-coffee-stores.client";
import { useTrackLocation } from "@/hooks/use-track-location";

// Mock useTrackLocation hook
vi.mock("@/hooks/use-track-location", () => ({
  useTrackLocation: vi.fn(),
}));

describe("LocationCoffeeStores Component - getCoffeeStores", () => {
  const mockHandleTrackLocation = vi.fn();
  const mockUseTrackLocation = {
    handleTrackLocation: mockHandleTrackLocation,
    isFindingLocation: false,
    longLat: null,
    locationErrorMsg: "",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useTrackLocation as Mock).mockReturnValue(mockUseTrackLocation);
    localStorage.clear();
  });

  it("fetches coffee stores based on default location when longLat is null", async () => {
    const mockCoffeeStores = [
      { id: "1", name: "Store 1", address: "Address 1" },
      { id: "2", name: "Store 2", address: "Address 2" },
    ];
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockCoffeeStores) })
    ) as Mock;

    render(<LocationCoffeeStores />);
    await waitFor(() => {
      const storeTitle = screen.getByText(/Toronto Stores/i);
      expect(storeTitle).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/get-coffee-stores-by-location")
    );
  });

  it("fetches coffee stores based on longLat when available", async () => {
    (useTrackLocation as Mock).mockReturnValue({
      ...mockUseTrackLocation,
      longLat: "123,456",
    });
    const mockCoffeeStores = [
      { id: "1", name: "Store 1", address: "Address 1" },
      { id: "2", name: "Store 2", address: "Address 2" },
    ];
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockCoffeeStores) })
    ) as Mock;

    render(<LocationCoffeeStores />);
    await waitFor(() => {
      const storeTitle = screen.getByText(/Stores near me/i);
      expect(storeTitle).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        "/api/get-coffee-stores-by-location?latLong=123,456"
      )
    );
  });

  it("stores fetched coffee stores in localStorage when longLat is available", async () => {
    (useTrackLocation as Mock).mockReturnValue({
      ...mockUseTrackLocation,
      longLat: "123,456",
    });
    const mockCoffeeStores = [
      { id: "1", name: "Store 1", address: "Address 1" },
      { id: "2", name: "Store 2", address: "Address 2" },
    ];
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockCoffeeStores) })
    ) as Mock;

    render(<LocationCoffeeStores />);
    await waitFor(() => {
      const storeTitle = screen.getByText(/Stores near me/i);
      expect(storeTitle).toBeInTheDocument();
    });
    expect(localStorage.getItem("coffeeStores")).toEqual(
      JSON.stringify(mockCoffeeStores)
    );
  });

  it("does not fetch coffee stores if they are already stored in localStorage", async () => {
    const mockCoffeeStores = [
      { id: "1", name: "Store 1", address: "Address 1" },
      { id: "2", name: "Store 2", address: "Address 2" },
    ];
    localStorage.setItem("coffeeStores", JSON.stringify(mockCoffeeStores));
    global.fetch = vi.fn();

    render(<LocationCoffeeStores />);
    await waitFor(() => {
      const storeTitle = screen.getByText(/Stores near me/i);
      expect(storeTitle).toBeInTheDocument();
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("clears stored coffee stores and location when storesNearbyButton is clicked", async () => {
    const mockCoffeeStores = [
      { id: "1", name: "Store 1", address: "Address 1" },
      { id: "2", name: "Store 2", address: "Address 2" },
    ];
    localStorage.setItem("coffeeStores", JSON.stringify(mockCoffeeStores));
    global.fetch = vi.fn();

    render(<LocationCoffeeStores />);
    await waitFor(() => {
      const storeTitle = screen.getByText(/Stores near me/i);
      expect(storeTitle).toBeInTheDocument();
    });

    const storesNearbyButton = screen.getByText(/View stores nearby/i);
    act(() => storesNearbyButton.click());
    expect(localStorage.getItem("coffeeStores")).toBeNull();
    expect(mockHandleTrackLocation).toHaveBeenCalled();
  });

  it("should display locating text when isFindingLocation is true", async () => {
    (useTrackLocation as Mock).mockReturnValue({
      ...mockUseTrackLocation,
      isFindingLocation: true,
    });

    render(<LocationCoffeeStores />);
    await waitFor(() => {
      const locatingText = screen.getByText(/Locating.../i);
      expect(locatingText).toBeInTheDocument();
    });
  });

  it("log error message when fetching coffee stores fails", async () => {
    global.fetch = vi.fn(() =>
      Promise.reject(new Error("Error fetching data"))
    );
    const consoleErrorSpy = vi.spyOn(console, "error");

    render(<LocationCoffeeStores />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error while fetching coffee stores",
        expect.any(Error)
      );
    });
  });

  it("displays error message when location tracking fails", async () => {
    (useTrackLocation as Mock).mockReturnValue({
      ...mockUseTrackLocation,
      locationErrorMsg: "Error finding location",
    });
    render(<LocationCoffeeStores />);

    await waitFor(() => {
      const errorMsg = screen.getByText(/Error: Error finding location/i);
      expect(errorMsg).toBeInTheDocument();
    });
  });
});
