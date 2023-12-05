const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const servicesRouter = require('./routes/services');
const bookingsRouter = require('./routes/bookings');
const userController = require('./controllers/userController');

const app = express();

app.use(cors());

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'https://dreamy-mooncake-baa02a.netlify.app/'], credentials: true})); // Enable CORS for all routes
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.get('/services', servicesRouter);
app.post('/bookings', bookingsRouter);
app.get('/api/users/profile', userController.getProfile);

// Confirmation route
app.get('/confirmation/:bookingId', async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    console.log('Fetching confirmation data for bookingId:', bookingId);

    const booking = await Booking.findOne({ bookingId });

    console.log('Confirmation data:', booking);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

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

module.exports = app;