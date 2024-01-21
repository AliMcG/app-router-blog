/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextRequest } from "next/server";
import { env } from "~/env";
import type { Cloundinary } from "~/types";

export async function POST(request: NextRequest) {

  const formData = await request.formData()
  const data = (await fetch(
    env.CLOUNDINARY_API,
    {
      method: "POST",
      body: formData,
    },
  ).then((r) => r.json())) as Cloundinary;
 
  return Response.json(data)
}