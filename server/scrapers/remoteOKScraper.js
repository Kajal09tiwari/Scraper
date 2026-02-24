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

    const jobsData = response.data.slice(1);

    const jobs = jobsData.map((job) => ({
      title: job.position || "N/A",
      company: job.company || "N/A",
      location: job.location || "Remote",
      link: job.url || "",
      source: "RemoteOK",
    }));

    // ❗ Purane RemoteOK jobs delete kar do (duplicate avoid)
    // await Job.deleteMany({ source: "RemoteOK" });

    if (jobs.length > 0) {
      await Job.insertMany(jobs);
    }

    console.log(`✅ Saved ${jobs.length} jobs to DB`);

  } catch (err) {
    console.error("❌ RemoteOK API Error:", err.message);
  }
};

module.exports = scrapeRemoteOK;