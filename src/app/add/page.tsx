/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
"use client";

import { useState, useReducer, useEffect, type SyntheticEvent } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import React from "react";
import { api } from "~/trpc/react";
import { ActionKind, blogReducer, initialState } from "../hooks/blogReducer";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import MessageContainer from "~/app/_components/MessageContainer";
import { imageUploader } from "~/app/hooks/imageUploader";
import { imageMimeType } from "~/utils/helperFunctions";

export default function AddPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/blog");
    },
  });
  if (status === "loading") {
    return <MessageContainer message={"Loading or not authenticated..."} />;
  }
  const [state, dispatch] = useReducer(blogReducer, initialState);
  const [file, setFile] = useState<File>();
  const [filePreview, setFilePreview] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [showUplaodButton, setShowUploadButton] = useState(false);
  const { mutate } = api.post.create.useMutation({
    onSuccess: () => {
      toast.success("New blog uploaded");
    },
  });

  async function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget?.files?.[0];
    if (!file?.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
    const imageData = await imageUploader(file);
    if (imageData) {
      const payload = imageData?.secure_url;
      dispatch({ type: ActionKind.Image, payload: payload });
      setShowUploadButton(true);
    }
  }

  useEffect(() => {
    let fileReader: FileReader,
      isCancel = false;
    /**
     * creates a new FileReader to read the uploaded file.
     * fileReader is async by default
     * fileReader.onload happens automatically after async fileReader.readAsDataURL has returned the file.
     */

    if (file) {
      fileReader = new FileReader();
      /**
       * the event of fileReader is the return of the async fileReader.readAsDataURL.
       */
      fileReader.onload = (e) => {
        const result = e.target;
        if (result && !isCancel) {
          /**
           * adds the data:url of uploaded file to Image Preview
           */
          setImagePreview(result?.result as string);
          setFilePreview(true);
        }
      };
      fileReader.readAsDataURL(file);
    }
    /**
     * return cleanup function to clear the current useEffect and reset for a new file upload.
     */
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    mutate(state);
  }

  return (
    <main className="m-auto flex flex-1 flex-col items-center justify-center">
      <div className="z-0 mx-60 flex w-4/5 flex-col border-2 border-[#CFE1FF] bg-white text-gray-700 lg:w-3/5">
        <h1 className="flex justify-center">
          Hi {session?.user.name}, write a new blog entry
        </h1>
        <form
          onSubmit={handleSubmit}
          className="m-10 flex w-11/12 flex-col items-center justify-center"
        >
          <input
            className="focus:ring-primary-500 focus:border-primary-500 mb-4 block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
            type="text"
            name="title"
            placeholder="Title..."
            data-cy="title-input"
            required
            value={state.title}
            onChange={(e) =>
              dispatch({
                type: ActionKind.Title,
                payload: e.currentTarget.value,
              })
            }
          />
          <Editor
            apiKey="07xjj6wsxo6o246cjml0rvt9rq0u4rnhnre171w9l80jom2g"
            id="description"
            data-cy="description-input"
            value={state.description}
            init={{ height: "20rem", width: "80%", menubar: false }}
            onEditorChange={(e) =>
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              dispatch({ type: ActionKind.Description, payload: e })
            }
          />
          <label className="mt-4">
            Add Image:
            <input
              type="file"
              name="image"
              data-cy="image-input"
              onChange={changeHandler}
              required
              className="focus:ring-primary-500 focus:border-primary-500 mb-4 block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
            />
          </label>
          <p>
            Once the photo has been converted, the upload button will be
            available
          </p>
          {showUplaodButton && (
            <button
              className="text-grey-300 m-auto my-4 rounded border border-solid px-4 py-1"
              type="submit"
            >
              Upload
            </button>
          )}
        </form>
        <div className="mb-4 flex justify-center">
          {filePreview ? (
            <div>
              <Image
                src={imagePreview}
                alt="upload image"
                width="475"
                height="275"
              />
            </div>
          ) : (
            <h2>Preview image here</h2>
          )}
        </div>
      </div>
      <Toaster />
    </main>
  );
}
