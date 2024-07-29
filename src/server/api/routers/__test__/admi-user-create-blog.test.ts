import { test, expect, describe } from "@jest/globals";
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

describe("Creates and deletes a blog", () => {
  test("create a post", async () => {
    const mockSession: Session = {
      expires: new Date().toISOString(),
      user: { id: "env.UNIT_TESTER_ID", role: "USER" },
    };

    const caller = createCaller(
      await createContextInner({ session: mockSession }),
    );

    const post = await caller.post.create({
      description: "JEST TESTING",
      title: "JEST TESTING",
      image:
        "https://res.cloudinary.com/dejhaiho2/image/upload/v1712523133/blog-duncton/wsguauxtd9nnl0vxifwe.jpg",
    });
    console.log("post", post);
    expect(post).toHaveProperty("description");
  });
});
