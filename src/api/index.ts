import { baseProcedure, zodFile } from "@scinorandex/erpc";
import { Router, Server } from "@scinorandex/rpscin";
import { z } from "zod";
import { db } from "./prisma";

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
  "/image_upload": {
    put: baseProcedure.input(z.object({ image: zodFile("image/png") })).use(async (req, res, { input }) => {
      console.log("received image", input);
      return true;
    }),
  },
});

const postRouter = unTypeSafeRouter.subroute("/post").config({
  "/": {
    get: baseProcedure.use(() => db.post.findMany()),

    post: baseProcedure.input(z.object({ content: z.string() })).use(async (req, res, { input }) => {
      await db.post.create({ data: { content: input.content } });
      return await db.post.findMany();
    }),
  },

  "/:uuid": {
    get: baseProcedure.use(async (req) => {
      const post = await db.post.findFirst({ where: { uuid: req.params.uuid } });
      if (post) return post;
      else throw new Error("Was not able to find a post with that id");
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
