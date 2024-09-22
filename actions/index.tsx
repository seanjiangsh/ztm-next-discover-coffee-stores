"use server";

import { updateCoffeeStore } from "@/lib/airtable";

export const upvoteAction = async (id: string) => {
  const updatedData = await updateCoffeeStore(id);
  console.log({ upvoteAction: updatedData });
};
