import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useTrackLocation } from "@/hooks/use-track-location";

describe("useTrackLocation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useTrackLocation());

    expect(result.current.longLat).toBe("");
    expect(result.current.isFindingLocation).toBe(false);
    expect(result.current.locationErrorMsg).toBe("");
  });

  it("should update longLat and isFindingLocation on successful location retrieval", async () => {
    const mockPosition = {
      coords: { latitude: 51.1, longitude: 45.3 },
    };

    const getCurrentPositionMock = vi.fn((success) => success(mockPosition));
    vi.stubGlobal("navigator", {
      geolocation: { getCurrentPosition: getCurrentPositionMock },
    });

    const { result } = renderHook(() => useTrackLocation());

    await act(async () => {
      result.current.handleTrackLocation();
    });

    expect(result.current.longLat).toBe("45.3,51.1");
    expect(result.current.isFindingLocation).toBe(false);
    expect(result.current.locationErrorMsg).toBe("");
  });

  it("should set error message if geolocation is not supported", async () => {
    vi.stubGlobal("navigator", { geolocation: undefined });

    const { result } = renderHook(() => useTrackLocation());

    await act(async () => {
      result.current.handleTrackLocation();
    });

    expect(result.current.longLat).toBe("");
    expect(result.current.isFindingLocation).toBe(false);
    expect(result.current.locationErrorMsg).toBe(
      "Geolocation is not supported by your browser"
    );
  });

  it("should set error message on location retrieval failure", async () => {
    const getCurrentPositionMock = vi.fn((success, error) => error());
    vi.stubGlobal("navigator", {
      geolocation: { getCurrentPosition: getCurrentPositionMock },
    });

    const { result } = renderHook(() => useTrackLocation());

    await act(async () => {
      result.current.handleTrackLocation();
    });

    expect(result.current.longLat).toBe("");
    expect(result.current.isFindingLocation).toBe(false);
    expect(result.current.locationErrorMsg).toBe(
      "Unable to retrieve your location"
    );
  });
});
