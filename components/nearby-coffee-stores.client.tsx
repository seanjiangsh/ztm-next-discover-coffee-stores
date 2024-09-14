"use client";

import useTrackLocation from "@/hooks/use-track-location";
import Banner from "./banner.client";

export default function NearbyCoffeeStores() {
  const { handleTrackLocation, isFindingLocation, longLat, locationErrorMsg } =
    useTrackLocation();

  const storesNearbyButtonProps = {
    onClick: () => handleTrackLocation(),
    text: isFindingLocation ? "Locating..." : "View stores nearby",
  };

  return (
    <div>
      <Banner storesNearbyButtonProps={storesNearbyButtonProps} />
      {locationErrorMsg && <p>Error: {locationErrorMsg}</p>}
    </div>
  );
}
