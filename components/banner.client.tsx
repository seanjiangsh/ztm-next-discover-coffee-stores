"use client";

import { MouseEventHandler } from "react";
import Image from "next/image";

type StoresNearbyButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string;
};
type BannerProps = {
  storesNearbyButtonProps: StoresNearbyButtonProps;
};

export default function Banner(props: BannerProps) {
  const { onClick, text } = props.storesNearbyButtonProps;

  return (
    <div className="mb-12 grid lg:mb-24 lg:grid-cols-2">
      <div className="z-20 flex flex-col px-2 md:pt-12">
        <h1 className="my-2 flex-wrap">
          <span className="pr-2 text-white">Coffee</span>
          <span className="text-white">Connoisseur</span>
        </h1>
        <p className="font-sans text-xl font-semibold text-white md:mt-5 lg:text-2xl">
          Discover your local coffee shops!
        </p>
        <div className="mt-12">
          <button onClick={onClick}>{text}</button>
        </div>
      </div>
      <div className="absolute top-2 z-10 md:top-0 md:mt-12 md:pl-10 md:pt-0 lg:right-1/4 lg:flex lg:pl-20">
        <Image
          src="/static/hero-image.webp"
          width={800}
          height={300}
          alt="hero image"
          priority={true}
          className="opacity-60"
        />
      </div>
    </div>
  );
}
