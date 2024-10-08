import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Environment Variables", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("should throw an error if AIRTABLE_ACCESS_TOKEN is missing", async () => {
    vi.stubEnv("AIRTABLE_ACCESS_TOKEN", undefined);
    // console.log("AIRTABLE_ACCESS_TOKEN", process.env.AIRTABLE_ACCESS_TOKEN);
    // console.log("AIRTABLE_BASE_ID", process.env.AIRTABLE_BASE_ID);
    let hasThrown = false;
    try {
      await import("@/lib/airtable");
    } catch (error) {
      const msg = "Missing environment variable: AIRTABLE_ACCESS_TOKEN";
      expect(error).toEqual(new Error(msg));
      hasThrown = true;
    }
    expect(hasThrown).toBe(true);
  });

  it("should throw an error if AIRTABLE_BASE_ID is missing", async () => {
    vi.stubEnv("AIRTABLE_BASE_ID", undefined);
    let hasThrown = false;
    try {
      await import("@/lib/airtable");
    } catch (error) {
      const msg = "Missing environment variable: AIRTABLE_BASE_ID";
      expect(error).toEqual(new Error(msg));
      hasThrown = true;
    }
    expect(hasThrown).toBe(true);
  });

  it("should not throw an error if AIRTABLE_ACCESS_TOKEN and AIRTABLE_BASE_ID are set", async () => {
    let hasThrown = false;
    try {
      await import("@/lib/airtable");
    } catch (error) {
      hasThrown = true;
    }
    expect(hasThrown).toBe(false);
  });
});
