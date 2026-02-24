import axios from 'axios';
import { useState } from 'react';
import JobList from './components/JobList';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (site) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://scraper-9dzw.onrender.com/api/${site}`);
      setJobs(
        Array.isArray(res.data.jobs)
          ? res.data.jobs
          : Array.isArray(res.data)
          ? res.data
          : []
      );
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">

      {/* Header */}
      <header className="header">
        <h1>💼 Job Scraper Portal</h1>
        <p>Find the latest jobs from multiple platforms instantly</p>
      </header>

      {/* Buttons Section */}
      <div className="button-section">
        <button className="btn naukri" onClick={() => fetchJobs('naukri')}>
          Scrape Naukri
        </button>

        <button className="btn remote" onClick={() => fetchJobs('remoteok')}>
          Scrape RemoteOK
        </button>
        <button className="btn Indeed" onClick={() => fetchJobs('indeed')}>
          Scrape Indeed
        </button>
        
      </div>

      {loading && <p className="loading">Fetching jobs...</p>}

      {/* Jobs Section */}
      <div className="jobs-container">
        <JobList jobs={jobs} />
      </div>

      {/* Footer */}
      <footer className="footer">
        © 2026 Job Scraper | Built with React & Node.js
      </footer>

    </div>
  );
}

export default App;