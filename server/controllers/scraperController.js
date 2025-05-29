const scrapeNaukri = require('../scrapers/naukriScraper');
const scrapeRemoteOK = require('../scrapers/remoteOKScraper');


exports.scrapeNaukriJobs = async (req, res) => {
  const data = await scrapeNaukri();
  res.json(data);
};

exports.scrapeRemoteOKJobs = async (req, res) => {
  try {
    const jobs = await scrapeRemoteOK();
    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};