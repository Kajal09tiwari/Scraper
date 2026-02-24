const axios = require("axios");
const Job = require("../models/Job");

const scrapeRemoteOK = async () => {
  try {
    console.log("🚀 Fetching RemoteOK API...");

    const response = await axios.get("https://remoteok.com/api", {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    // First element metadata hota hai, remove it
    const jobsData = response.data.slice(1);

    const jobs = jobsData.map((job) => ({
      title: job.position || "N/A",
      company: job.company || "N/A",
      location: job.location || "Remote",
      link: job.url || "",
      source: "RemoteOK",
    }));

    console.log(`✅ Fetched ${jobs.length} jobs`);

    if (jobs.length > 0) {
      await Job.insertMany(jobs);
    }

    return jobs;
  } catch (err) {
    console.error("❌ RemoteOK API Error:", err.message);
    return [];
  }
};

module.exports = scrapeRemoteOK;