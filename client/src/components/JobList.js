import './JobList.css';  // We'll create this CSS file for styling

function JobList({ jobs }) {
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return <p>No jobs available.</p>;
  }

  return (
    <div className="job-list">
      {jobs.map((job, index) => (
        <div key={index} className="job-card">
          <h3>{job.title}</h3>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location || 'N/A'}</p>
          <a href={job.link} target="_blank" rel="noreferrer" className="view-job-btn">
            View Job
          </a>
        </div>
      ))}
    </div>
  );
}

export default JobList;
