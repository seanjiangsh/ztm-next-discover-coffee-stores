import { fetchCoffeeStores } from "@/lib/coffee-stores";

import Cards from "@/components/cards.server";
import NearbyCoffeeStores from "@/components/nearby-coffee-stores.client";

export default async function Home() {
  const coffeeStores = await fetchCoffeeStores();
  // console.log(coffeeStores);

  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <NearbyCoffeeStores />
        {/* TODO: extract stores section into a component */}
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Toronto Stores
          </h2>
          <Cards stores={coffeeStores} />;
        </div>
      </main>
    </div>
  );
}
