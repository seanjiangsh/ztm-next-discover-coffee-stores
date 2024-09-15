"use client";

import { useEffect, useState } from "react";

import useTrackLocation from "@/hooks/use-track-location";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { CoffeeStoreType } from "@/types";

import Banner from "./banner.client";
import Cards from "./cards.server";

export default function NearbyCoffeeStores() {
  const { handleTrackLocation, isFindingLocation, longLat, locationErrorMsg } =
    useTrackLocation();

  const [coffeeStores, setCoffeeStores] = useState<Array<CoffeeStoreType>>([]);

  useEffect(() => {
    const getCoffeeStores = async () => {
      if (!longLat) return;
      const coffeeStores = await fetchCoffeeStores(longLat);
      setCoffeeStores(coffeeStores);
    };
    getCoffeeStores();
  }, [longLat]);

  const storesNearbyButtonProps = {
    onClick: () => handleTrackLocation(),
    text: isFindingLocation ? "Locating..." : "View stores nearby",
  };

  return (
    <div>
      <Banner storesNearbyButtonProps={storesNearbyButtonProps} />
      {locationErrorMsg && <p>Error: {locationErrorMsg}</p>}
      <div className="mt-20">
        <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
          Stores near me
        </h2>
        {coffeeStores.length && <Cards stores={coffeeStores} />}
      </div>
    </div>
  );
}
