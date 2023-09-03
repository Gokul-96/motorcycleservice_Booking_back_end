//1. import moongoose lib...
const mongoose = require('mongoose');


//2.create mongodb model and define schema
const bookingSchema = new mongoose.Schema({
 service: [{                                     //getting data from service component
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  }],
  name: {
    type:String,
    required: true,
  },
  email:{ 
    type:String,
    required: true,
  },
  phoneNumber : {
    type:String,
    required: true,
  },
  district : {
    type:String,
    required: true,
  },
  date: {
    type:Date,
    required: true,
  }
});



//model - interact with the database, create booking model based on bookingSchema 
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;