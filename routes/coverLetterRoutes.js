const express = require('express');
const router = express.Router();
// Make sure you import everything correctly, including the model
const CoverLetter = require('../models/CoverLetter.js');

router.get('/', async (req, res) => {
  console.log('GET /api/letters route hit');
  try {
    const allCoverLetters = await CoverLetter.find();
    res.status(200).json(allCoverLetters);
  } catch (error) {
    res.status(500).json({ message: 'Error Fetching cover letters', error });
  }
});

router.post('/create', async (req, res) => {
  console.log('POST /api/letters/create route hit');
  try {
    const { jobTitle, companyName, jobDescription } = req.body;
    if (!jobTitle || !companyName || !jobDescription) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    // Proceed with your code...
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Error Creating Cover Letter', error: error.message });
  }
});

module.exports = router;
