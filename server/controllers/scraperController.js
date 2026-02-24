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


exports.getAllJobs = async (req, res) => {
  try {
    const { search, source, page = 1 } = req.query;
    const limit = 20;
    const skip = (page - 1) * limit;

    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (source) {
      query.source = source;
    }

    const jobs = await Job.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};