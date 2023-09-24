//service

//1. import moongoose lib...
const mongoose = require('mongoose');

//2.create mongodb model and define schema
const serviceSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: String,
  description: String,
  price: Number,
  category: String,
});





  //model - interact with the database, create service model based on serviceSchema 
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;





