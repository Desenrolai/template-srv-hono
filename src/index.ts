import { Hono } from "hono";
import { serve } from "@hono/node-server";

export const app = new Hono();

app.get("/health", (c) => c.json({ status: "ok" }));

export function startServer(): void {
  const port = Number.parseInt(process.env.PORT ?? "3000", 10);

  serve({ fetch: app.fetch, port }, (info) => {
    console.log("Server running on port " + String(info.port));
  });
}
