import { fetchCoffeeStores } from "@/lib/coffee-stores";

import NearbyCoffeeStores from "@/components/nearby-coffee-stores.client";
import CoffeeStores from "@/components/coffee-stores";

export default async function Home() {
  const coffeeStores = await fetchCoffeeStores();
  // console.log(coffeeStores);

  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <NearbyCoffeeStores />
        <CoffeeStores title="Toronto Stores" stores={coffeeStores} />
      </main>
    </div>
  );
}
