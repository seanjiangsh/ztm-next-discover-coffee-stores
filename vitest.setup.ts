/// <reference types="vitest" />

import "@testing-library/jest-dom";
import { beforeAll } from "vitest";
import { server } from "./tests/mocks/server";

beforeAll(() => {
  server.listen();
  console.log("MWS worker started");
});
