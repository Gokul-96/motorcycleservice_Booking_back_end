const express = require('express');
const router = express.Router();
const Confirmation = require('../models/confirmation');

// GET request to fetch booking confirmation details
router.get('/:bookingId', async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const confirmation = await Confirmation.findOne({ bookingId });
    
    if (!confirmation) {
      return res.status(404).json({ message: 'Confirmation not found' });
    }

    // Return confirmation details
    res.json(confirmation);
  } catch (error) {
    console.error('Error fetching confirmation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;