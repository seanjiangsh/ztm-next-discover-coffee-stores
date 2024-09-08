import { MapboxType, CoffeeStoreType } from "@/types";

const transformCoffeeData = (data: MapboxType): CoffeeStoreType => {
  const { id, properties } = data;
  const { name, full_address } = properties;
  const address = full_address || "";
  const imgUrl =
    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80";
  return { id, name, imgUrl, address };
};

export const fetchCoffeeStores = async () => {
  try {
    //mapbox api
    const TORONTO_LONG_LAT = "-79.3789680885594%2C43.653833032607096";
    const { MAPBOX_API_KEY } = process.env;
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=coffee&limit=6&proximity=${TORONTO_LONG_LAT}&access_token=${MAPBOX_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.features);
    return data.features.map(transformCoffeeData);
  } catch (err) {
    console.error("Error while fetching coffee stores", err);
  }
};
