import { baseProcedure } from "@scinorandex/erpc";
import { Router, Server } from "@scinorandex/rpscin";
import { z } from "zod";

const unTypeSafeRouter = Router("/").config({});

const userRouter = unTypeSafeRouter.subroute("/user").config({
  "/register": {
    post: baseProcedure
      .input(z.object({ username: z.string(), password: z.string() }))
      .use(async (req, res, { input }) => {
        console.log("Creating user: ", input);
        return { user: { username: input.username } };
      }),
  },
});

const posts: { content: string }[] = [{ content: "Lorem Ipsum" }];

const postRouter = unTypeSafeRouter.subroute("/post").config({
  "/": {
    get: baseProcedure.use(async () => posts),
    post: baseProcedure.input(z.object({ content: z.string() })).use(async (req, res, { input }) => {
      posts.push(input);
      return posts;
    }),
  },

  "/:id": {
    get: baseProcedure.use(async (req) => {
      const id = parseInt(req.params.id, 10);
      return posts[id];
    }),
  },
});

const appRouter = unTypeSafeRouter.mergeRouter(userRouter).mergeRouter(postRouter);
export type AppRouter = typeof appRouter;

Server(
  {
    port: 9000,
    defaultMiddleware: { corsOptions: { credentials: true, origin: "http://localhost:5173" } },
  },
  appRouter
);
