"use client"

import { api } from "~/trpc/react";
import type { BlogPostPostgres } from "~/types";
import BlogContainer from "@/_components/BlogContainer";


export default function BlogPage({ params }: { params: { id: string } }) {

  const { data } = api.post.locate.useQuery({ id: params.id })
 

  return (
    <div className="m-auto flex flex-col items-center">
        <BlogContainer data={data as BlogPostPostgres}/>
    </div>
  );
}
