const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');  // Import your Booking model or schema

// Define a route to handle confirmation data based on booking ID
router.get('/confirmation/:bookingId', async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    // Assuming you have a function in your model or elsewhere to fetch confirmation data
    const confirmationData = await getConfirmationData(bookingId);

    if (confirmationData) {
      res.json(confirmationData); // Send confirmation data as a JSON response
    } else {
      // If no data is found for the given booking ID, respond with a 404 status
      res.status(404).json({ error: 'Confirmation data not found' });
    }
  } catch (error) {
    console.error('Error fetching confirmation data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to fetch confirmation data based on booking ID
async function getConfirmationData(bookingId) {
  try {
    // Use your Booking model to query the database based on the booking ID
    const confirmationData = await Booking.findOne({ bookingId });
    return confirmationData;
  } catch (error) {
    console.error('Error fetching confirmation data from database:', error);
    throw error;
  }
}

module.exports = router;