const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: "./config/config.env" });

const app = express();

// const redis = require("redis");
// const client = redis.createClient();

// const { promisify } = require("util");
// const getAsync = promisify(client.get).bind(client);

const fetchGithub = require("./worker/jobs/fetch-jobs");

app.get("/api/jobs", async (req, res) => {
  // const jobs = await getAsync("github");
  const jobs = await fetchGithub;

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  res.send(jobs);
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
