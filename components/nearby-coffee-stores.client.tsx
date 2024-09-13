"use client";

import useTrackLocation from "@/hooks/use-track-location";
import Banner from "./banner.client";

export default function NearbyCoffeeStores() {
  const { handleTrackLocation, isFindingLocation, longLat, locationErrorMsg } =
    useTrackLocation();

  const viewStoresNearbyClick = () => {
    handleTrackLocation();
  };

  return (
    <div>
      <Banner viewStoresNearbyClick={viewStoresNearbyClick} />
    </div>
  );
}
