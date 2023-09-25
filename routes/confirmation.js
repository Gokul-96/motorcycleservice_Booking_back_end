
const express = require('express');
const router = express.Router();
const { getConfirmationData } = require('../confirm/confirmationController'); // Import the function
const { validate: isUuid } = require('uuid');
const Booking = require('../models/Booking');
// Define a route for confirming bookings
router.get('/confirmation/:bookingId', async (req, res) => {
  try {
    // Retrieve the bookingId from the URL parameter
    const bookingId = req.params.bookingId;
    if (!isUuid(bookingId)) {
      return res.status(400).json({ error: 'Invalid bookingId' });
    }

      // Look up the booking in your database
  const booking = await Booking.findOne({ bookingId });

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
    // Fetch the confirmation data based on the bookingId using the imported function
    const confirmationData = await getConfirmationData(bookingId);

    if (!confirmationData) {
      //  return a 404 response if no confirmation data
      return res.status(404).json({ error: 'Confirmation data not found' });
    }

    // Respond with the confirmation data
    res.status(200).json(confirmationData);
  } catch (error) {
    console.error('Error fetching confirmation data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;