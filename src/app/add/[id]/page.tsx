/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
"use client";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";
import { api } from "~/trpc/react";
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { type SyntheticEvent, useReducer, useState, useEffect, ChangeEvent } from "react";
import { ActionKind, type State, blogReducer } from "~/app/hooks/blogReducer";
import toast, { Toaster } from "react-hot-toast";
import MessageContainer from "~/app/_components/MessageContainer";
import { imageUploader } from "~/app/hooks/imageUploader";
import { imageMimeType } from "~/utils/helperFunctions";

export default function EditPage({ params }: { params: { id: string } }) {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/blog')
    }
  })
  if (status === "loading") {
    return <MessageContainer message={"Loading or not authenticated..."} />
  }
  const { data } = api.post.locate.useQuery({ id: params.id });
  const [file, setFile] = useState<File>();
  const [filePreview, setFilePreview] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [state, dispatch] = useReducer(blogReducer, { ...data } as State);

  useEffect(() => {
    dispatch({ type: ActionKind.Title, payload: data?.title as string });
    dispatch({
      type: ActionKind.Description,
      payload: data?.description as string,
    });
  }, []);

  const update = api.post.update.useMutation({
    onSuccess: () => {
      toast.success("Blog post updated");
    },
  });

  async function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget?.files?.[0];
    if (!file?.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
    const imageData = await imageUploader(file)
    if (imageData) {
      const payload = (imageData)?.secure_url;
      dispatch({ type: ActionKind.Image, payload: payload });
      setShowUploadButton(true);
    }
  }

  useEffect(() => {
    let fileReader: FileReader,
      isCancel = false;
    // creates a new FileReader to read the uploaded file.
    // fileReader is async by default
    // fileReader.onload happens automatically after async fileReader.readAsDataURL has returned the file.
    if (file) {
      fileReader = new FileReader();
      // the event of fileReader is the return of the async fileReader.readAsDataURL.
      fileReader.onload = (e) => {
        const result = e.target;
        if (result && !isCancel) {
          // adds the data:url of uploaded file to Image Preview
          setImagePreview(result?.result as string);

          // boolean switch to control the image preview div in component render.
          setFilePreview(true);
        }
      };
      fileReader.readAsDataURL(file);
    }
    // return cleanup function to clear the current useEffect and reset for a new file upload.
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const updatedBody = { ...state, id: data?.id as string };
    update.mutate(updatedBody);
  }

  function uploadWithCurrentImage() {
    const updatedBody = {
      ...state,
      id: data?.id as string,
      image: data?.image as string,
    };
    update.mutate(updatedBody);
  }

  return (
    <main className="m-auto flex flex-1 flex-col items-center justify-center">
      <div className="z-0 mx-60 flex w-4/5 flex-col border-2 border-[#CFE1FF] bg-white text-gray-700 lg:w-3/5">
      <h1 className="flex justify-center">Hi {session?.user.name}, edit thisblog entry</h1>

        <form
          onSubmit={handleSubmit}
          className="m-10 flex w-11/12 flex-col items-center justify-center"
        >
          <input
            className="focus:ring-primary-500 focus:border-primary-500 mb-4 block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
            type="text"
            name="title"
            required
            placeholder="Title..."
            value={state?.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: ActionKind.Title,
                payload: e.currentTarget.value,
              })
            }
          />
          <Editor
            apiKey="07xjj6wsxo6o246cjml0rvt9rq0u4rnhnre171w9l80jom2g"
            id="description"
            value={state?.description}
            init={{ height: "25rem", width: "100%", menubar: false }}
            onEditorChange={(e: string) =>
              dispatch({ type: ActionKind.Description, payload: e })
            }
          />
          <div className="mt-4 flex flex-col">
            <div className="flex flex-col justify-center">
              <label>Add a new image here:</label>
              <input
                type="file"
                name="image"
                onChange={changeHandler}
                className="focus:ring-primary-500 focus:border-primary-500 mb-4 block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
              />
            </div>
            <div className="flex flex-row justify-center">
              <div className="m-4 flex w-4/5 flex-col justify-center border-2 border-[#CFE1FF] bg-white p-2">
                <p>Current image</p>
                <Image
                  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
                  src={data?.image as string}
                  alt="old image"
                  width="200"
                  height="200"
                />
                <button
                  className="text-grey-300 m-auto my-4 rounded border border-solid px-4 py-1"
                  type="button"
                  onClick={uploadWithCurrentImage}
                >
                  Upload with current image
                </button>
              </div>

              <div className="m-4 flex w-4/5 flex-col justify-center border-2 border-[#CFE1FF] bg-white p-2">
                {filePreview ? (
                  <div>
                    <Image
                      src={imagePreview}
                      alt="new image"
                      width="200"
                      height="200"
                    />
                  </div>
                ) : (
                  <h2>Preview new image here</h2>
                )}
                {showUploadButton && (
                  <button
                    className="text-grey-300 m-auto my-4 rounded border border-solid px-4 py-1"
                    type="submit"
                  >
                    Upload new image
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
        <Toaster />
      </div>
    </main>
  );
}
