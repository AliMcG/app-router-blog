"use client";
import { api } from "~/trpc/react";
import type { BlogPostPostgres } from "~/types";

import BlogListContainerClient from "@/_components/BlogListContainerClient";
import MessageContainer from "~/app/_components/MessageContainer";

export default function SearchPage({ params }: { params: { search: string } }) {
  const { data, isLoading } = api.post.listBySerachText.useQuery(
    { text: params.search },
    {
      enabled: !!params.search,
    },
  );

  if (isLoading) return <MessageContainer message={"Searching..."} />;
  if (!data || data.length === 0)
    return (
      <MessageContainer
        message={`Nothing found for search: ${params.search}`}
      />
    );

  return (
    <div className="m-auto flex flex-col items-center">
      <h1 data-cy="searched-blog-title">Blogs for search: {params.search}</h1>
      <BlogListContainerClient blogs={data as BlogPostPostgres[]} />
    </div>
  );
}
