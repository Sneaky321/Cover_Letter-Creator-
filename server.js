require('dotenv').config(); // Add this line at the top of your server.js

const express = require('express');
const { OpenAI } = require('openai');
const app = express();
const port = 5000;
connectDB();
// Mock data for testing
const mockCoverLetter = {
  jobTitle: "Software Engineer",
  companyName: "Tech Inc.",
  jobDescription: "We are looking for a software engineer with experience in React and Node.js.",
  coverLetterText: `Dear Hiring Manager,

I am excited to apply for the Software Engineer position at Tech Inc. With a solid background in React and Node.js development, I am confident in my ability to contribute to your team and make a meaningful impact.

I have extensive experience in building web applications, and my expertise in React allows me to deliver high-performance, scalable solutions. Additionally, I am well-versed in server-side programming with Node.js, making me an ideal candidate for this role.

I am eager to bring my technical skills and passion for software development to Tech Inc. and contribute to the continued success of your team.

Thank you for considering my application. I look forward to the opportunity to discuss my qualifications further.

Sincerely,
[Your Name]`
};

app.use(express.json());

// Initialize OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this points to your .env variable
});

app.post('/generate-cover-letter', async (req, res) => {
  try {
    const { jobTitle, companyName, jobDescription } = req.body;

    // Check if the API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error("No OpenAI API key found in environment variables");
      return res.status(500).json({ message: 'OpenAI API key is missing' });
    }

    // Use mock data for testing purposes
    if (process.env.USE_MOCK_DATA === 'true') {
      console.log("Using mock data for cover letter generation");
      return res.status(200).json(mockCoverLetter);
    }

    // Make the OpenAI API call
    console.log("Making request to OpenAI API...");
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `Generate a professional cover letter for the following job:
        Job Title: ${jobTitle}
        Company: ${companyName}
        Job Description: ${jobDescription}
        Make the tone formal and highlight my skills in React and Node.js.`
         },
      ],
    });

    console.log("OpenAI API response received");

    const coverLetterText = response.choices[0].message.content.trim();
    return res.status(200).json({ ...mockCoverLetter, coverLetterText });
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return res.status(500).json({
      message: 'Error generating cover letter',
      error: error.message,
      stack: error.stack,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
