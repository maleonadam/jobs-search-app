import React from "react";

export default function Job({ job, onClick }) {
  return (
    <div
      className="card job"
      onClick={onClick}
      style={{ width: "100", marginTop: "10px" }}
    >
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
        <p className="card-text">{job.location}</p>
        <p className="card-text">{job.created_at}</p>
      </div>
    </div>
  );
}
