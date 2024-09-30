import { useEffect } from "react";
import { Metadata } from "next";

import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { getDomain } from "@/utils";

import NearbyCoffeeStores from "@/components/nearby-coffee-stores.client";
import CoffeeStores from "@/components/coffee-stores";

export const metadata: Metadata = {
  title: "Coffee Connoisseur",
  description: "Allows you to discover coffee stores near you",
  metadataBase: getDomain(),
  alternates: { canonical: "/" },
};

export default async function Home() {
  const coffeeStores = await fetchCoffeeStores();
  // console.log(coffeeStores);

  return (
    <div className="min-h-screen flex flex-col pb-56 relative">
      <main className="flex-grow mx-auto mt-10 max-w-6xl px-4">
        <NearbyCoffeeStores />
        <CoffeeStores title="Toronto Stores" stores={coffeeStores} />
      </main>
    </div>
  );
}
