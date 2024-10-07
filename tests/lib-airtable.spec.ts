import { describe, it, expect, vi } from "vitest";

import { table, createCoffeeStore, updateCoffeeStore } from "@/lib/airtable";
import { AirtableRecordType, CoffeeStoreType } from "@/types";

vi.mock("airtable", async () => {
  return {
    default: vi.fn(() => ({
      base: vi.fn((baseId: string) => {
        console.log({ baseId });
        return vi.fn((table: string) => {
          console.log({ table });
          return {
            select: vi.fn(() => ({ firstPage: vi.fn().mockResolvedValue([]) })),
            create: vi.fn(),
            update: vi.fn(),
          };
        });
      }),
    })),
  };
});

describe("createCoffeeStore", () => {
  it("should create a new coffee store if it does not exist", async () => {
    const coffeeStore: CoffeeStoreType = {
      id: "1",
      name: "Test Store",
      address: "123 Test St",
      imgUrl: "http://test.com/image.jpg",
      voting: 0,
    };

    const selectSpy = vi.spyOn(table, "select");
    const createResults = [
      {
        id: "testRecordId",
        recordId: "rec123",
        fields: coffeeStore,
      },
    ] as any;
    const createSpy = vi
      .spyOn(table, "create")
      .mockResolvedValue(createResults);
    const result = await createCoffeeStore(coffeeStore);
    expect(selectSpy).toHaveBeenCalled();
    expect(createSpy).toHaveBeenCalledWith([{ fields: coffeeStore }]);

    const expectedResults = [{ recordId: "testRecordId", ...coffeeStore }];
    expect(result).toEqual(expectedResults);
  });

  it("should return existing coffee store if it exists", async () => {
    const coffeeStore: CoffeeStoreType = {
      id: "1",
      name: "Test Store",
      address: "123 Test St",
      imgUrl: "http://test.com/image.jpg",
      voting: 0,
    };

    // Mock the select function to return a record
    const selectResults = [
      {
        id: "testRecordId",
        recordId: "rec123",
        fields: coffeeStore,
      },
    ];
    const firstPageImpl = {
      firstPage: vi.fn().mockResolvedValue(selectResults),
    } as any;
    const selectSpy = vi
      .spyOn(table, "select")
      .mockImplementation(() => firstPageImpl);

    // Mock the create function to not be called
    const createSpy = vi.spyOn(table, "create");

    // Mock the console.log to check log message
    const consoleLogSpy = vi.spyOn(console, "log");

    const result = await createCoffeeStore(coffeeStore);
    expect(selectSpy).toHaveBeenCalled();
    expect(createSpy).not.toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith("Coffee store exists");

    const expectedResults = [{ recordId: "testRecordId", ...coffeeStore }];
    expect(result).toEqual(expectedResults);
  });

  it("should return an error if store id is missing", async () => {
    const coffeeStore: CoffeeStoreType = {
      id: "",
      name: "Test Store",
      address: "123 Test St",
      imgUrl: "http://test.com/image.jpg",
      voting: 0,
    };

    // Mock the console.error to check log message
    const consoleErrorSpy = vi.spyOn(console, "error");

    await createCoffeeStore(coffeeStore);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Store id is missing");
  });

  it("should return an error if an error occurs", async () => {
    const coffeeStore: CoffeeStoreType = {
      id: "1",
      name: "Test Store",
      address: "123 Test St",
      imgUrl: "http://test.com/image.jpg",
      voting: 0,
    };

    // Mock the select function to throw an error
    const selectSpy = vi.spyOn(table, "select").mockRejectedValue("Error");

    // Mock the console.error to check log message
    const consoleErrorSpy = vi.spyOn(console, "error");

    await createCoffeeStore(coffeeStore);
    expect(selectSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error creating or finding a store",
      expect.any(Error)
    );
  });
});
