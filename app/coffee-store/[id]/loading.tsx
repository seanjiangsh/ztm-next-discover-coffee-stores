import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex justify-center items-center relative">
      <Image
        src="/static/icons/loading-spinner.svg"
        width="30"
        height="30"
        alt="Loading..."
        className="animate-spin"
      />
      <p className="ml-4 text-lg">Loading...</p>
    </div>
  );
}
