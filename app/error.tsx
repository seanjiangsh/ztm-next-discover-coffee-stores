// This is a "Error boundaries" and it must be Client Components
"use client";

import { useEffect } from "react";

type ErrorProps = { error: Error; reset: () => void };

export default function Error(props: ErrorProps) {
  const { error, reset } = props;

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex relative">
      <div className="m-auto max-w-[80%] bg-gray-700 p-12 text-white rounded">
        <h2 className="text-3xl pb-8">Oops, something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </div>
    </div>
  );
}
