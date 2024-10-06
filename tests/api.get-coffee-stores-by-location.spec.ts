import { describe, it, expect, vi, Mock } from "vitest";
import { NextRequest } from "next/server";

import { GET } from "@/app/api/get-coffee-stores-by-location/route";
import { fetchCoffeeStores } from "@/lib/coffee-stores";

vi.mock("@/lib/coffee-stores");

describe("GET /api/get-coffee-stores-by-location", () => {
  it("should return 400 if latLong is missing", async () => {
    const request = {
      nextUrl: {
        searchParams: new URLSearchParams(),
      },
    } as unknown as NextRequest;

    const response = await GET(request);
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.message).toBe("Missing required query parameter 'latLong'");
  });

  it("should return coffee stores if latLong is provided", async () => {
    const mockData = [{ id: 1, name: "Coffee Store" }];
    (fetchCoffeeStores as Mock).mockResolvedValue(mockData);

    const request = {
      nextUrl: {
        searchParams: new URLSearchParams({
          latLong: "40.7128,-74.0060",
          limit: "5",
        }),
      },
    } as unknown as NextRequest;

    const response = await GET(request);
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual(mockData);
  });

  it("should return 500 if fetchCoffeeStores throws an error", async () => {
    (fetchCoffeeStores as Mock).mockRejectedValue(new Error("Fetch error"));

    const request = {
      nextUrl: {
        searchParams: new URLSearchParams({
          latLong: "40.7128,-74.0060",
          limit: "5",
        }),
      },
    } as unknown as NextRequest;

    const response = await GET(request);
    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json.message).toBe("Error while fetching coffee stores");
  });
});
