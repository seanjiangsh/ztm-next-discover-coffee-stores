import { createApi } from "unsplash-js";

import { MapboxType, CoffeeStoreType } from "@/types";

const { MAPBOX_API_KEY, UNSPALSH_API_KEY } = process.env;

if (!MAPBOX_API_KEY) {
  throw new Error("Missing environment variable: MAPBOX_API_KEY");
}
if (!UNSPALSH_API_KEY) {
  throw new Error("Missing environment variable: UNSPALSH_API_KEY");
}

const unsplashApi = createApi({ accessKey: UNSPALSH_API_KEY });

const getListOfCoffeeStorePhotos = async (): Promise<Array<string>> => {
  try {
    const { response } = await unsplashApi.search.getPhotos({
      query: "coffee shop",
      page: 1,
      perPage: 6,
      orientation: "landscape",
    });
    // console.log(
    //   "getListOfCoffeeStorePhotos",
    //   JSON.stringify(response, null, 2)
    // );
    if (!response) return [];
    return response.results.map((result) => result.urls["small"]);
  } catch (error) {
    console.error("Error retrieving a photo", error);
    return [];
  }
};

const transformCoffeeData = (
  idx: number,
  mapboxData: MapboxType,
  photos: Array<string>
) => {
  const defaultImgUrl =
    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=400";
  const { id, properties, text } = mapboxData;
  return {
    id: id,
    address: properties?.address || "",
    name: text,
    imgUrl: photos[idx] || defaultImgUrl,
  };
};

const TORONTO_LONG_LAT = "-79.3789680885594%2C43.653833032607096";
export const fetchCoffeeStores = async (
  latLong = TORONTO_LONG_LAT,
  limit = 6
): Promise<Array<CoffeeStoreType>> => {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?limit=${limit}&proximity=${latLong}&access_token=${MAPBOX_API_KEY}`;
    const response = await fetch(url);
    const mapboxData = await response.json();
    const photos = await getListOfCoffeeStorePhotos();
    // console.log(JSON.stringify(mapboxData, null, 2));
    const coffeeStoresData = mapboxData?.features?.map(
      (data: MapboxType, idx: number) => transformCoffeeData(idx, data, photos)
    );
    return coffeeStoresData || [];
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
    const mapboxData = await response.json();
    // console.log(JSON.stringify(data, null, 2));
    const coffeeStore = mapboxData?.features?.map(
      (data: MapboxType, idx: number) => transformCoffeeData(idx, data, [])
    );
    return coffeeStore.length ? coffeeStore[0] : null;
  } catch (err) {
    console.error("Error while fetching coffee store", err);
    return null;
  }
};
