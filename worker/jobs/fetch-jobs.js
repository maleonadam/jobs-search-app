const fetch = require("node-fetch");

// const redis = require("redis");
// const client = redis.createClient();

// const { promisify } = require("util");
// const setAsync = promisify(client.set).bind(client);

const baseURL = "https://jobs.github.com/positions.json";

const fetchGithub = async () => {
  try {
    let resultCount = 1;
    let onPage = 0;

    const allJobs = [];

    // fetch all pages
    while (resultCount > 0) {
      const res = await fetch(`${baseURL}?page=${onPage}`);
      const jobs = await res.json();
      allJobs.push(...jobs);
      resultCount = jobs.length;
      console.log("got", resultCount, "jobs");
      onPage++;
    }

    console.log("got", allJobs.length, "jobs");

    // filter algorithm
    const jrJobs = allJobs.filter((job) => {
      const jobTitle = job.title.toLowerCase();
      let isJunior = true;

      // algo logic
      if (
        jobTitle.includes("senior") ||
        jobTitle.includes("manager") ||
        jobTitle.includes("sr.") ||
        jobTitle.includes("architech")
      ) {
        return false;
      }

      return true;
    });

    console.log("filtered down to ", jrJobs.length);
    return JSON.stringify(jrJobs);

    // set in redis
    // const success = await setAsync("github", JSON.stringify(jrJobs));
    // console.log(success);
  } catch (error) {
    console.log(error);
  }
};

module.exports = fetchGithub();
