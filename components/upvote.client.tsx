"use client";
import Image from "next/image";

type UpvoteProps = {
  voting: number;
};

export default function Upvote(props: UpvoteProps) {
  const { voting } = props;

  const handleOnClick = () => {
    console.log("Upvote clicked");
  };

  return (
    <>
      <div className="mb-6 flex">
        <Image
          src="/static/icons/star.svg"
          width="24"
          height="24"
          alt="star icon"
        />
        <p className="pl-2">{voting}</p>
      </div>
      <button onClick={handleOnClick}>Up vote!</button>
    </>
  );
}
