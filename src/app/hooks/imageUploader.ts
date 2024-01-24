
import type { Cloundinary } from "~/types";
import { env } from "~/env";
import { typeSafeFetch } from "~/utils/helperFunctions";

export const imageUploader = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "blog-duncton");

  const apiEndpoint = env.NEXT_PUBLIC_CLOUNDINARY_API;
  const data = (await typeSafeFetch<Cloundinary>(
    apiEndpoint,
    {
      method: "POST",
      body: formData,
    },
  ).then()
  .catch((err) => {
    console.error(err)
  }))
  return data
};
