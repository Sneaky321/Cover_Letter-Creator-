require('dotenv').config(); // Load environment variables at the start
const express = require('express');
const mongoose = require('mongoose');
const CoverLetter = require('./models/CoverLetter');
 // Mongoose model
const coverLetterRoutes = require('./routes/coverLtterRoutes'); // Route handlers
const { OpenAI } = require('openai');

const app = express();
const port = 5000;
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1); // Exit on failure
  }
};
connectDb();

// Middleware
app.use(express.json());

// All routes are now handled through coverLetterRoutes
app.use('/api/letters', coverLetterRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});