"use client";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";

import { upvoteAction } from "@/actions";

type UpvoteProps = { id: string; voting: number };

// * note: The useFormStatus can only be used as a child
// * of a form element using Server Action.

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  const buttonContent = pending ? (
    <Image
      src="/static/icons/loading-spinner.svg"
      width="30"
      height="30"
      alt="Loading"
      className="m-auto animate-spin"
    />
  ) : (
    "Up vote!"
  );
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="bg-purple-951 min-w-[120px] h-[60px]"
    >
      {buttonContent}
    </button>
  );
};

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
      <SubmitButton />
    </form>
  );
}
