const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const SECRET_KEY = config.SECRET_KEY;

const userController = {
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if the user already exists by email
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(409).json({ message: 'Email already in use. Please use a different email.' });
      }

      // Check if the user already exists by username
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(409).json({ message: 'Username already in use. Please choose a different username.' });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({ username, email, password: hashedPassword });

      // Save the user
      await newUser.save();

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error signing up user', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  signin: async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      // compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      // generate and send the JWT token
      const token = jwt.sign({ userId: user._id }, config.SECRET_KEY, { expiresIn: '1h' });
  
      // Include user data in the response
      res.json({ token, user });
    } catch (error) {
      console.error('Error signing in user', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getProfile: async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findById(userId, 'username email');
      res.json(user);
    } catch (error) {
      console.error('Error getting user profile', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

    getUserList: async (req, res) => {
    try {
      const userList = await User.find({}, 'username email'); // Fetch all users with only username and email fields
      res.json(userList);
    } catch (error) {
      console.error('Error getting user list', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },


  editProfile: async (req, res) => {
    try {
      const userId = req.userId;
      const { username, email } = req.body;

      const user = await User.findByIdAndUpdate(
        userId,
        { username, email, updatedAt: Date.now() },
        { new: true }
      );

      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating user profile', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteProfile: async (req, res) => {
    try {
      const userId = req.userId;
      await User.findByIdAndDelete(userId);
      res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
      console.error('Error deleting user profile', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = userController;