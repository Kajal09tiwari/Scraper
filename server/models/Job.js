const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  link: String,
  source: String,
  postedAt: Date,
  salary: String,
  jobType: String,
  description: String,
  tags: [String],
},{ timestamps: true });

module.exports = mongoose.model("Job", jobSchema);