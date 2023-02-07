import { generateProcedure, Server } from "@scinorandex/erpc";
import { z } from "zod";

const app = new Server({
  port: 9000,
  defaultMiddleware: {
    corsOptions: { origin: "http://localhost:5173", credentials: true },
  },
});

const posts = ["Lorem ipsum, this is the first post"];

const postRouter = app.sub("/posts");
const baseProcedure = generateProcedure(async () => ({}));

postRouter.get("/", baseProcedure, async () => posts);

postRouter.post("/", baseProcedure.input(z.object({ content: z.string() })), async (req, res, { input }) => {
  posts.push(input.content);
  return posts;
});
