//2.express route

const express = require('express');
const router = express.Router(); //  instance of the Express Router
const Service = require('../models/Service');

router.get('/services', async (req, res) => {
  try {
    const services = await Service.find();   //retrieve all the service from collection.
    res.json(services); //send the retrieved services as JSON response.
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//Get service details based on serviceId
router.get('/services:id', async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;