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
  console.log('Login attempt with email:', email);
  try {
    const user = await User.findOne({ email });

    if (user) {
      // User exists, respond with 'exist'
      res.json('exist');
    } else {
      // User does not exist, respond with 'not exist'
      res.json('not exist');
    }
  } catch (e) {
    res.json('not exist');
  }
});
module.exports = router;