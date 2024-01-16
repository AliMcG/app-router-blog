"use client";
import { api } from "~/trpc/react";
import type { BlogPostPostgres } from "~/types";

import BlogListContainerClient from "@/_components/BlogListContainerClient";

export default function SearchPage({ params }: { params: { search: string } }) {
  const { data, isLoading } = api.post.listBySerachText.useQuery(
    { text: params.search },
    {
      enabled: !!params.search,
    },
  );

  if (isLoading)
    return (
      <div className="flex justify-center p-4">
      <div className="my-10 flex flex-col items-center border-2 border-[#CFE1FF]">
        <h2 className="mb-4 p-20 font-monts text-2xl font-semibold text-[#073D93] hover:text-[#067A75]">
          Searching...
        </h2>
      </div>
      </div>
    );
    if (!data || data.length === 0)
    return (
      <div className="flex justify-center p-4">
      <div className="my-10 flex flex-col items-center border-2 border-[#CFE1FF]">
        <h2 className="mb-4 p-20 font-monts text-2xl font-semibold text-[#073D93] hover:text-[#067A75]">
          Nothing found for search: {params.search}
        </h2>
      </div>
      </div>
    );
    console.log(data)

  return (
    <div className="m-auto flex flex-col items-center">
      <h1>Blogs for search: {params.search}</h1>
      <BlogListContainerClient blogs={data as BlogPostPostgres[]} />
    </div>
  );
}
