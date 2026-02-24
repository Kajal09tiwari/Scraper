const axios = require('axios');
const cheerio = require('cheerio');
const Job = require('../models/Job');

const scrapeApna = async () => {
  console.log('🚀 Starting Apna scraping...');

  try {
    const response = await axios.get('https://apna.co/jobs/software-developer-jobs', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      },
      timeout: 15000
    });

    const $ = cheerio.load(response.data);
    const jobs = [];

    $('div[data-testid="job-card"]').each((_, elem) => {
      const title = $(elem).find('h2').text().trim() || 'No Title';
      const company = $(elem).find('p').text().trim() || 'N/A';
      const link = $(elem).find('a').attr('href') || '#';

      jobs.push({
        title,
        company,
        location: 'India',
        link: link.startsWith('http') ? link : 'https://apna.co' + link,
        source: 'Apna'
      });
    });

    console.log(`✅ Scraped ${jobs.length} jobs from Apna`);

    if (jobs.length > 0) {
      await Job.insertMany(jobs);
      console.log('✅ Apna jobs inserted to DB');
    }

    return jobs;

  } catch (error) {
    console.error('❌ Apna Scraping Error:', error.message);
    return [];
  }
};

module.exports = scrapeApna;