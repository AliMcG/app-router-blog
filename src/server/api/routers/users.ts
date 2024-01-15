import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";


export const userRouter = createTRPCRouter({
  getUserVote: publicProcedure
  .input(
    z.object({
      userId: z.string(),
      blogId: z.string()
    })
  )
  .query(async ({ ctx, input }) => {
    const result = await ctx.db.user.findUnique({
      where: {
        id: input.userId,
      },
      include: {
          blogsVotedOn: {
            where: {
              id: input.blogId
            }
          }
        },
    });
    return result;
  }),
  updateUser: protectedProcedure
  .input(
    z.object({
      userId: z.string(),
      hasVoted: z.boolean(),
      blogId: z.string()
    })
  )
  .mutation(async ({ ctx, input }) => {
    const result = await ctx.db.user.upsert({
      where: {
        id: input.userId
      },
      update: {
        blogsVotedOn: {
          upsert: {
            where: {
              id: input.blogId
            },
            update: {
              hasVoted: input.hasVoted,
            },
            create: {
              id: input.blogId,
              hasVoted: input.hasVoted
            }
          }
        }
      },
      create: {
        id: input.userId,
        blogsVotedOn: {
          create: [{
                id: input.blogId,
                hasVoted: input.hasVoted,
            }]
          }
        },

    })
    return result
  })
})
