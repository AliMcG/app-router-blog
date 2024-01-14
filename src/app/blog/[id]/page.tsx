"use client";

import { api } from "~/trpc/react";
import type { BlogPostPostgres } from "~/types";
import { useRouter } from "next/navigation";
import BlogContainer from "@/_components/BlogContainer";
import { useSession } from "next-auth/react";

export default function BlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data } = api.post.locate.useQuery({ id: params.id });
  const { mutate } = api.post.delete.useMutation();
  const { data: session } = useSession();

  const DeleteButton = () => {
    return (
      <button
        className="text-red-500"
        // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
        onClick={() => mutate({ id: data?.id as string })}
      >
        Delete
      </button>
    );
  };
  const EditButton = () => {
    return (
      <button
        className="text-blue-500"
        // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
        onClick={() => void router.push(`/add/${data?.id as string}`)}
      >
        Edit
      </button>
    );
  };

  return (
    <div className="m-auto flex flex-col items-center">
      <BlogContainer data={data as BlogPostPostgres} />
      {session?.user.role === "ADMIN" && (
        <>
          <DeleteButton />
          <EditButton />
        </>
      )}
    </div>
  );
}
