import Link from "next/link";
import Image from "next/image";

import { fetchCoffeeStore, fetchCoffeeStores } from "@/lib/coffee-stores";
import { createCoffeeStore } from "@/lib/airtable";
import { getDomain } from "@/utils";
import { ServerParamsType } from "@/types";

import Upvote from "@/components/upvote.client";

/**
 * The generateStaticParams function can be used in combination with
 * `dynamic route segments` to `statically generate` routes at build time
 * instead of on-demand at request time.
 */
export async function generateStaticParams() {
  const coffeeStores = await fetchCoffeeStores();
  return coffeeStores.map(({ id }) => ({ id }));
}

/**
 * The generateMetadata function allows you to fetch and
 * generate metadata dynamically.This is especially useful for improving SEO
 * and web shareability by customizing meta tags like title, description,
 * and Open Graph tags based on the content of the page.
 */
export async function generateMetadata(params: ServerParamsType) {
  const { id } = params.params;
  const coffeeStore = await fetchCoffeeStore(id);
  const { name = "" } = coffeeStore || {};
  return {
    title: name,
    description: `${name} - Coffee Store`,
    metadataBase: getDomain(),
    alternates: { canonical: `/coffee-store/${id}` },
  };
}

async function getData(id: string) {
  const coffeeStore = await fetchCoffeeStore(id);
  if (!coffeeStore) return;
  const coffeeStoreRecord = await createCoffeeStore(coffeeStore);
  // console.log(coffeeStoreRecord);
  return coffeeStoreRecord;
}

type PageProps = {
  params: { id: string };
};

export default async function Page(props: PageProps) {
  const { id } = props.params;
  const coffeeStoreRecord = await getData(id);
  const {
    name = "",
    address = "",
    imgUrl = "",
    voting = 0,
  } = coffeeStoreRecord?.[0] || {};
  // console.log(coffeeStore);

  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div className="">
          <div className="mb-2 lg:mt-24 text-lg font-bold">
            <Link href="/">← Back to home</Link>
          </div>
          <div className="my-4">
            <h1 className="text-4xl">{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={740}
            height={360}
            className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px] "
            alt={"Coffee Store Image"}
          />
        </div>

        <div className={`glass mt-12 flex-col rounded-lg p-4 lg:mt-48`}>
          {address && (
            <div className="mb-4 flex">
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="places icon"
              />
              <p className="pl-2">{address}</p>
            </div>
          )}
          <Upvote id={id} voting={voting} />
        </div>
      </div>
    </div>
  );
}
