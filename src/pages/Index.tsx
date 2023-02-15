import { useEffect, useState } from "react";
import { client } from "../client";
import { useRouter } from "../router";

export function Index() {
  const router = useRouter();
  const [serverData, setServerData] = useState<string[] | null>(null);
  const [inputBox, setInputBox] = useState("");

  useEffect(() => {
    client["/post"]["/"].get({}).then((res) => setServerData(res.map((e) => e.content)));
  }, []);

  async function submit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (inputBox === "") return;

    const res = await client["/post"]["/"].post({
      body: { content: inputBox },
    });

    setServerData(res.map((e) => e.content));
  }

  if (serverData === null) return <h1>loading...</h1>;

  return (
    <div className="container">
      <div className="form_container">
        <input placeholder="Enter your new post here" value={inputBox} onChange={(e) => setInputBox(e.target.value)} />
        <button onClick={submit}>Create new post</button>
      </div>

      <div className="posts_container">
        {serverData.map((e, idx) => {
          return (
            <div
              className="post"
              key={idx}
              onClick={() => {
                router["/post"]["/:post_id"].use({ post_id: `${idx}` });
              }}
            >
              <h1>{e}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
