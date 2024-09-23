"use server";

import { updateCoffeeStore } from "@/lib/airtable";

export type UpvoteState = { id: string; voting: number };

export const upvoteAction = async (
  state: UpvoteState
): Promise<UpvoteState> => {
  const { id } = state;
  const updatedData = await updateCoffeeStore(id);
  const voting = updatedData?.[0]?.voting || 0;
  return { id, voting };
};
