require("dotenv").config({ path: "./server/.env" });

const connectDB = require("./server/config/db");
const scrapeRemoteOK = require("./server/scrapers/remoteOKScraper");

const run = async () => {
  try {
    await connectDB(); // same DB connection

    await scrapeRemoteOK();

    console.log("✅ Scraping Done");
    process.exit();
  } catch (err) {
    console.log("❌ Error:", err.message);
    process.exit(1);
  }
};

run();