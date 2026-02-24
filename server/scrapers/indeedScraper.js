const puppeteer = require('puppeteer');
const Job = require('../models/Job');

const scrapeIndeed = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  await page.goto('https://in.indeed.com/jobs?q=software+developer', {
    waitUntil: 'networkidle2',
  });

  await page.waitForSelector('.job_seen_beacon');

  const jobs = await page.evaluate(() => {
    const jobNodes = document.querySelectorAll('.job_seen_beacon');

    return Array.from(jobNodes).map(el => {
      const title =
        el.querySelector('h2 span')?.innerText || 'No Title';

      const company =
        el.querySelector('.companyName')?.innerText || 'N/A';

      const location =
        el.querySelector('.companyLocation')?.innerText || 'N/A';

      const link =
        el.querySelector('a')?.href || '#';

      return {
        title,
        company,
        location,
        link,
        source: 'Indeed',
      };
    });
  });

  console.log(`Scraped ${jobs.length} jobs from Indeed`);

  if (jobs.length > 0) {
    await Job.insertMany(jobs);
    console.log('Indeed jobs inserted to DB');
  }

  await browser.close();
  return jobs;
};

module.exports = scrapeIndeed;