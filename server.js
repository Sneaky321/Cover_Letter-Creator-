require('dotenv').config(); // Load environment variables at the start
const express = require('express');
const mongoose = require('mongoose');
const testRouter = require('./routes/testRouter.js');
const coverLetterRoutes = require('./routes/coverLetterRoutes.js'); // Correct the import
const { OpenAI } = require('openai');

const app = express();
const port = 5000;

// Connect to MongoDB
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

// Middleware to parse JSON
app.use(express.json());

// Register routes for cover letter and test
console.log('Registering routes for /api/letters and /api/test');
app.use('/api/letters', coverLetterRoutes);
app.use('/api/test', testRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
