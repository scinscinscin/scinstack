import type { AppRouter } from "../api";
import "buffer/";
import { useContext } from "react";
import { Client } from "@scinorandex/rpscin/dist/client";
import { Router, RouterClient, routerRendererContext } from "@scinorandex/react-router";
import { generateQueryProvider } from "@scinorandex/query";

export const api = Client<AppRouter>({ apiLink: "http://localhost:9000" });
export const cache = generateQueryProvider(true);

/**
 * This project uses @scinorandex/router to provide a typesafe way of navigating between pages
 * We have to define the route structure of the site first using the router object
 */
const unTypeSafeRouter = Router();
const postRouter = unTypeSafeRouter.subrouter("/post");
export const typeSafeRouter = unTypeSafeRouter.useSubrouter(postRouter.use("/:post_uuid")).use("/");
export const useRouter = () => RouterClient(typeSafeRouter, useContext(routerRendererContext));
