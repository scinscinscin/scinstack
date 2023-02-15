import { RouterRenderer } from "@scinorandex/react-router";
import { Index } from "./pages/Index";
import { NotFound } from "./pages/NotFound";
import { PostIdPage } from "./pages/posts/post_id";
import { typeSafeRouter } from "./router";

export default function App() {
  // The config prop maps the routes of the site to their corresponding pages
  return (
    <RouterRenderer
      router={typeSafeRouter}
      NotFound={NotFound}
      config={{
        "/": Index,
        "/post": { "/:post_id": PostIdPage },
      }}
    />
  );
}
