const scrapeNaukri = require('../scrapers/naukriScraper');
const scrape = require('../scrapers/remoteOKScraper');
const scrapeIndeed = require('../scrapers/indeedScraper');
const scrapeApna = require('../scrapers/apnaScraper');

exports.scrapeNaukriJobs = async (req, res) => {
  const data = await scrapeNaukri();
  res.json(data);
};

exports.scrapeJobs = async (req, res) => {
  try {
    const jobs = await scrapeRemoteOK();
    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.scrapeIndeedJobs = async (req, res) => {
  try {
    const jobs = await scrapeIndeed();
    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.scrapeApnaJobs = async (req, res) => {
  try {
    const jobs = await scrapeApna();
    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};