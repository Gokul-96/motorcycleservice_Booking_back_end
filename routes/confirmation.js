// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');
// const Confirmation = require('../models/Confirmation'); // Import the Confirmation model

// router.get('/confirmation/:bookingId', async (req, res) => {
//   try {
//     const bookingId = req.params.bookingId;

//     const booking = await Booking.findOne({ bookingId }).populate('service');

//     if (!booking) {
//       return res.status(404).json({ error: 'Booking not found' });
//     }

//     const service = Array.isArray(booking.service) ? booking.service[0] : booking.service;

//     if (!service) {
//       return res.status(404).json({ error: 'Service not found' });
//     }

//     const confirmationData = {
//       bookingId: booking.bookingId,
//       name: booking.name,
//       email: booking.email,
//       phoneNumber: booking.phoneNumber,
//       district: booking.district,
//       date: booking.date,
//       service: {
//         title: service.title,
//         description: service.description,
//         price: service.price,
//         category: service.category,
//       },
//     };

//     // Save the confirmation data to the Confirmation collection
//     const confirmation = new Confirmation(confirmationData);
//     await confirmation.save();

//     console.log('Confirmation data saved:', confirmationData);

//     res.json(confirmationData);
//   } catch (error) {
//     console.error('Error fetching and saving confirmation data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Confirmation = require('../models/Confirmation');

router.get('/:bookingId', async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    console.log('Fetching confirmation data for bookingId:', bookingId);

    const booking = await Booking.findOne({ bookingId });

    console.log('Confirmation data:', booking);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Create confirmation data object
    const confirmationData = new Confirmation({
      bookingId: booking.bookingId,
      name: booking.name,
      email: booking.email,
      phoneNumber: booking.phoneNumber,
      district: booking.district,
      date: booking.date,
      service: {
        title: booking.service.title,
        description: booking.service.description,
        price: booking.service.price,
        category: booking.service.category,
      }
    });

    // Save confirmation data to the database
    await confirmationData.save();

    res.json({
      bookingId: booking.bookingId,
      serviceTitle: booking.service.title,
      name: booking.name,
      email: booking.email,
      phoneNumber: booking.phoneNumber,
      district: booking.district,
      date: booking.date,
      service: {
        title: booking.service.title,
        description: booking.service.description,
        price: booking.service.price,
        category: booking.service.category,
      }
    });
  } catch (error) {
    console.error('Error fetching confirmation data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;