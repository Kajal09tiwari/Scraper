const axios = require('axios');
const cheerio = require('cheerio');
const Job = require('../models/Job');

const scrapeNaukri = async () => {
  console.log('🚀 Starting Naukri scraping...');

  try {
    const response = await axios.get('https://www.naukri.com/software-jobs', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      },
      timeout: 15000
    });

    const $ = cheerio.load(response.data);
    const jobs = [];

    $('div.row2').each((_, elem) => {
      const company = $(elem).find('.comp-name').text().trim() || 'N/A';
      const link = $(elem).find('.comp-name').attr('href') || '#';
      const title = $(elem).find('h2, .jobTitle').text().trim() || 'Software Job';

      jobs.push({
        title,
        company,
        location: 'India',
        link: link.startsWith('http') ? link : 'https://www.naukri.com' + link,
        source: 'Naukri'
      });
    });

    console.log(`✅ Scraped ${jobs.length} jobs from Naukri`);

    if (jobs.length > 0) {
      await Job.insertMany(jobs);
      console.log('✅ Jobs inserted to DB');
    }

    return jobs;

  } catch (error) {
    console.error('❌ Naukri Scraping Error:', error.message);
    return [];
  }
};

module.exports = scrapeNaukri;