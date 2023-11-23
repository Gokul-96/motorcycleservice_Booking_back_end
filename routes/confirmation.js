const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Confirmation = require('../models/Confirmation'); // Import the Confirmation model

router.get('/confirmation/:bookingId', async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const booking = await Booking.findOne({ bookingId }).populate('service');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const service = Array.isArray(booking.service) ? booking.service[0] : booking.service;

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const confirmationData = {
      bookingId: booking.bookingId,
      name: booking.name,
      email: booking.email,
      phoneNumber: booking.phoneNumber,
      district: booking.district,
      date: booking.date,
      service: {
        title: service.title,
        description: service.description,
        price: service.price,
        category: service.category,
      },
    };

    // Save the confirmation data to the Confirmation collection
    const confirmation = new Confirmation(confirmationData);
    await confirmation.save();

    console.log('Confirmation data saved:', confirmationData);

    res.json(confirmationData);
  } catch (error) {
    console.error('Error fetching and saving confirmation data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;