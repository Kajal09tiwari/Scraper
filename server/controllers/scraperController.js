const scrapeJobSearchAPI = require('../scrapers/jobSearchAPI');
const scrapeRemoteJobsAPI = require('../scrapers/remoteJobsAPI');

// Mock data for testing
const mockJobs = [
  {
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    location: 'Bangalore',
    link: 'https://example.com/job-1',
    source: 'Demo Data',
  },
  {
    title: 'Full Stack Developer',
    company: 'StartUp XYZ',
    location: 'Remote',
    link: 'https://example.com/job-2',
    source: 'Demo Data',
  },
  {
    title: 'Frontend Developer',
    company: 'WebApp Inc',
    location: 'Hyderabad',
    link: 'https://example.com/job-3',
    source: 'Demo Data',
  },
];

// JSearch API Jobs - India Jobs
exports.scrapeNaukriJobs = async (req, res) => {
  try {
    const jobs = await scrapeJobSearchAPI('software developer jobs in india');
    res.json(jobs && jobs.length > 0 ? jobs : mockJobs);
  } catch (error) {
    console.error('Error:', error);
    res.json(mockJobs);
  }
};

// Remote OK Jobs - Worldwide Remote
exports.scrapeRemoteOKJobs = async (req, res) => {
  try {
    const jobs = await scrapeRemoteJobsAPI();
    res.json({ 
      success: true, 
      jobs: jobs && jobs.length > 0 ? jobs : mockJobs 
    });
  } catch (error) {
    console.error('Error:', error);
    res.json({ success: true, jobs: mockJobs });
  }
};

// JSearch API Jobs - Developer Jobs Worldwide
exports.scrapeIndeedJobs = async (req, res) => {
  try {
    const jobs = await scrapeJobSearchAPI('developer jobs');
    res.json({ 
      success: true, 
      jobs: jobs && jobs.length > 0 ? jobs : mockJobs 
    });
  } catch (error) {
    console.error('Error:', error);
    res.json({ success: true, jobs: mockJobs });
  }
};

exports.scrapeApnaJobs = async (req, res) => {
  try {
    const jobs = await scrapeJobSearchAPI('jobs in india');
    res.json(jobs && jobs.length > 0 ? jobs : mockJobs);
  } catch (error) {
    console.error('Error:', error);
    res.json(mockJobs);
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    res.json(mockJobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};