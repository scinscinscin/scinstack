import { Link } from "@scinorandex/react-router";
import { useLoader } from "@scinorandex/loader";
import { api, useRouter, cache } from "../../utils/Controller";

type RouteParams<T extends string[]> = {
  pathParams: {
    [key in T[number]]: string;
  };
};

export const PostIdPage = useLoader({
  fetchFn: ({ pathParams }: RouteParams<["post_uuid"]>) =>
    cache.fetch(`post_${pathParams.post_uuid}`, () =>
      api["/post"]["/:uuid"].get({ path: { uuid: pathParams.post_uuid } })
    ),

  SuccessFunction: ({ pathParams, data }) => {
    const router = useRouter();
    return (
      <>
        <h1>
          {pathParams.post_uuid}: {data.content}
        </h1>

        <Link route={router["/"]} pathParams={{}}>
          Go back to home
        </Link>
      </>
    );
  },
});
