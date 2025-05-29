const puppeteer = require('puppeteer');
const Job = require('../models/Job');

const scrapeNaukri = async () => {
  const browser = await puppeteer.launch({ headless: false }); // for debugging
  const page = await browser.newPage();
  await page.goto('https://www.naukri.com/software-jobs', {
    waitUntil: 'networkidle2',
  });

  // Wait for job listings to load
  await page.waitForSelector('.row2');

  const jobs = await page.evaluate(() => {
    const jobNodes = document.querySelectorAll('.row2');

    return Array.from(jobNodes).map(el => {
      const company = el.querySelector('.comp-name')?.innerText || 'N/A';
      const link = el.querySelector('.comp-name')?.href || '#';

      // Titles are not in this `.row2` directly, so we fallback for now
      return {
        title: 'Software Job',
        company,
        location: 'Location N/A',
        link,
        source: 'Naukri',
      };
    });
  });

  console.log(`Scraped ${jobs.length} jobs from Naukri`);
  if (jobs.length > 0) {
    await Job.insertMany(jobs);
    console.log('Jobs inserted to DB');
  }

  await browser.close();
  return jobs;
};

module.exports = scrapeNaukri;
