const puppeteer = require('puppeteer');
const Job = require('../models/Job');

const scrapeNaukri = async () => {
  let browser;

  console.log('🚀 Starting Naukri scraping...');

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    await page.goto('https://www.naukri.com/software-jobs', {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    await page.waitForSelector('.row2', { timeout: 20000 });

    const jobs = await page.evaluate(() => {
      const jobNodes = document.querySelectorAll('.row2');

      return Array.from(jobNodes).map(el => {
        const company =
          el.querySelector('.comp-name')?.innerText || 'N/A';

        const link =
          el.querySelector('.comp-name')?.href || '#';

        return {
          title: 'Software Job',
          company,
          location: 'India',
          link,
          source: 'Naukri',
        };
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

  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = scrapeNaukri;