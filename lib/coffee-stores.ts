import { MapboxType, CoffeeStoreType } from "@/types";

const { MAPBOX_API_KEY } = process.env;

const transformCoffeeData = (data: MapboxType): CoffeeStoreType => {
  const { id, properties } = data;
  const name = data.text || "";
  const address = properties.address || "";
  const imgUrl =
    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80";
  return { id, name, imgUrl, address };
};

export const fetchCoffeeStores = async (): Promise<Array<CoffeeStoreType>> => {
  try {
    const TORONTO_LONG_LAT = "-79.3789680885594%2C43.653833032607096";
    const limit = 6;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?limit=${limit}&proximity=${TORONTO_LONG_LAT}&access_token=${MAPBOX_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(JSON.stringify(data, null, 2));
    return data.features.map(transformCoffeeData);
  } catch (err) {
    console.error("Error while fetching coffee stores", err);
    return [];
  }
};

export const fetchCoffeeStore = async (
  id: string
): Promise<CoffeeStoreType | null> => {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${id}.json?proximity=ip&access_token=${MAPBOX_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(JSON.stringify(data, null, 2));
    const coffeeStore = data.features.map(transformCoffeeData);
    return coffeeStore.length ? coffeeStore[0] : null;
  } catch (err) {
    console.error("Error while fetching coffee store", err);
    return null;
  }
};
