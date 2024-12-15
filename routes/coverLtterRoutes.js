const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const CoverLetter = require('../models/CoverLetter.js') 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/create', async (req, res) => {
  try {
    const { jobTitle, companyName, jobDescription } = req.body;

    if (!jobTitle || !companyName || !jobDescription) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    let coverLetterText;
    
    try {
      // Try OpenAI first
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
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
      coverLetterText = response.choices[0].message.content.trim();
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError);
      // Fallback to template if OpenAI fails
      coverLetterText = `Dear Hiring Manager at ${companyName},

I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. Having carefully reviewed the job description, I am confident that my background in full-stack development, particularly my expertise in React and Node.js, aligns perfectly with your requirements.

Throughout my career, I have developed and maintained scalable web applications using modern JavaScript frameworks and libraries. My experience includes building responsive user interfaces with React, implementing RESTful APIs using Node.js, and working with various databases and cloud services.

The opportunity to contribute to ${companyName}'s mission while tackling complex technical challenges excites me. I am particularly drawn to ${jobDescription.slice(0, 100)}...

I look forward to discussing how my skills and experience can benefit your team.

Best regards,
[Your Name]`;
    }

    // Create and save cover letter
    const newCoverLetter = new CoverLetter({
      jobTitle,
      companyName,
      jobDescription,
      coverLetterText
    });

    await newCoverLetter.save();
    res.status(201).json(newCoverLetter);

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      message: 'Error Creating Cover Letter',
      error: error.message
    });
  }
});

module.exports = router;