import axios from 'axios';
import { useState } from 'react';
import JobList from './components/JobList';

function App() {
  const [jobs, setJobs] = useState([]);
const fetchJobs = async (site) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/${site}`);
    console.log(`Response from ${site}:`, res.data);
    setJobs(
      Array.isArray(res.data.jobs) ? res.data.jobs :
      Array.isArray(res.data) ? res.data : []
    );
  } catch (error) {
    console.error('Error fetching jobs:', error);
    setJobs([]);
  }
};


  return (
    <div className="App">
      <h1>Job Scraper</h1>
      <button onClick={() => fetchJobs('naukri')}>Scrape Naukri</button>
      <button onClick={() => fetchJobs('RemoteOK')}>Scrape RemoteOK</button>
      <JobList jobs={jobs} />
    </div>
  );
}

export default App;
