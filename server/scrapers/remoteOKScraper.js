const cheerio = require('cheerio');
const fetchWithRetries = require('../utils/fetchWithRetries');
const Job = require('../models/Job');

const scrapeRemoteOK = async () => {
  try {
    console.log('🚀 Starting RemoteOK scraping...');
    
    const response = await fetchWithRetries('https://remoteok.io/remote-dev-jobs');

    const $ = cheerio.load(response.data);
    const jobs = [];

    $('tr.job').each((_, elem) => {
      jobs.push({
        title: $(elem).find('td.position h2').text().trim() || 'N/A',
        company: $(elem).find('td.company h3').text().trim() || 'N/A',
        location: $(elem).find('.location').text().trim() || 'Remote',
        link: 'https://remoteok.io' + ($(elem).attr('data-href') || ''),
        source: 'RemoteOK'
      });
    });

    console.log(`✅ Scraped ${jobs.length} jobs`);
    if (jobs.length > 0) await Job.insertMany(jobs);
    
    return jobs;
  } catch (err) {
    console.error('❌ RemoteOK Error:', err.message);
    return [];
  }
};

module.exports = scrapeRemoteOK;