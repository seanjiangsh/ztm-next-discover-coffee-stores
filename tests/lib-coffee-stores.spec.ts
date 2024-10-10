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
          properties: {},
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
        address: "",
        name: "Test Coffee Store",
        imgUrl: "http://test.com/image.jpg",
      },
    ];

    expect(result).toEqual(expectedResults);
  });

  it("should return an empty array if no data is returned", async () => {
    vi.spyOn(global, "fetch").mockImplementation((URL) => {
      if (URL.toString().startsWith("https://api.mapbox.com")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({}),
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
    expect(result).toEqual([]);
  });

  it("should return an empty array if an error occurs", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(
      new Error("Error fetching data")
    );
    const result = await fetchCoffeeStores();
    expect(result).toEqual([]);
  });
});

describe("fetchCoffeeStore", () => {
  it("should fetch a coffee store and return transformed data", async () => {
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
    const result = await fetchCoffeeStore("1");
    const expectedResults = {
      id: "1",
      address: "123 Test St",
      name: "Test Coffee Store",
      imgUrl:
        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=400",
    };

    expect(result).toEqual(expectedResults);
  });

  it("should return null if no data is returned", async () => {
    vi.spyOn(global, "fetch").mockImplementation((URL) => {
      if (URL.toString().startsWith("https://api.mapbox.com")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ features: [] }),
        } as Response);
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve([]),
      } as Response);
    });
    const result = await fetchCoffeeStore("1");
    expect(result).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(
      new Error("Error fetching data")
    );
    const result = await fetchCoffeeStore("1");
    expect(result).toBeNull();
  });
});
