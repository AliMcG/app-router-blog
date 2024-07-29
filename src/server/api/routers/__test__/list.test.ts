import { test, expect } from "@jest/globals";
import { createContextInner } from "~/server/api/trpc";
import { createCaller } from "~/server/api/root";
import type { Session } from "next-auth";

/**
 * These modules required mocking for Jest to work.
 */
jest.mock("superjson", () => ({
  superjson: jest.fn(),
}));
jest.mock("~/env", () => ({
  env: jest.fn(),
}));
jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

test("List all posts", async () => {
  const mockSession: Session = {
    expires: new Date().toISOString(),
    user: { id: "env.UNIT_TESTER_ID", role: "USER" },
  };

  const caller = createCaller(
    await createContextInner({ session: mockSession }),
  );

  const posts = await caller.post.list();

  expect(posts[0]).toHaveProperty("description");
});
