const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  link: String,
  source: String,
});

module.exports = mongoose.model('Job', JobSchema);
