/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
"use client";

import { api } from "~/trpc/react";
import type { BlogPostPostgres } from "~/types";
import { useRouter } from "next/navigation";
import BlogContainer from "@/_components/BlogContainer";
import { useSession } from "next-auth/react";

export default function BlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data } = api.post.locate.useQuery({ id: params.id });
  const { mutate: deleteMutate } = api.post.delete.useMutation();
  const { data: session } = useSession();
  const { data: userData } = api.users.getUserVote.useQuery({
    userId: session?.user?.id as string,
    blogId: params.id,
  });
  console.log("userData", userData?.blogsVotedOn)
  const { mutate: userMutation } = api.users.updateUser.useMutation({
    onSuccess: () => console.log("use mutation"),
  });
  const { mutate: voteCountMutation } =
    api.post.updateBlogVoteCount.useMutation();

  const voteOnBlog = (id: string) => {
    voteCountMutation({ id: id });
    userMutation({ userId: session?.user?.id as string, blogId: id, hasVoted: true });
  };

  const DeleteButton = () => {
    return (
      <button
        className="text-red-500"
        onClick={() => deleteMutate({ id: data?.id as string })}
      >
        Delete
      </button>
    );
  };
  const EditButton = () => {
    return (
      <button
        className="text-blue-500"
        onClick={() => void router.push(`/add/${data?.id as string}`)}
      >
        Edit
      </button>
    );
  };
  const VoteButton = () => {

    return (
      <button
        className="text-green-500"
        onClick={() => voteOnBlog(data?.id as string)}
      >
        Vote
      </button>
    );
  };

  return (
    <div className="m-auto flex flex-col items-center">
      <BlogContainer data={data as BlogPostPostgres} />
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
        {session?.user && !userData?.blogsVotedOn[0]?.hasVoted ? (
          <VoteButton />
        ) : (
          <div></div>
        )}
      {session?.user.role === "ADMIN" && (
        <>
          <DeleteButton />
          <EditButton />
        </>
      )}
    </div>
  );
}
