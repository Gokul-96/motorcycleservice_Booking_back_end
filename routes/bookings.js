// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');
// // Route to handle booking submission
// router.post('/', async (req, res) => {
//   try {
//     const { service, name, email, phoneNumber, district, date } = req.body;

//     // Create a new booking using Booking model.
//     const newBooking = new Booking({
//       service,
//       name,
//       email,
//       phoneNumber,
//       district,
//       date,
//     });
// // Save the booking to database.
//     const savedBooking = await newBooking.save();

//     res.status(201).json(savedBooking);
//   } catch (error) {
//     console.error('Error submitting booking:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;

const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const express = require('express');
const router = express.Router();

// // Assuming you have a Booking model defined
// const Booking = mongoose.model('Booking');

// // Inside your route or controller for creating bookings
// const //requestData = req.body;


// Define a route for creating bookings
router.post('/create', (req, res) => {
  // Handle the creation of bookings here
  const requestData = req.body;

// Convert service IDs to ObjectIds (assuming requestData.service is an array of string-based ObjectIds)
requestData.service = requestData.service.map((id) => mongoose.Types.ObjectId(id));

// Create and save the booking document
const newBooking = new Booking(requestData);
newBooking.save()
  .then((booking) => {
    // Handle success
    res.status(201).json(booking);
  })
  .catch((error) => {
    // Handle error
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  });
});

module.exports = router;