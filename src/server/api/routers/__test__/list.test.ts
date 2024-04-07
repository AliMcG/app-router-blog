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

test('List all posts', async () => {

  const ctx = await createTRPCContext({ headers: new Headers() })

  const caller = createCaller(ctx)

  const posts = await caller.post.list();

  expect(posts[0]).toHaveProperty("description");
  // poss to check for not an empty string?
});
