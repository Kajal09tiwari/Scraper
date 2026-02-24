const cheerio = require('cheerio');
const fetchWithRetries = require('../utils/fetchWithRetries');
const Job = require('../models/Job');

const scrapeIndeed = async () => {
  console.log('🚀 Starting Indeed scraping...');

  try {
    const response = await fetchWithRetries('https://in.indeed.com/jobs?q=software+developer');

    const $ = cheerio.load(response.data);
    const jobs = [];

    $('div.job_seen_beacon').each((_, elem) => {
      const title = $(elem).find('h2 span').text().trim() || 'No Title';
      const company = $(elem).find('.companyName').text().trim() || 'N/A';
      const location = $(elem).find('.companyLocation').text().trim() || 'N/A';
      const link = $(elem).find('a').attr('href') || '#';

      jobs.push({
        title,
        company,
        location,
        link,
        source: 'Indeed'
      });
    });

    console.log(`✅ Scraped ${jobs.length} jobs from Indeed`);

    if (jobs.length > 0) {
      await Job.insertMany(jobs);
      console.log('✅ Indeed jobs inserted to DB');
    }

    return jobs;

  } catch (error) {
    console.error('❌ Indeed Scraping Error:', error.message);
    return [];
  }
};

module.exports = scrapeIndeed;