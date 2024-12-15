const mongoose = require('mongoose');
const coverLetterSchema = new mongoose.Schema({
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    coverLetterText: {
      type: String,
      required: true,
    },
  }, { timestamps: true }); // Adds createdAt and updatedAt automatically
  
  const CoverLetter = mongoose.model('CoverLetter', coverLetterSchema);
module.exports = CoverLetter;

  