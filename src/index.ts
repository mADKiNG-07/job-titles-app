import { Hono } from "hono";
import { readFileSync } from "fs";
const jobTitlesData = require("./job-titles.json");

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/all-job-titles", (c) => {
  return Response.json(jobTitlesData["job-titles"]);
});

app.get("/search-job-titles", (c) => {
  const query = c.req.query("q"); // Get the 'q' query parameter
  if (!query) {
    return c.json({ message: "Please provide a search query" }, 400);
  }

  // Perform a case-insensitive search
  const filteredTitles = jobTitlesData["job-titles"].filter((title: string) =>
    title.toLowerCase().includes(query.toLowerCase())
  );

  return c.json(filteredTitles);
});

export default app;
