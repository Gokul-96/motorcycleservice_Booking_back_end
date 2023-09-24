const Booking = require('../models/Booking');
const Confirmation = require('../models/Confirmation'); 
const express = require('express');
const router = express.Router();
//const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

// Define a route for confirming bookings
router.get('/:bookingId', async (req, res) => {
  try {
    // Generate a unique booking ID for this confirmation
    //const bookingId = uuidv4();
    const bookingId = req.params.bookingId;

      // Check if a booking with the given bookingId exists
      const booking = await Booking.findOne({bookingId});

      if (!booking) {
        // If no booking is found, return a 404 response
        return res.status(404).json({ error: 'Booking not found' });
      }

    // Retrieve the booking data from the request (assumed to be in req.body)
    const { name, email, phoneNumber, district, date } = req.body;

    // Fetch the booked services title from the associated Booking document
const serviceTitle = booking ? booking.title : 'Unknown Service';

    // Create a Confirmation document based on the booking data
    const confirmationData = {
      bookingId, 
      serviceTitle, 
      name,
      email,
      phoneNumber,
      district,
      date,
    };

    // Create and save the Confirmation document
    const newConfirmation = new Confirmation(confirmationData);
    const savedConfirmation = await newConfirmation.save();

    res.status(201).json({ confirmationId: savedConfirmation._id });
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;