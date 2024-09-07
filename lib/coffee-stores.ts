export const fetchCoffeeStores = async () => {
  //mapbox api
  const TORONTO_LONG_LAT = "-79.3789680885594%2C43.653833032607096";
  const { MAPBOX_API_KEY } = process.env;
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=coffee&proximity=${TORONTO_LONG_LAT}&access_token=${MAPBOX_API_KEY}`;
  const response = await fetch(url);
  return await response.json();
};
