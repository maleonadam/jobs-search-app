import React, { useState, useEffect } from "react";
import "./App.css";

import Jobs from "./components/Jobs";
import fetch from "node-fetch";

const JOB_URL = "/api/jobs";

async function fetchJobs(getNewJobs) {
  const res = await fetch(JOB_URL);
  const results = await res.json();

  getNewJobs(results);
  console.log(results);
}

function App() {
  const [jobResults, newJobs] = useState([]);

  useEffect(() => {
    fetchJobs(newJobs);
  }, []);

  return (
    <div className="container">
      <nav className="navbar navbar-dark bg-primary">
        <h4 className="navbar-brand">Software Development Jobs</h4>
      </nav>
      <div>
        <Jobs jobs={jobResults} />
      </div>
    </div>
  );
}

export default App;
