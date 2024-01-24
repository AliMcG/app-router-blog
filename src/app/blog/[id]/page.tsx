/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
"use client";

import { api } from "~/trpc/react";
import ConfirmDeleteModal from "~/app/_components/ConfirmDeleteModal";
import type { BlogPostPostgres } from "~/types";
import { useRouter } from "next/navigation";
import Button from "@/_components/Button";
import BlogContainer from "@/_components/BlogContainer";
import { useSession } from "next-auth/react";

export default function BlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data, refetch } = api.post.locate.useQuery(
    { id: params.id },
    {
      enabled: !!params.id,
    },
  );
  const { data: session } = useSession();
  const { data: userData } = api.users.getUserVote.useQuery({
    userId: session?.user?.id as string,
    blogId: params.id,
  });
 
  const { mutate: userMutation } = api.users.updateUser.useMutation({
    onSuccess: () => refetch(),
  });
  const { mutate: voteCountMutation } =
    api.post.updateBlogVoteCount.useMutation();

  const voteOnBlog = (id: string) => {
    voteCountMutation({ id: id });
    userMutation({
      userId: session?.user?.id as string,
      blogId: id,
      hasVoted: true,
    });
  };

  const EditButton = () => {
    return (
      <Button
        text={"Edit"}
       intent={"primary"}
        onClick={() => void router.push(`/add/${data?.id as string}`)}
      />
    );
  };
  const VoteButton = () => {
    return (
      <Button
        text={"Vote"}
        intent={"secondary"}
        onClick={() => voteOnBlog(data?.id as string)}
      />
    );
  };

  return (
    <div className="m-auto flex flex-col items-center">
      <BlogContainer data={data as BlogPostPostgres} />
      <div className="mt-4 flex flex-row justify-center gap-4">
        {session?.user && !userData?.blogsVotedOn[0]?.hasVoted ? (
          <VoteButton />
        ) : (
          <div></div>
        )}
        {session?.user.role === "ADMIN" && (
          <>
            <EditButton />
            <ConfirmDeleteModal id={data?.id as string} />
          </>
        )}
      </div>
    </div>
  );
}
