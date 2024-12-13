const CoverLetter = require('./models/CoverLetter');  // Follow camelCase for naming
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');  // Make sure OpenAI is set up properly

// Initialize OpenAI client with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Use environment variable for API key
});

router.post('/create', async (req, res) => {
  try {
    const { jobTitle, companyName, jobDescription } = req.body;

    // Call OpenAI API to generate cover letter text
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // Use appropriate model
      messages: [
        { 
          role: 'system', 
          content: `Generate a professional cover letter for the following job:
            Job Title: ${jobTitle}
            Company: ${companyName}
            Job Description: ${jobDescription}
            Make the tone formal and highlight skills in React and Node.js.` 
        }
      ]
    });

    const coverLetterText = response.choices[0].message.content.trim();

    // Create a new cover letter and save it to the database
    const newCoverLetter = new CoverLetter({
      jobTitle,
      companyName,
      jobDescription,
      coverLetterText
    });

    await newCoverLetter.save();  // Save to MongoDB

    res.status(201).json(newCoverLetter);  // Send the created cover letter as a response
  } catch (error) {
    res.status(500).json({
      message: 'Error Creating Cover Letter',
      error: error.message
    });
  }
});

module.exports = router;

