import { Axios } from "axios";
import { useEffect, useState } from "react";

const axios = new Axios({
  baseURL: "http://localhost:9000",
  withCredentials: true,
  transformResponse: (x) => JSON.parse(x),
  headers: { "Content-Type": "application/json" },
});

export default function App() {
  const [serverData, setServerData] = useState<string[] | null>(null);
  const [inputBox, setInputBox] = useState("");

  useEffect(() => {
    axios.get("/posts/").then(({ data }) => {
      setServerData(data.result);
    });
  }, []);

  async function submit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (inputBox === "") return;

    const { data } = await axios.post("/posts/", JSON.stringify({ content: inputBox }));
    setServerData(data.result);
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
            <div className="post" key={idx}>
              <h1>{e}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
