import React from "react";

import Cards from "./cards.server";
import { CoffeeStoreType } from "@/types";

type CoffeeStoresProps = {
  title: string;
  stores: Array<CoffeeStoreType>;
};
export default function CoffeeStores(props: CoffeeStoresProps) {
  const { title, stores } = props;

  return (
    <div className="mt-20">
      <h2 className="mt-8 pb-8 text-4xl font-bold text-white">{title}</h2>
      <Cards stores={stores} />
    </div>
  );
}
