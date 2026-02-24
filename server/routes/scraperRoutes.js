const express = require('express');
const router = express.Router();

const scraperController = require('../controllers/scraperController');

// Existing Naukri scraping route
router.get('/naukri', scraperController.scrapeNaukriJobs);

// Add RemoteOK scraping route here
router.get('/remoteok', scraperController.scrapeRemoteOKJobs);
router.get('/indeed', scraperController.scrapeIndeedJobs);
router.get('/apna', scraperController.scrapeApnaJobs);
router.get("/jobs", scraperController.getAllJobs);
module.exports = router;
