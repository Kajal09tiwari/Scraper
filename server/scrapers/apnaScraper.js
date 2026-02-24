const puppeteer = require('puppeteer');
const Job = require('../models/Job');

const scrapeApna = async () => {
  let browser;

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

    await page.goto(
      'https://apna.co/jobs/software-developer-jobs',
      {
        waitUntil: 'networkidle2',
        timeout: 60000
      }
    );

    await page.waitForSelector('div[data-testid="job-card"]', {
      timeout: 20000
    });

    const jobs = await page.evaluate(() => {
      const jobNodes = document.querySelectorAll(
        'div[data-testid="job-card"]'
      );

      return Array.from(jobNodes).map(el => ({
        title: el.querySelector('h2')?.innerText || 'No Title',
        company: el.querySelector('p')?.innerText || 'N/A',
        link: el.querySelector('a')?.href || '#',
        location: 'India',
        source: 'Apna'
      }));
    });

    console.log(`Scraped ${jobs.length} jobs from Apna`);

    if (jobs.length > 0) {
      await Job.insertMany(jobs);
      console.log('Apna jobs inserted to DB');
    }

    return jobs;

  } catch (error) {
    console.error("Apna Scraping Error:", error.message);
    return [];   // prevents server crash
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = scrapeApna;