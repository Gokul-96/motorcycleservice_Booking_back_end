const mongoose = require('mongoose');
const confirmationSchema = new mongoose.Schema({
  bookingId: String, 
  name: String,
  email: String,
  phoneNumber: String,
  district: String,
  date: String,
  
});

const Confirmation = mongoose.model('Confirmation', confirmationSchema);
module.exports = Confirmation;