import { test, expect } from "@jest/globals"
import type { inferProcedureInput } from '@trpc/server';
import { createTRPCContext } from '../../trpc';
import { type AppRouter, createCaller } from '../../root';
import type { Blog, PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import type { Session } from "next-auth";

/**
 * This code is commented out due to unresolved bug related to Jest config and node_modules
 * Not clear how to move forward
 */
test('add and get post', async () => {
  // const prismaMock = mockDeep<PrismaClient>();
  // const mockSession: Session = {
  //   expires: new Date(Date.now()).toISOString(),
  //   user: { id: "test-id", role: "USER" }
  // };
  // const ctx = {
  //   headers: new Headers,
  //   db: prismaMock,
  //   session: mockSession
  // }
  // const caller = createCaller(ctx);
  // const input: inferProcedureInput<AppRouter['post']['list']> = {
  //   text: 'hello test',
  //   title: 'hello test',
  // };
  // const posts = await caller.post.list();
  console.log("posts")
  // const byId = await caller.post.byId({ id: post.id });

  // expect(byId).toMatchObject(input);
});