const Service = require('../models/Service');



const newServiceData = [
    {
      id: 1,
      title: 'Oil Change',
      description: 'Routine oil change service for motorcycles',
      price: 50,
      category: 'Maintenance',
    },
    {
      id: 2,
      title: 'Tire Replacement',
      description: 'Replace worn-out tires with new ones',
      price: 120,
      category: 'Maintenance',
    },
    {
      id: 3,
      title: 'Engine Tune-up',
      description: 'Optimize engine performance and efficiency',
      price: 150,
      category: 'Performance',
    },
    {
      id: 4,
      title: 'Brake Inspection',
      description: 'Thorough inspection and maintenance of brakes',
      price: 60,
      category: 'Safety',
    },
    {
      id: 5,
      title: 'Chain Lubrication',
      description: 'Lubricate motorcycle chain for smooth operation',
      price: 20,
      category: 'Maintenance',
    },
    {
      id: 6,
      title: 'Spark Plug Replacement',
      description: 'Replace spark plugs for improved ignition',
      price: 30,
      category: 'Maintenance',
    },
    {
      id: 7,
      title: 'Wheel Alignment',
      description: 'Align wheels for better handling and tire wear',
      price: 80,
      category: 'Maintenance',
    },
    {
      id: 8,
      title: 'Battery Check',
      description: 'Inspect and test the motorcycle battery',
      price: 25,
      category: 'Maintenance',
    },
    {
      id: 9,
      title: 'Coolant Flush',
      description: 'Flush and replace the engine coolant',
      price: 40,
      category: 'Maintenance',
    },
    {
      id: 10,
      title: 'Exhaust System Repair',
      description: 'Repair or replace damaged exhaust components',
      price: 100,
      category: 'Repair',
    },
    {
      id: 11,
      title: 'Clutch Adjustment',
      description: 'Adjust the motorcycle clutch for optimal performance',
      price: 35,
      category: 'Maintenance',
    },
    {
      id: 12,
      title: 'Air Filter Replacement',
      description: 'Replace the air filter for improved air intake',
      price: 15,
      category: 'Maintenance',
    },
    {
      id: 13,
      title: 'Suspension Check',
      description: 'Inspect and adjust the motorcycle suspension',
      price: 55,
      category: 'Maintenance',
    },
    {
      id: 14,
      title: 'Headlight Bulb Replacement',
      description: 'Replace faulty headlight bulbs for better visibility',
      price: 10,
      category: 'Maintenance',
    },
    {
      id: 15,
      title: 'Wheel Bearing Replacement',
      description: 'Replace worn-out wheel bearings for smooth operation',
      price: 70,
      category: 'Maintenance',
    },
    {
      id: 16,
      title: 'Throttle Cable Adjustment',
      description: 'Adjust the throttle cable for responsive throttle control',
      price: 25,
      category: 'Maintenance',
    },
    {
      id: 17,
      title: 'Radiator Flush',
      description: 'Flush and replace the radiator coolant',
      price: 45,
      category: 'Maintenance',
    },
    {
      id: 18,
      title: 'Brake Fluid Change',
      description: 'Replace old brake fluid for optimal brake performance',
      price: 50,
      category: 'Maintenance',
    },
    {
      id: 19,
      title: 'Starter Motor Repair',
      description: 'Repair or replace faulty starter motor components',
      price: 90,
      category: 'Repair',
    },
    {
      id: 20,
      title: 'Handlebar Grips Replacement',
      description: 'Replace worn-out handlebar grips for better grip',
      price: 15,
      category: 'Maintenance',
    },
  ];


// Function to insert or update services
async function insertOrUpdateServices() {
  try {
    const services = await Service.find({});

    if (services.length === 0) {
      // If no services exist insert the new services
      await Service.insertMany(newServiceData);
      console.log('Initial services inserted successfully.');
    } else {
      // If services exist update them based on your logic
      // can check if each service in newServiceData already exists
      for (const newService of newServiceData) {
        const existingService = services.find((service) => service.id === newService.id);

        if (existingService) {
          // Update the existing service with the new data
          existingService.set(newService);
          await existingService.save();
          console.log(`Service updated: ${newService.title}`);
        } else {
          // Insert the new service if it doesn't exist
          const service = new Service(newService);
          await service.save();
          console.log(`Service inserted: ${newService.title}`);
        }
      }
    }
  } catch (error) {
    console.error('Error inserting/updating services:', error);
  }
}

module.exports = { insertOrUpdateServices };