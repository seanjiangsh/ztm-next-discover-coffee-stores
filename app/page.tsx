import { Metadata } from "next";

import { getDomain } from "@/utils";
import LocationCoffeeStores from "@/components/location-coffee-stores.client";

export const metadata: Metadata = {
  title: "Coffee Connoisseur",
  description: "Allows you to discover coffee stores near you",
  metadataBase: getDomain(),
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pb-56 relative">
      <main className="flex-grow mx-auto mt-10 max-w-6xl px-4">
        <LocationCoffeeStores />
      </main>
    </div>
  );
}
