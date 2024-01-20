import type { Cloundinary } from "~/types";

export const imageUploader = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "blog-duncton");

  const apiEndpoint = "/api/image";
  const data = (await fetch(
    "https://api.cloudinary.com/v1_1/dejhaiho2/image/upload",
    {
      method: "POST",
      body: formData,
    },
  ).then((r) => r.json())) as Cloundinary;
  return data;
};
