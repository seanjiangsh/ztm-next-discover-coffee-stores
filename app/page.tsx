import { fetchCoffeeStores } from "@/lib/coffee-stores";

import Banner from "@/components/banner.client";
import Cards from "@/components/cards.server";

async function getData() {
  return await fetchCoffeeStores();
}
export default async function Home() {
  const coffeeStores = await getData();
  // console.log(coffeeStores);

  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <Banner />
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
