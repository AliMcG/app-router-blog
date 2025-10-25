import Image from "next/image";
import { Markup } from "interweave";
import type { BlogPostPostgres } from "~/types";
import { HeartIcon } from "@heroicons/react/24/solid";

const BlogContainer = ({ data }: { data: BlogPostPostgres }) => {
  return (
    <div className="relative mx-4 flex h-4/5 flex-col-reverse items-center border-2 border-[#CFE1FF] p-4 md:w-3/5 ">
      <div className="absolute rounded-full border-2 border-[#CFE1FF] bg-white odd:right-5 even:left-5 lg:bottom-5 ">
              <div>
                <span className="relative text-red-500">
                  <HeartIcon className="h-8 w-8" />
                </span>
                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-white">
                  {`${data?.numberVotes}`}
                </p>
              </div>
            </div>
      <div className="p-4 font-sans text-gray-700">
        <h2 className="mb-4 font-frank text-2xl font-bold uppercase text-[#052962]">
          {data?.title}
        </h2>
        <h2 className="text-sm font-normal text-gray-700">
          By <span className="font-semibold">Harry Duncton</span> Posted{" "}
          <span className="font-semibold">
            {data?.createdAt.toDateString()}
          </span>
        </h2>
        {/* <Markup
          className="font-monts text-base text-slate-800 [&_a]:text-blue-500 [&_a:hover]:underline"
          content={data?.description}
        /> */}
        <div className="font-monts text-base text-slate-800 [&_a]:text-blue-500 [&_a:hover]:underline [&_h2]:text-red-600"
      dangerouslySetInnerHTML={{ __html: data?.description }}
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
