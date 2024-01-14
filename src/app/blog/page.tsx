import type { BlogPostPostgres } from "~/types";
import { api } from "~/trpc/server";
import BlogListContainer from "@/_components/BlogListContainer";

export default async function BlogHomePage() {
  const blogs = await api.post.list.query();

  return (
    <main className="m-auto my-10 flex flex-col items-center">
      <BlogListContainer blogs={blogs as BlogPostPostgres[]} />
    </main>
  );
}
