import { describe, it, expect, vi } from "vitest";

import { fetchCoffeeStores, fetchCoffeeStore } from "@/lib/coffee-stores";

vi.mock("unsplash-js", () => ({
  createApi: vi.fn(() => ({
    search: {
      getPhotos: vi.fn(() =>
        Promise.resolve({
          response: {
            results: [{ urls: { small: "http://test.com/image.jpg" } }],
          },
        })
      ),
    },
  })),
}));

describe("fetchCoffeeStores", () => {
  it("should fetch coffee stores and return transformed data", async () => {
    const mockMapboxResponse = {
      features: [
        {
          id: "1",
          properties: { address: "123 Test St" },
          text: "Test Coffee Store",
        },
      ],
    };

    vi.spyOn(global, "fetch").mockImplementation((URL) => {
      const url = URL.toString();
      if (url.startsWith("https://api.mapbox.com")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockMapboxResponse),
        } as Response);
      } else {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve([]),
        } as Response);
      }
    });
    const result = await fetchCoffeeStores();
    const expectedResults = [
      {
        id: "1",
        address: "123 Test St",
        name: "Test Coffee Store",
        imgUrl: "http://test.com/image.jpg",
      },
    ];

    expect(result).toEqual(expectedResults);
  });

  it("should return an empty array if an error occurs", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(
      new Error("Error fetching data")
    );
    const result = await fetchCoffeeStores();
    expect(result).toEqual([]);
  });
});
