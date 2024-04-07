import { test, expect } from "@jest/globals"
import { createTRPCContext } from '~/server/api/trpc';
import { createCaller } from '~/server/api/root';

/**
 * These modules required mocking for Jest to work.
 */
jest.mock("superjson", () => ({
  superjson: jest.fn()
}))
jest.mock("~/env", () => ({
  env: jest.fn(),
 }))
 jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
 }))

test('Locate a post', async () => {

  const ctx = await createTRPCContext({ headers: new Headers() })

  const caller = createCaller(ctx)

  const post = await caller.post.locate({ id: "64ad42f351dc52523bc6a7d9"});
  console.log("post", post)
  // expect(posts[0]).toHaveProperty("description");
});