var CronJob = require("cron").CronJob;

// const fetchGithub = require("./jobs/fetch-jobs");

var job = new CronJob(
  "* * * * * *",
  // fetchGithub,
  null,
  true,
  "America/Los_Angeles"
);

job.start();
