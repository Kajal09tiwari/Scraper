const axios = require('axios');

// Remote OK API - completely free, no key needed
const scrapeRemoteJobsAPI = async () => {
  try {
    const response = await axios.get('https://remoteok.com/api', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    // Filter only recent jobs
    const jobs = response.data
      .slice(1, 26) // Get first 25 jobs
      .map((job) => ({
        title: job.title,
        company: job.company,
        location: job.location || 'Remote',
        link: job.url,
        description: job.description || 'No description available',
        source: 'RemoteOK',
      }));

    console.log(`✅ Scraped ${jobs.length} remote jobs from RemoteOK API`);
    return jobs;
  } catch (error) {
    console.error('❌ RemoteOK API Error:', error.message);
    return [];
  }
};

module.exports = scrapeRemoteJobsAPI;
