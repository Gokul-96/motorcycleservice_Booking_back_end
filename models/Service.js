//service

//1. import moongoose lib...
const mongoose = require('mongoose');

//2.create mongodb model and define schema
const serviceSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  category: String,
});

//model - interact with the database, create service model based on serviceSchema 
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;


// Create a new service instance
const newService= [
    {
      id:1,
      title: 'Oil Change',
      description: 'Routine oil change service for motorcycles',
      price: 50,
      category: 'Maintenance',
    },
    {
      id:2,
      title: 'Tire Replacement',
      description: 'Replace worn-out tires with new ones',
      price: 120,
      category: 'Maintenance',
    },
    {
      id:3,
      title: 'Engine Tune-up',
      description: 'Optimize engine performance and efficiency',
      price: 150,
      category: 'Performance',
    },
    {
      id:4,
      title: 'Brake Inspection',
      description: 'Thorough inspection and maintenance of brakes',
      price: 60,
      category: 'Safety',
    },
    {
      id:5,
      title: 'Chain Lubrication',
      description: 'Lubricate motorcycle chain for smooth operation',
      price: 20,
      category: 'Maintenance',
    },
  ];
  
  
  // Save the service to the database
  //
  Promise.all(
    newService.map(serviceData => {
      const newService = new Service(serviceData);
      return newService.save();
    }))
    .then(savedServices => {
      console.log('Services saved:', savedServices);
    })
    .catch(error => {
      console.error('Error saving services:', error);
    });


