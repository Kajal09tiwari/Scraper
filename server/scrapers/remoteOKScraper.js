const axios = require('axios');
const Job = require('../models/Job');

const scrapeRemoteOK = async () => {
  console.log("🚀 Fetching RemoteOK API...");

  try {
    const response = await axios.get('https://remoteok.io/api');

    const jobsData = response.data.slice(1); // First item is metadata

    const jobs = jobsData.map(job => ({
      title: job.position || 'N/A',
      company: job.company || 'N/A',
      location: job.location || 'Remote',
      link: job.url || '#',
      source: 'RemoteOK'
    }));

    console.log(`✅ Fetched ${jobs.length} jobs from API`);

    if (jobs.length > 0) {
      await Job.insertMany(jobs);
      console.log("✅ Jobs inserted to DB");
    }

    return jobs;

  } catch (error) {
    console.error("❌ RemoteOK API Error:", error.message);
    return [];
  }
};

module.exports = scrapeRemoteOK;