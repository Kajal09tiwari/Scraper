const axios = require('axios');

// Using JSearch API from RapidAPI
const scrapeJobSearchAPI = async (searchQuery = 'software developer') => {
  try {
    console.log(`🔍 Searching for: ${searchQuery}`);
    console.log('🔑 API Key Present:', !!process.env.RAPID_API_KEY);

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
      timeout: 10000,
    };

    const response = await axios.request(options);
    console.log('📊 API Response Status:', response.status);
    console.log('📦 Response Data Length:', response.data?.data?.length || 0);

    if (!response.data?.data || response.data.data.length === 0) {
      console.warn('⚠️ No jobs found in response');
      return [];
    }

    const jobs = response.data.data.map((job) => ({
      title: job.job_title || 'No Title',
      company: job.employer_name || 'Unknown',
      location: job.job_city ? `${job.job_city}, ${job.job_country}` : 'Remote',
      link: job.job_apply_link || '#',
      description: job.job_description || 'No description available',
      source: 'JSearch',
    }));

    console.log(`✅ Scraped ${jobs.length} jobs from JSearch API`);
    return jobs;
  } catch (error) {
    console.error('❌ JSearch API Error:', error.message);
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    }
    return [];
  }
};

module.exports = scrapeJobSearchAPI;
