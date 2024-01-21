/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Cloundinary } from "~/types";

export const imageUploader = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "blog-duncton");
  const apiEndpoint = 'https://api.cloudinary.com/v1_1/dejhaiho2/image/upload';
  const data = (await fetch(
    apiEndpoint,
    {
      method: "POST",
      body: formData,
    },
  ).then((r) => r.json())
  .catch((err) => {
    console.error(err)
  }))
  return data as Cloundinary
};
