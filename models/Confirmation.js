const mongoose = require('mongoose');
const confirmationSchema = new mongoose.Schema({
  bookingId: String, 
  serviceTitle: String,
  name: String,
  email: String,
  phoneNumber: String,
  district: String,
  date: Date,
  
});

const Confirmation = mongoose.model('Confirmation', confirmationSchema);
module.exports = Confirmation;