"use client";
import Image from "next/image";
import { useFormState } from "react-dom";

import { upvoteAction } from "@/actions";

type UpvoteProps = { id: string; voting: number };

export default function Upvote(props: UpvoteProps) {
  const [state, dispatch] = useFormState(upvoteAction, props);
  const { voting } = state;

  return (
    <form action={dispatch}>
      <div className="mb-6 flex">
        <Image
          src="/static/icons/star.svg"
          width="24"
          height="24"
          alt="star icon"
        />
        <p className="pl-2">{voting}</p>
      </div>
      <button type="submit">Up vote!</button>
    </form>
  );
}
