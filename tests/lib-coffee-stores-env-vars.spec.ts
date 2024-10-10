import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Coffee stores environment variables", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("should throw an error if MAPBOX_API_KEY is missing", async () => {
    vi.stubEnv("MAPBOX_API_KEY", undefined);
    let hasThrown = false;
    try {
      await import("@/lib/coffee-stores");
    } catch (error) {
      const msg = "Missing environment variable: MAPBOX_API_KEY";
      expect(error).toEqual(new Error(msg));
      hasThrown = true;
    }
    expect(hasThrown).toBe(true);
  });

  it("should throw an error if UNSPALSH_API_KEY is missing", async () => {
    vi.stubEnv("UNSPALSH_API_KEY", undefined);
    let hasThrown = false;
    try {
      await import("@/lib/coffee-stores");
    } catch (error) {
      const msg = "Missing environment variable: UNSPALSH_API_KEY";
      expect(error).toEqual(new Error(msg));
      hasThrown = true;
    }
    expect(hasThrown).toBe(true);
  });

  it("should not throw an error if MAPBOX_API_KEY and UNSPALSH_API_KEY are set", async () => {
    let hasThrown = false;
    try {
      await import("@/lib/coffee-stores");
    } catch (error) {
      hasThrown = true;
    }
    expect(hasThrown).toBe(false);
  });
});
