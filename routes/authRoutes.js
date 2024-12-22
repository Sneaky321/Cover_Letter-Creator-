const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import the User model
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user to the database
        const user = new User({ username, password: hashedPassword });
        await user.save();

        // Respond with success
        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
});

module.exports = router;
