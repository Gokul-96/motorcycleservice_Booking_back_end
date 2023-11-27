const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware');

// Register a new user, signup
router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });

  user.save((err) => {
    if (err) {
      return res.status(400).json({ error: 'Registration failed' });
    }
    res.status(200).json({ message: 'Registration successful' });
  });
});

router.post('/login', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const check = await User.findOne({ email });

    if (check) {
      res.json({ message: 'exist' });
    } else {
      res.json({ message: 'not exist' });
    }
  } catch (e) {
    res.status(500).json({ message: 'not exist' });
  }
});

module.exports = router;