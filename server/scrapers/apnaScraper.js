const puppeteer = require('puppeteer');
const Job = require('../models/Job');

const scrapeApna = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  await page.goto('https://apna.co/jobs/software-developer-jobs', {
    waitUntil: 'networkidle2',
  });

  await page.waitForSelector('div[data-testid="job-card"]');

  const jobs = await page.evaluate(() => {
    const jobNodes = document.querySelectorAll('div[data-testid="job-card"]');

    return Array.from(jobNodes).map(el => {
      const title =
        el.querySelector('h2')?.innerText || 'No Title';

      const company =
        el.querySelector('p')?.innerText || 'N/A';

      const link =
        el.querySelector('a')?.href || '#';

      return {
        title,
        company,
        location: 'India',
        link,
        source: 'Apna',
      };
    });
  });

  console.log(`Scraped ${jobs.length} jobs from Apna`);

  if (jobs.length > 0) {
    await Job.insertMany(jobs);
    console.log('Apna jobs inserted to DB');
  }

  await browser.close();
  return jobs;
};

module.exports = scrapeApna;