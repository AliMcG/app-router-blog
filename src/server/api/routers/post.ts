import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.blog.findMany();
    return result;
  }),
  locate: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.blog.findUnique({
        where: {
          id: input.id,
        },
      });
      return result;
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string(),
        image: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.blog.create({
        data: {
          title: input.title,
          description: input.description,
          image: input.image,
          numberVotes: 0,
          createdAt: new Date(),
        },
      });
      return result;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        image: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedBlog = await ctx.db.blog.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          image: input.image,
          createdAt: new Date(),
        },
      });
      return updatedBlog;
    }),
  listBySerachText: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.blog.findMany({
        where: {
          OR: [
            {
              title: {
                contains: input.text,
              },
            },
            {
              description: {
                contains: input.text,
              },
            },
          ],
        },
      });
      return result;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.blog.delete({
        where: {
          id: input.id,
        },
      });
      return result;
    }),
  updateBlogVoteCount: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.blog.update({
        where: {
          id: input.id,
        },
        data: {
          numberVotes: {
            increment: 1,
          },
        },
      });
      return result;
    }),
});
