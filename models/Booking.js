const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    default: uuidv4(), 
    unique: true,
  },
  service: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  }],
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;