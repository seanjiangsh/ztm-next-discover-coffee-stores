import { beforeEach, describe, it, expect, vi, Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { useFormState, useFormStatus } from "react-dom";

import { fetchCoffeeStore, fetchCoffeeStores } from "@/lib/coffee-stores";
import { createCoffeeStore } from "@/lib/airtable";
import { getDomain } from "@/utils";
import Page, {
  generateStaticParams,
  generateMetadata,
  getData,
} from "@/app/coffee-store/[id]/page";
// import * as coffeeStorePage from "@/app/coffee-store/[id]/page";

vi.mock("react-dom", () => ({
  useFormState: vi.fn(),
  useFormStatus: vi.fn(),
}));

vi.mock("@/lib/coffee-stores", () => ({
  fetchCoffeeStore: vi.fn(),
  fetchCoffeeStores: vi.fn(),
}));

vi.mock("@/lib/airtable", () => ({
  createCoffeeStore: vi.fn(),
}));

vi.mock("@/utils", () => ({
  getDomain: vi.fn(),
}));

// vi.mock("@/app/coffee-store/[id]/page", async (importOriginal) => {
//   const page: any = await importOriginal();
//   return {
//     ...page,
//     getData: vi.fn().mockImplementation(async (id: string) => {
//       console.log("mock getData", id);
//       return [
//         {
//           id: "1",
//           recordId: "rec123",
//           name: "Test Store",
//           address: "123 Test St",
//           imgUrl: "/test.jpg",
//           voting: 5,
//         },
//       ];
//     }),
//   };
// });

describe("Page Component", () => {
  const mockCoffeeStore = {
    id: "1",
    recordId: "rec123",
    name: "Test Store",
    address: "123 Test St",
    imgUrl: "/test.jpg",
    voting: 5,
  };

  const mockCoffeeStoreRecord = [mockCoffeeStore];

  beforeEach(() => {
    vi.clearAllMocks();
    (useFormState as Mock).mockReturnValue([{ voting: 10 }, vi.fn()]);
    (useFormStatus as Mock).mockReturnValue({ pending: false });
  });

  it("renders coffee store details", async () => {
    (fetchCoffeeStore as Mock).mockResolvedValue(mockCoffeeStore);
    (createCoffeeStore as Mock).mockResolvedValue(mockCoffeeStoreRecord);

    const pageComponent = await Page({ params: { id: "1" } });
    const { getByText } = render(pageComponent);

    expect(getByText("Test Store")).toBeInTheDocument();
    expect(getByText("123 Test St")).toBeInTheDocument();
  });

  it("could render coffee store page even coffee store is missing", async () => {
    (fetchCoffeeStore as Mock).mockResolvedValue(null);

    const pageComponent = await Page({ params: { id: "1" } });
    render(pageComponent);
  });

  it("generates static params", async () => {
    (fetchCoffeeStores as Mock).mockResolvedValue([mockCoffeeStore]);

    const params = await generateStaticParams();
    expect(params).toEqual([{ id: "1" }]);
  });

  it("generates metadata", async () => {
    (fetchCoffeeStore as Mock).mockResolvedValue(mockCoffeeStore);
    (getDomain as Mock).mockReturnValue("http://localhost");

    const metadata = await generateMetadata({
      params: { id: "1" },
      searchParams: { id: "1" },
    });
    expect(metadata).toEqual({
      title: "Test Store",
      description: "Test Store - Coffee Store",
      metadataBase: "http://localhost",
      alternates: { canonical: "/coffee-store/1" },
    });

    (fetchCoffeeStore as Mock).mockResolvedValue(null);
    const metadataMissingStore = await generateMetadata({
      params: { id: "1" },
      searchParams: { id: "1" },
    });
    expect(metadataMissingStore).toEqual({
      title: "",
      description: " - Coffee Store",
      metadataBase: "http://localhost",
      alternates: { canonical: "/coffee-store/1" },
    });
  });
});
