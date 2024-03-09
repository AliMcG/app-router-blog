import Image from "next/image";
import { Markup } from "interweave";
import type { BlogPostPostgres } from "~/types";
import { HeartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const BlogListContainer = async ({ blogs }: { blogs: BlogPostPostgres[] }) => {
  return (
    <>
      {blogs.map((post, index) => {
        return (
          <div
            key={index}
            className="relative mx-4 mb-4 flex h-4/5 flex-col-reverse items-center rounded border bg-custom-blue p-4 hover:border-[#CFE1FF] lg:w-3/5 lg:items-start  lg:odd:flex-row-reverse lg:odd:justify-end lg:even:flex-row "
          >
            <div className="absolute rounded-full border-2 border-[#CFE1FF] bg-white odd:right-5 even:left-5 lg:bottom-5 ">
              <div>
                <span className="relative text-red-500">
                  <HeartIcon className="h-8 w-8" />
                </span>
                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-white">
                  {post.numberVotes}
                </p>
              </div>
            </div>
            <Link href={`/blog/${post.id}`} className="basis-2/4" data-cy={`blog-link-${index}`}>
              <div className="p-4 font-monts text-base text-gray-700 hover:text-[#067A75] ">
                <h2 className="mb-4 font-frank text-2xl font-bold hover:text-[#067A75]">
                  {post.title.toUpperCase()}
                </h2>
                <h2 className="text-base text-gray-700">
                  {post.createdAt.toDateString()}
                </h2>
                <Markup content={`${post.description.substring(0, 300)} ...`} />
              </div>
            </Link>
            <Link href={`/blog/${post.id}`} className="basis-2/4">
              <Image
                src={post.image}
                alt="Blog image"
                width={450}
                height={250}
                className="h-80 rounded object-cover"
              />
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default BlogListContainer;
