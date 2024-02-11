const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const servicesRouter = require('./routes/services');
const bookingsRouter = require('./routes/bookings');
const userController = require('./controllers/userController');
const confirmation = require('./routes/confirmation');
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
app.get('/api/users/Profile', userController.getProfile);

app.use('/confirmation', confirmation);
module.exports = app;

//node server.js