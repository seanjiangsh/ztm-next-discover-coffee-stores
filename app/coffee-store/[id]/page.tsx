import React from "react";
import Link from "next/link";

import { fetchCoffeeStore } from "@/lib/coffee-stores";

type PageProps = {
  params: { id: string };
};

export default async function Page(props: PageProps) {
  const { id } = props.params;
  const coffeeStore = await fetchCoffeeStore(id);
  console.log(coffeeStore);

  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div className="mb-2 mt-24 text-lg font-bold">
          <Link href="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
