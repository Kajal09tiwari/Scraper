const axios = require('axios');

// Using JSearch API from RapidAPI
const scrapeJobSearchAPI = async (searchQuery = 'software developer') => {
  try {
    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query: searchQuery,
        page: '1',
        num_pages: '1',
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    const jobs = response.data.data.map((job) => ({
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city ? `${job.job_city}, ${job.job_country}` : 'Remote',
      link: job.job_apply_link,
      description: job.job_description || 'No description available',
      source: 'JSearch',
    }));

    console.log(`✅ Scraped ${jobs.length} jobs from JSearch API`);
    return jobs;
  } catch (error) {
    console.error('❌ JSearch API Error:', error.message);
    return [];
  }
};

module.exports = scrapeJobSearchAPI;
