const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user details by ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user data
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      // Add other properties as needed
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;