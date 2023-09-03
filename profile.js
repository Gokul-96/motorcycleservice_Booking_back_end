const express = require('express');
const middleware = require('../middleware');
const User = require('../models/user');

const router = express.Router();

// Protected profile route
router.get('/profile', middleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user profile' });
  }
});

module.exports = router;