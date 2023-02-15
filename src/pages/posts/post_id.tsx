import { Link, Page } from "@scinorandex/react-router";
import { useEffect, useState } from "react";
import { client } from "../../client";
import { useRouter } from "../../router";

export const PostIdPage: Page<["post_id"]> = ({ pathParams }) => {
  const [postData, setPostData] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    client["/post"]["/:id"].get({ path: { id: pathParams.post_id } }).then((res) => setPostData(res.content));
  }, [pathParams.post_id]);

  if (postData == null) return <h1>loading...</h1>;
  return (
    <>
      <h1>the value of post: {pathParams.post_id}</h1>
      <h2>is {postData}</h2>
      <Link route={router["/"]} pathParams={{}}>
        Go back to home
      </Link>
    </>
  );
};
