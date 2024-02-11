const mongoose = require('mongoose');

const confirmationSchema = new mongoose.Schema({
  bookingId: String, 
  name: String,
  email: String,
  phoneNumber: String,
  district: String,
  date: String,
  service: {
    title: String,
    description: String,
    price: Number,
    category: String
  }
});

const Confirmation = mongoose.model('Confirmation', confirmationSchema);

module.exports = Confirmation;