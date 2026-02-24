const scrapeRemoteOK = require('../scrapers/remoteOKScraper');
const scrapeNaukri = require('../scrapers/naukriScraper');
const scrapeIndeed = require('../scrapers/indeedScraper');
const scrapeApna = require('../scrapers/apnaScraper');

exports.scrapeRemoteOKJobs = async (req, res) => {
  try {
    const jobs = await scrapeRemoteOK();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "RemoteOK failed" });
  }
};

exports.scrapeNaukriJobs = async (req, res) => {
  try {
    const jobs = await scrapeNaukri();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Naukri failed" });
  }
};

exports.scrapeIndeedJobs = async (req, res) => {
  try {
    const jobs = await scrapeIndeed();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Indeed failed" });
  }
};

exports.scrapeApnaJobs = async (req, res) => {
  try {
    const jobs = await scrapeApna();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Apna failed" });
  }
};