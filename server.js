const config = require('./utils/config');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const servicesRoute = require('./routes/services');

const servicesRouter = require('./routes/services');

const bookingsRouter = require('./routes/bookings');

const confirmationRouter = require('./routes/confirmation');
 require('./models/Booking'); 

const bodyParser = require('body-parser');

// Import Service model
const Service = require('./models/Service'); 


// Create Express app
const app = express();

app.use(bodyParser.json());

app.use(express.json());

// Configure CORS to allow requests from your React app
app.use(cors()); // Enable CORS for all routes
app.use(morgan('dev'));

app.use('/services', servicesRoute);


const PORT = process.env.PORT || 5000;

// Used the service router for handling service-related routes
app.use('/services', servicesRouter);

// Mount the booking route
app.post('/bookings', bookingsRouter);

app.get('/confirmation/:bookingId', confirmationRouter);


// Middleware for cache control
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});


// Create a new service instance
const newServiceData= [
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



mongoose.connect(config.MONGO_URI,{ // Using the MONGO_URI from config - see env
useNewUrlParser: true,
useUnifiedTopology: true, }) 
.then(() => {
  // Connect to MongoDB using the actual URI from environment variables
    console.log('Connected to MongoDB');
// Call the function to insert/update services
      insertOrUpdateServices();

    // Start the server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
   
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



