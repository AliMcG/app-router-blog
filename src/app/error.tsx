"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center p-4">
      <div className="my-10 flex flex-col items-center border-2 border-[#CFE1FF]">
        <h2 className="mb-4 p-10 font-monts text-2xl font-semibold text-[#073D93] hover:text-[#067A75]">
          Something went wrong!
        </h2>
        <h3 className="mb-4 font-monts text-xl font-semibold text-[#073D93] hover:text-[#067A75]">
          Try refreshing the page
        </h3>
        <button
          className='bg-blue/10 text-blue hover:bg-blue/60 transition" mb-10 w-28 rounded border-2 border-[#CFE1FF] px-3 py-1 font-semibold text-gray-700 no-underline'
          onClick={() => reset()}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
