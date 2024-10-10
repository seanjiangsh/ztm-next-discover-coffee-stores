import { describe, it, expect, beforeEach, vi } from "vitest";

describe("utils environment variables", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("should throw an error if ORIGIN is missing", async () => {
    vi.stubEnv("ORIGIN", undefined);
    let hasThrown = false;
    try {
      await import("@/utils");
    } catch (error) {
      const msg = "Missing environment variable: ORIGIN";
      expect(error).toEqual(new Error(msg));
      hasThrown = true;
    }
    expect(hasThrown).toBe(true);
  });
});
