const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const Job = require('../models/Job');

puppeteer.use(StealthPlugin());

const scrapeRemoteOK = async () => {
  console.log('Starting RemoteOK scraping...');
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    );

    await page.goto('https://remoteok.io/remote-dev-jobs', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    // Wait for jobs to load
    await page.waitForSelector('tr.job');

    const jobs = await page.evaluate(() => {
      const jobRows = document.querySelectorAll('tr.job');
      return Array.from(jobRows).map(row => ({
        title: row.querySelector('td.position h2')?.innerText || 'N/A',
        company: row.querySelector('td.company h3')?.innerText || 'N/A',
        location: row.querySelector('.location')?.innerText || 'Remote',
        link: 'https://remoteok.io' + (row.getAttribute('data-href') || ''),
        source: 'RemoteOK'
      }));
    });

    console.log(`✅ Scraped ${jobs.length} jobs from RemoteOK`);
    if (jobs.length > 0) {
      await Job.insertMany(jobs);
      console.log('✅ Jobs inserted to DB');
    }

    await browser.close();
    return jobs;
  } catch (err) {
    console.error('❌ Error scraping RemoteOK:', err.message);
    return [];
  }
};

module.exports = scrapeRemoteOK;
