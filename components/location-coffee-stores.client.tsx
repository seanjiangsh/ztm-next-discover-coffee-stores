"use client";

import { useEffect, useState } from "react";

import useTrackLocation from "@/hooks/use-track-location";
import { CoffeeStoreType } from "@/types";

import Banner from "./banner.client";
import CoffeeStores from "./coffee-stores";

export default function LocationCoffeeStores() {
  const { handleTrackLocation, isFindingLocation, longLat, locationErrorMsg } =
    useTrackLocation();
  const [coffeeStores, setCoffeeStores] = useState<Array<CoffeeStoreType>>([]);
  const storedStoresStatus = useState<Array<CoffeeStoreType> | undefined>();
  const [storedCoffeeStores, setStoredCoffeeStores] = storedStoresStatus;

  useEffect(() => {
    const storedCoffeeStores = localStorage.getItem("coffeeStores");
    if (!storedCoffeeStores) return;
    // Retrieve coffee stores from local storage on mount
    const stores = JSON.parse(storedCoffeeStores);
    setStoredCoffeeStores(stores);
    setCoffeeStores(stores);
  }, [setStoredCoffeeStores]);

  useEffect(() => {
    const getCoffeeStores = async () => {
      const storedCoffeeStores = localStorage.getItem("coffeeStores");
      if (storedCoffeeStores) return;
      // use Toronto as default location
      const location = longLat || "-79.3789680885594%2C43.653833032607096";
      const limit = 10;
      const coffeeStoresApi = `/api/get-coffee-stores-by-location`;
      const url = `${coffeeStoresApi}?latLong=${location}&limit=${limit}`;
      try {
        const response = await fetch(url);
        const coffeeStores: Array<CoffeeStoreType> = await response.json();
        setCoffeeStores(coffeeStores);
        if (longLat) {
          // Store coffee stores in local storage
          setStoredCoffeeStores(coffeeStores);
          localStorage.setItem("coffeeStores", JSON.stringify(coffeeStores));
        }
      } catch (err) {
        console.error("Error while fetching coffee stores", err);
      }
    };
    getCoffeeStores();
  }, [longLat, setStoredCoffeeStores]);

  const storesNearbyButtonProps = {
    onClick: () => {
      setStoredCoffeeStores(undefined);
      localStorage.removeItem("coffeeStores");
      handleTrackLocation();
    },
    text: isFindingLocation ? "Locating..." : "View stores nearby",
  };

  const title = storedCoffeeStores ? "Stores near me" : "Toronto Stores";

  return (
    <div>
      <Banner storesNearbyButtonProps={storesNearbyButtonProps} />
      {locationErrorMsg && <p>Error: {locationErrorMsg}</p>}
      {coffeeStores.length > 0 && (
        <CoffeeStores title={title} stores={coffeeStores} />
      )}
    </div>
  );
}
