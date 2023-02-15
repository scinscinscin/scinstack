import { Router, RouterClient, routerRendererContext } from "@scinorandex/react-router";
import { useContext } from "react";

/**
 * This project uses @scinorandex/router to provide a typesafe way of navigating between pages
 * We have to define the route structure of the site first using the router object
 */
const unTypeSafeRouter = Router();
const postRouter = unTypeSafeRouter.subrouter("/post");
export const typeSafeRouter = unTypeSafeRouter.useSubrouter(postRouter.use("/:post_id")).use("/");

export const useRouter = () => RouterClient(typeSafeRouter, useContext(routerRendererContext));
