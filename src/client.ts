import { Client } from "@scinorandex/rpscin/dist/client";
import { AppRouter } from "./api";
import "buffer/";

export const client = Client<AppRouter>({ apiLink: "http://localhost:9000" });
