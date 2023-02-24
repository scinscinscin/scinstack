import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RouterRenderer } from "@scinorandex/react-router";
import { Index } from "./pages/Index";
import { PostIdPage } from "./pages/posts/post_uuid";
import { cache, typeSafeRouter } from "./utils/Controller";
import { QueryContext } from "@scinorandex/query";

// The config prop maps the routes of the site to their corresponding pages
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryContext.Provider value={cache}>
      <RouterRenderer
        router={typeSafeRouter}
        NotFound={() => <h1>Not Found</h1>}
        config={{
          "/": Index,
          "/post": { "/:post_uuid": PostIdPage },
        }}
      />
    </QueryContext.Provider>
  </React.StrictMode>
);
