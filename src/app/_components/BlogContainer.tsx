import Image from "next/image";
import { Markup } from "interweave";
import type { BlogPostPostgres } from "~/types";

const BlogContainer = ({ data }: { data: BlogPostPostgres }) => {
  return (
    <div className="mx-4 flex h-4/5 flex-col-reverse items-center border-2 border-[#CFE1FF] p-4 md:w-3/5 ">
      <div className="p-4 font-sans text-gray-700">
        <h2 className="mb-4 font-frank text-2xl font-bold uppercase text-[#052962]">
          {data?.title}
        </h2>
        <h2 className="text-sm font-normal text-gray-700">
          By <span className="font-semibold">Harry Dunction</span> Posted{" "}
          <span className="font-semibold">
            {data?.createdAt.toString().slice(0, 7)}
          </span>
        </h2>
        <Markup
          className="font-monts text-base text-slate-800"
          content={data?.description}
        />
      </div>
      <div className="flex w-full items-center">
        <Image
          src={data?.image}
          alt="Blog image"
          width="500"
          height="200"
          className="h-60 w-full rounded object-none"
        />
      </div>
    </div>
  );
};

export default BlogContainer;
