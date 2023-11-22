const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware');

// Register a new user, signup
router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  console.log('User data:', user);


  user.save((err) => {
    if (err) {
      return res.status(400).json({ error: 'Registration failed' });
    }
    res.status(200).json({ message: 'Registration successful' });
  });
});



router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Check if the provided password matches the stored hashed password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'yourSecretKey', { expiresIn: '1h' });

    // Send the user data along with the token
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful', userData: user });  // include userData in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/user:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch user data based on the ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user data
    res.json({ username: user.username, email: user.email });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret');
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};





module.exports = router;