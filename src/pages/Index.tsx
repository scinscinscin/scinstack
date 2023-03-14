import { useState } from "react";
import { api, useRouter, cache } from "../utils/Controller";
import { useLoader } from "@scinorandex/loader";
import { useMutation } from "@scinorandex/query";
import { Browser } from "@scinorandex/rpscin/dist/envs/browser";

export const Index = useLoader({
  fetchFn: () => cache.fetch("main", () => api["/post"]["/"].get({})),

  SuccessFunction: ({ data }) => {
    const router = useRouter();
    const [inputBox, setInputBox] = useState("");
    const { mutate } = useMutation({ invalidationKey: "main_post_feed", mutationFn: api["/post"]["/"].post });
    const [file, setFile] = useState<File | null>(null);

    async function submit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault();
      if (inputBox === "") return;
      const response = await mutate({ body: { content: inputBox } });
      console.log(inputBox, response);
    }

    return (
      <div className="container">
        <div className="form_container">
          <input
            placeholder="Enter your new post here"
            value={inputBox}
            onChange={(e) => setInputBox(e.target.value)}
          />
          <button onClick={submit}>Create new post</button>
        </div>

        <div className="posts_container">
          {data.map((post, idx) => {
            return (
              <div
                className="post"
                key={idx}
                onClick={() => {
                  router["/post"]["/:post_uuid"].use({ post_uuid: post.uuid });
                }}
              >
                <h1>{post.content}</h1>
              </div>
            );
          })}
        </div>

        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) setFile(e.target.files[0]);
          }}
        />

        <div>{file && `${file.name} - ${file.type}`}</div>
        <button
          onClick={async () => {
            if (file) {
              console.log("uploading file now");
              const response = await api["/user"]["/image_upload"].put({
                body: { image: Browser.wrapFile("image/png", file) },
              });
              console.log(response);
            }
          }}
        >
          Upload Files
        </button>
      </div>
    );
  },
});
