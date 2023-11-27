const config = require('./utils/config');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { MONGO_URI, PORT } = process.env;
// Create Express app
const app = express();
app.use(cors()); 
app.use(express.urlencoded({ extended: true }))
//routes
const servicesRouter = require('./routes/services');
const servicesRoute = require('./routes/services');
const { insertOrUpdateServices } = require('./utils/servicesInitializer');
const bookingsRouter = require('./routes/bookings');

const confirmationRouter = require('./routes/confirmation');

 const authRoutes = require('./routes/auth');
   

const User = require('./models/User');
const getUserRoute = require('./routes/getuser');
const authMiddleware = require('./middleware');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS to allow requests from your React app
app.use(cors()); // Enable CORS for all routes
app.use(morgan('dev'));
// Middleware setup
app.use(bodyParser.json());
// Using the MONGO_URI from config - see env
mongoose.connect(MONGO_URI,{ 
useNewUrlParser: true,
useUnifiedTopology: true, 
}) 
.then(() => {
  insertOrUpdateServices();
  // Connect to MongoDB using the actual URI from environment variables
    console.log('Connected to MongoDB');
// Call the function to insert/update services
})
.catch((error) => {
  console.error('Error connecting to MongoDB', error);
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});
      // Middleware for cache control
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

const Booking = require('./models/Booking'); 

      
// Mount the booking route
app.post('/bookings', bookingsRouter);

app.get('/confirmation/:bookingId', async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    console.log('Fetching confirmation data for bookingId:', bookingId);

    // Use the Booking model to query the database
    const booking = await Booking.findOne({ bookingId });

    console.log('Confirmation data:', booking);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Send the confirmation data as a response
    res.json({
      bookingId: booking.bookingId,
      serviceTitle: booking.service.title,
      name: booking.name,
      email: booking.email,
      phoneNumber: booking.phoneNumber,
      district: booking.district,
      date: booking.date,
    });
  } catch (error) {
    console.error('Error fetching confirmation data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.use('/services', servicesRouter);
app.use('/auth', authRoutes);
app.use('/user', authMiddleware, getUserRoute);

// Used the service router for handling service-related routes
app.get('/services', servicesRoute);

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json('exist');
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json('notexist');
  } catch (error) {
    res.status(500).json('error');
  }
});

app.post('/login', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const check = await User.findOne({ email });

    if (check) {
      res.json('exist');
    } else {
      res.json('not exist');
    }
  } catch (e) {
    res.json('not exist');
  }
});


// server start
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
 




