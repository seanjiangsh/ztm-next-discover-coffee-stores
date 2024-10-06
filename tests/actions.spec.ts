import { describe, expect, it, vi, Mock } from "vitest";

import { upvoteAction, UpvoteState } from "@/actions/index";
import { updateCoffeeStore } from "@/lib/airtable";

vi.mock("@/lib/airtable", () => ({
  updateCoffeeStore: vi.fn(),
}));

describe("upvoteAction", () => {
  it("should return updated voting state", async () => {
    const mockState: UpvoteState = { id: "testID", voting: 0 };
    const mockUpdatedData = [{ voting: 5 }];
    (updateCoffeeStore as Mock).mockResolvedValue(mockUpdatedData);

    const result = await upvoteAction(mockState);

    expect(updateCoffeeStore).toHaveBeenCalledWith("testID");
    expect(result).toEqual({ id: "testID", voting: 5 });
  });

  it("should return default voting state if updateCoffeeStore returns undefined", async () => {
    const mockState: UpvoteState = { id: "testID", voting: 0 };
    (updateCoffeeStore as Mock).mockResolvedValue(undefined);

    const result = await upvoteAction(mockState);

    expect(updateCoffeeStore).toHaveBeenCalledWith("testID");
    expect(result).toEqual({ id: "testID", voting: 0 });
  });

  it("should return default voting state if updateCoffeeStore returns empty array", async () => {
    const mockState: UpvoteState = { id: "testID", voting: 0 };
    (updateCoffeeStore as Mock).mockResolvedValue([]);

    const result = await upvoteAction(mockState);

    expect(updateCoffeeStore).toHaveBeenCalledWith("testID");
    expect(result).toEqual({ id: "testID", voting: 0 });
  });
});
