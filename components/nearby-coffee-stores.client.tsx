"use client";

import { useEffect, useState } from "react";

import useTrackLocation from "@/hooks/use-track-location";
import { CoffeeStoreType } from "@/types";

import Banner from "./banner.client";
import CoffeeStores from "./coffee-stores";

export default function NearbyCoffeeStores() {
  const { handleTrackLocation, isFindingLocation, longLat, locationErrorMsg } =
    useTrackLocation();

  const [coffeeStores, setCoffeeStores] = useState<Array<CoffeeStoreType>>([]);

  useEffect(() => {
    const getCoffeeStores = async () => {
      if (!longLat) return;
      const limit = 10;
      const coffeeStoresApi = `/api/get-coffee-stores-by-location`;
      const url = `${coffeeStoresApi}?latLong=${longLat}&limit=${limit}`;
      try {
        const response = await fetch(url);
        const coffeeStores: Array<CoffeeStoreType> = await response.json();
        setCoffeeStores(coffeeStores);
      } catch (err) {
        console.error("Error while fetching coffee stores", err);
      }
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
      {coffeeStores.length > 0 && (
        <CoffeeStores title="Stores near me" stores={coffeeStores} />
      )}
    </div>
  );
}
