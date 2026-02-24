const axios = require('axios');
const Job = require('../models/Job');

const scrapeRemoteOK = async () => {
  console.log("🚀 Fetching RemoteOK API...");

  try {
    const response = await axios.get('https://remoteok.io/api', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Origin': 'https://remoteok.io',
        'Referer': 'https://remoteok.io/'
      }
    });

    const jobsData = response.data.slice(1);

    const jobs = jobsData.map(job => ({
      title: job.position || 'N/A',
      company: job.company || 'N/A',
      location: job.location || 'Remote',
      link: job.url || '#',
      source: 'RemoteOK'
    }));

    console.log(`✅ Fetched ${jobs.length} jobs`);

    if (jobs.length > 0) {
      await Job.insertMany(jobs);
      console.log("✅ Inserted into DB");
    }

    return jobs;

  } catch (error) {
    console.error("❌ RemoteOK API Error:", error.message);
    return [];
  }
};

module.exports = scrapeRemoteOK;