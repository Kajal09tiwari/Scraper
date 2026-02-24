const puppeteer = require('puppeteer');
const Job = require('../models/Job');

const scrapeIndeed = async () => {
  let browser;

  console.log('🚀 Starting Indeed scraping...');

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

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    );

    await page.goto(
      'https://in.indeed.com/jobs?q=software+developer',
      {
        waitUntil: 'networkidle2',
        timeout: 60000
      }
    );

    await page.waitForSelector('.job_seen_beacon', {
      timeout: 20000
    });

    const jobs = await page.evaluate(() => {
      const jobNodes = document.querySelectorAll('.job_seen_beacon');

      return Array.from(jobNodes).map(el => ({
        title:
          el.querySelector('h2 span')?.innerText || 'No Title',

        company:
          el.querySelector('.companyName')?.innerText || 'N/A',

        location:
          el.querySelector('.companyLocation')?.innerText || 'N/A',

        link:
          el.querySelector('a')?.href || '#',

        source: 'Indeed'
      }));
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

  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = scrapeIndeed;