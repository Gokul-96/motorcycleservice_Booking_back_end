const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./utils/config');
const app = require('./app');
const { insertOrUpdateServices } = require('./utils/servicesInitializer');
 



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));



// Database connection
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    insertOrUpdateServices();
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });





// Start the server
app.listen(config.PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${config.PORT}`);
});