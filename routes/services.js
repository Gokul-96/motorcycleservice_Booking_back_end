//express route
const express = require('express');
const router = express.Router(); 
const Service = require('../models/Service');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/services', async (req, res) => {
  try {
    const services = await Service.find();   //retrieve all the service from collection.
    res.json(services); //send the retrieved services as JSON response.
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/services/:id', async (req, res) => {
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

// DELETE service by ID
router.delete('/services/:id', async (req, res) => {
  let serviceId;

  try {
 
    serviceId = parseInt(req.params.id, 10);

    // Check if the service with the given ID exists
    const existingService = await Service.findOne({_id: serviceId });

    if (!existingService) {
      return res.status(404).send({ error: 'Service not found' });
    }


  
    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
module.exports = router;