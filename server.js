const config = require('./utils/config');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// Import service route handlers
const servicesRouter = require('./routes/services');
// Import your booking route
const bookingsRouter = require('./routes/bookings');

const confirmationRoute = require('./routes/confirmation');
require('./models/Booking'); // Adjust the path to your schema definition file

// Create Express app
const app = express();

app.use(express.json());

// Configure CORS to allow requests from your React app
app.use(cors()); // Enable CORS for all routes

// Middleware for cache control
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// Define the port
const PORT = process.env.PORT || 3008;

// Use the service router for handling service-related routes
app.use('/services', servicesRouter);

// Mount the booking route
app.use('/bookings', bookingsRouter);

app.use('/confirmation', confirmationRoute);

// Connect to MongoDB using the actual URI from environment variables
console.log('Connecting to MongoDB');
// mongoose.connect(config.MONGO_URI) // Using the MONGO_URI from config - see env
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Start the server
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB', error);
//   });

  mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});