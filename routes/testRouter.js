// routes/testRouter.js
const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Test route is working!' });
});

module.exports = router;
