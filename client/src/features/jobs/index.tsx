import { useState } from "react";
import { useCreateJob } from "./api/add-job";
import { useFetchJobs } from "./api/fetch-jobs";

export const Jobs = () => {
  const [prompt, setPrompt] = useState('');
  const { data: jobs, isLoading, isError } = useFetchJobs()
  const { mutate, isPending: isSubmitting } = useCreateJob()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    mutate(prompt);
    setPrompt('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Job Submitter</h1>
      </header>

      <main>
        <form onSubmit={handleSubmit} className="job-form">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Sumit a prompt"
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Job'}
          </button>
        </form>

        <div className="jobs-container">
          <h2>Job Submissions</h2>
          {isLoading && <p>Loading jobs...</p>}
          {isError && <p className="error">Error fetching jobs.</p>}
          {jobs && (
            <ul className="jobs-list">
              {jobs.map((job) => (
                <li key={job.id} className="job-item">
                  <div className="job-prompt">
                    <strong>Prompt:</strong> {job.prompt}
                  </div>
                  <div className="job-status">
                    <strong>Status:</strong>
                    <span className={`status-badge status-${job.status.toLowerCase()}`}>
                      {job.status}
                    </span>
                  </div>
                  {job.status === 'Complete' && (
                    <div className="job-result">
                      <strong>Result:</strong>
                      <span className={`result-badge ${job.result === 'Success' ? 'success' : 'fail'}`}>
                        {job.result === 'Success' ? 'Success' : 'Fail'}
                      </span>
                      <p className="result-output">{job.result}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
