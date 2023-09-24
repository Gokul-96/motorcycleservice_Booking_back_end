const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


// Assuming you have a Booking model defined
// const Booking = mongoose.model('Booking');

// Inside your route or controller for creating bookings

// Define a route with a route parameter for booking ID
router.get('/:bookingId', (req, res) => {
  const bookingId = req.params.bookingId;
  // You can now use 'bookingId' in your route handler logic
  res.send(`Booking ID: ${bookingId}`);
});

// Define a route for creating bookings
router.post('/bookings', async(req, res) => {
  
  // Handle the creation of bookings here
  try{
    const bookingId = uuidv4();
  const requestData = req.body;
  console.log('Received Booking Data:', requestData);

  //  // Validate the service property
  //  if (!requestData.service || !Array.isArray(requestData.service)) {
  //   return res.status(400).json({ error: 'Invalid service data' });
  // }

// Convert service IDs to ObjectIds (assuming requestData.service is an array of string-based ObjectIds)
requestData.service = requestData.service.map((id) =>new  mongoose.Types.ObjectId(id));

// Create and save the booking document
const newBooking = new Booking(requestData);
const savedBooking = await newBooking.save();
res.status(201).json({ bookingId, booking: savedBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;